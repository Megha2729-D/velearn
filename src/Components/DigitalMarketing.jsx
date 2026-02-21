import { Component, createRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "./Styles/DigitalMarketing.css"

import "swiper/css";
import "swiper/css/effect-coverflow";

class DigitalMarketing extends Component {
    constructor(props) {
        super(props);
        this.swiperRef = null;
        this.state = {
            activeIndex: 0,
            activeTab: 1,
            contentLeft: 0,
            activeToolName: "",
            activeShadow: "",
            activeFaqIndex: 0,
            activePriceTab: 0,
        };

        this.tabRefs = [1, 2, 3, 4, 5].map(() => createRef());
    }

    componentDidMount() {
        /* Auto-select first tab */
        if (this.tabRefs[0]?.current) {
            this.tabRefs[0].current.click();
        }

        this.initTestimonialStack();
    }

    componentWillUnmount() {
        clearInterval(this.stackAutoPlay);
    }

    handleSlideChange = (swiper) => {
        // Only update if it actually changed
        if (this.state.activeSlide !== swiper.realIndex) {
            this.setState({ activeSlide: swiper.realIndex });
        }
    };
    plans = [
        {
            title: "Full Stack Unlimited Access Plan",
            oldPrice: "₹50,000",
            newPrice: "₹15,000",
            features: [
                "Lifetime Material Access",
                "Portfolio-Ready Projects",
                "Mentor-Led Support",
                "Structured Full Stack Roadmap",
                "Career & Placement Guidance",
                "Certificate Of Completion",
            ],
        },
        {
            title: "Frontend Unlimited Access Plan",
            oldPrice: "₹50,000",
            newPrice: "₹15,000",
            features: [
                "Lifetime Material Access",
                "Portfolio-Ready Projects",
                "Mentor-Led Support",
                "Structured Frontend Roadmap",
                "Career & Placement Guidance",
                "Certificate Of Completion",
            ],
        },
    ];
    tools = [
        { name: "React", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/react.png`, shadow: "#61DAFB" },
        { name: "CSS", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/css.png`, shadow: "#2965F1" },
        { name: "Express JS", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/express-js.png`, shadow: "#F3DF1D" },
        { name: "Visual Studio", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/vs-code.png`, shadow: "#0080CF" },
        { name: "SQL", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/sql.png`, shadow: "#D08001" },
        { name: "Bootstrap", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/bootstrap.png`, shadow: "#7952B3" },
        { name: "Mongo DB", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/mongodb.png`, shadow: "#9EFF3E" },
        { name: "Tailwind", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/tailwind.png`, shadow: "#38BDF8" },
        { name: "Python", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/python.png`, shadow: "#DE6B00" },
        { name: "Spring Boot", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/spring-boot.png`, shadow: "#6DB33F" },
        { name: "HTML", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/html.png`, shadow: "#E44D26" },
        { name: "Django", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/django.png`, shadow: "#304F44" },
    ];
    slidePrev = () => {
        if (this.swiperRef) {
            this.swiperRef.slidePrev();
        }
    };

    slideNext = () => {
        if (this.swiperRef) {
            this.swiperRef.slideNext();
        }
    };
    renderContent() {
        const { activeTab } = this.state;

        const content = {
            1: {
                title: "Foundations of Full Stack Development",
                points: [
                    "How the web works (Client–Server architecture)",
                    "Frontend vs Backend vs Database",
                    "Developer tools & workflow",
                    "Introduction to Git & GitHub"
                ]
            },
            2: {
                title: "Frontend Development",
                points: [
                    "HTML, CSS, JavaScript",
                    "Responsive UI & Grid Systems",
                    "React.js Fundamentals",
                    "State Management"
                ]
            },
            3: {
                title: "Backend Development",
                points: [
                    "Node.js & Express.js",
                    "REST APIs",
                    "Authentication & Authorization",
                    "Error Handling & Middleware"
                ]
            },
            4: {
                title: "Database & Deployment",
                points: [
                    "MongoDB / SQL Basics",
                    "Data Modeling & Queries",
                    "Cloud Deployment",
                    "CI/CD & Environment Variables"
                ]
            },
            5: {
                title: "Capstone & Job Preparation",
                points: [
                    "Real-World Project",
                    "Version Control",
                    "Resume & Portfolio",
                    "Mock Interviews"
                ]
            }
        };

        return content[activeTab];
    }

    initTestimonialStack = () => {
        this.stacks = []; // store stacks for autoplay

        const sliderImagesBox = document.querySelectorAll(".cards-box");

        sliderImagesBox.forEach((el) => {
            const imageNodes = el.querySelectorAll(".card:not(.hide)");

            let arrIndexes = [...imageNodes].map((_, i) => i);

            const setIndex = () => {
                imageNodes.forEach((img, i) => {
                    img.dataset.slide = arrIndexes[i];
                });
            };

            const rotate = () => {
                arrIndexes.unshift(arrIndexes.pop());
                setIndex();
            };

            // click rotate
            el.addEventListener("click", rotate);

            // store for autoplay
            this.stacks.push(rotate);

            setIndex();
        });

        // autoplay stack change
        this.stackAutoPlay = setInterval(() => {
            this.stacks.forEach((rotate) => rotate());
        }, 4000);
    };


    advantages = [
        { title: "Code with Clarity", text: "We break complex concepts into simple, practical steps you can actually apply.", color: "#FF0000" },
        { title: "Build Real Projects", text: "Work on real-world applications instead of toy examples.", color: "#00A2FF" },
        { title: "Structured Learning", text: "Step-by-step learning path designed for real developer jobs.", color: "#FF9500" },
        { title: "Live Mentorship", text: "Get support & answers from industry professionals in real-time.", color: "#36C66B" },
        { title: "Job Readiness", text: "Improve portfolio, resume & interview confidence.", color: "#7D33F0" },
        { title: "Community Support", text: "Learn with peers through groups, discussions & hackathons.", color: "#FF2EB2" },
    ];

    faqData = [
        {
            question: "Who is this Live Full Stack course designed for?",
            answer: (
                <>
                    <p>
                        This course is designed for students, freshers, career switchers, and working professionals who want to learn full stack development through live training, gain real-world project experience, become job-ready developers with strong practical skills, and build a professional portfolio for interviews and receive career and placement guidance.
                    </p>
                </>
            )
        },
        {
            question: "Do I need prior coding experience to join this course?",
            answer: (
                <>
                    <p>No. You do not need any prior coding experience to join this course.</p>
                    <p>
                        Our training starts from the basics and gradually moves toward advanced concepts.
                        Beginners, students, and non-IT professionals can easily learn.
                    </p>
                    <p>
                        For those who already have some coding knowledge, we provide fast-track options,
                        challenging tasks, and advanced modules to match your skill level.
                    </p>
                </>
            )
        },
        {
            question: "What kind of projects will I work on?",
            answer: (
                <>
                    <p>
                        You will work on real-time, industry-relevant projects based on the specific course
                        you choose. These projects help you build strong practical skills and a job-ready portfolio.
                    </p>
                    <p>Example project types include:</p>
                    <ul>
                        <li>Web and mobile application development</li>
                        <li>API & backend systems</li>
                        <li>Data visualization dashboards</li>
                        <li>Machine learning mini-projects</li>
                        <li>Cloud deployment & automation tasks</li>
                    </ul>
                    <p>
                        At the end of the course, you will also complete a capstone project to showcase your skills.
                    </p>
                </>
            )
        },
        {
            question: "Will this course help me get a job?",
            answer: (
                <>
                    <p>Yes. This course is designed to make you job-ready through:</p>
                    <ul>
                        <li>Practical training & real-world projects</li>
                        <li>Portfolio and resume development</li>
                        <li>Interview preparation & mock interviews</li>
                        <li>Placement support & company referrals</li>
                    </ul>
                    <p>
                        Many students start as interns, junior developers, analysts, or IT support roles depending
                        on their course. Our placement team helps you throughout the job application process.
                    </p>
                </>
            )
        }
    ];

    toggleFaq = (index) => {
        this.setState({
            activeFaqIndex:
                this.state.activeFaqIndex === index ? null : index
        });
    };
    render() {
        const { activeTab, activePriceTab, activeSlide } = this.state;
        const currentContent = this.renderContent();
        const plan = this.plans[activePriceTab];
        // const tools = [
        //     { name: "React", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/react.png`, shadow: "#61DAFB" },
        //     { name: "CSS", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/css.png`, shadow: "#2965F1" },
        //     { name: "Express JS", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/express-js.png`, shadow: "#F3DF1D" },
        //     { name: "Visual Studio", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/vs-code.png`, shadow: "#0080CF" },
        //     { name: "SQL", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/sql.png`, shadow: "#D08001" },
        //     { name: "Bootstrap", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/bootstrap.png`, shadow: "#7952B3" },
        //     { name: "Mongo DB", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/mongodb.png`, shadow: "#9EFF3E" },
        //     { name: "Tailwind", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/tailwind.png`, shadow: "#38BDF8" },
        //     { name: "Python", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/python.png`, shadow: "#DE6B00" },
        //     { name: "Spring Boot", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/spring-boot.png`, shadow: "#6DB33F" },
        //     { name: "HTML", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/html.png`, shadow: "#E44D26" },
        //     { name: "Django", logo: `${process.env.PUBLIC_URL}/assets/images/details-page/tools/django.png`, shadow: "#304F44" },
        // ];
        const testimonials = [
            {
                image: "student-1.png",
                name: "Vijay",
                text: "The live sessions were practical and easy to follow. I can confidently plan and run real digital marketing campaigns now.",
                colorOne: "#FFA700",
                colorTwo: "#73737300",
            },
            {
                image: "student-2.png",
                name: "Shalini",
                text: "The live sessions were practical and easy to follow. I can confidently plan and run real digital marketing campaigns now.",
                colorOne: "#FF974B",
                colorTwo: "#73737300",
            },
            {
                image: "student-3.png",
                name: "Surya",
                text: "The live sessions were practical and easy to follow. I can confidently plan and run real digital marketing campaigns now.",
                colorOne: "#354A63",
                colorTwo: "#73737300",
            },
            {
                image: "student-4.png",
                name: "Neha Singh",
                text: "The live sessions were practical and easy to follow. I can confidently plan and run real digital marketing campaigns now.",
                colorOne: "#FFFFFF",
                colorTwo: "#73737300",
            },
        ];
        const sliderTestimonalData = [...testimonials, ...testimonials];

        return (
            <>
                <div className="dm_main pb-1">
                    <div className="bg-white dm_top_sec">
                        <div className="digital_marketing_banner pb-5">
                            <div className="section_container">
                                <div className="row justify-content-between">
                                    <div className="col-lg-7">
                                        <div className="banner_left_dm">
                                            <h1 className="fw-bold text-white">
                                                Future-Proof <span className="text-c2">Your Career</span> with Live Digital Marketing Training
                                            </h1>
                                            <p className="text-white mt-4">
                                                This live Digital Marketing training program is designed to build job-ready skills through hands-on campaign execution, real-time tools, and expert mentorship— preparing you for high-growth roles in today’s digital economy.
                                            </p>
                                            <button>Enroll Now</button>
                                            <div className="pagination_parent d-lg-flex d-none">
                                                <Link to={"/"}>Home</Link>
                                                <span className="px-2"> /</span>
                                                <Link to={"/recorded-course"}> Live courses </Link>
                                                <span className="px-2">/</span>
                                                <Link to={"/course-details"}> Digital Marketing</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-5 mt-5 mt-lg-0 position-relative">
                                        <form action="#">
                                            <div className="d-flex flex-column w-100 my-3">
                                                <label for="name">Name</label>
                                                <input type="text" name="name" id="name" />
                                            </div>
                                            <div className="d-flex flex-column w-100 my-3">
                                                <label for="phone">Phone Number</label>
                                                <input type="number" name="phone" id="phone" />
                                            </div>
                                            <div className="d-flex flex-column w-100 my-3">
                                                <label for="email">Email</label>
                                                <input type="email" name="email" id="email" />
                                            </div>
                                            <div className="d-flex justify-content-center mb-3">
                                                <button>Send</button>
                                            </div>
                                        </form>
                                        <div className="pagination_parent mt-5 d-lg-none d-flex justify-content-center">
                                            <Link to={"/"}>Home</Link>
                                            <span className="px-2"> /</span>
                                            <Link to={"/recorded-course"}> Recorded courses </Link>
                                            <span className="px-2">/</span>
                                            <Link to={"/course-details"}> Data Science in English</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="banner_details">
                            <div className="section_container">
                                <div className="col-12 d-flex justify-content-start">
                                    <div className="col-lg-12">
                                        <div className="ms-lg-5 ms-2 py-3">
                                            <div className="row text-center">
                                                <div className="col-6 col-lg-3 my-3 my-lg-0 banner_details_list d-flex justify-content-center border border-0">
                                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                                        <p className="fw-bold mb-1 text-center">Expert</p>
                                                        <p className="mb-0 text-center">Mentorship</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 my-3 my-lg-0 banner_details_list d-flex justify-content-center border border-0">
                                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                                        <p className="fw-bold mb-1 text-center">10+ Real Time</p>
                                                        <p className="mb-0 text-center">Projects</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 my-3 my-lg-0 banner_details_list d-flex justify-content-center border border-0">
                                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                                        <p className="fw-bold mb-1 text-center">Placement</p>
                                                        <p className="mb-0 text-center">Assistance</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 my-3 my-lg-0 banner_details_list d-flex justify-content-center border border-0">
                                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                                        <p className="fw-bold mb-1 text-center">Life Time</p>
                                                        <p className="mb-0 text-center">Community Access</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="why_dm_sec py-4">
                            <div className="section_container">
                                <h3 className="text-center fw-bold text-white">Why UI/UX Design Is a Beginner-Friendly Career</h3>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-lg-8">
                                        <div className="row">
                                            <div className="col-lg-4 my-3">
                                                <div className="why_dm_sub">
                                                    <p>Businesses depend on digital growth strategies</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 my-3">
                                                <div className="why_dm_sub">
                                                    <p>Practical skills with real-world applications</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 my-3">
                                                <div className="why_dm_sub">
                                                    <p>Careers driven by results and performance</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 my-3">
                                                <div className="why_dm_sub">
                                                    <p>Work with brands across multiple industries</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 my-3">
                                                <div className="why_dm_sub">
                                                    <p>Faster skill-to-income conversion</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 my-3">
                                                <div className="why_dm_sub">
                                                    <p>Evolving field with constant opportunities</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dm_single_sec">
                        <div className="dm_overview">
                            <div className="section_container">
                                <div className="py-4">
                                    <h3 className="text-black fw-bold text-center"> Course <span className="text-c2">Overview</span></h3>
                                    <p className="text-center px-lg-4">
                                        This Digital Marketing course is designed to build a strong foundation with practical, job-ready skills needed in today’s digital-driven business world. The program covers key areas such as SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, and Analytics. Through live instructor-led classes and hands-on campaign practice, learners gain real-world experience using industry tools. The course focuses on performance, data-based decision-making, and practical application to help participants confidently manage digital campaigns and prepare for various digital marketing career roles.
                                    </p>
                                </div>
                                <div className="pb-5">
                                    <h3 className="text-black text-center fw-bold">Step Into a High-Growth
                                        <span className="text-c2"> Digital Marketing Career</span>
                                    </h3>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                            <div className="dm_steps">
                                                <div className="dm_steps_sub dm_step_one my-4">
                                                    <div></div>
                                                    <p>Master in-demand digital marketing channels and tools</p>
                                                </div>
                                                <div className="dm_steps_sub dm_step_two my-4">
                                                    <div></div>
                                                    <p>Work on live campaigns with expert-led guidance</p>
                                                </div>
                                                <div className="dm_steps_sub dm_step_three my-4">
                                                    <div></div>
                                                    <p>Gain hands-on experience through real business case studies</p>
                                                </div>
                                                <div className="dm_steps_sub dm_step_four my-4">
                                                    <div></div>
                                                    <p>Learn performance tracking, optimization, and ROI measurement</p>
                                                </div>
                                            </div>
                                            <button>Start Learning</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-5 dm_skills">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-11">
                                            <h3 className="text-black text-center fw-bold">Build the Skills <span className="text-c2">Behind Digital Success</span></h3>
                                            <p className="text-center">Develop powerful digital skills through practical, performance-based learning.</p>
                                            <div className="row mt-4">
                                                <div className="col-lg-4 my-4 px-4">
                                                    <div className="dm_skils_sub rounded-4">
                                                        <p className="mb-0 p-3 text-center text-black">Search Engine Optimization (SEO)</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-4 px-4">
                                                    <div className="dm_skils_sub rounded-4">
                                                        <p className="mb-0 p-3 text-center text-black">Google Ads & Paid Campaigns</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-4 px-4">
                                                    <div className="dm_skils_sub rounded-4">
                                                        <p className="mb-0 p-3 text-center text-black">Content Marketing Strategy</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-4 px-4">
                                                    <div className="dm_skils_sub rounded-4">
                                                        <p className="mb-0 p-3 text-center text-black">Email & Marketing Automation</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-4 px-4">
                                                    <div className="dm_skils_sub rounded-4">
                                                        <p className="mb-0 p-3 text-center text-black">Analytics & Performance Tracking</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-4 px-4">
                                                    <div className="dm_skils_sub rounded-4">
                                                        <p className="mb-0 p-3 text-center text-black">Conversion Optimization</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white pt-0 dm_single_sec bg-white">
                    <div className="dm_tools py-5">
                        <div className="section_container">
                            <div className="row w-100 m-auto justify-content-center">
                                <div className="col-12">
                                    <h3 className="text-white text-center fw-bold">Tools That
                                        <span className="text-c2"> Power Digital Marketing</span>
                                    </h3>
                                    <p className="text-center text-white">
                                        Gain practical experience using professional marketing tools.
                                    </p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-10">
                                        <div className="col-12 position-relative">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/live-course/digital-marketing/dm-logo.png`} className="w-100" alt="" />
                                            <div className="dm_tools_center"><h5 className="text-black mb-0 text-center text-uppercase">Digital Marketing</h5></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dm_path mt-2">
                        <div className="section_container py-5">
                            <div className="pb-5">
                                <h3 className="text-black text-center fw-bold px-3 lh-sm">
                                    A Structured Path to Master <span className="text-c2"> Digital Marketing</span>
                                </h3>
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <p className="text-black text-center px-lg-5">
                                            Each module at Velearn focuses on practical skills to prepare you for real jobs.
                                        </p>
                                    </div>
                                </div>

                                <div className="tabs-wrapper" ref={(el) => (this.tabsWrapperRef = el)}>
                                    <div className="tabs">
                                        {[1, 2, 3, 4, 5].map((num, index) => (
                                            <button
                                                key={num}
                                                ref={this.tabRefs[index]}
                                                className={`tab ${activeTab === num ? "active" : ""}`}
                                                onClick={() => {
                                                    const tabEl = this.tabRefs[index].current;
                                                    const tabRect = tabEl.getBoundingClientRect();
                                                    const wrapperRect = this.tabsWrapperRef.getBoundingClientRect();

                                                    const centerX = tabRect.left + tabRect.width / 2;
                                                    const relativeLeft = centerX - wrapperRect.left;

                                                    this.setState({ activeTab: num, contentLeft: relativeLeft });
                                                }}
                                            >
                                                Module {num}
                                            </button>
                                        ))}
                                    </div>
                                    <div
                                        className="tab-indicator"
                                        style={{
                                            position: "absolute",
                                            top: "45px",
                                            left: `${this.state.contentLeft}px`,
                                            transform: "translateX(-50%)"
                                        }}
                                    />
                                    <div
                                        className="tab-content-box positioned"
                                        style={{
                                            position: "absolute",
                                            top: "70px",
                                            left: `${this.state.contentLeft}px`,
                                            transform: "translateX(-50%)"
                                        }}
                                    >
                                        <h6 className="mb-3">{currentContent.title}</h6>
                                        <ul>
                                            {currentContent.points.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                        {/* <div className="col-12 d-flex justify-content-end">
                                            <div className="download_icon"><i className="bi bi-download text-white"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="my-5 dm_ways_main">
                                <div className="row w-100 m-auto justify-content-center">
                                    <div className="col-lg-7">
                                        <h3 className="text-black text-center fw-bold">
                                            A Smarter Way to
                                            <span className="text-c2"> Master Digital Marketing</span> At
                                            <span className="text-c2"> Velearn</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 ">
                                        <div className="col-lg-10">
                                            <div className="d-flex dm_way_points_card_parent justify-content-between">
                                                <div className="dm_way_points_parent my-3 d-flex justify-content-lg-start justify-content-center">
                                                    <div className="dm_way_points">
                                                        <h6>Hands-On Learning That Builds Real Skills</h6>
                                                        <p className="mb-0">
                                                            Every topic is delivered through practical exercises, live demos, and real campaign-style execution
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="dm_way_points_parent my-3 d-flex justify-content-lg-start justify-content-center">
                                                    <div className="dm_way_points">
                                                        <h6>Real-World Campaign Exposure</h6>
                                                        <p className="mb-0">
                                                            Work on practical assignments that reflect how brands generate traffic, leads, and conversions in the real market.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="dm_way_points_parent my-3 d-flex justify-content-lg-start justify-content-center">
                                                    <div className="dm_way_points">
                                                        <h6>Job-Ready Resume Development</h6>
                                                        <p className="mb-0">
                                                            Build a resume that highlights campaign results, tools handled, and practical marketing experience, not just course names.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className="col-lg-10">
                                            <div className="d-flex dm_way_points_card_parent justify-content-between">
                                                <div className="dm_way_points_parent my-3 d-flex flex-column justify-content-lg-end justify-content-center">
                                                    <div className="dm_way_points">
                                                        <h6>Hands-On Learning That Builds Real Skills</h6>
                                                        <p className="mb-0">
                                                            Every topic is delivered through practical exercises, live demos, and real campaign-style execution
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="dm_way_points_parent my-3 d-flex flex-column justify-content-lg-end justify-content-center">
                                                    <div className="dm_way_points">
                                                        <h6>Real-World Campaign Exposure</h6>
                                                        <p className="mb-0">
                                                            Work on practical assignments that reflect how brands generate traffic, leads, and conversions in the real market.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="dm_way_points_parent my-3 d-flex flex-column justify-content-lg-end justify-content-center">
                                                    <div className="dm_way_points">
                                                        <h6>Job-Ready Resume Development</h6>
                                                        <p className="mb-0">
                                                            Build a resume that highlights campaign results, tools handled, and practical marketing experience, not just course names.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button>Start Learning</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dm_skills_main py-5">
                        <div className="section_container pb-5">
                            <div className="row justify-content-center">
                                <h3 className="text-center fw-bold text-white">Turn
                                    <span className="text-c2"> Digital Skills</span> into In-Demand
                                    <span className="text-c2"> Job Roles</span>
                                </h3>
                                <div className="col-lg-7">
                                    <p className="text-center text-white">Explore multiple career paths where businesses actively hire digital marketers with practical, job-ready skills.</p>
                                </div>
                                <div className="col-12">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4">
                                            <div className="d-flex dm_skill_path">
                                                <div className="row justify-content-center w-100 m-auto">
                                                    <div className="cards-box">
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹8 LPA</div>
                                                                <p className="h4">Full-Time Roles</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">Digital Marketing Executive</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">SEO Executive / SEO Analyst</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">Social Media Marketing Specialist</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">Performance Marketing Executive</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">Content Marketing Specialist</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">Email Marketing Specialist</p>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="h4">₹3 LPA – ₹7 LPA</div>
                                                                <p className="h4">Overall Average Salary Range</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div className="row pt-5 w-100 m-auto">
                                <h3 className="text-center fw-bold text-white">
                                    <span className="text-c2"> Learning</span> Experiences Shared by
                                    <span className="text-c2"> Our Students</span>
                                </h3>
                                <div className="testimonial_section pb-0">
                                    <Swiper
                                        modules={[Autoplay]}
                                        loop={true}
                                        centeredSlides={true}
                                        slidesPerView={3.5}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                        breakpoints={{
                                            320: { slidesPerView: 1, },
                                            576: { slidesPerView: 2, },
                                            992: { slidesPerView: 3.5 },
                                            1200: { slidesPerView: 3.5 },
                                        }}
                                    >

                                        {sliderTestimonalData.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="dm_testimonial_card position-relative"
                                                    style={{
                                                        background: `linear-gradient(90deg, ${item.colorOne} 0%, ${item.colorTwo} 100%)`,
                                                    }}
                                                >
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course/digital-marketing/testimonial/${item.image}`} alt={item.name} />
                                                    <div>
                                                        <p className="testimonial_text text-center">
                                                            {item.text}
                                                        </p>
                                                        <h4>{item.name}</h4>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                    </div>
                    <div className="dm_from_start_sec">
                        <div className="from_start_sec py-5">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <h3 className="text-black text-center fw-bold px-3 lh-sm">
                                            A Smart <span className="text-c2"> Learning Journey </span>That Leads to <span className="text-c2"> Real Careers</span>
                                        </h3>
                                    </div>
                                </div>

                                <div className="journey_wrap position-relative">
                                    <div className="journey_bg_icon"></div>
                                    <div className="dotted_lines">
                                        <div className="position-relative d-flex justify-content-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/dotted-lines.png`} className="dotted-line-img" alt="" />
                                        </div>
                                    </div>
                                    <div className="rocket_wrap">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/rocket.png`} className="rocket_img" alt="" />
                                    </div>
                                    <div className="journey_item item_1">
                                        <div className="parent">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/step-1.png`} alt="" />
                                            <div>
                                                <h6>Free Career Discussion</h6>
                                                <p>Connect with experts to choose the right career and course.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="journey_item item_2">
                                        <div className="parent">
                                            <div>
                                                <h6>Live Trainer-Led Classes</h6>
                                                <p>Clear learning path from foundation to expertise.</p>
                                            </div>
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/step-2.png`} alt="" />
                                        </div>
                                    </div>

                                    <div className="journey_item item_3">
                                        <div className="parent">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/step-3.png`} alt="" />
                                            <div>
                                                <h6>Hands-on Projects & Practice</h6>
                                                <p>Every topic includes assignments and real-world projects to build strong, job-ready skills.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="journey_item item_4">
                                        <div className="parent">
                                            <div>
                                                <h6>Resume & Portfolio Building</h6>
                                                <p>We shape your skills into resumes, portfolios, and interview success.</p>
                                            </div>
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/step-4.png`} alt="" />
                                        </div>
                                    </div>

                                    <div className="journey_item item_5">
                                        <div className="parent">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/journey/step-5.png`} alt="" />
                                            <div>
                                                <h6>End-to-End Placement Support</h6>
                                                <p>Train with mock interviews and learn to answer with confidence. Career support that stays until you get hired.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section_container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <h3 className="text-black text-center fw-bold px-3 lh-sm">
                                        A <span className="text-c2"> Certification</span> That Reflects What You Can Do
                                    </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-10 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 d-flex flex-column justify-content-center">
                                            <div className="mb-2">
                                                <h5 className="text-black fw-bold mb-3">Design Skill–Verified Certification</h5>
                                                <p className="text-black mb-4"> This certification validates your UI thinking, user research, wireframing, and visual design skills — proven through real design tasks and projects.</p>
                                            </div>
                                            <div className="mb-2">
                                                <h5 className="text-black fw-bold mb-3">Globally Relevant Design Credential</h5>
                                                <p className="text-black mb-4">Showcase your UI/UX expertise with a certificate aligned to modern design standards, valued by startups and product teams worldwide.</p>
                                            </div>
                                            <div className="mb-2">
                                                <h5 className="text-black fw-bold mb-3">Portfolio & Career Booster</h5>
                                                <p className="text-black mb-4">More than a certificate — this strengthens your portfolio, resume, and interviews, helping you stand out as a job-ready UI/UX designer.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                            <div className=" d-flex align-items-center justify-content-center">
                                                <div className="col-lg-10">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/certificate.jpg`} className="w-100 rounded-5" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-5 price_section_parent_top position-relative top-0">
                            <div className="text-center d-flex justify-content-center">
                                <div className="row w-100 justify-content-center">
                                    <div className="col-lg-6 mt-4 d-flex justify-content-center ">
                                        <div className="parent_price">
                                            <div className="price_section d-flex flex-column align-items-center justify-content-center px-2 px-lg-4 py-4">
                                                {/* PRICE TABS */}
                                                <h3 className="fw-bold mb-3 text-white px-3 px-lg-0">Full Stack Unlimited Access Plan</h3>

                                                <div className="d-flex justify-content-center align-items-center gap-3 mb-4 price_header">
                                                    <div className="price_tab old_price_tab">
                                                        <div className="butt">
                                                            <s>₹50,000</s>
                                                        </div>
                                                    </div>

                                                    <div className="price_tab new_price_tab active">
                                                        <div className="butt">
                                                            ₹15,000/-
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* CONTENT BOX */}
                                                <div className="price_card w-100 text-white">

                                                    <div className="row w-100 m-auto text-start">
                                                        <div className="col-6">
                                                            <ul className="list-unstyled">
                                                                <li>• Lifetime Material Access</li>
                                                                <li>• Portfolio-Ready Projects</li>
                                                                <li>• Mentor-Led Support</li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-6">
                                                            <ul className="list-unstyled">
                                                                <li>• Structured Full Stack Roadmap</li>
                                                                <li>• Career & Placement Guidance</li>
                                                                <li>• Certificate Of Completion</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <button className="mt-3">
                                                        Apply Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="faq_section pb-5">
                            <div className="section_container p-xl text-center mt-lg-5">
                                <h3 className="section_base_heading">
                                    Frequently Asked <span className="text-c2"> Questions</span>
                                </h3>

                                <div className="row mt-5 justify-content-center align-items-center">
                                    {/* FAQ Accordion */}
                                    <div className="col-lg-9 text-start">
                                        {this.faqData.map((item, index) => (
                                            <div className={`faq_item mb-3  ${this.state.activeFaqIndex === index ? "active" : ""
                                                }`} key={index}>
                                                <button
                                                    className={`faq_question justify-content-between ${this.state.activeFaqIndex === index ? "active" : ""
                                                        }`}
                                                    onClick={() => this.toggleFaq(index)}
                                                >
                                                    {item.question}
                                                    <span className="icon">
                                                        <img
                                                            src={
                                                                this.state.activeFaqIndex === index
                                                                    ? null
                                                                    : "/assets/images/icons/faq-icon.png"
                                                            }
                                                            alt="toggle"
                                                            className="faq_toggle_icon"
                                                        />
                                                    </span>
                                                </button>

                                                {this.state.activeFaqIndex === index && (
                                                    <div className="faq_answer">
                                                        {item.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default DigitalMarketing;
