import { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0, // for the tools swiper
        };
    }
    render() {
        const tools = [
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


        const skills = [
            { title: 'Deployment & Hosting', icon: `${process.env.PUBLIC_URL}/assets/images/details-page/skills/hosting.png` },
            { title: 'Database Management', icon: `${process.env.PUBLIC_URL}/assets/images/details-page/skills/database.png` },
            { title: 'Front-End Development', icon: `${process.env.PUBLIC_URL}/assets/images/details-page/skills/front-end.png` },
            { title: 'Back-End Development', icon: `${process.env.PUBLIC_URL}/assets/images/details-page/skills/backend.png` },
            { title: 'Full Stack Project Building', icon: `${process.env.PUBLIC_URL}/assets/images/details-page/skills/project-building.png` }
        ];
        const repeatedSkills = [...skills, ...skills, ...skills]; // repeat for loop
        return (
            <>
                <section className="banner_top_sec_parent">
                    <div className="banner_top_sec">
                        <div className="details_banner">
                            <div className="details_banner_inner">
                                <div className="section_container">
                                    <div className="row justify-content-between">
                                        <div className="col-lg-6">
                                            <div className="pe-lg-5">
                                                <h1 className="text-white">
                                                    Industry-Driven Online Full Stack Program With Live Mentors
                                                </h1>
                                                <p className="text-white mt-4">
                                                    A live, mentor-led Full Stack Development program designed to take you from fundamentals to production-ready applications — with real projects, real tools, and real career support.
                                                </p>
                                                <button>Enroll Now</button>
                                                <div className="pagination_parent d-lg-flex d-none">
                                                    <Link to={"/"}>Home</Link>
                                                    <span className="px-2"> /</span>
                                                    <Link to={"/recorded-course"}> Recorded courses </Link>
                                                    <span className="px-2">/</span>
                                                    <Link to={"/course-details"}> Data Science in English</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 mt-5 mt-lg-0 position-relative">
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
                        </div>
                        <div className="banner_details">
                            <div className="section_container">
                                <div className="col-12 d-flex justify-content-start">
                                    <div className="col-lg-9">
                                        <div className="ms-lg-5 ms-2 py-3">
                                            <div className="row text-center">
                                                <div className="col-6 col-lg-3 mb-3 banner_details_list d-flex justify-content-center">
                                                    <div className="d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                                                        <p className="fw-bold mb-1">4 Modules</p>
                                                        <p className="mb-0">with Certifications</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 mb-3 banner_details_list d-flex justify-content-center">
                                                    <div className="d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                                                        <p className="fw-bold mb-1">4 Hours</p>
                                                        <p className="mb-0">of Recorded Content</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 mb-3 banner_details_list d-flex justify-content-center">
                                                    <div className="d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                                                        <p className="fw-bold mb-1">4.5 Ratings</p>
                                                        <p className="mb-0">by 1000 Learners</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3 mb-3 banner_details_list d-flex justify-content-center">
                                                    <div className="d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                                                        <p className="fw-bold mb-1">English</p>
                                                        <p className="mb-0">Language</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="details_desc_parent">
                        <div className="section_container">
                            <div className="why_choose_details pt-5 pb-lg-5">
                                <div className="d-flex justify-content-center col-12">
                                    <div className="col-lg-7">
                                        <h3 className="text-white text-center fw-bold px-3 lh-sm">Why Full Stack Development Is a Smart
                                            <span className="text-c2"> Career Choice</span>
                                        </h3>
                                    </div>
                                </div>
                                {/* Cards */}
                                {/* Top Row - 3 Cards */}
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="row justify-content-center mb-4">
                                            <div className="col-lg-4 col-6 mb-3">
                                                <div className="col-12 my-4 big">
                                                    <div className="why-card">
                                                        Learn One Skill, Work in Multiple Roles
                                                    </div>
                                                </div>
                                                <div className="col-12 my-4 big">
                                                    <div className="why-card">
                                                        High Demand Across All Industries
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-6 mb-3">
                                                <div className="col-12 my-4 small">
                                                    <div className="why-card">
                                                        Build Real Products, Not Just Code
                                                    </div>
                                                </div>
                                                <div className="col-12 my-4 small">
                                                    <div className="why-card">
                                                        Higher Salary Potential
                                                    </div>
                                                </div>
                                                <div className="col-12 my-4 small">
                                                    <div className="why-card">
                                                        Faster Career Growth
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-12 mb-3 mt-4 mt-lg-0 d-flex flex-row flex-lg-column">
                                                <div className="col-6 col-lg-12 my-4 big pe-3 pe-lg-0">
                                                    <div className="why-card">
                                                        Strong Foundation for Future Tech
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-12 my-4 my-lg-0 big ps-3 ps-lg-0">
                                                    <div className="why-card">
                                                        Logic-Driven Problem Solving
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail_overview pb-4">
                                <div className="col-12">
                                    <h3 className="text-c2 text-center fw-bold"> Course Overview</h3>
                                    <p className="text-white text-center text-lg-start mt-3">
                                        Data science is an interdisciplinary field that focuses on extracting meaningful insights from data. It combines statistics, mathematics, programming, and domain knowledge to analyze structured and unstructured data. Data scientists collect, clean, and process large datasets, then apply techniques like data analysis, visualization, machine learning, and predictive modeling. The goal is to identify patterns, trends, and relationships that support better decision-making. Data science is widely used in industries such as healthcare, finance, marketing, e-commerce, and technology. By turning raw data into actionable insights, data science helps organizations improve efficiency, predict outcomes, and create data-driven strategies for growth and innovation.
                                    </p>
                                </div>
                            </div>
                            <div className="career_launch pt-lg-3 pb-4">
                                <h3 className="text-white text-center fw-bold">Launch your iT Career As a
                                    <span className="text-c2"> Full Stack Developer</span>
                                </h3>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="col-lg-10 position-relative">
                                        <div className="row">
                                            <div className="col-4 pe-0">
                                                <div className="h-100 d-flex flex-column gap-5">
                                                    <div className="steps_details h-50 d-flex justify-content-center align-items-center">
                                                        <p className="mb-0">Launch your iT Career As a Full Stack Developer</p>
                                                    </div>
                                                    <div className="steps_details h-50 d-flex justify-content-center align-items-center">
                                                        <p className="mb-0">Step into real IT jobs with confidence</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 px-0 pb-lg-4 position-relative d-flex flex-column justify-content-center align-items-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/details-page/steps.png`} className="w-100" alt="" />
                                                <div className="get_started_butt position-absolute bottom-0 d-none d-lg-flex justify-content-center">
                                                    <div className="get_started_button">
                                                        <button>Get Started</button>
                                                        <div className="arr_right">
                                                            <i className="bi bi-arrow-right"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 ps-0">
                                                <div className="h-100 d-flex flex-column gap-5">
                                                    <div className="steps_details h-50 d-flex justify-content-center align-items-center">
                                                        <p className="mb-0">Gain hands-on experience with live sessions</p>
                                                    </div>
                                                    <div className="steps_details h-50 d-flex justify-content-center align-items-center">
                                                        <p className="mb-0">Experience real development workflow from start to deploy</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="get_started_butt d-flex d-lg-none mt-4 justify-content-center">
                                            <div className="get_started_button">
                                                <button>Get Started</button>
                                                <div className="arr_right">
                                                    <i className="bi bi-arrow-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="skills pt-lg-5 pt-4 pb-4 position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="back_big_text">Full Stack Developer</div>
                                </div>
                                <div className="inner_skills_content">
                                    <h3 className="text-white text-center fw-bold">Core Skills
                                        <span className="text-c2"> You’ll Master</span>
                                    </h3>
                                    <p className="text-white text-center mb-0">
                                        At Velearn, we simplify skills that shape real careers
                                    </p>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-10">
                                            <div className="skills-slider-wrapper">
                                                <Swiper
                                                    className="skills-swiper py-5"
                                                    modules={[Navigation, Autoplay]}
                                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                                    loop={true}
                                                    navigation={true}
                                                    breakpoints={{
                                                        0: {
                                                            slidesPerView: 2,
                                                            spaceBetween: 10,
                                                        },
                                                        576: {
                                                            slidesPerView: 2,
                                                            spaceBetween: 15,
                                                        },
                                                        768: {
                                                            slidesPerView: 2,
                                                            spaceBetween: 20,
                                                        },
                                                        1024: {
                                                            slidesPerView: 5,
                                                            centeredSlides: true,
                                                            spaceBetween: 20,
                                                        },
                                                    }}
                                                >
                                                    {repeatedSkills.map((item, i) => (
                                                        <SwiperSlide key={i}>
                                                            <div className="skill-card">
                                                                <img src={item.icon} alt={item.title} />
                                                                <p className="text-white">{item.title}</p>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="tools_slider_section py-5">
                                <div className="section_container text-center mb-4">
                                    <h3 className="text-white fw-bold mb-2">Future-Ready Tools for Modern Software Careers</h3>
                                </div>

                                {/* <div className="d-flex">
                                    {tools.map((tool, index) => {
                                        const isActive = index === this.state.activeIndex;
                                        return (
                                            <div key={index}>
                                                <div className="tool_card">
                                                    <div
                                                        className={`card_inner ${isActive ? "active" : ""}`}
                                                        style={{
                                                            boxShadow: isActive
                                                                ? `0px 5.33px 32px 1.02px ${tool.shadow} inset`
                                                                : `0px 3.67px 22.04px 2.14px ${tool.shadow} inset`,
                                                        }}
                                                    >
                                                        <img src={tool.logo} alt={tool.name} />
                                                        <span className="tool_label">{tool.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div> */}
                                <Swiper
                                    modules={[EffectCoverflow, Autoplay]}
                                    effect="coverflow"
                                    centeredSlides={true}
                                    loop={true}
                                    slidesPerView={window.innerWidth < 600 ? 1.6 : 5}
                                    coverflowEffect={{
                                        rotate: 25,
                                        stretch: 0,
                                        depth: 200,
                                        modifier: 1,
                                        slideShadows: false,
                                    }}
                                    autoplay={{ delay: 2000 }}
                                    onSlideChange={(swiper) => this.setState({ activeIndex: swiper.realIndex })}
                                    className="tools_swiper"
                                >
                                    {tools.map((tool, index) => {
                                        const isActive = index === this.state.activeIndex;
                                        return (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className={`tool_card ${isActive ? "active" : ""}`}
                                                    style={{
                                                        boxShadow: isActive
                                                            ? `0px 5.33px 32px 1.02px ${tool.shadow} inset`
                                                            : `0px 3.67px 22.04px 2.14px ${tool.shadow} inset`,
                                                    }}
                                                >
                                                    <img src={tool.logo} alt={tool.name} />
                                                    <span className="tool_label text-white">{tool.name}</span>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                {/* <Swiper
                                    modules={[Navigation, Autoplay]}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    loop={true}
                                    navigation={true}
                                    centeredSlides={true}
                                    slidesPerView={13}
                                    allowTouchMove={true}
                                    className="tools_swiper py-4"
                                    onSwiper={(swiper) => {
                                        this.swiperRef = swiper;
                                        this.forceUpdate();
                                    }}
                                    onSlideChange={() => this.forceUpdate()}
                                >
                                    {tools.map((tool, index) => {
                                        let transformStyle = "rotate(30deg) translateY(10px) scale(.9)";
                                        let opacityStyle = "0.9";

                                        let boxShadow = `0px 5.33px 32px 1.02px ${tool.shadow} inset`;

                                        if (this.swiperRef) {
                                            const slides = this.swiperRef.slides;
                                            const slideEl = slides[index];
                                            const rect = slideEl.getBoundingClientRect();
                                            const slideCenter = rect.left + rect.width / 2;
                                            const screenCenter = window.innerWidth / 2;

                                            const distance = Math.abs(slideCenter - screenCenter);
                                            const offset = slideCenter - screenCenter;

                                            if (distance < rect.width * 0.6) {
                                                transformStyle = "rotate(0deg) translateY(-10px) scale(1.2)";
                                                opacityStyle = "1";
                                                boxShadow = `0px 3.67px 22.04px 2.14px ${tool.shadow} inset`;
                                            }
                                            else if (offset < 0) {
                                                transformStyle = "rotate(-30deg) translateY(10px) scale(.9)";
                                            }
                                        }

                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="tool_card">
                                                    <div
                                                        className="card_inner"
                                                        style={{
                                                            transform: transformStyle,
                                                            opacity: opacityStyle,
                                                            boxShadow: boxShadow,
                                                        }}
                                                    >
                                                        <img src={tool.logo} alt={tool.name} />
                                                        <span className="tool_label">{tool.name}</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper> */}
                            </section>
                        </div>
                    </div>
                </section >
            </>
        );
    }
}

export default CourseDetails;
