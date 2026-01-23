import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";

const BASE_API_URL = "/api/";
const BASE_IMAGE_URL = "/assets/images/";

class LoginPage extends Component {
    state = {
        email: "",
        password: "",
        showPassword: false,
        loading: false,
        message: ""
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };
    togglePassword = () => {
        this.setState(prev => ({
            showPassword: !prev.showPassword
        }));
    };
    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        if (!email || !password) {
            return this.setState({ message: "All fields are required" });
        }

        try {
            this.setState({ loading: true, message: "" });

            const res = await axios.post(
                `${BASE_API_URL}auth/login`,
                { email, password }
            );

            // OPTIONAL: store user (for now)
            localStorage.setItem("user", JSON.stringify(res.data.user));

            this.setState({
                loading: false,
                message: "Login successful"
            });

            // Redirect after login
            window.location.href = "/";

        } catch (err) {
            this.setState({
                loading: false,
                message: err.response?.data?.message || "Login failed"
            });
        }
    };

    render() {
        const { loading, message } = this.state;
        return (
            <div className="login-container py-3 px-lg-0 px-3">
                <div className="container p-lg-0">
                    <div className="row">
                        {/* LEFT */}
                        <div className="col-lg-6">
                            <div className="login-form">
                                <div className="login-form-inner">

                                    <div className="text-center mb-3">
                                        <h1>Login</h1>
                                        <p>See your growth and get consulting support!</p>
                                    </div>

                                    {message && (
                                        <p style={{ color: "red", textAlign: "center" }}>
                                            {message}
                                        </p>
                                    )}

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
                                                    className={`bi ${this.state.showPassword
                                                        ? "bi-eye-slash"
                                                        : "bi-eye"
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
                                        {loading ? "Logging in..." : "Login"}
                                    </button>

                                    <div className="register-div text-center mt-3">
                                        Not registered yet?{" "}
                                        <Link to="/signup">Create an account</Link>
                                    </div>

                                </div>
                            </div>
                        </div>
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
                                                alt="Interactive Courses"
                                            />
                                        </div>
                                        <div className="slide-content my-4">
                                            <h2>Interactive Courses</h2>
                                            <p>Learn from top instructors with hands-on lessons and exercises.</p>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="slide-image">
                                            <img
                                                src="https://ismailvtl-images-project.vercel.app/cloud-storage.png"
                                                loading="lazy"
                                                alt="Track Progress"
                                            />
                                        </div>
                                        <div className="slide-content my-4">
                                            <h2>Track Your Progress</h2>
                                            <p>Monitor your learning journey and achieve your goals efficiently.</p>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="slide-image">
                                            <img
                                                src="https://ismailvtl-images-project.vercel.app/cloud-storage.png"
                                                loading="lazy"
                                                alt="Collaborate"
                                            />
                                        </div>
                                        <div className="slide-content my-4">
                                            <h2>Collaborate & Discuss</h2>
                                            <p>Engage with peers and instructors to enhance your learning experience.</p>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
