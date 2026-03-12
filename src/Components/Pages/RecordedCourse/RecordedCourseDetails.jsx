import React, { Component, createRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "../../withRouter";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../../Styles/RecordedCourse.css"

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class RecordedCourseDetails extends Component {
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
            course: null,
            loading: true,
            error: null,

            showSyllabusModal: false,
            isClosing: false,
            selectedComboCourse: null,
            selectedComboModules: [],
            activeComboTab: 0,

            showSuccessModal: false,
            isEnrolled: false,
            showAlreadyEnrolledModal: false,
            showEnrollFormModal: false,

            name: "",
            phone: "",
            email: "",
            errors: {},

            nameModal: "",
            phoneModal: "",
            emailModal: "",
            modalErrors: {},
        };
        this.dragDistance = 0;
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.dragDistance = 0;
        this.tabsRef = createRef();
        this.tabsWrapperRef = createRef();
        this.tabRefs = [];

        this.comboTabsWrapperRef = createRef();
        this.comboTabsRef = createRef();
        this.comboTabRefs = [];
        // this.tabRefs = [1, 2, 3, 4, 5].map(() => createRef());
    }

    componentDidMount() {
        const { slugId } = this.props.params;
        const locationState = this.props.location.state;
        const courseId = locationState?.courseId;
        const courseType = locationState?.courseType;

        // Pre-fill user details if logged in
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.setState({
                name: user.name || "",
                email: user.email || "",
                phone: user.phonenumber || user.phone || "",
                nameModal: user.name || "",
                emailModal: user.email || "",
                phoneModal: user.phonenumber || user.phone || "",
            });

            // If we have an ID, we can check enrollment immediately
            if (courseId) {
                this.checkEnrollment(user.id, courseId);
            }
        }

        if (courseId && courseType) {
            // Navigation via homepage → use ID & type
            this.loadCourse(courseId, courseType);
        } else if (slugId) {
            // Direct access → fetch all courses and find slug
            Promise.all([
                fetch(`${BASE_API_URL}recorded-course`).then(res => res.json()),
                fetch(`${BASE_API_URL}live-course`).then(res => res.json())
            ])
                .then(([recordedData, liveData]) => {
                    const allCourses = [
                        ...(recordedData.data || []),
                        ...(liveData.data || [])
                    ];
                    const apiCourse = allCourses.find(c => c.slug === slugId);
                    if (apiCourse) {
                        this.loadCourse(apiCourse.id, apiCourse.course_type);
                        if (user) {
                            this.checkEnrollment(user.id, apiCourse.id);
                        }
                    } else {
                        this.setState({ error: "Course not found", loading: false });
                    }
                })
                .catch(err => this.setState({ error: "Failed to fetch courses", loading: false }));
        } else {
            this.setState({ error: "Invalid course URL", loading: false });
        }
    }

    checkEnrollment = (userId, courseId) => {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};

        fetch(`${BASE_API_URL}my-courses/${userId}`, { headers })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    const enrolled = (data.data.all || []).some(c => c.id === parseInt(courseId));
                    this.setState({ isEnrolled: enrolled });
                }
            })
            .catch(err => console.log("Enrollment check error:", err));
    };

    goToLearnPage = () => {
        const { course } = this.state;
        if (course) {
            this.props.navigate(`/learn/${course.slug}`, {
                state: { courseId: course.id }
            });
        } else {
            this.props.navigate("/my-courses");
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.showSyllabusModal && this.state.showSyllabusModal) {
            this.disablePageScroll();
        }

        if (prevState.showSyllabusModal && !this.state.showSyllabusModal) {
            this.enablePageScroll();
        }
    }

    disablePageScroll = () => {
        document.body.classList.add("modal-open-custom");
        document.documentElement.classList.add("modal-open-custom");
    };

    enablePageScroll = () => {
        document.body.classList.remove("modal-open-custom");
        document.documentElement.classList.remove("modal-open-custom");
    };
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
    };
    validateForm = () => {
        const { name, phone, email } = this.state;
        let errors = {};
        let isValid = true;

        if (!name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!phone) {
            errors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone)) {
            errors.phone = "Enter a valid 10 digit phone number";
            isValid = false;
        }

        if (!email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Enter a valid email address";
            isValid = false;
        }

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

        const { name, phone, email, course } = this.state;

        const payload = {
            name,
            phone,
            email,
            course_id: course.id,
            auth_id: user.id
        };

        fetch(`${BASE_API_URL}enroll-now`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {

                    this.setState({
                        showSuccessModal: true,
                        isEnrolled: true,
                        name: "",
                        phone: "",
                        email: ""
                    });

                } else if (data.message && data.message.toLowerCase().includes("already")) {

                    this.setState({
                        showAlreadyEnrolledModal: true,
                        isEnrolled: true
                    });

                } else {
                    alert(data.message || "Enrollment failed");
                }
            })
            .catch(err => console.error(err));
    };
    handleModalEnroll = (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            this.props.navigate("/login");
            return;
        }

        if (!this.validateModalForm()) return;

        const { nameModal, phoneModal, emailModal, course } = this.state;

        const payload = {
            name: nameModal,
            phone: phoneModal,
            email: emailModal,
            course_id: course.id,
            auth_id: user.id
        };

        fetch(`${BASE_API_URL}enroll-now`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {

                if (data.status) {

                    this.setState({
                        showSuccessModal: true,
                        showEnrollFormModal: false,
                        isEnrolled: true,
                        nameModal: "",
                        phoneModal: "",
                        emailModal: ""
                    });

                } else if (data.message && data.message.toLowerCase().includes("already")) {

                    this.setState({
                        showEnrollFormModal: false,
                        showAlreadyEnrolledModal: true,
                        isEnrolled: true
                    });

                } else {
                    alert(data.message || "Enrollment failed");
                }

            })
            .catch(err => console.error(err));
    };
    loadCourse = (courseId, courseType) => {
        let endpoint =
            courseType === "combo"
                ? `combo-course-detail/${courseId}`
                : `course-detail/${courseId}`;

        fetch(`${BASE_API_URL}${endpoint}`)
            .then(res => res.json())
            .then(data => {
                if (data.status && data.data) {

                    const apiCourse = data.data;

                    // Handle modules
                    let modules = [];

                    if (courseType === "combo") {
                        modules = (apiCourse.included_courses || []).map(course => ({
                            id: course.id,
                            title: course.title,
                            points: (course.curricula || [])
                                .flatMap(m => m.descriptions || [])
                                .map(d => d.description)
                        }));
                    } else {
                        modules = (apiCourse.curricula || []).map(module => ({
                            id: module.id,
                            title: module.title,
                            points: (module.descriptions || []).map(d => d.description)
                        }));
                    }

                    this.tabRefs = modules.map(() => createRef());
                    this.comboTabRefs = modules.map(() => createRef());

                    const course = {
                        ...apiCourse,
                        modules,
                        learnings: apiCourse.leans || [],
                        requirements: apiCourse.requirements || [],
                        benefits: apiCourse.benefits || []
                    };

                    this.setState(
                        { course, loading: false },
                        () => {

                            // Auto select first tab after render
                            if (this.tabRefs[0] && this.tabRefs[0].current) {

                                const tabEl = this.tabRefs[0].current;
                                const wrapperRect =
                                    this.tabsWrapperRef.current.getBoundingClientRect();

                                const centerX =
                                    tabEl.getBoundingClientRect().left +
                                    tabEl.offsetWidth / 2;

                                const relativeLeft = centerX - wrapperRect.left;

                                this.setState({
                                    activeTab: 0,
                                    contentLeft: relativeLeft
                                });

                            }

                        }
                    );

                } else {
                    this.setState({ error: "Course not found", loading: false });
                }
            })
            .catch(err =>
                this.setState({ error: err.message, loading: false })
            );
    };
    closeSuccessModal = () => {
        this.setState({ showSuccessModal: false });
        this.props.navigate("/my-courses");
    };
    closeAlreadyEnrolledModal = () => {
        this.setState({ showAlreadyEnrolledModal: false });
    };
    handleModalChange = (e) => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            [name]: value,
            modalErrors: {
                ...prevState.modalErrors,
                [name]: ""
            }
        }));
    };
    validateModalForm = () => {
        const { nameModal, phoneModal, emailModal } = this.state;
        let modalErrors = {};
        let isValid = true;

        if (!nameModal.trim()) {
            modalErrors.nameModal = "Name is required";
            isValid = false;
        }

        if (!phoneModal) {
            modalErrors.phoneModal = "Phone number is required";
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phoneModal)) {
            modalErrors.phoneModal = "Enter valid 10 digit phone";
            isValid = false;
        }

        if (!emailModal) {
            modalErrors.emailModal = "Email required";
            isValid = false;
        }

        this.setState({ modalErrors });
        return isValid;
    };
    openEnrollFormModal = () => {
        this.setState({ showEnrollFormModal: true });
    };

    closeEnrollFormModal = () => {
        this.setState({ showEnrollFormModal: false });
    };
    goToMyCourse = () => {
        this.props.navigate("/my-courses");
    };
    renderContent() {
        const { activeTab, course } = this.state;
        if (!course?.modules?.length) return { title: "", points: [] };
        return course.modules[activeTab] || course.modules[0];
    }

    openComboSyllabus = (includedCourse) => {

        const modules = (includedCourse.curricula || []).map(module => ({
            id: module.id,
            title: module.title,
            points: (module.descriptions || []).map(d => d.description)
        }));

        this.comboTabRefs = modules.map(() => React.createRef());

        this.setState({
            showSyllabusModal: true,
            selectedComboCourse: includedCourse,
            selectedComboModules: modules,
            activeComboTab: 0,
            comboContentLeft: 0
        }, () => {

            if (
                this.comboTabRefs &&
                this.comboTabRefs.length > 0 &&
                this.comboTabRefs[0] &&
                this.comboTabRefs[0].current &&
                this.comboTabsWrapperRef &&
                this.comboTabsWrapperRef.current
            ) {
                const tabEl = this.comboTabRefs[0].current;
                const wrapperRect = this.comboTabsWrapperRef.current.getBoundingClientRect();
                const centerX =
                    tabEl.getBoundingClientRect().left + tabEl.offsetWidth / 2;
                const relativeLeft = centerX - wrapperRect.left;

                this.setState({ comboContentLeft: relativeLeft });
            }

        });
    };

    closeComboSyllabus = () => {
        this.setState({ isClosing: true });

        setTimeout(() => {
            this.setState({
                showSyllabusModal: false,
                isClosing: false
            });
        }, 400); // must match CSS duration
    };
    handleBackdropClick = (e) => {
        if (e.target.classList.contains("combo_syllabus_modal")) {
            this.closeComboSyllabus();
        }
    };
    renderComboContent = () => {
        const { selectedComboModules, activeComboTab } = this.state;
        return selectedComboModules[activeComboTab] || { title: "", points: [] };
    };
    handleComboMouseDown = (e) => {
        this.comboIsDragging = true;
        this.comboStartX = e.pageX - this.comboTabsRef.current.offsetLeft;
        this.comboScrollLeft = this.comboTabsRef.current.scrollLeft;
    };

    handleComboMouseMove = (e) => {
        if (!this.comboIsDragging) return;
        e.preventDefault();
        const x = e.pageX - this.comboTabsRef.current.offsetLeft;
        const walk = (x - this.comboStartX) * 1.5;
        this.comboTabsRef.current.scrollLeft = this.comboScrollLeft - walk;
    };

    handleComboMouseUp = () => {
        this.comboIsDragging = false;
    };

    faqData = [
        {
            question: "Who can benefit from this program?",
            answer: (
                <>
                    <p>
                        This program is suitable for students, freshers, career switchers, and working professionals
                        who want to gain practical skills, hands-on project experience, and prepare for tech roles.
                    </p>
                </>
            )
        },
        {
            question: "Do I need prior experience to join?",
            answer: (
                <>
                    <p>No prior experience is required.</p>
                    <p>
                        The training starts from the basics and gradually moves to advanced concepts.
                        Beginners and professionals alike can follow at their own pace.
                    </p>
                    <p>
                        For those with some experience, advanced tasks and challenges are available
                        to match your skill level.
                    </p>
                </>
            )
        },
        {
            question: "What kind of projects will I work on?",
            answer: (
                <>
                    <p>
                        You will work on real-world, industry-relevant projects that help build practical skills
                        and a professional portfolio.
                    </p>
                    <p>Example project types include:</p>
                    <ul>
                        <li>Web and mobile applications</li>
                        <li>APIs and backend systems</li>
                        <li>Data analysis and visualization dashboards</li>
                        <li>Automation and cloud deployment tasks</li>
                        <li>Capstone projects to showcase your skills</li>
                    </ul>
                </>
            )
        },
        {
            question: "Will this help me get a job?",
            answer: (
                <>
                    <p>
                        Yes. The program is designed to make participants job-ready through:</p>
                    <ul>
                        <li>Practical training and hands-on projects</li>
                        <li>Portfolio and resume building</li>
                        <li>Interview preparation and mock sessions</li>
                        <li>Career guidance and placement support</li>
                    </ul>
                    <p>
                        Many learners start as interns, junior developers, analysts, or tech support roles
                        depending on their chosen path.
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
        const { course, loading, error } = this.state;
        const user = JSON.parse(localStorage.getItem("user"));

        if (loading) return <div className="d-flex justify-content-center align-items-center">
            <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M150 150C150 100 250 50 400 50C550 50 650 100 650 200C650 300 550 350 400 350C250 350 150 300 150 200Z" fill="#FDF6E3" fillOpacity="0.6" />

                <text x="400" y="240" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#22346b">LOADING...</text>

                <path d="M180 380Q400 420 620 380L600 400Q400 440 200 400Z" fill="#22346b" fillOpacity="0.8" />

                <g transform="translate(180, 300)">
                    <circle cx="15" cy="15" r="10" fill="#22346b" /> <rect x="10" y="25" width="10" height="35" rx="5" fill="#24b8ec" /> <path d="M20 35 L45 35" stroke="#22346b" strokeWidth="4" strokeLinecap="round" /> <circle cx="55" cy="35" r="12" stroke="#22346b" strokeWidth="3" fill="white" />
                    <line x1="63" y1="43" x2="70" y2="50" stroke="#22346b" strokeWidth="3" strokeLinecap="round" />
                </g>

                <g transform="translate(580, 300)">
                    <circle cx="15" cy="15" r="10" fill="#22346b" /> <rect x="10" y="25" width="10" height="35" rx="5" fill="#24b8ec" /> <path d="M10 35 L-15 35" stroke="#22346b" strokeWidth="4" strokeLinecap="round" /> <path d="M-15 35 L-80 10 L-80 60 Z" fill="#24b8ec" fillOpacity="0.2" />
                </g>

                <path d="M300 380 Q310 340 330 380" fill="#24b8ec" opacity="0.6" />
                <path d="M500 380 Q510 350 530 380" fill="#22346b" opacity="0.4" />
            </svg>
        </div>;
        if (error) return <div className="d-flex justify-content-center align-items-center">
            <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M150 150C150 100 250 50 400 50C550 50 650 100 650 200C650 300 550 350 400 350C250 350 150 300 150 200Z" fill="#FDF6E3" fillOpacity="0.6" />

                <text x="400" y="240" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#22346b">COURSE</text>
                <text x="400" y="300" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="42" fill="#24b8ec">NOT FOUND</text>

                <path d="M180 380Q400 420 620 380L600 400Q400 440 200 400Z" fill="#22346b" fillOpacity="0.8" />

                <g transform="translate(180, 300)">
                    <circle cx="15" cy="15" r="10" fill="#22346b" /> <rect x="10" y="25" width="10" height="35" rx="5" fill="#24b8ec" /> <path d="M20 35 L45 35" stroke="#22346b" strokeWidth="4" strokeLinecap="round" /> <circle cx="55" cy="35" r="12" stroke="#22346b" strokeWidth="3" fill="white" />
                    <line x1="63" y1="43" x2="70" y2="50" stroke="#22346b" strokeWidth="3" strokeLinecap="round" />
                </g>

                <g transform="translate(580, 300)">
                    <circle cx="15" cy="15" r="10" fill="#22346b" /> <rect x="10" y="25" width="10" height="35" rx="5" fill="#24b8ec" /> <path d="M10 35 L-15 35" stroke="#22346b" strokeWidth="4" strokeLinecap="round" /> <path d="M-15 35 L-80 10 L-80 60 Z" fill="#24b8ec" fillOpacity="0.2" />
                </g>

                <path d="M300 380 Q310 340 330 380" fill="#24b8ec" opacity="0.6" />
                <path d="M500 380 Q510 350 530 380" fill="#22346b" opacity="0.4" />
            </svg>
        </div>;

        const commonOutcomes = [
            "Industry-Ready Practical Skills",
            "Hands-on Project Experience",
            "Problem Solving & Critical Thinking",
            "Tools & Technology Mastery",
            "Real-world Workflow Understanding",
            "Career & Interview Preparation"
        ];
        const gridPattern = [
            "col-lg-5 col-6",
            "col-lg-4 col-6",
            "col-lg-3 col-6",
            "col-lg-4 col-6",
            "col-lg-3 col-6",
            "col-lg-5 col-6"
        ];
        return (
            <>
                <section className="rc_banner">
                    <div className="section_container">
                        <div className="row justify-content-between">
                            <div className="col-lg-8 text-white">
                                <div className="rc_banner_content">
                                    <h1>{course.title}</h1>
                                    <p>{course.sub_description}</p>
                                    <div className="d-flex justify-content-start mt-3">
                                        {this.state.isEnrolled ? (
                                            <button
                                                type="button"
                                                onClick={this.goToLearnPage}
                                            >
                                                Start Course
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!user) {
                                                        this.props.navigate("/login");
                                                    } else {
                                                        this.openEnrollFormModal();
                                                    }
                                                }}
                                            >
                                                {user ? "Enroll Now" : "Login to Enroll"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row rc_description mt-4 w-100 m-auto">
                                        <div className="col-lg-3 col-6 my-3 my-lg-0">
                                            <div>
                                                <p className="text-center text-white">
                                                    {course.with_certificate?.match(/\d+/)?.[0]} Core <br /> Modules
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-6 my-3 my-lg-0">
                                            <div>
                                                <p className="text-center text-white">{course.recorded_content}Hrs+ <br />Contents</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-6 my-3 my-lg-0">
                                            <div>
                                                <p className="text-center text-white">Certificate <br />Included</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-6 my-3 my-lg-0">
                                            <div>
                                                <p className="text-center text-white">4.8 Ratings <br />
                                                    <i className="bi bi-star-fill ps-1"></i>
                                                    <i className="bi bi-star-fill ps-1"></i>
                                                    <i className="bi bi-star-fill ps-1"></i>
                                                    <i className="bi bi-star-fill ps-1"></i>
                                                    <i className="bi bi-star-fill ps-1"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mt-4 mt-lg-0">
                                <form onSubmit={this.handleEnroll}>
                                    <h5>
                                        Get this course @{" "}
                                        {course.course_type === "free"
                                            ? "Free"
                                            : course.combo_price
                                                ? <>₹ {course.combo_price}</>
                                                : <>₹ {course.buy_price}</>
                                        }
                                    </h5>

                                    <div className="d-flex flex-column w-100 my-3">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            className={this.state.errors.name ? "form-control is-invalid" : ""}
                                        />
                                        {this.state.errors.name && (
                                            <span className="error-msg">{this.state.errors.name}</span>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column w-100 my-3">
                                        <label>Phone Number</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange}
                                            className={this.state.errors.phone ? "form-control is-invalid" : ""}
                                        />
                                        {this.state.errors.phone && (
                                            <span className="error-msg">{this.state.errors.phone}</span>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column w-100 my-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            className={this.state.errors.email ? "form-control is-invalid" : ""}
                                        />
                                        {this.state.errors.email && (
                                            <span className="error-msg">{this.state.errors.email}</span>
                                        )}
                                    </div>
                                    <div className="col-12 d-flex justify-content-center">
                                        {this.state.isEnrolled ? (
                                            <button
                                                type="button"
                                                onClick={this.goToLearnPage}
                                            >
                                                Start Course
                                            </button>
                                        ) : (
                                            <button
                                                type={user ? "submit" : "button"}
                                                onClick={() => {
                                                    if (!user) {
                                                        this.props.navigate("/login");
                                                    }
                                                }}
                                            >
                                                {user ? "Enroll Now" : "Login to Enroll"}
                                            </button>
                                        )}
                                    </div>
                                </form>
                                {this.state.showSuccessModal && (
                                    <div
                                        className="success_modal_overlay"
                                        onClick={this.closeSuccessModal}
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
                                                You've successfully enrolled in <br />
                                                <strong>{course?.title}</strong>
                                            </p>

                                            <button
                                                type="button"
                                                className="redo btn"
                                                onClick={this.closeSuccessModal}
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {this.state.showAlreadyEnrolledModal && (
                                    <div
                                        className="success_modal_overlay"
                                        onClick={this.closeAlreadyEnrolledModal}
                                    >
                                        <div
                                            className="modalbox success animate"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="icon">
                                                <span>✓</span>
                                            </div>

                                            <h1>Already Enrolled</h1>

                                            <p>You are already enrolled in this course.</p>

                                            <button
                                                className="redo btn"
                                                onClick={() => this.props.navigate("/my-courses")}
                                            >
                                                Start Course
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {this.state.showEnrollFormModal && (
                                    <div
                                        className="success_modal_overlay"
                                        onClick={this.closeEnrollFormModal}
                                    >
                                        <div
                                            className="modalbox animate"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <form className="position-relative shadow-0 " onSubmit={this.handleModalEnroll}>
                                                <div className="d-flex position-relative">
                                                    <h5>
                                                        Get this course @{" "}
                                                        {course.course_type === "free"
                                                            ? "Free"
                                                            : course.combo_price
                                                                ? <>₹ {course.combo_price}</>
                                                                : <>₹ {course.buy_price}</>
                                                        }
                                                    </h5>
                                                    <span onClick={this.closeEnrollFormModal}><i className="bi bi-x-lg"></i></span>
                                                </div>
                                                <div className="d-flex align-items-start flex-column w-100 my-3">
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        name="nameModal"
                                                        value={this.state.nameModal}
                                                        onChange={this.handleModalChange}
                                                        className={this.state.modalErrors.nameModal ? "form-control is-invalid" : ""}
                                                    />

                                                    {this.state.modalErrors.nameModal && (
                                                        <span className="error-msg">{this.state.modalErrors.nameModal}</span>
                                                    )}
                                                </div>

                                                <div className="d-flex align-items-start flex-column w-100 my-3">
                                                    <label>Phone Number</label>
                                                    <input
                                                        type="number"
                                                        name="phoneModal"
                                                        value={this.state.phoneModal}
                                                        onChange={this.handleModalChange}
                                                        className={this.state.modalErrors.phoneModal ? "form-control is-invalid" : ""}
                                                    />
                                                    {this.state.modalErrors.phoneModal && (
                                                        <span className="error-msg">{this.state.modalErrors.phoneModal}</span>
                                                    )}
                                                </div>

                                                <div className="d-flex align-items-start flex-column w-100 my-3">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        name="emailModal"
                                                        value={this.state.emailModal}
                                                        onChange={this.handleModalChange}
                                                        className={this.state.modalErrors.emailModal ? "form-control is-invalid" : ""}
                                                    />
                                                    {this.state.modalErrors.emailModal && (
                                                        <span className="error-msg">{this.state.modalErrors.emailModal}</span>
                                                    )}
                                                </div>
                                                <div className="col-12 d-flex justify-content-center">
                                                    {this.state.isEnrolled ? (
                                                        <button
                                                            type="button"
                                                            onClick={this.goToLearnPage}
                                                        >
                                                            Start Course
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type={user ? "submit" : "button"}
                                                            onClick={() => {
                                                                if (!user) {
                                                                    this.props.navigate("/login");
                                                                }
                                                            }}
                                                        >
                                                            {user ? "Enroll Now" : "Login to Enroll"}
                                                        </button>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="rc_body">
                    <div className="section_container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="pt-5">
                                    <h3 className="fw-bold text-black">What you’ll learn</h3>

                                    {(course.learnings || []).map((item, i) => (
                                        <div className="d-flex gap-2 my-4" key={i}>
                                            <div>
                                                <i className="bi bi-arrow-right-circle-fill text-c2"></i>
                                            </div>
                                            <div>
                                                <h6 className="fw-bold">{item.title}</h6>
                                                <p className="mb-0">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-5">
                                    <h3 className="text-black fw-bold text-center mb-3">Designed for Effective <span className="text-c2">Self-Learning</span></h3>
                                    <div className="rc_effective_learning">
                                        <div><p className="mb-0">Lifetime Access to Recorded Videos</p></div>
                                        <div><p className="mb-0">Practice-Oriented Learning</p></div>
                                        <div><p className="mb-0">Certificate of Completion</p></div>
                                        <div><p className="mb-0">Concept-wise Structured Modules</p></div>
                                        <div><p className="mb-0">Module-wise Practice Questions</p></div>
                                        <div><p className="mb-0">Interactive & Engaging Video Lessons</p></div>
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <h3 className="text-black fw-bold text-center">
                                        Your <span className="text-c2">{course.cour_language}</span> Learning Outcomes
                                    </h3>

                                    <div className="rc_outcome row">
                                        {commonOutcomes.map((item, index) => (
                                            <div key={index} className={`${gridPattern[index]} my-2`}>
                                                <div className={`rc_outcome_box rc_outcome_box${index + 1}`}>
                                                    <p className="text-white mb-0 text-center">{item}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ✅ If FREE or PAID → show tabs */}
                                {course.course_type !== "combo" && (
                                    <div className="pt-5" style={{ minHeight: "530px", maxHeight: "600px" }}>
                                        <div className="modules-section">
                                            <h3 className="text-black fw-bold text-center">
                                                Your <span className="text-c2"> Learning</span> Roadmap
                                            </h3>

                                            <p className="text-black text-center">
                                                Each module at Velearn focuses on practical skills to prepare you for real jobs.
                                            </p>
                                            <div className="tabs-wrapper" ref={this.tabsWrapperRef}>
                                                <div className="tabs" ref={this.tabsRef}>
                                                    {course.modules?.map((module, index) => (
                                                        <button
                                                            key={module.id}
                                                            ref={this.tabRefs?.[index]}
                                                            className={`tab ${this.state.activeTab === index ? "active" : ""}`}
                                                            onClick={() => {
                                                                if (this.isDragging) return;
                                                                if (!this.tabRefs[index] || !this.tabRefs[index].current) return;

                                                                const tabEl = this.tabRefs[index].current;
                                                                const tabRect = tabEl.getBoundingClientRect();
                                                                const wrapperRect = this.tabsWrapperRef.current.getBoundingClientRect();

                                                                const centerX = tabRect.left + tabRect.width / 2;
                                                                const relativeLeft = centerX - wrapperRect.left;

                                                                if (!this.isDragging) {
                                                                    this.setState({ activeTab: index, contentLeft: relativeLeft });
                                                                }
                                                            }}
                                                        >
                                                            Module {index + 1}
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
                                                    <h6 className="mb-3">{this.renderContent().title}</h6>
                                                    <ul>
                                                        {this.renderContent().points.map((point, i) => (
                                                            <li key={i}>{point}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ✅ If COMBO → show different layout */}
                                {course.course_type === "combo" && (
                                    <div className="pt-5 live_courses_sec" style={{ minHeight: "530px", maxHeight: "600px" }}>
                                        <h3 className="text-black fw-bold text-center">
                                            Your Complete <span className="text-c2"> Learning </span> Bundle
                                        </h3>

                                        <p className="text-black text-center">
                                            Multiple structured courses combined into one powerful program.
                                        </p>

                                        <div className="row modules-section justify-content-center">
                                            {course.included_courses?.map((includedCourse) => (
                                                <div
                                                    className="col-lg-4 col-md-6 col-12 mb-4"
                                                    key={includedCourse.id}
                                                >
                                                    <div className="card_parent h-100 d-flex flex-column">

                                                        <div className="card_img_parent overflow-hidden">
                                                            <img
                                                                src={`${BASE_DYNAMIC_IMAGE_URL}courses/${includedCourse.image}`}
                                                                className="card_img w-100"
                                                                alt={includedCourse.title}
                                                                loading="lazy"
                                                            />
                                                        </div>

                                                        <div className="pt-3 d-flex flex-column flex-grow-1">
                                                            <h4 className="fw-bold">{includedCourse.title}</h4>
                                                            <p className="mb-2">{includedCourse.sub_description}</p>

                                                            <div className="d-flex justify-content-between mt-auto">
                                                                <div className="w-100 recorded_course_duration d-flex justify-content-between">
                                                                    <div>
                                                                        <i className="bi bi-clock pe-1"></i>
                                                                        {includedCourse.recorded_content} Hours
                                                                    </div>
                                                                    <div>
                                                                        <i className="bi bi-journal-text pe-1"></i>
                                                                        {includedCourse.with_certificate?.match(/\d+/)?.[0]} Modules
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="combo_syllabus_butt"
                                                            onClick={() => this.openComboSyllabus(includedCourse)}
                                                        >
                                                            View Syllabus
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {this.state.showSyllabusModal && (
                                    <div
                                        className="modal fade show combo_syllabus_modal"
                                        style={{ display: "block" }}
                                        onClick={this.handleBackdropClick}
                                    >
                                        <div className="modal-dialog modal-lg modal-lg-dialog-centered">
                                            <div
                                                className={`modal-content ${this.state.isClosing ? "modal-slide-up" : "modal-slide-down"
                                                    }`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="modal-header">
                                                    <h5 className="modal-title">
                                                        {this.state.selectedComboCourse?.title}
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        onClick={this.closeComboSyllabus}
                                                    ></button>
                                                </div>

                                                <div className="modal-body">
                                                    {/* <div className="tabs-wrapper" ref={this.comboTabsWrapperRef} style={{ position: "relative", minHeight: "300px" }}>
                                                        <div
                                                            className="tabs"
                                                            ref={this.comboTabsRef}
                                                            onMouseDown={this.handleComboMouseDown}
                                                            onMouseMove={this.handleComboMouseMove}
                                                            onMouseUp={this.handleComboMouseUp}
                                                            onMouseLeave={this.handleComboMouseUp}
                                                        >
                                                            {this.state.selectedComboModules?.map((module, index) => (
                                                                <button
                                                                    key={module.id}
                                                                    ref={this.comboTabRefs[index]}
                                                                    className={`tab ${this.state.activeComboTab === index ? "active" : ""}`}
                                                                    onClick={() => {
                                                                        if (this.comboIsDragging) return;

                                                                        if (!this.comboTabRefs[index] || !this.comboTabRefs[index].current) return;

                                                                        const tabEl = this.comboTabRefs[index].current;
                                                                        const wrapperRect = this.comboTabsWrapperRef.current.getBoundingClientRect();

                                                                        const centerX =
                                                                            tabEl.getBoundingClientRect().left + tabEl.offsetWidth / 2;

                                                                        const relativeLeft = centerX - wrapperRect.left;

                                                                        this.setState({
                                                                            activeComboTab: index,
                                                                            comboContentLeft: relativeLeft
                                                                        });
                                                                    }}
                                                                >
                                                                    Module {index + 1}
                                                                </button>
                                                            ))}
                                                        </div>

                                                        <div
                                                            className="tab-indicator"
                                                            style={{
                                                                position: "absolute",
                                                                top: "45px",
                                                                left: `${this.state.comboContentLeft}px`,
                                                                transform: "translateX(-50%)"
                                                            }}
                                                        />

                                                        <div
                                                            className="tab-content-box positioned"
                                                            style={{
                                                                position: "absolute",
                                                                top: "70px",
                                                                left: `${this.state.comboContentLeft}px`,
                                                                transform: "translateX(-50%)"
                                                            }}
                                                        >
                                                            <h6 className="mb-3">{this.renderComboContent().title}</h6>
                                                            <ul>
                                                                {this.renderComboContent().points.map((point, i) => (
                                                                    <li key={i}>{point}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div> */}
                                                    <div className="accordion" id="comboAccordion">
                                                        {this.state.selectedComboModules?.map((module, index) => (
                                                            <div className="accordion-item" key={module.id}>

                                                                <h2 className="accordion-header" id={`heading${index}`}>
                                                                    <button
                                                                        className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#collapse${index}`}
                                                                        aria-expanded={index === 0 ? "true" : "false"}
                                                                        aria-controls={`collapse${index}`}
                                                                    >
                                                                        {module.title}
                                                                        {/* Module {index + 1} */}
                                                                    </button>
                                                                </h2>

                                                                <div
                                                                    id={`collapse${index}`}
                                                                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                                                    aria-labelledby={`heading${index}`}
                                                                    data-bs-parent="#comboAccordion"
                                                                >
                                                                    <div className="accordion-body">
                                                                        {/* <h6 className="mb-3">{module.title}</h6> */}
                                                                        <ul>
                                                                            {module.points?.map((point, i) => (
                                                                                <li key={i}>{point}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="pt-5 ">
                                    <h3 className="text-black fw-bold text-center">Who Can <span className="text-c2"> Benefit</span> from This <span className="text-c2"> Course</span></h3>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-10">
                                            <div className="rc_benefit">
                                                <div className="row justify-content-center">
                                                    {(course.benefits || []).map((item, i) => (
                                                        <div className="col-lg-6 my-3" key={i}>
                                                            <div className="rc_benefit_sub">
                                                                <p className="mb-0">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <h3 className="text-black fw-bold text-center">
                                        How This <span className="text-c2"> Course</span> Helped Our <span className="text-c2"> Students</span>
                                    </h3>

                                    <div className="row justify-content-center">
                                        <div className="col-lg-10">
                                            <div className="rc_testimonial">
                                                <h5 className="fw-bold text-black text-center">Our Student Review</h5>

                                                <Swiper
                                                    modules={[Autoplay, Pagination]}
                                                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                                                    loop={true}
                                                    spaceBetween={30}
                                                    slidesPerView={1}
                                                    className="testimonial_swiper mt-4"
                                                >

                                                    {/* Slide 1 */}
                                                    <SwiperSlide>
                                                        <div className="rc_testimonial_card">

                                                            <div className="testimonial_content">
                                                                <p>
                                                                    I started this Python recorded course with no coding experience at all.
                                                                    The concepts were explained in a very clear and simple way, allowing
                                                                    me to progress without pressure. Now I feel confident writing basic
                                                                    programs on my own.
                                                                </p>

                                                                <div className="student_info">
                                                                    <img src={`${BASE_IMAGE_URL}recorded-course/student.png`} alt="" />
                                                                    <h6>Jennifer Lopez</h6>
                                                                    <div className="stars">★★★★★</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>

                                                    {/* Slide 2 */}
                                                    <SwiperSlide>
                                                        <div className="rc_testimonial_card">
                                                            <div className="testimonial_content">
                                                                <p>
                                                                    The structured modules and real examples helped me understand logic
                                                                    building easily. I finally understand loops and functions properly!
                                                                </p>

                                                                <div className="student_info">
                                                                    <img src={`${BASE_IMAGE_URL}recorded-course/student.png`} alt="" />
                                                                    <h6>Arun Kumar</h6>
                                                                    <div className="stars">★★★★★</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>

                                                </Swiper>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="pt-5 ">
                                    <h3 className="text-black fw-bold text-center">Certificate of <span className="text-c2"> Completion</span></h3>
                                    <p className="text-center text-black">Official recognition for completing the Python recorded course</p>
                                    <div className="row justify-content-center">
                                        <div className="row">
                                            <div className="col-lg-5 d-flex flex-column justify-content-center">
                                                <div className="mb-2">
                                                    <h5 className="text-c1 fw-bold mb-1">Validate Your Achievement</h5>
                                                    <p className="text-black mb-4"> A trusted certificate that reflects your successful Course completion</p>
                                                </div>
                                                <div className="mb-2">
                                                    <h5 className="text-c1 fw-bold mb-1"> Build a Professional Skill Portfolio</h5>
                                                    <p className="text-black mb-4">Build your professional profile with verified course credentials.</p>
                                                </div>
                                                <div className="mb-2">
                                                    <h5 className="text-c1 fw-bold mb-1"> Share Your Success</h5>
                                                    <p className="text-black mb-4">Highlight your certification on LinkedIn
                                                        and Resumes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 d-flex align-items-center justify-content-center p-lg-5">
                                                <div className=" d-flex align-items-center justify-content-center">
                                                    <div className="col-lg-10">
                                                        <img src={`${BASE_IMAGE_URL}details-page/certificate.jpg`} className="w-100" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="faq_section py-5">
                                    <h3 className="text-center fw-bold text-black">
                                        Frequently Asked <span className="text-c2"> Questions</span>
                                    </h3>

                                    <div className="row mt-3 justify-content-center align-items-center">
                                        {/* FAQ Accordion */}
                                        <div className="col-lg-12 text-start">
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
                                                                        : `${BASE_IMAGE_URL}icons/faq-icon.png `
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
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default withRouter(RecordedCourseDetails);
