import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/ResetPassword.css";

const BASE_API_URL = "https://www.velearn.in/api/";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const emailParam = searchParams.get("email");
        const tokenParam = searchParams.get("token");

        if (emailParam && tokenParam) {
            setEmail(emailParam);
            setToken(tokenParam);
        } else {
            toast.error("Invalid reset link");
            // Optionally redirect back to forgot-password if params are missing
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post(`${BASE_API_URL}reset-password`, {
                email,
                token,
                password,
                password_confirmation: passwordConfirmation
            });

            if (response.data.status) {
                toast.success(response.data.message || "Password reset successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(response.data.message || "Reset failed");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
                toast.error(error.response.data.message || "Validation failed");
            } else {
                toast.error(error.response?.data?.message || "Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-card">
                <div className="reset-header">
                    <i className="bi bi-key-fill"></i>
                    <h2>New Password</h2>
                    <p>Enter your new password to secure your account</p>
                </div>

                <div className="reset-body">
                    <form onSubmit={handleSubmit}>
                        <div className="reset-form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                className="reset-input" 
                                value={email} 
                                readOnly 
                                disabled 
                            />
                        </div>

                        <div className="reset-form-group">
                            <label>New Password</label>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="reset-input w-100"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span 
                                    className="position-absolute end-0 top-50 translate-middle-y pe-3 pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                                </span>
                            </div>
                            {errors.password && <div className="text-danger small mt-1">{errors.password[0]}</div>}
                        </div>

                        <div className="reset-form-group">
                            <label>Confirm New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="reset-input"
                                placeholder="Confirm new password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                            {errors.password_confirmation && <div className="text-danger small mt-1">{errors.password_confirmation[0]}</div>}
                        </div>

                        <button 
                            type="submit" 
                            className="reset-submit-btn"
                            disabled={loading || !token}
                        >
                            {loading ? (
                                <><span className="spinner-border spinner-border-sm me-2"></span> Updating Password...</>
                            ) : "Update Password"}
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-muted text-decoration-none">
                                <i className="bi bi-arrow-left"></i> Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
