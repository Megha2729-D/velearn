import React, { Component, createRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.counterRef = createRef();
        this.progressRef = createRef();
        this.state = {
            counters: [
                { label: "Active Learners", value: 60, suffix: "+", count: 0 },
                { label: "Expert Mentors", value: 18, suffix: "k+", count: 0 },
                { label: "Code Submissions", value: 60, suffix: "+", count: 0 },
                { label: "Learning Videos", value: 10, suffix: "k+", count: 0 },
            ],
            progress: [
                { label: "Course Completion", desc: "Learners successfully complete 75% of enrolled programs.", value: 75, color: "#007bff", current: 0 },
                { label: "Student Satisfaction", desc: "Over 90% of learners rate our mentors and content highly.", value: 90, color: "#28a745", current: 0 },
                { label: "Skill Application", desc: "80% of learners apply VeLearn skills in real-world projects.", value: 80, color: "#ffc107", current: 0 },
            ],
            counterStarted: false,
            progressStarted: false,
            activeTab: "All",
        };
    }

    componentDidMount() {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !this.state.counterStarted) {
                    this.animateCounters();
                    this.setState({ counterStarted: true });
                }
            },
            { threshold: 0.5 }
        );
        if (this.counterRef.current) counterObserver.observe(this.counterRef.current);

        const progressObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !this.state.progressStarted) {
                    this.animateProgress();
                    this.setState({ progressStarted: true });
                }
            },
            { threshold: 0.5 }
        );
        if (this.progressRef.current) progressObserver.observe(this.progressRef.current);
    }

    animateCounters() {
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let step = 0;

        const counterInterval = setInterval(() => {
            step++;
            this.setState((prev) => ({
                counters: prev.counters.map((c) => ({
                    ...c,
                    count: Math.min(Math.floor((c.value / steps) * step), c.value),
                })),
            }));
            if (step >= steps) clearInterval(counterInterval);
        }, stepTime);
    }

    animateProgress() {
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let step = 0;

        const progressInterval = setInterval(() => {
            step++;
            this.setState((prev) => ({
                progress: prev.progress.map((p) => ({
                    ...p,
                    current: Math.min(Math.floor((p.value / steps) * step), p.value),
                })),
            }));
            if (step >= steps) clearInterval(progressInterval);
        }, stepTime);
    }

    render() {
        const { counters, progress } = this.state;

        // Partner logos
        const partners = [
            "aicte.webp",
            "anna-university-chennai.webp",
            "autodesk.webp",
            "google-for-education.webp",
            "iit-delhi.webp",
            "iit-kanpur.webp",
            "iitm-pravartak.webp",
            "iit-ropar.webp",
            "itt-gandhinagar.webp",
            "naan-mudhalvan.webp",
            "nasscom.webp",
            "nsdc.webp",
            "skill-development.webp",
            "swayam-plus.webp",
        ];

        // Courses for VeLearn
        const courses = [
            {
                title: "Full Stack Web Development Program",
                lang: "English, Tamil & Hindi",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-1.jpg`,
            },
            {
                title: "Data Science & Analytics Masterclass",
                lang: "English & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-2.jpg`,
            },
            {
                title: "UI/UX Design Professional Course",
                lang: "English, Hindi & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-3.jpg`,
            },
            {
                title: "Python Programming for Beginners",
                lang: "English & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-4.jpg`,
            },
            {
                title: "Artificial Intelligence Essentials",
                lang: "English, Hindi & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-5.jpg`,
            },
        ];

        return (
            <>
                {/* Hero Carousel */}
                <div id="velearnHomeCarousel" className="carousel slide carousel-fade">
                    <div className="carousel-inner mt-3 mt-lg-0">

                        {/* SVG BACKGROUND (DESKTOP) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="d-none d-lg-block w-100"
                            id="Layer_1" viewBox="0 100 1400 600">
                            <defs xmlns="http://www.w3.org/2000/svg">
                                <filter id="shadowFilter" x="-20%" y="-20%" width="150%" height="150%">
                                    <feDropShadow dx="0" dy="12" stdDeviation="25" flood-color="rgba(0,0,0,0.49)" />
                                </filter>
                            </defs>
                            <path filter="url(#shadowFilter)" fill="#21346a"
                                d="M1350,310.05V610a40,40,0,0,1-40,40H740.05a40,40,0,0,1-40-40v-39.9a40,40,0,0,0-40-40H90.05A40,40,0,0,1,50,490V190.05A40,40,0,0,1,90.05,150H660a40,40,0,0,1,40,40.05V230a40,40,0,0,0,40,40.05H1310A40,40,0,0,1,1350,310.05Z">
                            </path>
                        </svg>

                        {/* SVG BACKGROUND (MOBILE) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="d-block d-lg-none w-100"
                            id="Layer_1" viewBox="0 100 1400 1700">
                            <defs xmlns="http://www.w3.org/2000/svg">
                                <filter id="shadowSmFilter" x="-20%" y="-20%" width="150%" height="150%">
                                    <feDropShadow dx="0" dy="12" stdDeviation="25" flood-color="rgba(0, 0, 0, 0.49)" />
                                </filter>
                            </defs>
                            <path filter="url(#shadowSmFilter)" fill="#21346a"
                                // d="M1350,310.05V1990a40,40,0,0,1-40,40H740.05a40,40,0,0,1-40-40v-39.9a40,40,0,0,0-40-40H90.05A40,40,0,0,1,50,1970V190.05A40,40,0,0,1,90.05,150H660a40,40,0,0,1,40,40.05V230a40,40,0,0,0,40,40.05H1310A40,40,0,0,1,1350,310.05Z"
                                d="M1350,310.05V1200a40,40,0,0,1-40,40H740.05a40,40,0,0,1-40-40v-39.9a40,40,0,0,0-40-40H90.05A40,40,0,0,1,50,1070V190.05A40,40,0,0,1,90.05,150H660a40,40,0,0,1,40,40.05V230a40,40,0,0,0,40,40.05H1310A40,40,0,0,1,1350,310.05Z"
                            >
                            </path>
                        </svg>
                        {/* SLIDE 1 – Live Learning */}
                        <div className="carousel-item active">
                            <div className="carousel-caption custom-caption">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="caption-box">
                                            <h2 className="h1">
                                                Master the art <br />
                                                of <span className="highlight">Live Learning</span>
                                            </h2>
                                            <p>Join expert-led live classes, interact in real time, and grow your career.</p>
                                            <div className="btn-group d-flex">
                                                <button className="syllabus-btn">Syllabus</button>
                                                <button className="viewmore-btn">View More</button>
                                            </div>
                                            <div className="d-none d-lg-block">
                                                <div className="uiux-process-box mt-3">
                                                    <h2 className="ux-title">LIVE LEARNING EXPERIENCE</h2>
                                                    <ul className="ux-list">
                                                        <li>Attend Live Sessions With Industry Experts</li>
                                                        <li>Interactive Discussions & Group Activities</li>
                                                        <li>Immediate Feedback to Improve Skills</li>
                                                        <li>Real-Time Problem Solving & Mentorship</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="uiux-process-box mt-3">
                                            <div className="rings-row">
                                                <div className="ring-item"><div className="ring"></div><span>ENGAGE</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>INTERACT</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>IMPLEMENT</span></div>
                                            </div>
                                            <h2 className="ux-title">LEARN WITH REAL-TIME GUIDANCE</h2>
                                            <ul className="ux-list">
                                                <li>Engage in Live Interactive Sessions</li>
                                                <li>Discuss Concepts Directly With Mentors</li>
                                                <li>Participate in Real-Time Q&A</li>
                                                <li>Receive Immediate Practical Feedback</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SLIDE 2 – Self-Paced Study */}
                        <div className="carousel-item">
                            <div className="carousel-caption custom-caption">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="caption-box">
                                            <h2 className="h1">
                                                Master the art <br />
                                                of <span className="highlight">Self-Paced Study</span>
                                            </h2>
                                            <p>Access high-quality recorded lessons, learn anytime, and upskill fast.</p>
                                            <div className="btn-group d-flex">
                                                <button className="syllabus-btn">Syllabus</button>
                                                <button className="viewmore-btn">View More</button>
                                            </div>
                                            <div className=" d-none d-lg-block">
                                                <div className="uiux-process-box mt-3">
                                                    <h2 className="ux-title">FLEXIBLE LEARNING JOURNEY</h2>
                                                    <ul className="ux-list">
                                                        <li>Watch Lessons At Your Own Pace</li>
                                                        <li>Access Resources Anytime, Anywhere</li>
                                                        <li>Practice With Structured Exercises</li>
                                                        <li>Track Your Progress Easily</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="uiux-process-box mt-3">
                                            <div className="rings-row">
                                                <div className="ring-item"><div className="ring"></div><span>PLAN</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>LEARN</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>PRACTICE</span></div>
                                            </div>
                                            <h2 className="ux-title">STUDY ANYTIME WITH FLEXIBILITY</h2>
                                            <ul className="ux-list">
                                                <li>Watch Lessons at Your Own Speed</li>
                                                <li>Revisit Concepts Anytime You Need</li>
                                                <li>Practice Along With Structured Modules</li>
                                                <li>Track Progress Through Each Section</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SLIDE 3 – Sharing & Earning */}
                        <div className="carousel-item">
                            <div className="carousel-caption custom-caption">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="caption-box">
                                            <h2 className="h1">
                                                Master the art <br />
                                                of <span className="highlight">Sharing & Earning</span>
                                            </h2>
                                            <p>Refer friends, help them grow, and earn exciting rewards effortlessly.</p>
                                            <div className="btn-group d-flex">
                                                <button className="syllabus-btn">Syllabus</button>
                                                <button className="viewmore-btn">View More</button>
                                            </div>
                                            <div className=" d-none d-lg-block">
                                                <div className="uiux-process-box mt-3">
                                                    <h2 className="ux-title">GROW TOGETHER & EARN</h2>
                                                    <ul className="ux-list">
                                                        <li>Invite Friends To Join Courses</li>
                                                        <li>Earn Rewards For Every Successful Referral</li>
                                                        <li>Build A Learning Community</li>
                                                        <li>Share Knowledge & Boost Careers</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="uiux-process-box mt-3">
                                            <div className="rings-row">
                                                <div className="ring-item"><div className="ring"></div><span>SHARE</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>REFER</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>EARN</span></div>
                                            </div>
                                            <h2 className="ux-title">EARN WHILE YOU HELP OTHERS GROW</h2>
                                            <ul className="ux-list">
                                                <li>Share Courses With Your Network</li>
                                                <li>Invite Friends to Learn and Upskill</li>
                                                <li>Earn Rewards on Every Successful Refer</li>
                                                <li>Grow a Community That Learns Together</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SLIDE 4 – Hands-On Coding */}
                        <div className="carousel-item">
                            <div className="carousel-caption custom-caption">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="caption-box">
                                            <h2 className="h1">
                                                Master the art <br />
                                                of <span className="highlight">Hands-On Coding</span>
                                            </h2>
                                            <p>Use our powerful online IDE, practice real projects, and build skills.</p>
                                            <div className="btn-group d-flex">
                                                <button className="syllabus-btn">Syllabus</button>
                                                <button className="viewmore-btn">View More</button>
                                            </div>
                                            <div className=" d-none d-lg-block">
                                                <div className="uiux-process-box mt-3">
                                                    <h2 className="ux-title">CODING MADE PRACTICAL</h2>
                                                    <ul className="ux-list">
                                                        <li>Practice Projects In A Live IDE</li>
                                                        <li>Debug And Solve Real Problems</li>
                                                        <li>Build Portfolio-Ready Skills</li>
                                                        <li>Learn By Doing With Guidance</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="uiux-process-box mt-3">
                                            <div className="rings-row">
                                                <div className="ring-item"><div className="ring"></div><span>CODE</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>DEBUG</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>DEPLOY</span></div>
                                            </div>
                                            <h2 className="ux-title">BUILD SKILLS THROUGH REAL PROJECTS</h2>
                                            <ul className="ux-list">
                                                <li>Practice Coding Inside the Live IDE</li>
                                                <li>Work on Realistic Project Scenarios</li>
                                                <li>Strengthen Logic With Guided Tasks</li>
                                                <li>Learn By Doing in Every Module</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SLIDE 5 – In-Demand Skills */}
                        <div className="carousel-item">
                            <div className="carousel-caption custom-caption">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="caption-box">
                                            <h2 className="h1">
                                                Master the art <br />
                                                of <span className="highlight">In-Demand Skills</span>
                                            </h2>
                                            <p>Learn today’s top technologies, upgrade your talent, and stay ahead.</p>
                                            <div className="btn-group d-flex">
                                                <button className="syllabus-btn">Syllabus</button>
                                                <button className="viewmore-btn">View More</button>
                                            </div>
                                            <div className=" d-none d-lg-block">
                                                <div className="uiux-process-box mt-3">
                                                    <h2 className="ux-title">STAY AHEAD IN YOUR CAREER</h2>
                                                    <ul className="ux-list">
                                                        <li>Learn The Most Demanded Skills</li>
                                                        <li>Gain Expertise In Trending Tools</li>
                                                        <li>Enhance Job-Ready Abilities</li>
                                                        <li>Stay Competitive In The Industry</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="uiux-process-box mt-3">
                                            <div className="rings-row">
                                                <div className="ring-item"><div className="ring"></div><span>LEARN</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>APPLY</span></div>
                                                <div className="ring-item"><div className="ring"></div><span>GROW</span></div>
                                            </div>

                                            <h2 className="ux-title">UPSKILL WITH INDUSTRY-READY TOPICS</h2>
                                            <ul className="ux-list">
                                                <li>Master Trending Industry Tools</li>
                                                <li>Learn Skills Required by Employers</li>
                                                <li>Develop Practical, Job-Ready Ability</li>
                                                <li>Stay Updated With Current Trends</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <button className="carousel-control-prev" type="button"
                        data-bs-target="#velearnHomeCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon visually-hidden"></span>
                    </button>

                    <button className="carousel-control-next" type="button"
                        data-bs-target="#velearnHomeCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon visually-hidden"></span>
                    </button>
                </div>

                {/* Achievements Section */}
                <section className="counter py-5 " ref={this.counterRef}>
                    <div className="container text-center mb-5">
                        <h2 className="fw-bold">Our Achievements & Growth</h2>
                        <p className="text-muted mb-0">
                            Celebrating VeLearn’s journey of transforming education through innovation and mentorship.
                        </p>
                        <div className="row justify-content-center">
                            {counters.map((item, index) => (
                                <div className="col-lg-3 col-6 innerCounter d-flex justify-content-center py-3" key={index}>
                                    <div
                                        className="outer_progress_circle"
                                        style={{
                                            "--p": item.count
                                        }}
                                    >
                                        <div className="inner_white">
                                            <div className="counter_circle d-flex flex-column justify-content-center align-items-center">
                                                <div className="h1">
                                                    {item.count}{item.suffix}
                                                </div>
                                                <p className="mb-0">{item.label}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Progress Section */}
                <section className="pb-5 " ref={this.progressRef}>
                    <div className="container">
                        <div className="row gy-4">
                            {progress.map((p, index) => (
                                <div className="col-md-4 d-flex align-items-center" key={index}>
                                    <div className="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm w-100">
                                        <div style={{ width: 120, height: 120 }}>
                                            <CircularProgressbar
                                                value={p.current}
                                                text={`${p.current}%`}
                                                styles={buildStyles({
                                                    textColor: "#000",
                                                    pathColor: p.color,
                                                    trailColor: "#ddd",
                                                    pathTransitionDuration: 0.3,
                                                })}
                                            />
                                        </div>
                                        <div className="ms-4">
                                            <h4>{p.label}</h4>
                                            <p className="mb-0 text-muted">{p.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About VeLearn Section */}
                <section className="py-5 about-section position-relative overflow-hidden">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Left Image */}
                            <div className="col-lg-6 d-flex justify-centent-center align-items-center mb-5 mb-lg-0">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/about-1.png`}
                                    alt="About VeLearn"
                                    className="abut_image"
                                />
                            </div>

                            {/* Right Content */}
                            <div className="col-lg-6">
                                <div className="heading_wrap position-relative">
                                    <h1 className="fw-bold mb-3">About VeLearn</h1>
                                    <div className="blur_text"> HISTORY</div>
                                </div>
                                <p className="text-muted mb-4">
                                    VeLearn is an innovative e-learning platform dedicated to bridging the gap between education and employability.
                                    Our mission is to empower learners with hands-on, mentor-led programs that prepare them for real-world success.
                                </p>

                                <ul className="list-unstyled text-start">
                                    <li className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check2-circle text-primary me-2 fs-5"></i>
                                        <span>Industry-aligned programs designed by experts.</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check2-circle text-primary me-2 fs-5"></i>
                                        <span>Mentor-led sessions and guided learning paths.</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check2-circle text-primary me-2 fs-5"></i>
                                        <span>Hands-on projects to build real-world skills.</span>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <i className="bi bi-check2-circle text-primary me-2 fs-5"></i>
                                        <span>Flexible recorded and live learning modes.</span>
                                    </li>
                                </ul>

                                <button className="btn2 mt-3 px-4 py-2">Learn More About Us</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partnerships */}
                <section className="py-5">
                    <div className="container text-center">
                        <h3 className="mb-4 fw-bold">Our Collaborations & Partnerships</h3>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={5}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            grabCursor={true}
                            loop={true}
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                        >
                            {partners.map((logo, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/assets/images/partner/${logo}`}
                                        alt={`Partner ${index + 1}`}
                                        className="partner-logo img-fluid"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* VeLearn Courses Section */}
                <section className="py-5 courses-section position-relative">
                    <div className="background-shape">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-100"
                            id="Layer_1" viewBox="0 190 1400 525">
                            <path fill="#21346a"
                                d="M1350,320.5v340a40,40,0,0,1-40,40H1065a40,40,0,0,1-40-40h0a40,40,0,0,0-40-40H415a40,40,0,0,0-40,40h0a40,40,0,0,1-40,40H90a40,40,0,0,1-40-40v-420a40,40,0,0,1,40-40H660a40,40,0,0,1,40,40h0a40,40,0,0,0,40,40h570A40,40,0,0,1,1350,320.5Z"
                            >
                            </path>
                        </svg>
                    </div>
                    <div className="container position-relative z-1">
                        <div className="px-4 text-white">
                            <h3 className="h2 mb-4 fw-bold section_title">
                                Popular <br /><span className="text-c2"> Career Programs</span>
                            </h3>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={3}
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                loop={true}
                                grabCursor={true}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                            >
                                {courses.map((course, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="card course-card shadow-sm border-0 h-100 d-flex flex-column">
                                            <img
                                                src={course.img}
                                                className="card-img-top"
                                                alt={course.title}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="text-start card-title">{course.title}</h5>
                                                    <p className="text-start text-muted small mb-3">🌐 {course.lang}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mt-auto">
                                                    <button className="btn1 btn-sm">View Syllabus</button>
                                                    <button className="btn2 btn-sm">Know More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="col-12 d-flex justify-content-center">
                                <button className="btn-c1 mt-5 px-4 py-2">Explore All Courses</button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Reviews Section */}
                <section className="py-5 testimonial_sec">
                    <div className="container text-center">
                        <h3 className="fw-bold mb-4">Learner Reviews</h3>
                        <p className="text-muted mb-5">
                            Hear what our learners have to say about their VeLearn journey.
                        </p>

                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={3}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            grabCursor={true}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {[
                                {
                                    name: "Anjali R",
                                    review: "The mentors are very supportive and explain concepts clearly. I love how each topic is structured with practical examples — it really helped me understand faster.",
                                    rating: 5
                                },
                                {
                                    name: "Rohit S",
                                    review: "Thanks to VeLearn, I built my first full-stack project and even landed an internship! The guidance and real-world approach make it a great platform for learners.",
                                    rating: 5
                                },
                                {
                                    name: "Kavya P",
                                    review: "I was new to coding, but VeLearn’s courses made everything simple and fun. The step-by-step lessons and hands-on projects boosted my confidence.",
                                    rating: 4
                                },
                                {
                                    name: "Naveen K",
                                    review: "I love the practical learning style and quick mentor support. Every session feels like real teamwork, and the projects are genuinely industry-relevant.",
                                    rating: 5
                                },
                                {
                                    name: "Priya M",
                                    review: "VeLearn helped me upskill and switch careers with confidence. The courses, mentorship, and career support made a huge difference in my learning journey.",
                                    rating: 5
                                }
                            ]
                                .map((r, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="card shadow-sm border-0 h-100">
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <p className="text-muted">“{r.review}”</p>
                                                <div>
                                                    <h6 className="fw-bold mb-1">{r.name}</h6>
                                                    <div className="text-warning">
                                                        {"⭐".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </section>

                {/* Top 5 Recorded Courses Section */}
                <section className="py-5  course_slider_parent position-relative">
                    <div className="background-shape">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 1400 800">
                            <defs></defs>
                            <path fill="#15203A" className="cls-1" d="M1350,320.5v340a40,40,0,0,1-40,40H1065a40,40,0,0,1-40-40h0a40,40,0,0,0-40-40H415a40,40,0,0,0-40,40h0a40,40,0,0,1-40,40H90a40,40,0,0,1-40-40v-420a40,40,0,0,1,40-40H660a40,40,0,0,1,40,40h0a40,40,0,0,0,40,40h570A40,40,0,0,1,1350,320.5Z" />
                        </svg>
                        {/* <svg width="100%" height="100%" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                                    <feFlood floodColor="#15203A" floodOpacity="0.8" result="flood" />
                                    <feComposite in="flood" in2="blur" operator="in" result="glow" />
                                    <feMerge>
                                        <feMergeNode in="glow" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path
                                d="M 50 25 C 20 25 0 45 0 75 L 0 225 C 0 255 20 275 50 275 L 175 275 C 205 275 225 255 225 225 L 225 150 C 225 120 245 100 275 100 L 725 100 C 755 100 775 120 775 150 L 775 225 C 775 255 795 275 825 275 L 950 275 C 980 275 1000 255 1000 225 L 1000 75 C 1000 45 980 25 950 25 L 675 25 C 645 25 625 0 595 0 L 405 0 C 375 0 355 25 325 25 L 50 25 Z"
                                fill="#15203A"
                            />
                        </svg> */}
                    </div>
                    <div className="container text-center position-relative z-1">
                        <h3 className="fw-bold mb-4">Top 5 Recorded Courses</h3>
                        <p className="text-muted mb-5">
                            Learn at your own pace with our top-rated recorded programs.
                        </p>

                        {/* Tabs */}
                        <ul className="nav justify-content-center mb-4 flex-wrap">
                            {["All", "Web Development", "Data Science", "Design", "AI & ML"].map((cat, index) => (
                                <li className="nav-item mx-2 mb-lg-0 mb-3" key={index}>
                                    <button
                                        className={`px-3 py-2 tabButt ${this.state.activeTab === cat ? "tabActive" : ""}`}
                                        onClick={() => this.setState({ activeTab: cat })}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Courses Slider */}
                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            spaceBetween={30}
                            slidesPerView={1}
                            grabCursor={true}
                            loop={true}
                            breakpoints={{
                                576: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                992: { slidesPerView: 3 },
                            }}
                        >
                            {[
                                {
                                    img: `${process.env.PUBLIC_URL}/assets/images/record-class-1.jpg`,
                                    title: "Full Stack Web Development",
                                    duration: "120",
                                    students: "15k+",
                                    category: "Web Development",
                                    description: "Master frontend & backend technologies to build complete modern web apps.",
                                },
                                {
                                    img: `${process.env.PUBLIC_URL}/assets/images/record-class-2.jpg`,
                                    title: "React & Node Masterclass",
                                    duration: "100",
                                    students: "10k+",
                                    category: "Web Development",
                                    description: "Deep dive into React and Node.js to create scalable, high-performance apps.",
                                },
                                {
                                    img: `${process.env.PUBLIC_URL}/assets/images/record-class-3.jpg`,
                                    title: "Python for Data Science",
                                    duration: "80",
                                    students: "12k+",
                                    category: "Data Science",
                                    description: "Learn Python programming, data analysis, and visualization with real-world datasets.",
                                },
                                {
                                    img: `${process.env.PUBLIC_URL}/assets/images/record-class-4.jpg`,
                                    title: "AI & Machine Learning",
                                    duration: "150",
                                    students: "10k+",
                                    category: "AI & ML",
                                    description: "Understand core AI and ML concepts with hands-on model building projects.",
                                },
                                {
                                    img: `${process.env.PUBLIC_URL}/assets/images/record-class-5.jpg`,
                                    title: "UI/UX Design Fundamentals",
                                    duration: "90",
                                    students: "8k+",
                                    category: "Design",
                                    description: "Explore design principles, wireframing, and prototyping tools for user-centric design.",
                                },
                            ]
                                .filter(
                                    (c) =>
                                        this.state.activeTab === "All" ||
                                        c.category === this.state.activeTab
                                )
                                .map((course, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="card shadow-sm border-0 rounded-3 overflow-hidden h-100">
                                            <div className="card-body p-0 d-flex flex-column justify-content-between">
                                                <div className="course_card_img position-relative overflow-hidden mb-3">
                                                    <div className="class_date">
                                                        <h5 className="text-center mb-0">
                                                            <i className="bi bi-clock"></i> {course.duration} hrs
                                                        </h5>
                                                    </div>
                                                    <img src={course.img} className="w-100" alt={course.title} />
                                                </div>
                                                <div className="p-3 d-flex flex-column justify-content-between h-100">
                                                    <div>
                                                        <h5 className="fw-bold mb-2 text-start">{course.title}</h5>
                                                        <p className="text-muted small mb-2 text-start">{course.description}</p>
                                                        <p className="text-muted small mb-3 text-start">👨‍🎓 {course.students} learners</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-auto">
                                                        <button className="btn1 btn-sm">View Details</button>
                                                        <button className="btn2 btn-sm">Enroll</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="pt-5 testimonial_sec">
                    <div className="container text-center">
                        <h3 className="fw-bold mb-4">Testimonials</h3>
                        <p className="text-muted mb-5">
                            Real experiences shared by our successful learners across the globe.
                        </p>

                        <Swiper
                            className="pb-5"
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={2}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            loop={true}
                            grabCursor={true}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                            }}
                        >
                            {[
                                {
                                    name: "Aarav Mehta",
                                    title: "Software Engineer at TCS",
                                    text: "The hands-on projects gave me the confidence to tackle real-world challenges. Each module was designed to strengthen both technical and problem-solving skills.",
                                    img: `${process.env.PUBLIC_URL}/assets/images/testimonial-2.avif`,
                                },
                                {
                                    name: "Sahana V",
                                    title: "UI/UX Designer at Zoho",
                                    text: "Loved how interactive and mentor-guided the sessions were! The live design critiques and team activities really boosted my creativity and collaboration skills.",
                                    img: `${process.env.PUBLIC_URL}/assets/images/testimonial-1.avif`,
                                },
                                {
                                    name: "Vikram N",
                                    title: "Data Analyst at Cognizant",
                                    text: "Practical assignments and regular mentor feedback made learning truly effective. The projects mirrored real industry scenarios, which helped me transition smoothly into my job.",
                                    img: `${process.env.PUBLIC_URL}/assets/images/testimonial-2.avif`,
                                },
                            ].map((t, index) => (
                                <SwiperSlide key={index}>
                                    <div className="card shadow-sm border-0 h-100 testimonial-card position-relative p-4">
                                        <div className="card-body text-center mt-4">
                                            <img
                                                src={t.img}
                                                alt={t.name}
                                                className="rounded-circle mb-3"
                                                style={{ width: 80, height: 80, objectFit: "cover" }}
                                            />
                                            {/* Decorative Quote Icon */}
                                            <i
                                                className="bi bi-quote fs-1 text-primary position-absolute"
                                                style={{
                                                    top: "130px",
                                                    left: "50px",
                                                    opacity: 0.15,
                                                    fontSize: "4rem",
                                                }}
                                            ></i>
                                            <p className="text-muted fst-italic px-3" style={{ minHeight: "70px" }}>
                                                “{t.text}”
                                            </p>
                                            <h6 className="fw-bold mb-0 mt-2">{t.name}</h6>
                                            <small className="text-muted">{t.title}</small>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Know Your Trainers Section */}
                <section className="py-5 trainer_sec">
                    <div className="container text-center">
                        <h3 className="h2 fw-bold mb-2 text-white">Know Your Trainers</h3>
                        <p className="mb-5 text-white text-center">
                            Learn from certified experts and mentors with years of real-world industry experience.
                        </p>
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            loop
                            className="trainer-swiper"
                        >
                            {[
                                {
                                    name: "Rahul Krishnan",
                                    title: "Full Stack Developer | Google Certified",
                                    img: `https://business.udemy.com/wp-content/uploads/2022/12/presentation-skills-for-leaders-1900x600-1.jpg`,
                                    cert: "Full Stack Development Certification",
                                    desc: "Rahul has over 10 years of experience in building scalable web applications and mentoring aspiring developers across India. He has worked with multiple enterprise-level projects, mastering both front-end and back-end technologies. His sessions focus on writing clean, efficient code and understanding the complete software development life cycle from design to deployment.",
                                },
                                {
                                    name: "Sneha Raj",
                                    title: "Data Scientist | IBM Certified",
                                    img: `https://business.udemy.com/wp-content/uploads/2022/12/presentation-skills-for-leaders-1900x600-1.jpg`,
                                    cert: "Data Science Professional Certificate",
                                    desc: "Sneha specializes in machine learning, artificial intelligence, and data analytics. With a strong background in statistics and business intelligence, she has helped several organizations unlock the power of data-driven decision-making. Her interactive teaching style ensures students not only learn theory but also gain hands-on experience with real-world datasets and tools like Python, R, and Power BI.",
                                },
                                {
                                    name: "Arun Prakash",
                                    title: "UI/UX Expert | Adobe Certified",
                                    img: `https://business.udemy.com/wp-content/uploads/2022/12/presentation-skills-for-leaders-1900x600-1.jpg`,
                                    cert: "Adobe UX Design Certification",
                                    desc: "Arun’s sessions focus on practical design thinking and portfolio-based learning to prepare learners for real-world UX challenges. He brings over 8 years of experience designing user-friendly digital products for startups and enterprises alike. With a deep understanding of user psychology, prototyping, and usability testing, Arun inspires students to think beyond aesthetics and build designs that truly connect with users.",
                                },

                            ].map((trainer, index) => (
                                <SwiperSlide key={index}>
                                    <div className="trainer-card shadow-sm rounded-4 bg-white p-4 text-md-start text-center mx-auto" style={{ maxWidth: "900px" }}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                {/* Trainer Image */}
                                                <div className="trainer-img mb-3 mb-md-0 me-md-4">
                                                    <img
                                                        src={trainer.img}
                                                        alt={trainer.name}
                                                        className="rounded-4"
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                {/* Trainer Info */}
                                                <div className="trainer-info">
                                                    <h5 className="fw-bold mb-1">{trainer.name}</h5>
                                                    <p className="text-muted small mb-1">{trainer.title}</p>
                                                    <p className="text-primary small mb-2">
                                                        <i className="bi bi-patch-check-fill me-1"></i>
                                                        {trainer.cert}
                                                    </p>
                                                    <p className="small text-muted mb-0">{trainer.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>


                {/* Hiring Partners Section */}
                <section className="py-5">
                    <div className="container text-center">
                        <h3 className="fw-bold mb-4">Our Hiring Partners</h3>
                        <p className="text-muted mb-5">
                            VeLearn graduates are trusted and hired by top companies across the globe.
                        </p>

                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={5}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            loop={true}
                            grabCursor={true}
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                        >
                            {[
                                "aicte.webp",
                                "anna-university-chennai.webp",
                                "autodesk.webp",
                                "google-for-education.webp",
                                "iit-delhi.webp",
                                "iit-kanpur.webp",
                                "iitm-pravartak.webp",
                                "iit-ropar.webp",
                                "itt-gandhinagar.webp",
                                "naan-mudhalvan.webp",
                                "nasscom.webp",
                                "nsdc.webp",
                                "skill-development.webp",
                                "swayam-plus.webp",
                            ].map((logo, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/assets/images/partner/${logo}`}
                                        alt={`Hiring Partner ${index + 1}`}
                                        className="partner-logo img-fluid"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* About Practice Section */}
                <section
                    className="py-5"
                    style={{
                        background: "linear-gradient(180deg, #f9fafb 0%, #eef1f5 100%)",
                    }}
                >
                    <div className="container text-center">
                        <h3 className="fw-bold mb-4">About Practice</h3>
                        <p className="text-muted mb-5">
                            Practice is the heart of VeLearn’s methodology — empowering learners to apply, experiment, and master every skill through hands-on experience.
                        </p>

                        <div className="row align-items-center">
                            {/* Left Side - Image */}
                            <div className="col-lg-6 mb-4 mb-lg-0 d-flex justify-content-center">
                                <div
                                    className="shadow-lg rounded-4 overflow-hidden border border-light"
                                    style={{
                                        maxWidth: "520px",
                                        backgroundColor: "#1e1e1e",
                                    }}
                                >
                                    {/* Optional Top Bar - Simulates IDE window buttons */}
                                    <div
                                        className="d-flex align-items-center px-3 py-2"
                                        style={{
                                            background: "#2d2d2d",
                                            borderBottom: "1px solid #444",
                                        }}
                                    >
                                        <span
                                            className="me-2"
                                            style={{
                                                width: "12px",
                                                height: "12px",
                                                background: "#ff5f56",
                                                borderRadius: "50%",
                                                display: "inline-block",
                                            }}
                                        ></span>
                                        <span
                                            className="me-2"
                                            style={{
                                                width: "12px",
                                                height: "12px",
                                                background: "#ffbd2e",
                                                borderRadius: "50%",
                                                display: "inline-block",
                                            }}
                                        ></span>
                                        <span
                                            style={{
                                                width: "12px",
                                                height: "12px",
                                                background: "#27c93f",
                                                borderRadius: "50%",
                                                display: "inline-block",
                                            }}
                                        ></span>
                                    </div>

                                    <img
                                        src="https://blog.stratifylabs.dev/images/atom-screen-shot.png"
                                        alt="Practice at VeLearn"
                                        className="img-fluid w-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </div>

                            {/* Right Side - Text */}
                            <div className="col-lg-6 text-start">
                                <h5 className="fw-bold mb-3">Why Practice Matters?</h5>
                                <ul className="list-unstyled fs-6">
                                    <li className="mb-3 d-flex">
                                        <i className="bi bi-check-circle text-primary me-2"></i>
                                        Apply concepts in real-time coding exercises inside a live editor.
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="bi bi-check-circle text-primary me-2"></i>
                                        Get instant mentor feedback and debugging help.
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="bi bi-check-circle text-primary me-2"></i>
                                        Strengthen skills through guided challenges and project tasks.
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <i className="bi bi-check-circle text-primary me-2"></i>
                                        Track your learning journey with progress dashboards.
                                    </li>
                                </ul>
                                <button className="btn2 mt-3 px-4 py-2">Start Practicing</button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default HomePage;
