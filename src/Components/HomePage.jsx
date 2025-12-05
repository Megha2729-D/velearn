import { Component, createRef } from "react";
import "react-circular-progressbar/dist/styles.css";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.counterRef = createRef();
        this.progressRef = createRef();
        this.state = {
            counters: [
                { label: "Certified Courses", value: 50, suffix: "+", count: 0 },
                { label: "Qualified Trainers", value: 10, suffix: "+", count: 0 },
                { label: "Hiring Partners", value: 100, suffix: "+", count: 0 },
                { label: "Authorized Partners", value: 10, suffix: "+", count: 0 },
            ],
            counterStarted: false,
            progressStarted: false,
            // activeTab: "All",
            activeTab: "Software Development",
        };
        // this.rocketRef = createRef();
        // this.journeyRef = createRef();
        // this.motionPathRef = createRef();
        // this.motionPathSmRef = createRef();
        // this.stepsRef = [];
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

    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { activeTab, counters } = this.state;

        // Partner logos
        const partners = [
            "certiport.webp",
            "aws.png",
            "microsoft.png",
            "meta.png",
            "accenture.png",
            "capgemini.png",

        ];

        // recruiters logos
        const recruiters1 = [
            "accenture.png",
            "tech-mahindra.png",
            "wipro.png",
            "tcs.png",
            "ibm.png",
            "infosys.png",
        ];
        // recruiters logos
        const recruiters2 = [
            "microsoft.png",
            "cognizant.png",
            "ibm.png",
            "amazon.png",
            "dell.png",
            "oracle.png",
        ];

        // Courses for VeLearn
        const courses = [
            {
                title: "Master in Full Stack Development",
                img: 'assets/images/courses-1.jpg',
            },
            {
                title: "Advanced UI/UX Design Course",
                img: 'assets/images/courses-2.jpg',
            },
            {
                title: "Master Data Science Course",
                img: 'assets/images/courses-3.jpg',
            },
            {
                title: "Live Digital Marketing Program",
                img: 'assets/images/courses-4.jpg',
            },
        ];

        const tabs = [
            "Software Development",
            "Web Development",
            "IT Infrastructure Management",
            "Special Programs",
        ];

        const coursesData = {
            "Software Development": [
                {
                    title: "Python Programming For Beginners",
                    hrs: "5 hrs",
                    img: "assets/images/courses/python.webp",
                },
                {
                    title: "Master Advanced Java Programming",
                    hrs: "5 hrs",
                    img: "assets/images/courses/java.jpg",
                },
                {
                    title: "Advanced C Programming",
                    hrs: "5 hrs",
                    img: "assets/images/courses/c-programming.jpg",
                },
                {
                    title: "Fundamentals of Programming",
                    hrs: "5 hrs",
                    img: "assets/images/courses/fundamentals-of-programming.jpg",
                },
            ],

            "Web Development": [
                {
                    title: "Full Stack Development",
                    hrs: "7 hrs",
                    img: "assets/images/courses/fullstack.jpg",
                },
                {
                    title: "React for Beginners",
                    hrs: "5 hrs",
                    img: "assets/images/courses/reactjs.png",
                },
                {
                    title: "Frontend Development Mastery",
                    hrs: "6 hrs",
                    img: "assets/images/courses/frontend.jpg",
                },
                {
                    title: "Backend API Development",
                    hrs: "5 hrs",
                    img: "assets/images/courses/backend.jpg",
                },
            ],

            "IT Infrastructure Management": [
                {
                    title: "Networking Essentials",
                    hrs: "5 hrs",
                    img: "assets/images/courses/network.jpg",
                },
                {
                    title: "AWS Cloud Fundamentals",
                    hrs: "6 hrs",
                    img: "assets/images/courses/aws.png",
                },
                {
                    title: "Linux Administration",
                    hrs: "5 hrs",
                    img: "assets/images/courses/linux.png",
                },
                {
                    title: "DevOps Essentials",
                    hrs: "7 hrs",
                    img: "assets/images/courses/devops.png",
                },
            ],

            "Special Programs": [
                {
                    title: "Cyber Security Basics",
                    hrs: "6 hrs",
                    img: "assets/images/courses/cyber.webp",
                },
                {
                    title: "AI & Machine Learning Intro",
                    hrs: "7 hrs",
                    img: "assets/images/courses/ai.jpg",
                },
                {
                    title: "Data Analytics Essentials",
                    hrs: "5 hrs",
                    img: "assets/images/courses/data.jpg",
                },
                {
                    title: "UI/UX Designing Intro",
                    hrs: "4 hrs",
                    img: "assets/images/courses/uiux.jpg",
                },
            ],
        };

        return (
            <>
                {/* Hero Carousel */}
                <section>
                    <div className="container-fluid p-xl">
                        <div id="velearnHomeCarousel" className="carousel slide carousel-fade">
                            <div className="carousel-inner mt-3 mt-lg-0">

                                <div className="shape_parent">
                                    {/* SVG BACKGROUND (DESKTOP) */}
                                    <img src="assets/images/shapes/cropped-shape/shape-1-1.png" className="w-100 shape_c shape_top" alt="" />
                                    <div className="middle_shape"></div>
                                    <img src="assets/images/shapes/cropped-shape/shape-1-2.png" className="w-100 shape_c shape_bottom" alt="" />
                                </div>
                                {/* SLIDE 1 – Live Learning */}
                                <div className="carousel-item active">
                                    <div className="carousel-caption custom-caption">
                                        <div className="row" style={{ marginTop: '30px' }}>
                                            <div className="col-lg-7">
                                                <div className="caption-box">
                                                    <h2 className="h1">
                                                        Master the art <br />
                                                        of <span className="highlight">UI / UX Design</span>
                                                    </h2>
                                                    <p>Join Velearn live classes, interact with mentors, and track your progress.</p>
                                                    <div className="btn-group d-flex">
                                                        <button className="syllabus-btn">Syllabus</button>
                                                        <button className="viewmore-btn">View More</button>
                                                    </div>
                                                    <div className="">
                                                        <div className="uiux-process-box" style={{ width: 'fit-content', marginTop: '35px' }}>
                                                            <h2 className="ux-title">CRAFT SEAMLESS USER EXPERIENCE</h2>
                                                            <ul className="ux-list">
                                                                <li>Understand the History of UI/UX</li>
                                                                <li>Apply Design Thinking Techniques</li>
                                                                <li>Learn User Research & Personas</li>
                                                                <li>Map User Journeys Effectively</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 pt-3">
                                                <div className="uiux-process-box">
                                                    <div className="rings-row">
                                                        <div className="ring-item"><div className="ring"></div><span>IDEATE</span></div>
                                                        <div className="ring-item"><div className="ring"></div><span>WIREFRAME</span></div>
                                                        <div className="ring-item"><div className="ring"></div><span>PROTOTYPE</span></div>
                                                    </div>
                                                    <h2 className="ux-title">CRAFT SEAMLESS USER EXPERIENCE</h2>
                                                    <ul className="ux-list">
                                                        <li>Understand the History of UI/UX</li>
                                                        <li>Apply Design Thinking Techniques</li>
                                                        <li>Learn User Research & Personas</li>
                                                        <li>Map User Journeys Effectively</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SLIDE 2 – Self-Paced Study */}
                                <div className="carousel-item">
                                    <div className="carousel-caption custom-caption">
                                        <div className="row" style={{ marginTop: '30px' }}>
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
                                                    <div className="">
                                                        <div className="uiux-process-box" style={{ width: 'fit-content', marginTop: '35px' }}>
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
                                            <div className="col-lg-5 pt-3">
                                                <div className="uiux-process-box">
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
                                        <div className="row" style={{ marginTop: '30px' }}>
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
                                                    <div className="">
                                                        <div className="uiux-process-box" style={{ width: 'fit-content', marginTop: '35px' }}>
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
                                            <div className="col-lg-5 pt-3">
                                                <div className="uiux-process-box">
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
                                        <div className="row" style={{ marginTop: '30px' }}>
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
                                                    <div className="">
                                                        <div className="uiux-process-box" style={{ width: 'fit-content', marginTop: '35px' }}>
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
                                            <div className="col-lg-5 pt-3">
                                                <div className="uiux-process-box">
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
                                        <div className="row" style={{ marginTop: '30px' }}>
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
                                                    <div className="">
                                                        <div className="uiux-process-box" style={{ width: 'fit-content', marginTop: '35px' }}>
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
                                            <div className="col-lg-5 pt-3">
                                                <div className="uiux-process-box">
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
                    </div>
                </section>
                {/* Achievements Section */}
                <section className="pb-5 overflow-hidden">
                    <div className="counter pt-5 overflow-hidden" ref={this.counterRef}>
                        <div className="container-fluid p-xl text-center mb-5">
                            {/* <h2 className="fw-bold">Our Achievements & Growth</h2>
                        <p className="text-muted mb-0">
                            Celebrating VeLearn’s journey of transforming education through innovation and mentorship.
                        </p> */}
                            <div className="row justify-content-center">
                                {counters.map((item, index) => (
                                    <div className="col-lg-3 col-6" key={index}>
                                        <div class="bt_homeloader">
                                            <div class="counter">
                                                <div class="counter-content">
                                                    <span class="h1 counter-value">{item.count}{item.suffix}</span>
                                                    <h5 class="title">{item.label}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div
                                            className="outer_progress_circle"
                                            style={{
                                                "--p": item.count
                                            }}
                                        > */}
                                        {/* <div className="inner_white">
                                                <div className="counter_circle d-flex flex-column justify-content-center align-items-center">
                                                    <div className="h1">
                                                        {item.count}{item.suffix}
                                                    </div>
                                                    <p className="mb-0">{item.label}</p>
                                                </div>
                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VeLearn Courses Section */}
                    {/* <div className="courses-section position-relative mb-5">
                        <div className="container position-relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="shape-svg w-100"
                                id="Layer_1" viewBox="0 100 1400 800">
                                <defs xmlns="http://www.w3.org/2000/svg">
                                    <filter id="shadowFilter" x="-20%" y="-20%"
                                        width="150%" height="150%">
                                        <feDropShadow dx="0" dy="40" stdDeviation="25" flood-color="rgba(0,0,0,0.49)"></feDropShadow>
                                    </filter>
                                </defs>
                                <path fill="#192853" filter="url(#shadowFilter)"
                                    d="M1350,245.8V634.2a65.8,65.8,0,0,1-65.8,65.8H1075.11a65.67,65.67,0,0,1-58.65-36A80,80,0,0,0,945,620H455a80.07,80.07,0,0,0-71.46,44,65.65,65.65,0,0,1-58.64,36H115.8A65.8,65.8,0,0,1,50,634.2V165.8A65.8,65.8,0,0,1,115.8,100H649.88a65.66,65.66,0,0,1,58.66,36A80,80,0,0,0,780,180h504.2A65.8,65.8,0,0,1,1350,245.8Z"
                                >
                                </path>
                            </svg>
                            <div className="overlay_shape_sec text-white">
                                <h3 className="mb-4 fw-bold section_title">
                                    Top 4 Trending <br /><span className="text-c2"> Live Courses</span>
                                </h3>
                                <div className="row g-5">
                                    <Swiper
                                        modules={[Autoplay]}
                                        spaceBetween={30}
                                        slidesPerView={3}
                                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                                        grabCursor={true}
                                        loop={true}
                                        breakpoints={{
                                            320: { slidesPerView: 1 },
                                            768: { slidesPerView: 2 },
                                            1024: { slidesPerView: 3 },
                                        }}
                                        className="pb-4"
                                    >
                                        {courses.map((course, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="card course-card border-0 h-100 d-flex flex-column">
                                                    <img
                                                        src={course.img}
                                                        className="card-img-top"
                                                        alt={course.title}
                                                        style={{ height: "200px", objectFit: "cover" }}
                                                    />
                                                    <div className="card-body d-flex flex-column justify-content-between">
                                                        <div>
                                                            <h5 className="text-start card-title">{course.title}</h5>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn1 btn-sm px-3 py-2">Syllabus</button>
                                                            <button className="btn2 btn-sm px-3 py-2">View More</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="col-12 d-flex justify-content-center mt-2">
                                    <button className="btn-c1">Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </section>
                <section className="pb-5">

                    {/* counts */}
                    <div>
                        <div className="container-fluid p-xl d-flex justify-content-center py-5">
                            <div className="col-lg-10">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="row px-0 mx-0">
                                            <div className="col-lg-12">
                                                <div className="count_clr count_clr1">
                                                    <div className="row">
                                                        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                                            <h6>Active Learners</h6>
                                                            <h2>1000+</h2>
                                                        </div>
                                                        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                                            <img src="assets/images/anime-1.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 count_top_height">
                                                <div className="count_clr count_clr2">
                                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Video Lessons</h6>
                                                        <h2>2000+</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 count_top_height">
                                                <div className="count_clr count_clr3">
                                                    <div className="d-flex justify-content-center gap-3 align-items-center">
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                    </div>
                                                    <div className="d-flex justify-content-center gap-3 align-items-center">
                                                        <h6>Rating</h6>
                                                        <h2>4.7</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 count_top_sm_height px-3">
                                        <div className="col-lg-12 h-100">
                                            <div className="count_clr count_clr4">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <h6>Minutes of Video Watched</h6>
                                                    <h2>20000+</h2>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img src="assets/images/anime-2.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 count_top_height px-3">
                                        <div className="count_clr count_clr5 d-flex justify-content-center align-items-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <h6>Doubts Cleared</h6>
                                                <h2>4500+</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 count_top_height px-3">
                                        <div className="count_clr count_clr6">
                                            <div className="row">
                                                <div className="col-lg-7 col-6">
                                                    <div className="px-lg-5 ps-5 d-flex flex-column justify-content-center align-items-start">
                                                        <h6>Questions Practiced</h6>
                                                        <h2>5000+</h2>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5 col-6 d-flex justify-content-center align-items-center">
                                                    <img src="assets/images/anime-3.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid p-xl">
                        {/* <div className="container"> */}
                        <div id="adCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="assets/images/ad-banner.jpg" class="d-block" alt="..." />
                                    <div class="carousel-caption">
                                        <h5>Velearn</h5>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="assets/images/ad-banner.jpg" class="d-block" alt="..." />
                                    <div class="carousel-caption">
                                        <h5>Velearn</h5>
                                    </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#adCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#adCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        {/* </div> */}
                    </div>
                </section>
            </>
        );
    }
}

export default HomePage;
