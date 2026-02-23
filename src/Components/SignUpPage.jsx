import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `${process.env.PUBLIC_URL}/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class SignUpPage extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
        loading: false,
        message: "",
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    togglePassword = () => {
        this.setState(prev => ({
            showPassword: !prev.showPassword
        }));
    };

    toggleConfirmPassword = () => {
        this.setState(prev => ({
            showConfirmPassword: !prev.showConfirmPassword
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = this.state;

        if (!name || !email || !password || !confirmPassword) {
            return this.setState({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return this.setState({ message: "Passwords do not match" });
        }

        try {
            this.setState({ loading: true, message: "" });

            const res = await axios.post(
                // "https://velearn-backend.vercel.app/api/auth/signup",
                `${BASE_API_URL}auth/signup`,
                {
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    password,
                    confirmPassword
                }
            );

            // ✅ AUTO LOGIN
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // ✅ REDIRECT TO HOME
            window.location.href = "/";

        } catch (err) {
            this.setState({
                loading: false,
                message: err.response?.data?.message || "Signup failed"
            });
        }

    };

    render() {
        const { loading, message } = this.state;

        return (
            <div className="login-container py-3 px-lg-0 px-3">
                <div className="container p-lg-0">
                    <div className="row flex-lg-row flex-column-reverse">
                        <div className="col-lg-6">
                            {/* Swiper Onboarding */}
                            <div className="onboarding h-100 d-flex align-items-center">
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    pagination={{ clickable: true }}
                                    autoplay={{ delay: 3500 }}
                                    loop
                                    speed={600}
                                    grabCursor
                                >
                                    <SwiperSlide>
                                        <div className="slide-image">
                                            <img
                                                src="https://ismailvtl-images-project.vercel.app/startup-launch.png"
                                                loading="lazy"
                                                alt="Learn at Your Pace"
                                            />
                                        </div>
                                        <div className="slide-content my-4">
                                            <h2>Learn at Your Own Pace</h2>
                                            <p>Join interactive courses and master skills anytime, anywhere.</p>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="slide-image">
                                            <img
                                                src="https://ismailvtl-images-project.vercel.app/cloud-storage.png"
                                                loading="lazy"
                                                alt="Personalized Learning"
                                            />
                                        </div>
                                        <div className="slide-content my-4">
                                            <h2>Personalized Learning</h2>
                                            <p>Get custom recommendations and track your improvement easily.</p>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="slide-image">
                                            <img
                                                src="https://ismailvtl-images-project.vercel.app/cloud-storage.png"
                                                loading="lazy"
                                                alt="Connect with Mentors"
                                            />
                                        </div>
                                        <div className="slide-content my-4">
                                            <h2>Connect with Mentors</h2>
                                            <p>Get guidance from experts and grow your career with Velearn.</p>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>


                        {/* RIGHT SIDE */}
                        <div className="col-lg-6">
                            <div className="login-form">
                                <div className="login-form-inner">

                                    <h1 className="text-center mb-2">Sign Up</h1>
                                    <p className="text-center">Create your account</p>

                                    {message && (
                                        <p class="mb-1" style={{ color: "red", textAlign: "center" }}>
                                            {message}
                                        </p>
                                    )}
                                    {message.includes("already registered") && (
                                        <div className="text-center">
                                            <Link to="/login">Click here to login</Link>
                                        </div>
                                    )}
                                    <div className="login-form-group">
                                        <label>Full Name *</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="login-form-group">
                                        <label>Email *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            placeholder="email@website.com"
                                        />
                                    </div>

                                    <div className="login-form-group password-group">
                                        <label>Password *</label>

                                        <div className="password-input-wrapper position-relative">
                                            <input
                                                id="password"
                                                type={this.state.showPassword ? "text" : "password"}
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                placeholder="Minimum 8 characters"
                                                className="w-100 pe-5"
                                            />

                                            <span
                                                className="pe-3 password-toggle position-absolute top-0 bottom-0 end-0 m-auto d-flex justify-content-center align-items-center"
                                                onClick={this.togglePassword}
                                            >
                                                <i
                                                    className={`bi ${this.state.showPassword ? "bi-eye-slash" : "bi-eye"
                                                        }`}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="login-form-group password-group">
                                        <label>Confirm Password *</label>

                                        <div className="password-input-wrapper position-relative">
                                            <input
                                                id="confirmPassword"
                                                type={this.state.showConfirmPassword ? "text" : "password"}
                                                value={this.state.confirmPassword}
                                                onChange={this.handleChange}
                                                placeholder="Re-enter password"
                                                className="w-100 pe-5"
                                            />

                                            <span
                                                className="pe-3 password-toggle position-absolute top-0 bottom-0 end-0 m-auto d-flex justify-content-center align-items-center"
                                                onClick={this.toggleConfirmPassword}
                                            >
                                                <i
                                                    className={`bi ${this.state.showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                                                        }`}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className="rounded-button login-cta"
                                        onClick={this.handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Create Account"}
                                    </button>

                                    <div className="register-div text-center mt-3">
                                        Already have an account?{" "}
                                        <Link to="/login">Login here</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;
