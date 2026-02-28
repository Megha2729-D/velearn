import { Component, createRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "./Styles/DataScience.css"

import "swiper/css";
import "swiper/css/effect-coverflow";

class DataScience extends Component {
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
                <div className="inner_page_top_padd bg-black">
                    <div className="ds_top_sec">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/live-course/data-science/banner-inner.png`} className="ds_banner_inner" alt="" />
                        <div className="section_container ds_banner">
                            <div className="row justify-content-center">
                                <div className="col-lg-10 d-flex flex-column justify-content-center align-items-center">
                                    <div className="col-lg-11">
                                        <h1 className="text-white text-center">Become a Data Scientist with AI & Machine Learning Skills</h1>
                                        <p className="text-center text-white px-lg-4">
                                            This live Data Science and AI/ML program helps you develop job-ready analytical and machine learning skills through hands-on projects, real datasets, and continuous mentor guidance—preparing you for high-impact roles in today’s data-driven world.
                                        </p>
                                    </div>

                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="col-lg-6">
                                            <form action="#">
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="stdName">Name</label>
                                                    </div>
                                                    <input type="text" name="stdName" id="stdName" />
                                                </div>
                                                <div className="my-3">
                                                    <div>
                                                        <label htmlFor="stdPhone">Phone Number</label>
                                                    </div>
                                                    <input type="number" name="stdPhone" id="stdPhone" />
                                                </div>
                                                <div className="mt-3">
                                                    <div>
                                                        <label htmlFor="stdEmail">Email</label>
                                                    </div>
                                                    <input type="email" name="stdEmail" id="stdEmail" />
                                                </div>
                                                <div className="col-12 d-flex justify-content-center mt-4">
                                                    <button>Send</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="col-lg-11 ds_overview mt-4">
                                        <div className="row">
                                            <div className="col-lg-3 col-6 my-3 my-lg-0">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <p className="mb-0 text-center text-white fw-bold">Expert</p>
                                                    <p className="mb-0 text-center text-white">Mentorship</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6 my-3 my-lg-0">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <p className="mb-0 text-center text-white fw-bold">Placement</p>
                                                    <p className="mb-0 text-center text-white">Assistance</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6 my-3 my-lg-0">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <p className="mb-0 text-center text-white fw-bold">Life Time</p>
                                                    <p className="mb-0 text-center text-white">Community Access</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6 my-3 my-lg-0">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <p className="mb-0 text-center text-white fw-bold">10+ Real Time</p>
                                                    <p className="mb-0 text-center text-white">Projects</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ds_carrer">
                            <div className="section_container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-9 d-flex flex-column justify-content-center align-items-center">
                                        <div className="col-12 py-4 ">
                                            <h3 className="text-white fw-bold text-center">Powering Modern Careers with <span className="text-c2">Data Science AI & Machine Learning</span></h3>
                                            <div className="row w-100 m-auto">
                                                <div className="col-lg-4 my-3">
                                                    <div className="h-100 ds_carrer_inner">
                                                        <p className="text-white fw-bold text-center">Data-Driven World</p>
                                                        <p className="text-white mb-0 text-center">Every business depends on data insights</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-3">
                                                    <div className="h-100 ds_carrer_inner">
                                                        <p className="text-white fw-bold text-center">Applied AI Learning</p>
                                                        <p className="text-white mb-0 text-center">Train models using real-world data & tools</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-3">
                                                    <div className="h-100 ds_carrer_inner">
                                                        <p className="text-white fw-bold text-center">Analytical Skills</p>
                                                        <p className="text-white mb-0 text-center">Learn to solve real-world problems using AI & ML logic.</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-3">
                                                    <div className="h-100 ds_carrer_inner">
                                                        <p className="text-white fw-bold text-center"> Powering the Future with AI</p>
                                                        <p className="text-white mb-0 text-center">AI, ML & Data Science drive the future of automation and decisions.</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-3">
                                                    <div className="h-100 ds_carrer_inner">
                                                        <p className="text-white fw-bold text-center">Demand Across Every Industry</p>
                                                        <p className="text-white mb-0 text-center">From startups to global enterprises</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 my-3">
                                                    <div className="h-100 ds_carrer_inner">
                                                        <p className="text-white fw-bold text-center">Rapid Salary Growth Careers</p>
                                                        <p className="text-white mb-0 text-center">High-value roles in data, AI & machine learning</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ds_course_overview">
                        <div className="section_container">
                            <div className="row w-100 m-auto justify-content-center">
                                <div className="col-lg-10 ">
                                    <h3 className="fw-bold text-center text-white">Course Overview</h3>
                                    <p className="text-white">Our UI/UX Design course is a live, industry-focused training program designed to help students understand user experience principles, interface design, usability, and design thinking in a structured and practical way. This course focuses on creating user-centered digital experiences through research, wireframing, prototyping, and visual design using modern tools and methodologies. Learners work on real-world design projects, ensuring they develop the practical skills and design mindset companies seek when hiring UI/UX designers.</p>
                                </div>
                                <div className="col-lg-8 mt-4">
                                    <h3 className="fw-bold text-center text-white"> Learn the Most In-Demand Skills to Build a Career <inspan className="text-c2"> AI & Data Science, ML</inspan></h3>
                                    <div className="col-12 d-flex justify-content-center my-5">
                                        <div className="col-lg-12 ds_skills d-flex justify-content-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/live-course/data-science/ds-skill-bg.png`} className="ds_skill_inner_body" alt="" />
                                            <div className="col-lg-8 position-relative">
                                                <div className="row w-100 m-auto">
                                                    <div className="w-100">
                                                        <div className="ds_skills_parent ds_skills_parent_one">
                                                            <div className="ds_skills_inner">
                                                                <div className="h-100 w-100">
                                                                    <ul className="p-0 m-0">
                                                                        <li>Python Programming for Data Science</li>
                                                                        <li>Data Analysis & EDA</li>
                                                                        <li>Data Visualization & Business Reporting</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ds_skills_parent ds_skills_parent_two">
                                                            <div className="ds_skills_inner">
                                                                <div className="h-100 w-100">
                                                                    <ul className="p-0 m-0">
                                                                        <li>Machine Learning Model Development</li>
                                                                        <li>Artificial Intelligence & Deep Learning</li>
                                                                        <li>SQL & Data Management</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h3 className="text-center text-white fw-bold"> Take <span className="text-c2"> Your Career</span> to the Next Level with AI, Data Science & ML</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DataScience;
