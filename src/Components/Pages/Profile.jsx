import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/Profile.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = "https://www.velearn.in/velearn/assets/images/";

const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [states, setStates] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploadLoading, setUploadLoading] = useState(false);

    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    const fetchProfile = async () => {
        try {

            const res = await axios.get(`${BASE_API_URL}profile`, {
                params: { user_id: userId },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data?.data) {
                setProfile(res.data.data);
            }

        } catch (err) {
            console.log("Profile fetch error:", err);
        }
    };

    // Fetch States
    const fetchStates = async () => {
        try {

            const res = await axios.get(`${BASE_API_URL}states`);

            if (res.data?.data) {
                setStates(res.data.data);
            }

        } catch (err) {
            console.log("States fetch error:", err);
        }
    };

    useEffect(() => {

        const loadData = async () => {

            if (userId) {

                await Promise.all([
                    fetchProfile(),
                    fetchStates()
                ]);

                setLoading(false);
            }

        };

        loadData();

    }, []);

    // Handle Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value
        });

    };

    const validateForm = () => {

        let newErrors = {};

        if (!profile.first_name?.trim()) {
            newErrors.first_name = "First name is required";
        }

        if (!profile.last_name?.trim()) {
            newErrors.last_name = "Last name is required";
        }

        if (!profile.email?.trim()) {
            newErrors.email = "Email is required";
        }

        if (!profile.primary_phone?.trim()) {
            newErrors.primary_phone = "Primary phone is required";
        }

        if (!profile.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!profile.date_of_birth) {
            newErrors.date_of_birth = "Date of birth is required";
        }

        if (!profile.education?.trim()) {
            newErrors.education = "Education is required";
        }

        if (!profile.address?.trim()) {
            newErrors.address = "Address is required";
        }

        if (!profile.city?.trim()) {
            newErrors.city = "City is required";
        }

        if (!profile.pincode?.trim()) {
            newErrors.pincode = "Pincode is required";
        }

        if (!profile.state_id) {
            newErrors.state_id = "State is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const updateProfile = async () => {

        if (!validateForm()) return;

        try {

            const payload = {
                user_id: userId,
                ...profile
            };

            await axios.post(`${BASE_API_URL}profile/update`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEditMode(false);
            setShowSuccessModal(true);

            fetchProfile();

        } catch (err) {

            console.log(err);
            alert("Something went wrong");

        }

    };

    const getProfileImage = () => {
        if (!profile?.image) return `${BASE_IMAGE_URL}icons/user.png`;
        
        // If it's already a full URL (starts with http)
        if (profile.image.startsWith('http')) return profile.image;

        // Clean up the image string to get just the filename
        const imageName = profile.image.split('/').pop();
        
        return `https://velearn.in/public/uploads/students/${imageName}`;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            toast.error("Please select a valid image file (JPG, PNG, GIF, SVG)");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size should be less than 2MB");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("auth_id", userId);

        setUploadLoading(true);
        const uploadToast = toast.loading("Uploading image...");

        try {
            const res = await axios.post(`${BASE_API_URL}update-logo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.status) {
                toast.success("Profile image updated!", { id: uploadToast });
                // Update profile state with new image URL
                setProfile(prev => ({
                    ...prev,
                    image: res.data.image
                }));
                // Also update local storage user object if needed
                const updatedUser = { ...storedUser, image: res.data.image };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
                // Dispatch event to notify Navbar
                window.dispatchEvent(new Event('storage-update'));
            } else {
                toast.error(res.data.message || "Upload failed", { id: uploadToast });
            }
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Failed to upload image", { id: uploadToast });
        } finally {
            setUploadLoading(false);
        }
    };

    if (loading) {
        return <div className="profile_page">Loading profile...</div>;
    }

    return (

        <div className="profile_page">

            <div className="section_container">

                {/* Header */}
                <div className="profile_header">

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="profile_left d-flex flex-column align-items-center">
                                <div className="profile_avatar_wrapper position-relative">
                                    <div className={`profile_avatar ${uploadLoading ? 'loading' : ''}`}>
                                        <img 
                                            src={getProfileImage()} 
                                            alt="User" 
                                        />
                                    </div>
                                    <label htmlFor="image-upload" className="avatar_upload_btn">
                                        <i className="bi bi-camera-fill"></i>
                                    </label>
                                    <input 
                                        type="file" 
                                        id="image-upload" 
                                        className="d-none" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={uploadLoading}
                                    />
                                </div>
                                <div className="profile_basic_info d-flex flex-column align-items-center">

                                    <h2 className="text-center fw-bold mt-3">
                                        {profile?.first_name} {profile?.last_name}
                                    </h2>

                                    <p className="text-center">{profile?.email}</p>

                                    <button
                                        className="btn_edit_profile"
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        {editMode ? "Cancel" : "Edit Profile"}
                                    </button>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            {/* Body */}
                            <div className="profile_body">

                                <div className="profile_card">

                                    <h3 className="fw-bold">Personal Information</h3>

                                    <div className="row g-3">

                                        {/* First Name */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="first_name">First Name <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.first_name ? "form-control is-invalid" : ""}`}
                                                    id="first_name"
                                                    name="first_name"
                                                    value={profile?.first_name || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter your first name"
                                                />
                                                {errors.first_name && (
                                                    <div className="error-msg">{errors.first_name}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Last Name */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="last_name">Last Name <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.last_name ? "form-control is-invalid" : ""}`}
                                                    id="last_name"
                                                    name="last_name"
                                                    value={profile?.last_name || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter your last name"
                                                />
                                                {errors.last_name && (
                                                    <div className="error-msg">{errors.last_name}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                                <input
                                                    type="email"
                                                    className={`form_fields ${errors.email ? "form-control is-invalid" : ""}`}
                                                    id="email"
                                                    name="email"
                                                    value={profile?.email || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter your email address"
                                                />
                                                {errors.email && (
                                                    <div className="error-msg">{errors.email}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Primary Phone */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="primary_phone">Primary Phone <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.primary_phone ? "form-control is-invalid" : ""}`}
                                                    id="primary_phone"
                                                    name="primary_phone"
                                                    value={profile?.primary_phone || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter your phone number"
                                                />
                                                {errors.primary_phone && (
                                                    <div className="error-msg">{errors.primary_phone}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Secondary Phone */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="secondary_phone">Secondary Phone</label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.secondary_phone ? "form-control is-invalid" : ""}`}
                                                    id="secondary_phone"
                                                    name="secondary_phone"
                                                    value={profile?.secondary_phone || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter alternate phone number"
                                                />
                                                {errors.secondary_phone && (
                                                    <div className="error-msg">{errors.secondary_phone}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="gender">Gender <span className="text-danger">*</span></label>
                                                <select
                                                    className={`form_fields ${errors.gender ? "form-control is-invalid" : ""}`}
                                                    name="gender"
                                                    id="gender"
                                                    value={profile?.gender || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                                {errors.gender && (
                                                    <div className="error-msg">{errors.gender}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* DOB */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="date_of_birth">Date of Birth <span className="text-danger">*</span></label>
                                                <input
                                                    type="date"
                                                    className={`form_fields ${errors.date_of_birth ? "form-control is-invalid" : ""}`}
                                                    name="date_of_birth"
                                                    id="date_of_birth"
                                                    value={profile?.date_of_birth || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.date_of_birth && (
                                                    <div className="error-msg">{errors.date_of_birth}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Education */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="education">Education <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.education ? "form-control is-invalid" : ""}`}
                                                    name="education"
                                                    id="education"
                                                    value={profile?.education || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Highest education degree"
                                                />
                                                {errors.education && (
                                                    <div className="error-msg">{errors.education}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="col-12">
                                            <div className="form-item">
                                                <label htmlFor="address">Address <span className="text-danger">*</span></label>
                                                <textarea
                                                    className={`form_fields ${errors.address ? "form-control is-invalid" : ""}`}
                                                    name="address"
                                                    id="address"
                                                    value={profile?.address || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter your full address"
                                                ></textarea>
                                                {errors.address && (
                                                    <div className="error-msg">{errors.address}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="city">City <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.city ? "form-control is-invalid" : ""}`}
                                                    name="city"
                                                    id="city"
                                                    value={profile?.city || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Enter city"
                                                />
                                                {errors.city && (
                                                    <div className="error-msg">{errors.city}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Pincode */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="pincode">Pincode <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form_fields ${errors.pincode ? "form-control is-invalid" : ""}`}
                                                    name="pincode"
                                                    id="pincode"
                                                    value={profile?.pincode || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    placeholder="Zip/Pin code"
                                                />
                                                {errors.pincode && (
                                                    <div className="error-msg">{errors.pincode}</div>
                                                )}
                                            </div>
                                        </div>


                                        {/* State */}
                                        <div className="col-md-6">
                                            <div className="form-item">
                                                <label htmlFor="state_id">State <span className="text-danger">*</span></label>
                                                <select
                                                    className={`form_fields ${errors.state_id ? "form-control is-invalid" : ""}`}
                                                    name="state_id"
                                                    id="state_id"
                                                    value={profile?.state_id || ""}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                >

                                                    <option value="" disabled>Select State</option>

                                                    {states.map((state) => (
                                                        <option key={state.id} value={state.id}>
                                                            {state.state_name}
                                                        </option>
                                                    ))}

                                                </select>
                                                {errors.state_id && (
                                                    <div className="error-msg">{errors.state_id}</div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                    {editMode && (
                                        <div className="text-center mt-4">
                                            <button
                                                className="submit_butt"
                                                onClick={updateProfile}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                    {showSuccessModal && (

                                        <div
                                            className="success_modal_overlay"
                                            onClick={() => setShowSuccessModal(false)}
                                        >

                                            <div
                                                className="modalbox success animate"
                                                onClick={(e) => e.stopPropagation()}
                                            >

                                                <div className="icon">
                                                    <span>✓</span>
                                                </div>

                                                <h1>Success!</h1>

                                                <p>
                                                    Your profile has been <br />
                                                    <strong>updated successfully</strong>
                                                </p>

                                                <button
                                                    type="button"
                                                    className="redo btn"
                                                    onClick={() => setShowSuccessModal(false)}
                                                >
                                                    OK
                                                </button>

                                            </div>

                                        </div>

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;