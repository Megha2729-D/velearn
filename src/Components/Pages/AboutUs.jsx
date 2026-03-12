import React, { useEffect, useRef, useState } from "react";
import "../Styles/About.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

const AboutUs = () => {

    const counterRef = useRef(null);
    const [startCount, setStartCount] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStartCount(true);
                }
            },
            { threshold: 0.4 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    const Counter = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!startCount) return;

            let start = 0;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;

                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }, [startCount, end, duration]);

        return <span>{count}</span>;
    };
    return (
        <>
            <section className="blog_banner">
                <div className="section_container pt-5">
                    <div className="row justify-content-center align-items-center w-100 m-auto">
                        <div className="col-lg-8">
                            <h1 className="text-white text-start fw-bold">
                                Empowering Careers Through Practical Learning
                            </h1>

                            <p className="text-white text-start">
                                At Velearn, we believe learning should be practical, accessible, and
                                career-focused. Our platform offers industry-relevant live courses,
                                recorded programs, webinars, and learning resources designed to help
                                students and professionals build real-world skills. Whether you are
                                starting your journey in technology or looking to upgrade your
                                expertise, Velearn provides the guidance and knowledge needed to
                                succeed in today’s digital world.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <img src={`${BASE_IMAGE_URL}bento-vector-1.png`} className="w-100" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="about_section">
                <div className="section_container">
                    <div className="row">
                        <div className="col-lg-6">
                            {/* Left Content */}
                            <div className="about_content">
                                <h2 className="text-black fw-bold">
                                    Our Dream is Global <span className="text-c2">Learning Transformation</span>
                                </h2>
                                <p>
                                    Velearn was founded with the vision of making modern technology education accessible to everyone. Our platform provides high-quality training programs including live courses, recorded courses, webinars, and learning resources designed to help students and professionals build real-world skills.
                                </p>
                                <ul className="about_points list-unstyled mt-3">
                                    <li className="pt-1"><i className="bi bi-check-circle-fill text-c1 me-2"></i>Industry-relevant live and recorded courses</li>
                                    <li className="pt-1"><i className="bi bi-check-circle-fill text-c1 me-2"></i>Hands-on projects to build practical skills</li>
                                    <li className="pt-1"><i className="bi bi-check-circle-fill text-c1 me-2"></i>Expert instructors with real-world experience</li>
                                    <li className="pt-1"><i className="bi bi-check-circle-fill text-c1 me-2"></i>Flexible learning with self-paced options</li>
                                    <li className="pt-1"><i className="bi bi-check-circle-fill text-c1 me-2"></i>Career guidance and placement support</li>
                                </ul>
                            </div>
                        </div>


                        <div className="col-lg-6">
                            {/* Right Image */}
                            <div className="about_image">
                                <img src={`${BASE_IMAGE_URL}contact-banner.jpg`} className="phone-img" alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Stats Section */}
            <div className="abt_counter py-5" ref={counterRef}>
                <div className="section_container">
                    <div className="row w-100 m-auto justify-content-center">
                        <div className="col-lg-10">
                            <div className="about_stats">

                                <div className="row">
                                    <div className="col-lg-3 col-6 my-3 my-lg-0">
                                        <div className="stat_card">
                                            <h3 className="fw-bold">
                                                <Counter end={3} />.5
                                            </h3>
                                            <p>Years Experience</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6 my-3 my-lg-0">

                                        <div className="stat_card">
                                            <h3 className="fw-bold">
                                                <Counter end={23} />
                                            </h3>
                                            <p>Projects & Courses</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-6 my-3 my-lg-0">
                                        <div className="stat_card">
                                            <h3 className="fw-bold">
                                                <Counter end={830} />+
                                            </h3>
                                            <p>Positive Reviews</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6 my-3 my-lg-0">

                                        <div className="stat_card">
                                            <h3 className="fw-bold">
                                                <Counter end={100} />K
                                            </h3>
                                            <p>Trusted Students</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mission-vision py-5">
                <div className="section_container">
                    <div className="row align-items-center">

                        {/* Mission & Vision Images */}
                        <div className="col-lg-5 about_right mb-4 mb-lg-0">
                            <div className="mission-vision__images position-relative h-100">
                                <div className="d-flex h-100">
                                    <div className="img-abt-1">
                                        <img
                                            src={`${BASE_IMAGE_URL}about-2.webp`}
                                            alt="Velearn Mission Focus"
                                        />
                                    </div>
                                    <div className="img-abt-2">
                                        <img
                                            src={`${BASE_IMAGE_URL}about-1.jpg`}
                                            alt="Velearn Vision"
                                        />
                                    </div>
                                </div>
                                <div className="abt_right_content position-absolute">
                                    <div>
                                        <h2 className="text-center text-white">100+</h2>
                                    </div>
                                    <div>
                                        <h6 className="text-center text-white">Expert <br /> Courses</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission & Vision Text */}
                        <div className="col-lg-7">
                            {/* Heading */}
                            <div className="sec-title text-start mb-4">
                                <h3 className="text-black fw-bold text-start">
                                    Our <span className="text-c2">Purpose & Vision</span>
                                </h3>
                            </div>

                            <div className="mission-vision__content">

                                {/* Mission */}
                                <div className="mission mb-4">
                                    <h6 className="fw-bold mb-1">Our Mission</h6>
                                    <p>
                                        To empower learners worldwide with accessible, high-quality online education, fostering skill development, career growth, and lifelong learning opportunities.
                                    </p>
                                </div>

                                {/* Vision */}
                                <div className="vision mb-4">
                                    <h6 className="fw-bold mb-1">Our Vision</h6>
                                    <p>
                                        To become a global leader in online learning, creating an inclusive ecosystem where knowledge, innovation, and practical skills drive personal and professional success.
                                    </p>
                                </div>

                                {/* Additional Highlights */}
                                <div className="mission-vision__points mt-3">
                                    <h5 className="fw-bold mb-3 text-black">What We Offer</h5>
                                    <ul className="list-unstyled">
                                        <li className="d-flex align-items-start mb-2">
                                            <i className="bi bi-check-circle-fill text-c1 me-2"></i>
                                            Industry-relevant live courses and workshops
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <i className="bi bi-check-circle-fill text-c1 me-2"></i>
                                            Self-paced recorded programs for flexible learning
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <i className="bi bi-check-circle-fill text-c1 me-2"></i>
                                            Career guidance & mentorship for professional growth
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;