import React, { Component, createRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
                img: `${process.env.PUBLIC_URL}/assets/images/class-1.webp`,
            },
            {
                title: "Data Science & Analytics Masterclass",
                lang: "English & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/class-2.webp`,
            },
            {
                title: "UI/UX Design Professional Course",
                lang: "English, Hindi & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/class-3.webp`,
            },
            {
                title: "Python Programming for Beginners",
                lang: "English & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/class-4.webp`,
            },
            {
                title: "Artificial Intelligence Essentials",
                lang: "English, Hindi & Tamil",
                img: `${process.env.PUBLIC_URL}/assets/images/class-5.webp`,
            },
        ];

        return (
            <>
                {/* Hero Carousel */}
                <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/banner-1.avif`} className="d-lg-block d-none w-100" alt="..." />
                            <img src={`${process.env.PUBLIC_URL}/assets/images/banner-sm-1.avif`} className="d-lg-none d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/banner-2.avif`} className="d-lg-block d-none w-100" alt="..." />
                            <img src={`${process.env.PUBLIC_URL}/assets/images/banner-sm-2.avif`} className="d-lg-none d-block w-100" alt="..." />
                        </div>
                    </div>
                </div>

                {/* Achievements Section */}
                <section className="counter py-5 bg-light" ref={this.counterRef}>
                    <div className="container text-center mb-5">
                        <h2 className="fw-bold">Our Achievements & Growth</h2>
                        <p className="text-muted mb-0">
                            Celebrating VeLearn’s journey of transforming education through innovation and mentorship.
                        </p>
                    </div>
                    <div className="container">
                        <div className="row">
                            {counters.map((item, index) => (
                                <div className="col-lg-3 col-6 my-3 innerCounter bg-white py-3 rounded-2" key={index}>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <div className="h1">{item.count}{item.suffix}</div>
                                        <p className="mb-0">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Progress Section */}
                <section className="pb-5 bg-light" ref={this.progressRef}>
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
                <section className="py-5 bg-light">
                    <div className="container text-center">
                        <h3 className="h2 mb-4 fw-bold">Popular Career Programs</h3>
                        <p className="text-muted mb-5">
                            Learn from industry experts and get guided towards a successful tech career with VeLearn.
                        </p>

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

                        <button className="btn-c1 mt-5 px-4 py-2">Explore All Courses</button>
                    </div>
                </section>
            </>
        );
    }
}

export default HomePage;
