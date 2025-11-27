import { Component, createRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import { Autoplay, Pagination } from "swiper/modules";
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
        this.rocketRef = createRef();
        this.journeyRef = createRef();
        this.motionPathRef = createRef();
        this.motionPathSmRef = createRef();
        this.stepsRef = [];
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

        // animation
        const rocket = this.rocketRef.current;
        const steps = this.stepsRef;

        const duration = 10000;
        const stepTimes = [0, 2000, 4000, 7000, 9000];

        const getActivePath = () => {
            return window.innerWidth < 992
                ? this.motionPathSmRef.current
                : this.motionPathRef.current;
        };

        const svgPointToContainer = (svg, point) => {
            const rect = svg.getBoundingClientRect();
            const svgWidth = svg.viewBox.baseVal.width;
            const svgHeight = svg.viewBox.baseVal.height;
            const scaleX = rect.width / svgWidth;
            const scaleY = rect.height / svgHeight;
            return {
                x: point.x * scaleX,
                y: point.y * scaleY,
            };
        };

        const getRocketTransform = () => {
            rocket.style.width = window.innerWidth < 992 ? "20px" : "60px";
            return "-40%, -180%";
        };

        const highlightSteps = () => {
            stepTimes.forEach((t, index) => {
                setTimeout(() => {
                    steps[index].classList.add("active");
                }, t);
            });
        };

        const animateRocket = (startTime) => {
            const path = getActivePath();
            const svg = path.ownerSVGElement;
            const pathLength = path.getTotalLength();

            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;

            // Place rocket at start
            const startPoint = svgPointToContainer(svg, path.getPointAtLength(0));
            rocket.style.left = startPoint.x + "px";
            rocket.style.top = startPoint.y + "px";
            rocket.style.transform = `translate(${getRocketTransform()}) rotate(90deg)`;

            const frame = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const moveLen = progress * pathLength;
                const point = svgPointToContainer(svg, path.getPointAtLength(moveLen));

                rocket.style.left = point.x + "px";
                rocket.style.top = point.y + "px";
                path.style.strokeDashoffset = pathLength - moveLen;

                if (progress < 1) {
                    const nextPoint = svgPointToContainer(
                        svg,
                        path.getPointAtLength(Math.min(moveLen + 1, pathLength))
                    );
                    const angle =
                        (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) /
                        Math.PI;
                    rocket.style.transform = `translate(${getRocketTransform()}) rotate(${angle + 90
                        }deg)`;
                    requestAnimationFrame(frame);
                } else {
                    rocket.style.transform = `translate(-87%, -200%) rotate(0deg)`;
                }
            };

            requestAnimationFrame(frame);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    highlightSteps();
                    animateRocket(performance.now());
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (this.journeyRef.current) observer.observe(this.journeyRef.current);

        window.addEventListener("resize", () => {
            const path = getActivePath();
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;
        });
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
            "certiport.webp",
            "aws.png",
            "microsoft.png",
            "meta.png",
            "accenture.png",
            "capgemini.png",

        ];

        // Courses for VeLearn
        const coursesOne = [
            {
                title: "Full Stack Web Development Program",
                // lang: "English, Tamil & Hindi",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-1.jpg`,
            },
            {
                title: "Data Science & Analytics Masterclass",
                // lang: "English & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-2.jpg`,
            },
        ];
        // Courses for VeLearn
        const coursesTwo = [
            {
                title: "UI/UX Design Professional Course",
                // lang: "English, Hindi & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-3.jpg`,
            },
            {
                title: "Python Programming for Beginners",
                // lang: "English & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/courses-4.jpg`,
            },
        ];

        return (
            <>
                {/* Hero Carousel */}
                <div className="container">
                    <div id="velearnHomeCarousel" className="carousel slide carousel-fade">
                        <div className="carousel-inner mt-3 mt-lg-0">

                            {/* SVG BACKGROUND (DESKTOP) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="d-none d-lg-block w-100"
                                id="Layer_1" viewBox="0 130 1400 700">
                                <defs xmlns="http://www.w3.org/2000/svg">
                                    <filter id="shadowFilter" x="-20%" y="-20%" width="150%" height="150%">
                                        <feDropShadow dx="0" dy="40" stdDeviation="25" flood-color="rgba(0,0,0,0.49)" />
                                    </filter>
                                </defs>
                                <path filter="url(#shadowFilter)" fill="#21346a"
                                    d="M1350,263.856
                                        V560.144
                                        A74.82,74.82,0,0,1,1275.18,620
                                        H124.82
                                        A74.82,74.82,0,0,1,50,560.144
                                        V199.856
                                        A74.82,74.82,0,0,1,124.82,140
                                        H644.45
                                        c27.42,0,52.32,15.19,65.74,39.1
                                        A80,80,0,0,0,780,204
                                        h495.18
                                        A74.82,74.82,0,0,1,1350,263.856
                                        Z">
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
                                            <div className="uiux-process-box mt-5">
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
                                            <div className="uiux-process-box mt-5">
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
                                            <div className="uiux-process-box mt-5">
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
                                            <div className="uiux-process-box mt-5">
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

                {/* Achievements Section */}
                <section className="counter " ref={this.counterRef}>
                    <div className="container text-center mb-5">
                        {/* <h2 className="fw-bold">Our Achievements & Growth</h2>
                        <p className="text-muted mb-0">
                            Celebrating VeLearn’s journey of transforming education through innovation and mentorship.
                        </p> */}
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

                {/* VeLearn Courses Section */}
                <section className="courses-section position-relative">
                    <div className="container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-100"
                            id="Layer_1" viewBox="0 100 1400 600">
                            <path fill="#21346a"
                                d="M1350,245.8V634.2a65.8,65.8,0,0,1-65.8,65.8H1075.11a65.67,65.67,0,0,1-58.65-36A80,80,0,0,0,945,620H455a80.07,80.07,0,0,0-71.46,44,65.65,65.65,0,0,1-58.64,36H115.8A65.8,65.8,0,0,1,50,634.2V165.8A65.8,65.8,0,0,1,115.8,100H649.88a65.66,65.66,0,0,1,58.66,36A80,80,0,0,0,780,180h504.2A65.8,65.8,0,0,1,1350,245.8Z"
                            >
                            </path>
                        </svg>
                        <div className="overlay_shape_sec text-white">
                            <h3 className="mb-4 fw-bold section_title mt-4">
                                Top 4 Trending <br /><span className="text-c2"> Live Courses</span>
                            </h3>
                            <div className="row">
                                {coursesOne.map((course, index) => (
                                    <div className="col-lg-6 mb-5">
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
                                                    {/* <p className="text-start text-muted small mb-3">🌐 {course.lang}</p> */}
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn1 btn-sm">View Syllabus</button>
                                                    <button className="btn2 btn-sm">Know More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* VeLearn Courses Section - 2 */}
                <section className="courses-section position-relative">
                    <div className="container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-100"
                            id="Layer_1" viewBox="0 140 1400 550">
                            <path fill="#21346a"
                                d="M1025,400h0a40,40,0,0,0,40,40h245a40,40,0,0,1,40,40V610a40,40,0,0,1-40,40H1065a40,40,0,0,1-40-40h0a40,40,0,0,0-40-40H415a40,40,0,0,0-40,40h0a40,40,0,0,1-40,40H90a40,40,0,0,1-40-40V480a40,40,0,0,1,40-40H335a40,40,0,0,0,40-40h0a40,40,0,0,0-40-40H90a40,40,0,0,1-40-40V270a40,40,0,0,1,40-40H335a40,40,0,0,0,40-40h0a40,40,0,0,1,40-40H985a40,40,0,0,1,40,40h0a40,40,0,0,0,40,40h245a40,40,0,0,1,40,40v50a40,40,0,0,1-40,40H1065A40,40,0,0,0,1025,400Z"
                            >
                            </path>
                        </svg>
                        <div className="overlay_shape_sec text-white ">
                            <div className="row">
                                {coursesTwo.map((course, index) => (
                                    <div className="col-lg-6">
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
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn1 btn-sm">View Syllabus</button>
                                                    <button className="btn2 btn-sm">Know More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-12 d-flex justify-content-center mt-5">
                                <button className="btn-c1 px-4 py-2">Explore All Courses</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Animation */}
                <section id="learning-journey" ref={this.journeyRef}>
                    <div className="container">
                        <h3 className="text-c1 section_title mb-5 text-center fw-bold">From Start to Success</h3>
                        <div className="journey-container">
                            {/* Desktop SVG */}
                            <svg
                                id="journey-path"
                                viewBox="0 150 1000 400"
                                className="d-none d-lg-block"
                            >
                                <path
                                    ref={this.motionPathRef}
                                    id="motionPath"
                                    d="M100,320 C200,200 300,200 350,300 S450,380 500,280 S650,150 700,250 S820,350 920,220"
                                    stroke="#999"
                                    strokeDasharray="6 8"
                                    fill="none"
                                    strokeWidth="3"
                                />
                            </svg>

                            {/* Mobile SVG */}
                            <svg
                                id="journey-path-sm"
                                viewBox="0 0 1000 400"
                                className="d-block d-lg-none"
                            >
                                <path
                                    ref={this.motionPathSmRef}
                                    id="motionPath-sm"
                                    d="M100,440 C200,200 300,200 350,300 S450,380 500,280 S650,150 700,250 S820,350 900,180"
                                    stroke="#999"
                                    strokeDasharray="6 8"
                                    fill="none"
                                    strokeWidth="3"
                                />
                            </svg>

                            {/* Rocket */}
                            <img
                                ref={this.rocketRef}
                                id="rocketPNG"
                                src={`${process.env.PUBLIC_URL}/assets/images/icons/rocket.png`}
                                alt="rocket"
                                style={{ position: "absolute" }}
                            />

                            {/* Steps */}
                            {[
                                { img: `${process.env.PUBLIC_URL}/assets/images/icons/step-1.png`, title: "Career Guidance with Free Demo Session", layout: "img-title" },
                                { img: `${process.env.PUBLIC_URL}/assets/images/icons/step-2.png`, title: "Course Commencement", layout: "title-img" },
                                { img: `${process.env.PUBLIC_URL}/assets/images/icons/step-3.png`, title: "Periodical Activity & Assessments", layout: "img-title" },
                                { img: `${process.env.PUBLIC_URL}/assets/images/icons/step-4.png`, title: "Real-time Projects Submission", layout: "title-img" },
                                { img: `${process.env.PUBLIC_URL}/assets/images/icons/step-5.png`, title: "Job Placement Assistance", layout: "img-title" },
                            ].map((step, idx) => (
                                <div
                                    key={idx}
                                    className={`step step${idx + 1}`}
                                    ref={(el) => (this.stepsRef[idx] = el)}
                                >
                                    {step.layout === "img-title" ? (
                                        <>
                                            <img src={step.img} alt={`Step ${idx + 1}`} />
                                            <div>{step.title}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div>{step.title}</div>
                                            <img src={step.img} alt={`Step ${idx + 1}`} />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partnerships */}
                <section className="pb-5">
                    <div className="container text-center">
                        <h3 className="text-c1 section_title mb-5 fw-bold">Authorised Partners</h3>
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
                                        src={`${process.env.PUBLIC_URL}/assets/images/partners/${logo}`}
                                        alt={`Partner ${index + 1}`}
                                        className="partner-logo img-fluid"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* counts */}
                <section className="container d-flex justify-content-center py-5">
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
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/anime-1.png`} alt="" />
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
                            <div className="col-lg-5">
                                <div className="col-lg-12 h-100">
                                    <div className="count_clr count_clr4">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <h6>Minutes of Video Watched</h6>
                                            <h2>20000+</h2>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/anime-2.png`} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 count_top_height">
                                <div className="count_clr count_clr5">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h6>Doubts Cleared</h6>
                                        <h2>4500+</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 count_top_height">
                                <div className="count_clr count_clr6">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div className="px-5 d-flex flex-column justify-content-center align-items-start">
                                                <h6>Questions Practiced</h6>
                                                <h2>5000+</h2>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/anime-3.png`} alt="" />
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

export default HomePage;
