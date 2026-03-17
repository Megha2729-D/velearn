import { Component, createRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { withRouter } from "../../withRouter";
import "../../Styles/DataScience.css"

import "swiper/css";
import "swiper/css/effect-coverflow";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

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
            course_id: 4,
            name: "",
            phone: "",
            email: "",
            errors: {},
            isEnrolled: false,

            showEnrollModal: false,   // ADD
            showEnrollSuccessModal: false
        };

        this.tabRefs = [1, 2, 3, 4, 5].map(() => createRef());
    }

    componentDidMount() {
        /* Auto-select first tab */
        if (this.tabRefs[0]?.current) {
            this.tabRefs[0].current.click();
        }

        this.initTestimonialStack();

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.setState({
                name: user.name || "",
                email: user.email || "",
                phone: user.phonenumber || user.phone || "",
            });
            this.checkEnrollment(user.id, this.state.course_id);
        }
    }

    closeEnrollModal = () => {
        this.setState({ showEnrollModal: false });
    };

    handleCourseAction = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            this.props.navigate("/login");
            return;
        }

        if (this.state.isEnrolled) {
            this.goToLearnPage();
        } else {
            this.setState({ showEnrollModal: true });
        }
    };

    checkEnrollment = (userId, courseId) => {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};
        fetch(`${BASE_API_URL}live-course-history/${userId}`, { headers })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    const enrolled = (data.data || []).some(c => c.id === parseInt(courseId));
                    this.setState({ isEnrolled: enrolled });
                }
            })
            .catch(err => console.log("Enrollment check error:", err));
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, errors: { ...this.state.errors, [e.target.name]: "" } });
    };

    validateForm = () => {
        let errors = {};
        let isValid = true;
        if (!this.state.name.trim()) { errors.name = "Name is required"; isValid = false; }
        if (!this.state.email.trim()) { errors.email = "Email is required"; isValid = false; }
        if (!this.state.phone) { errors.phone = "Phone is required"; isValid = false; }
        this.setState({ errors });
        return isValid;
    };

    handleEnroll = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            this.props.navigate("/login");
            return;
        }
        if (!this.validateForm()) return;
        const { name, phone, email, course_id } = this.state;
        const payload = { name, phone, email, course_id, auth_id: user.id };
        const token = localStorage.getItem("token");

        fetch(`${BASE_API_URL}enroll-now`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    toast.success("Enrollment request sent!");
                    this.setState({ isEnrolled: true, showEnrollSuccessModal: true });
                } else if (data.message && data.message.toLowerCase().includes("already")) {
                    this.setState({ isEnrolled: true, showEnrollSuccessModal: true });
                    toast.success(data.message);
                } else {
                    toast.error(data.message || "Enrollment failed");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("An error occurred during enrollment");
            });
    };

    goToLearnPage = () => {
        this.props.navigate(`/learn/data-science`, {
            state: { courseId: this.state.course_id }
        });
    };

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
        { name: "React", logo: `${BASE_IMAGE_URL}details-page/tools/react.png`, shadow: "#61DAFB" },
        { name: "CSS", logo: `${BASE_IMAGE_URL}details-page/tools/css.png`, shadow: "#2965F1" },
        { name: "Express JS", logo: `${BASE_IMAGE_URL}details-page/tools/express-js.png`, shadow: "#F3DF1D" },
        { name: "Visual Studio", logo: `${BASE_IMAGE_URL}details-page/tools/vs-code.png`, shadow: "#0080CF" },
        { name: "SQL", logo: `${BASE_IMAGE_URL}details-page/tools/sql.png`, shadow: "#D08001" },
        { name: "Bootstrap", logo: `${BASE_IMAGE_URL}details-page/tools/bootstrap.png`, shadow: "#7952B3" },
        { name: "Mongo DB", logo: `${BASE_IMAGE_URL}details-page/tools/mongodb.png`, shadow: "#9EFF3E" },
        { name: "Tailwind", logo: `${BASE_IMAGE_URL}details-page/tools/tailwind.png`, shadow: "#38BDF8" },
        { name: "Python", logo: `${BASE_IMAGE_URL}details-page/tools/python.png`, shadow: "#DE6B00" },
        { name: "Spring Boot", logo: `${BASE_IMAGE_URL}details-page/tools/spring-boot.png`, shadow: "#6DB33F" },
        { name: "HTML", logo: `${BASE_IMAGE_URL}details-page/tools/html.png`, shadow: "#E44D26" },
        { name: "Django", logo: `${BASE_IMAGE_URL}details-page/tools/django.png`, shadow: "#304F44" },
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
            question: "Who should enroll in this UI/UX Design course?",
            answer: (
                <>
                    <p>
                        This UI/UX Design course is ideal for students, fresh graduates, working professionals, developers, graphic designers, and career switchers who want to build a strong foundation in user interface (UI) and user experience (UX) design. No prior design experience is required, making it beginner-friendly and career-oriented.
                    </p>
                </>
            )
        },
        {
            question: "Will I get hands-on experience during the course?",
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
            question: "What career support do you offer after the UI/UX course?",
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
            question: "Is this UI/UX course suitable for non-design backgrounds?",
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
        const user = JSON.parse(localStorage.getItem("user"));
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
        const { showEnrollSuccessModal } = this.state;

        return (
            <>
                {/* Success Redirect Modal */}
                {showEnrollSuccessModal && (
                    <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.7)', zIndex: 10001 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                                <div className="modal-body text-center p-5">
                                    <div className="mb-4">
                                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '70px' }}></i>
                                    </div>
                                    <h3 className="fw-bold mb-3">Enrollment Successful!</h3>
                                    <p className="text-muted mb-4">
                                        Your request has been received. Would you like to view your live course history now?
                                    </p>
                                    <div className="d-flex gap-3 justify-content-center">
                                        <button
                                            className="btn btn-outline-secondary px-4 py-2"
                                            onClick={() => this.setState({ showEnrollSuccessModal: false })}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            Stay Here
                                        </button>
                                        <button
                                            className="btn btn-primary px-4 py-2"
                                            onClick={() => this.props.navigate("/live-course-history")}
                                            style={{ borderRadius: '10px', backgroundColor: '#22346b', border: 'none' }}
                                        >
                                            Go to History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="inner_page_top_padd bg-black">
                    <div className="ds_top_sec">
                        <img src={`${BASE_IMAGE_URL}live-course/data-science/banner-inner.png`} className="ds_banner_inner" alt="" />
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
                                        <div className="col-lg-6 col-10">
                                            <form onSubmit={this.handleEnroll}>
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="name">Name</label>
                                                    </div>
                                                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className={this.state.errors.name ? "is-invalid" : ""} />
                                                </div>
                                                <div className="my-3">
                                                    <div>
                                                        <label htmlFor="phone">Phone Number</label>
                                                    </div>
                                                    <input type="number" name="phone" value={this.state.phone} onChange={this.handleChange} className={this.state.errors.phone ? "is-invalid" : ""} />
                                                </div>
                                                <div className="mt-3">
                                                    <div>
                                                        <label htmlFor="email">Email</label>
                                                    </div>
                                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className={this.state.errors.email ? "is-invalid" : ""} />
                                                </div>
                                                <div className="col-12 d-flex justify-content-center mt-4">
                                                    {this.state.isEnrolled ? (
                                                        <button type="button" onClick={this.goToLearnPage} className="w-100">Start Course</button>
                                                    ) : (
                                                        <button type={user ? "submit" : "button"} onClick={() => { if (!user) this.props.navigate("/login") }} className="w-100">
                                                            {user ? "Enroll Now" : "Login to Enroll"}
                                                        </button>
                                                    )}
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
                                    <p className="text-white text-lg-start text-center">Our UI/UX Design course is a live, industry-focused training program designed to help students understand user experience principles, interface design, usability, and design thinking in a structured and practical way. This course focuses on creating user-centered digital experiences through research, wireframing, prototyping, and visual design using modern tools and methodologies. Learners work on real-world design projects, ensuring they develop the practical skills and design mindset companies seek when hiring UI/UX designers.</p>
                                </div>
                                <div className="col-lg-8 mt-4">
                                    <h3 className="fw-bold text-center text-white"> Learn the Most In-Demand Skills to Build a Career <span className="text-c2"> AI & Data Science, ML</span></h3>
                                    <div className="col-12 d-flex justify-content-center my-5">
                                        <div className="col-lg-12 ds_skills d-flex justify-content-center">
                                            <img src={`${BASE_IMAGE_URL}live-course/data-science/ds-skill-bg.png`} className="ds_skill_inner_body" alt="" />
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
                                <div className="col-lg-7">
                                    <h3 className="text-center text-white fw-bold"> Take <span className="text-c2"> Your Career</span> to the Next Level with AI, Data Science & ML</h3>
                                    <div className="row w-100 m-auto">
                                        <div className="ds_shape_parent">
                                            <div className="custom-shape">
                                                <p className="text-white mb-0">Analyze real-world data and gain insights</p>
                                            </div>
                                            <div className="custom-shape">
                                                <p className="text-white mb-0">Master AI & Machine Learning in demand by companies</p>
                                            </div>
                                            <div className="custom-shape">
                                                <p className="text-white mb-0">Apply skills across IT, healthcare, finance & more</p>
                                            </div>
                                            <div className="custom-shape">
                                                <p className="text-white mb-0">Build portfolio-ready projects</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 py-5">
                                    <h3 className="fw-bold text-center text-white">The
                                        <span className="text-c2"> Tools </span>
                                        Behind Real-World Data
                                        <span className="text-c2"> Science & AI</span>
                                    </h3>
                                    <img src={`${BASE_IMAGE_URL}live-course/data-science/ds-tools.png`} className="mt-4 w-100" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ds_career_outcome">
                        <div className="section_container">
                            <div className="row w-100 m-auto justify-content-center">

                                <div className="col-lg-8 pb-5 ds_modules">
                                    <h3 className="fw-bold text-center text-white">Course Modules – Your Step-by-Step
                                        <span className="text-c2"> AI, Data Science &  Journey</span>
                                    </h3>
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
                                <div className="col-lg-8 py-5">
                                    <h3 className="fw-bold text-center text-white">Career Outcomes – What <span className="text-c2"> This Course Prepares You For</span></h3>
                                    <p className="text-center text-white px-lg-5">Explore multiple career paths where businesses actively hire digital marketers with practical, job-ready skills.</p>
                                    <div className="col-12">
                                        <div className="row w-100 m-auto flex-lg-row flex-column-reverse justify-content-between overflow-hidden ds_career_parent">
                                            <div className="col-lg-7 px-0">
                                                <img src={`${BASE_IMAGE_URL}live-course/data-science/ds-career-roles.png`} className="mt-4 w-100" alt="" />
                                            </div>
                                            <div className="col-lg-4 mt-4 mt-lg-0 px-0 d-flex align-items-center justify-content-center">
                                                <ul>
                                                    <li>Data Analyst</li>
                                                    <li>Data Scientist</li>
                                                    <li>Machine Learning Engineer</li>
                                                    <li>AI Associate / AI Engineer</li>
                                                    <li>Business Data Analyst</li>
                                                    <li>Computer Vision Engineer</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 py-5">
                                    <h3 className="fw-bold text-center text-white">High-Growth Careers with <span className="text-c2"> Strong Salary Potential</span></h3>
                                    <p className="text-center text-white px-lg-5 small">Build future-ready skills in Data Science, Machine Learning, and AI that are valued across industries.
                                        These roles drive real business impact through data-driven decisions and intelligent systems.</p>
                                    <div className="col-12 ds_salary_insight position-relative">
                                        <div className="ds_salary_insight_left">
                                            <p className="text-white">Machine Learning / AI Engineer</p>
                                            <div className="ds_salary_insight_parent">
                                                <p className="">Entry-Level: ₹8 L – ₹12 L</p>
                                                <p className="">Mid-Level: ₹15 L – ₹25 L</p>
                                                <p className="">Senior: ₹30 L – ₹45 L+</p>
                                            </div>
                                        </div>
                                        <div className="ds_salary_insight_right">
                                            <p className="text-white">Data Scientist</p>
                                            <div className="ds_salary_insight_parent">
                                                <p className="">Entry-Level: ₹6 L – ₹10 L</p>
                                                <p className="">Mid-Level: ₹12 L – ₹22 L</p>
                                                <p className="">Senior: ₹25 L – ₹40 L+</p>
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center ds_salary_insight_globe">
                                            <img src={`${BASE_IMAGE_URL}live-course/data-science/salary-insight-globe.png`} className="m-auto" alt="" />
                                            <p className="text-white mb-0">Average Annual Salary <br /> ₹20.8 LPA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ds_bottom_end">
                        <div className="ds_journey mb-5">
                            <div className="from_start_sec pt-lg-5 pt-3 ui_ux_journey">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-7">
                                            <h3 className="text-white text-center fw-bold px-3 lh-sm">
                                                A Smart <span className="text-c2"> Learning Journey </span>That Leads to <span className="text-c2"> Real Careers</span>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="journey_wrap position-relative">
                                        <div className="journey_bg_icon"></div>
                                        <div className="dotted_lines">
                                            <div className="position-relative d-flex justify-content-center">
                                                <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/dotted-lines.png`} className="dotted-line-img" alt="" />
                                            </div>
                                        </div>
                                        <div className="rocket_wrap">
                                            <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/rocket.png`} className="rocket_img" alt="" />
                                        </div>
                                        <div className="journey_item item_1">
                                            <div className="parent">
                                                <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/step-1.png`} alt="" />
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
                                                <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/step-2.png`} alt="" />
                                            </div>
                                        </div>

                                        <div className="journey_item item_3">
                                            <div className="parent">
                                                <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/step-3.png`} alt="" />
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
                                                <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/step-4.png`} alt="" />
                                            </div>
                                        </div>

                                        <div className="journey_item item_5">
                                            <div className="parent">
                                                <img src={`${BASE_IMAGE_URL}live-course/ui-ux/journey/step-5.png`} alt="" />
                                                <div>
                                                    <h6>End-to-End Placement Support</h6>
                                                    <p>Train with mock interviews and learn to answer with confidence. Career support that stays until you get hired.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ds_stories">
                            <div className="section_container">
                                <h3 className="text-white text-center fw-bold">Students Share Their Journey into <span className="text-c2"> AI, Data Science & ML</span></h3>
                                <div className="row w-100 m-auto justify-content-center">
                                    <div className="col-lg-6 position-relative ds_stories_parent_main">
                                        <img src={`${BASE_IMAGE_URL}live-course/data-science/skill-stories-1.png`} className="w-100" alt="" />
                                        <div className="ds_stories_parent">
                                            <Swiper
                                                modules={[Autoplay]}
                                                loop={true}
                                                centeredSlides={true}
                                                slidesPerView={1}
                                                autoplay={{
                                                    delay: 2000,
                                                    disableOnInteraction: false,
                                                }}
                                            >

                                                {sliderTestimonalData.map((item, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className="ds_testimonial_card position-relative">
                                                            <p>I joined this course with very little background in Data Science. The step-by-step structure helped me understand Python, data analysis, and ML clearly. Now I feel confident working with real datasets and explaining my projects</p>
                                                            <div className="col-12 d-flex justify-content-end">
                                                                <span>-Kavi</span>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                        {/* <div className="ds_stories_text_main">
                                            <div className="ds_stories_text d-block d-lg-none">Skill Stories</div>
                                            <div className="ds_stories_text d-block d-lg-none">Skill Stories</div>
                                            <div className="ds_stories_text">Skill Stories</div>
                                            <div className="ds_stories_text">Skill Stories</div>
                                            <div className="ds_stories_text">Skill Stories</div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ds_certification py-3">
                            <div className="section_container">
                                <div className="row w-100 m-auto justify-content-center">
                                    <div className="col-lg-10">
                                        <h3 className="text-white text-center fw-bold pb-4">A <span className="text-c2"> Certification</span> That Reflects What You Can Do</h3>
                                        <div className="row">
                                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                                <div className="mb-2">
                                                    <h5 className="text-white fw-bold mb-3">Design Skill–Verified Certification</h5>
                                                    <p className="text-white mb-4"> This certification validates your UI thinking, user research, wireframing, and visual design skills — proven through real design tasks and projects.</p>
                                                </div>
                                                <div className="mb-2">
                                                    <h5 className="text-white fw-bold mb-3">Globally Relevant Design Credential</h5>
                                                    <p className="text-white mb-4">Showcase your UI/UX expertise with a certificate aligned to modern design standards, valued by startups and product teams worldwide.</p>
                                                </div>
                                                <div className="mb-2">
                                                    <h5 className="text-white fw-bold mb-3">Portfolio & Career Booster</h5>
                                                    <p className="text-white mb-4">More than a certificate — this strengthens your portfolio, resume, and interviews, helping you stand out as a job-ready UI/UX designer.</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                                <div className=" d-flex align-items-center justify-content-center">
                                                    <div className="col-lg-10">
                                                        <img src={`${BASE_IMAGE_URL}live-course/data-science/ds-certificate.png`} className="w-100 rounded-5" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="price_section_parent_top position-relative top-0">
                            <div className="text-center d-flex justify-content-center">
                                <div className="row w-100 justify-content-center">
                                    <div className="col-lg-6 d-flex justify-content-center ">
                                        <div className="parent_price">
                                            <div className="price_section d-flex flex-column align-items-center justify-content-center px-2 px-lg-4 py-4">
                                                {/* PRICE TABS */}
                                                <h3 className="fw-bold text-white px-3 px-lg-0 mb-1"><span className="text-c2">Data Science </span> specific version</h3>
                                                <h4 className="text-white pb-4">Velearn Career Access Plan</h4>
                                                {/* CONTENT BOX */}
                                                <div className="price_card w-100 text-white">
                                                    <div className="row w-100 m-auto text-start">
                                                        <div className="col-6">
                                                            <ul className="list-unstyled">
                                                                <li className="d-flex gap-1"><span>✔</span> One-Time Payment – No hidden charges</li>
                                                                <li className="d-flex gap-1"><span>✔</span> Lifetime Course Access</li>
                                                                <li className="d-flex gap-1"><span>✔</span> Live Interactive Classes</li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-6">
                                                            <ul className="list-unstyled">
                                                                <li className="d-flex gap-1"><span>✔</span> Real-Time Hands-On Projects</li>
                                                                <li className="d-flex gap-1"><span>✔</span> Portfolio Building & Resume Review</li>
                                                                <li className="d-flex gap-1"><span>✔</span> Mock Interviews + Placement Support</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                <div className="price_card">
                                                    <button
                                                        className="mt-3"
                                                        type="button"
                                                        onClick={this.handleCourseAction}
                                                    >
                                                        {this.state.isEnrolled ? "Start Course" : "Apply Now"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="faq_section pt-5 pt-lg-0 pb-5">
                            <div className="section_container p-xl text-center mt-lg-5">
                                <h3 className="section_base_heading text-white">
                                    Frequently Asked <span className="text-c2"> Questions</span>
                                </h3>

                                <div className="row mt-2 justify-content-center align-items-center">
                                    {/* FAQ Accordion */}
                                    <div className="col-lg-9 text-start">
                                        {this.faqData.map((item, index) => (
                                            <div className={`faq_item rounded-3 mb-3  ${this.state.activeFaqIndex === index ? "active" : ""
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
                                                                    : `${BASE_IMAGE_URL}icons/faq-icon.png`
                                                            }
                                                            alt="toggle"
                                                            className="faq_toggle_icon"
                                                        />
                                                    </span>
                                                </button>

                                                {this.state.activeFaqIndex === index && (
                                                    <div className="faq_answer text-white">
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

export default withRouter(DataScience);
