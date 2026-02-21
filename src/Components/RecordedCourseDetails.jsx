import { Component, createRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "./withRouter";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../Components/Styles/RecordedCourse.css"

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = "https://www.iqvideoproduction.com/assets/images/";
const BASE_DYNAMIC_IMAGE_URL = "https://www.iqvideoproduction.com/uploads/";

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
        };
        this.dragDistance = 0;
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.dragDistance = 0;
        this.tabsRef = createRef();
        this.tabsWrapperRef = createRef();
        // this.tabRefs = [1, 2, 3, 4, 5].map(() => createRef());
    }
    componentDidMount() {
        const { slugId } = this.props.params;
        const locationState = this.props.location.state;

        let courseId = locationState?.courseId;

        // CASE 1 — navigated from list (best performance)
        if (courseId) {
            this.loadCourse(courseId);
            return;
        }

        // CASE 2 — page refreshed / shared link
        // fetch by slug
        fetch(`${BASE_API_URL}course-by-slug/${slugId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status && data.data) {
                    this.loadCourse(data.data.id);
                } else {
                    this.setState({ error: "Course not found", loading: false });
                }
            });
    }
    loadCourse = (courseId) => {
        fetch(`${BASE_API_URL}course-detail/${courseId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status && data.data) {

                    const apiCourse = data.data;

                    const modules = (apiCourse.curricula || []).map(module => ({
                        id: module.id,
                        title: module.title,
                        points: (module.descriptions || []).map(d => d.description)
                    }));

                    // IMPORTANT — create refs dynamically
                    this.tabRefs = modules.map(() => createRef());

                    const course = {
                        ...apiCourse,
                        modules: modules,
                        learnings: apiCourse.leans || [],
                        requirements: apiCourse.requirements || []
                    };

                    this.setState({ course, loading: false }, () => {
                        // center first tab indicator
                        if (this.tabRefs[0]?.current && this.tabsWrapperRef.current) {
                            const tabEl = this.tabRefs[0].current;
                            const wrapperRect = this.tabsWrapperRef.current.getBoundingClientRect();
                            const centerX = tabEl.getBoundingClientRect().left + tabEl.offsetWidth / 2;
                            const relativeLeft = centerX - wrapperRect.left;

                            this.setState({ activeTab: 0, contentLeft: relativeLeft });
                        }
                    });

                } else {
                    this.setState({ error: "Course not found", loading: false });
                }
            })
            .catch(err => {
                this.setState({ error: err.message, loading: false });
            });

        // Drag Scroll
        setTimeout(() => {
            const slider = this.tabsRef.current;
            if (!slider) return;

            let isMouseDown = false;

            slider.addEventListener("mousedown", (e) => {
                isMouseDown = true;
                this.isDragging = false;
                this.startX = e.pageX;
                this.scrollLeft = slider.scrollLeft;
                slider.classList.add("dragging");
            });

            window.addEventListener("mouseup", () => {
                isMouseDown = false;

                setTimeout(() => {
                    this.isDragging = false;
                }, 30);

                slider.classList.remove("dragging");
            });

            slider.addEventListener("mousemove", (e) => {
                if (!isMouseDown) return; // ⭐ MOST IMPORTANT FIX

                const walk = e.pageX - this.startX;

                // activate drag only after slight move
                if (Math.abs(walk) > 5) {
                    this.isDragging = true;
                    slider.scrollLeft = this.scrollLeft - walk;
                }
            });

            slider.addEventListener("mouseleave", () => {
                isMouseDown = false;
                slider.classList.remove("dragging");
            });

        }, 300);
    };
    renderContent() {
        const { activeTab, course } = this.state;
        if (!course?.modules?.length) return { title: "", points: [] };
        return course.modules[activeTab] || course.modules[0];
    }
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
        const { activeTab, activePriceTab, activeSlide, course, loading, error } = this.state;
        const currentContent = this.renderContent();
        const totalModules = this.state.course?.modules?.length || 0;

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
                                    <button>Enroll Now</button>
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
                                <form action="#">
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
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" />
                                    </div>
                                    <div className="d-flex flex-column w-100 my-3">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="number" name="phone" id="phone" />
                                    </div>
                                    <div className="d-flex flex-column w-100 my-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" />
                                    </div>

                                    <div className="d-flex justify-content-center mb-3">
                                        <button>Enroll Now</button>
                                    </div>
                                </form>
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

                                    {course.learnings.map((item, i) => (
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
                                <div className="pt-5" style={{ minHeight: "530px", maxHeight: "600px" }}>
                                    <div className="modules-section">
                                        <h3 className="text-black fw-bold text-center">Your <span className="text-c2"> Learning</span> Roadmap</h3>
                                        <p className="text-black text-center">Each module at Velearn focuses on practical skills to prepare you for real jobs.</p>
                                        <div className="tabs-wrapper" ref={this.tabsWrapperRef}>
                                            <div className="tabs" ref={this.tabsRef}>
                                                {course.modules?.map((module, index) => (
                                                    <button
                                                        key={module.id}
                                                        ref={this.tabRefs[index]}
                                                        className={`tab ${activeTab === index ? "active" : ""}`}
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
                                                <h6 className="mb-3">{currentContent.title}</h6>
                                                <ul>
                                                    {currentContent.points.map((point, i) => (
                                                        <li key={i}>{point}</li>
                                                    ))}
                                                </ul>
                                                {/* <div className="col-12 d-flex justify-content-end">
                                                    <div className="download_icon">
                                                        <i className="bi bi-download text-white"></i>
                                                    </div>
                                                </div> */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="pt-5 ">
                                    <h3 className="text-black fw-bold text-center">Who Can <span className="text-c2"> Benefit</span> from This <span className="text-c2"> Course</span></h3>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-10">
                                            <div className="rc_benefit">
                                                <div className="row mt-3">
                                                    {course.benefits.map((item, i) => (
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
                                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/recorded-course/student.png`} alt="" />
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
                                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/recorded-course/student.png`} alt="" />
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
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/certificate.jpg`} className="w-100" alt="" />
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

                                    <div className="row mt-5 justify-content-center align-items-center">
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
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default withRouter(RecordedCourseDetails);
