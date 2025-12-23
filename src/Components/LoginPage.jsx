import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/pagination";

class LoginPage extends Component {
    render() {
        return (
            <div className="login-container py-3 px-lg-0 px-3">
                <div className="container p-lg-0">
                    <div className="row">
                        <div className="col-lg-6">
                            {/* Login Form */}
                            <div className="login-form">
                                <div className="login-form-inner">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <div className="mb-3 d-flex gap-2 align-items-center justify-content-center">
                                            <div className="login_logo">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/logo-icon.png`} alt="" />
                                            </div>
                                            <h1>Login</h1>
                                        </div>
                                        <p className="body-text">See your growth and get consulting support!</p>
                                    </div>
                                    <button className="bg-white rounded-button google-login-button">
                                        <span className="google-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path
                                                    d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                                                    fill="#fbbb00"
                                                />
                                                <path
                                                    d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                                                    fill="#518ef8"
                                                />
                                                <path
                                                    d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                                                    fill="#28b446"
                                                />
                                                <path
                                                    d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                                                    fill="#f14336"
                                                />
                                            </svg>
                                        </span>
                                        <span>Sign in with Google</span>
                                    </button>

                                    <div className="sign-in-seperator">
                                        <span>or Sign in with Email</span>
                                    </div>

                                    <div className="login-form-group">
                                        <label htmlFor="email">
                                            Email <span className="required-star">*</span>
                                        </label>
                                        <input type="text" placeholder="email@website.com" id="email" />
                                    </div>

                                    <div className="login-form-group">
                                        <label htmlFor="pwd">
                                            Password <span className="required-star">*</span>
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="password"
                                            placeholder="Minimum 8 characters"
                                            id="pwd"
                                        />
                                    </div>

                                    <div className="login-form-group single-row">
                                        <div className="custom-check">
                                            <input
                                                autoComplete="off"
                                                type="checkbox"
                                                defaultChecked
                                                id="remember"
                                            />
                                            <label htmlFor="remember">Remember me</label>
                                        </div>
                                        <Link to='' className="link forgot-link">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Link to='/login' className="rounded-button login-cta">
                                        Login
                                    </Link>

                                    <div className="register-div">
                                        Not registered yet?{" "}
                                        <Link to='/signup' className="link create-account">
                                            Create an account?
                                        </Link>
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
