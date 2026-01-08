import { Component, createRef } from "react";
import "react-circular-progressbar/dist/styles.css";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

class HomePage extends Component {
    state = {
        activeRecordedTab: "software",
    };

    recordedCourseTabs = {
        software: {
            label: "Software Development",
            courses: [
                {
                    title: "Master in Full Stack Development",
                    img: "assets/images/course.png",
                    desc: "Become a job-ready full stack developer with hands-on projects.",
                    rating: "4.6 (400)",
                    sessions: "16 Sessions",
                    level: "Intermediate",
                },
                {
                    title: "Master Data Science Course",
                    img: "assets/images/course.png",
                    desc: "Learn Python, ML & Data Analytics with real datasets.",
                    rating: "4.7 (320)",
                    sessions: "18 Sessions",
                    level: "Advanced",
                },
                {
                    title: "Advanced UI/UX Design Course",
                    img: "assets/images/course.png",
                    desc: "Learn UX research, wireframing & Figma.",
                    rating: "4.6 (280)",
                    sessions: "14 Sessions",
                    level: "Intermediate",
                }, {
                    title: "Cloud & DevOps Engineering",
                    img: "assets/images/course.png",
                    desc: "AWS, Docker, Kubernetes & CI/CD pipelines.",
                    rating: "4.7 (300)",
                    sessions: "20 Sessions",
                    level: "Advanced",
                },
                {
                    title: "AI Career Accelerator",
                    img: "assets/images/course.png",
                    desc: "Mentor-led AI program with projects & placement support.",
                    rating: "4.8 (250)",
                    sessions: "12 Sessions",
                    level: "Beginner",
                },
            ],
        },

        web: {
            label: "Web Development",
            courses: [
                {
                    title: "Master Data Science Course",
                    img: "assets/images/course.png",
                    desc: "Learn Python, ML & Data Analytics with real datasets.",
                    rating: "4.7 (320)",
                    sessions: "18 Sessions",
                    level: "Advanced",
                },
                {
                    title: "Advanced UI/UX Design Course",
                    img: "assets/images/course.png",
                    desc: "Learn UX research, wireframing & Figma.",
                    rating: "4.6 (280)",
                    sessions: "14 Sessions",
                    level: "Intermediate",
                }, {
                    title: "Cloud & DevOps Engineering",
                    img: "assets/images/course.png",
                    desc: "AWS, Docker, Kubernetes & CI/CD pipelines.",
                    rating: "4.7 (300)",
                    sessions: "20 Sessions",
                    level: "Advanced",
                },
                {
                    title: "AI Career Accelerator",
                    img: "assets/images/course.png",
                    desc: "Mentor-led AI program with projects & placement support.",
                    rating: "4.8 (250)",
                    sessions: "12 Sessions",
                    level: "Beginner",
                },
            ],
        },

        infra: {
            label: "IT Infrastructure Management",
            courses: [
                {
                    title: "Master in Full Stack Development",
                    img: "assets/images/course.png",
                    desc: "Become a job-ready full stack developer with hands-on projects.",
                    rating: "4.6 (400)",
                    sessions: "16 Sessions",
                    level: "Intermediate",
                },
                {
                    title: "Master Data Science Course",
                    img: "assets/images/course.png",
                    desc: "Learn Python, ML & Data Analytics with real datasets.",
                    rating: "4.7 (320)",
                    sessions: "18 Sessions",
                    level: "Advanced",
                },
                {
                    title: "Advanced UI/UX Design Course",
                    img: "assets/images/course.png",
                    desc: "Learn UX research, wireframing & Figma.",
                    rating: "4.6 (280)",
                    sessions: "14 Sessions",
                    level: "Intermediate",
                }, {
                    title: "Cloud & DevOps Engineering",
                    img: "assets/images/course.png",
                    desc: "AWS, Docker, Kubernetes & CI/CD pipelines.",
                    rating: "4.7 (300)",
                    sessions: "20 Sessions",
                    level: "Advanced",
                },
            ],
        },

        special: {
            label: "Special Programs",
            courses: [
                {
                    title: "Master in Full Stack Development",
                    img: "assets/images/course.png",
                    desc: "Become a job-ready full stack developer with hands-on projects.",
                    rating: "4.6 (400)",
                    sessions: "16 Sessions",
                    level: "Intermediate",
                },
                {
                    title: "Master Data Science Course",
                    img: "assets/images/course.png",
                    desc: "Learn Python, ML & Data Analytics with real datasets.",
                    rating: "4.7 (320)",
                    sessions: "18 Sessions",
                    level: "Advanced",
                },
                {
                    title: "Advanced UI/UX Design Course",
                    img: "assets/images/course.png",
                    desc: "Learn UX research, wireframing & Figma.",
                    rating: "4.6 (280)",
                    sessions: "14 Sessions",
                    level: "Intermediate",
                },
                {
                    title: "AI Career Accelerator",
                    img: "assets/images/course.png",
                    desc: "Mentor-led AI program with projects & placement support.",
                    rating: "4.8 (250)",
                    sessions: "12 Sessions",
                    level: "Beginner",
                },
            ],
        },
    };
    render() {
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
        return (
            <>
                <section>
                    <div className="v-banner">
                        <div className="section_container">
                            <div id="v-banner-carousel" className="carousel slide carousel-fade">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                                                    <img src="assets/images/banner-card.png" loading="lazy" className="w-100" alt="Banner Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                                                    <img src="assets/images/banner-card.png" loading="lazy" className="w-100" alt="Banner Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                                                    <img src="assets/images/banner-card.png" loading="lazy" className="w-100" alt="Banner Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev visually-hidden" type="button" data-bs-target="#v-banner-carousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next visually-hidden" type="button" data-bs-target="#v-banner-carousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="section_container">
                        <div className="row section-y-padding v-about position-relative">
                            <div className="col-lg-6">
                                <div className="abt_left_content">
                                    <h1 className="section_main_heading">Our Secret to Making
                                        <span> Learning Easy</span>
                                    </h1>
                                    <p className="mt-3">
                                        Velearn delivers clear, Well Designed structured learning with practical relevance.
                                        Fully explained in <span>தமிழ்</span>
                                    </p>
                                    <div className="col-12 mt-5">
                                        <div className="d-flex align-items-center">
                                            <img src="assets/images/icons/phone.png" loading="lazy" className="phone-img" alt="" />
                                            <div className="call_details">
                                                <p className="text-c2 mb-0 fw-bold">Have any questions ?</p>
                                                <p className="fw-bold mb-0"> <a href="tel:">5555555555</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 about_sec_right position-relative">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src="assets/images/about-vector-person.png" loading="lazy" className="vector_about w-75" alt="" />
                                </div>
                                <div className="dotted_circle_parent">
                                    <div className="dotted_circle outer-dotted"></div>
                                    <div className="dotted_circle inner-dotted"></div>
                                </div>
                                <div className="counter_parent">
                                    <div className="counter_group">
                                        <div className="counter_child counter_one">
                                            <div>
                                                <h4>10+</h4>
                                                <p className="text-uppercase">Authorized Partner</p>
                                            </div>
                                        </div>
                                        <div className="counter_child counter_two">
                                            <div>
                                                <h4>10+</h4>
                                                <p className="text-uppercase">Qualified Trainers</p>
                                            </div>
                                        </div>
                                        <div className="counter_child counter_three">
                                            <div>
                                                <h4>50+</h4>
                                                <p className="text-uppercase">Certified Courses</p>
                                            </div>
                                        </div>
                                        <div className="counter_child counter_four">
                                            <div>
                                                <h4>100+</h4>
                                                <p className="text-uppercase">Hiring Partner</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="tech_icon">
                                    <div className="tech_wrap">
                                        <img src="assets/images/icons/react.png" loading="lazy" className="tech-icon tech-icon-one" alt="" />
                                        <img src="assets/images/icons/js.png" loading="lazy" className="tech-icon tech-icon-two" alt="" />
                                        <img src="assets/images/icons/angular.png" loading="lazy" className="tech-icon tech-icon-three" alt="" />
                                        <img src="assets/images/icons/python.png" loading="lazy" className="tech-icon tech-icon-four" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5">
                    <div className="section_container live_courses_sec">
                        <h3 className="section_base_heading text-black text-center">Top Trending <span className="text-c2"> Live Courses</span></h3>
                        <div className="row">
                            <Swiper
                                className="py-5"
                                modules={[Pagination]}
                                // modules={[Autoplay, Pagination]}
                                spaceBetween={30}
                                slidesPerView={3}
                                loop={true}
                                // autoplay={{ delay: 4000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                            >
                                {[
                                    {
                                        title: "Master in Full Stack Development",
                                        img: "assets/images/course.png",
                                        desc: "Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.",
                                        rating: "4.6 (400)",
                                        sessions: "16 Sessions",
                                        level: "Intermediate"
                                    },
                                    {
                                        title: "Advanced UI/UX Design Course",
                                        img: "assets/images/course.png",
                                        desc: "Learn UX research, wireframing & Figma with mentor-led live classes and portfolio-ready design projects.",
                                        rating: "4.6 (400)",
                                        sessions: "16 Sessions",
                                        level: "Intermediate"
                                    },
                                    {
                                        title: "Master Data Science Course",
                                        img: "assets/images/course.png",
                                        desc: "Master Python, Machine Learning & Data Analytics with practical live sessions and real dataset projects.",
                                        rating: "4.6 (400)",
                                        sessions: "16 Sessions",
                                        level: "Intermediate"
                                    },
                                    {
                                        title: "Master in Full Stack Development",
                                        img: "assets/images/course.png",
                                        desc: "Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.",
                                        rating: "4.6 (400)",
                                        sessions: "16 Sessions",
                                        level: "Intermediate"
                                    },
                                ].map((course, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={`card_parent p-4 h-100 ${index % 2 === 0 ? "one" : "two"}`}>
                                            <div className="card_img_parent overflow-hidden">
                                                <img
                                                    src={course.img}
                                                    className="card_img w-100"
                                                    alt={course.title} loading="lazy"
                                                />
                                            </div>

                                            <div className="pt-3">
                                                <h4 className="fw-bold">{course.title}</h4>

                                                <p className="mb-2">{course.desc}</p>

                                                <div className="d-flex gap-3 py-3">
                                                    <div className="d-flex align-items-center">
                                                        {/* <i className="bi bi-star-fill pe-1"></i> */}
                                                        {course.rating}
                                                    </div>
                                                    <div>
                                                        <i className="bi bi-calendar2-minus pe-1"></i>
                                                        {course.sessions}
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <span className="bg-caption">{course.level}</span>
                                                </div>
                                            </div>

                                            <div className="card_button_parent mt-auto">
                                                <button>View more</button>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <h3 className="section_base_heading text-black text-center">Hear from Our <span className="text-c2"> Learners</span></h3>
                    <div className="testimonial_wrap w-100 mt-3">
                        <div className="section_container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="testimonial_parent">
                                        <Swiper
                                            modules={[Autoplay, Pagination]}
                                            slidesPerView={1}
                                            loop={true}
                                            autoplay={{
                                                delay: 4000,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{ clickable: true }}
                                        >
                                            <SwiperSlide>
                                                <p>
                                                    I joined with very little knowledge, but the classes were explained in a simple way.The trainers cleared my doubts patiently every day. The assignments actually helped me understand the concepts better. Overall, I feel more confident now than when I started.
                                                </p>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <p>
                                                    I joined with very little knowledge, but the classes were explained in a simple way.The trainers cleared my doubts patiently every day. The assignments actually helped me understand the concepts better. Overall, I feel more confident now than when I started.
                                                </p>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <p>
                                                    I joined with very little knowledge, but the classes were explained in a simple way.The trainers cleared my doubts patiently every day. The assignments actually helped me understand the concepts better. Overall, I feel more confident now than when I started.
                                                </p>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-3">
                    <div className="section_container live_courses_sec">

                        {/* Heading */}
                        <div className="col-12 d-flex justify-content-center">
                            <div className="col-lg-6">
                                <h3 className="section_base_heading text-black text-center">
                                    Premium Recorded <span className="text-c2"> Courses for Smarter </span> Skill Building
                                </h3>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                            {Object.keys(this.recordedCourseTabs).map((key) => (
                                <button
                                    key={key}
                                    className={`course_tab_btn ${this.state.activeRecordedTab === key ? "active" : ""
                                        }`}
                                    onClick={() => this.setState({ activeRecordedTab: key })}
                                >
                                    {this.recordedCourseTabs[key].label}
                                </button>
                            ))}
                        </div>

                        {/* Slider */}
                        <div className="row">
                            <Swiper
                                key={this.state.activeRecordedTab}
                                className="py-5"
                                modules={[Pagination]}
                                spaceBetween={30}
                                slidesPerView={3}
                                loop={true}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                            >
                                {this.recordedCourseTabs[
                                    this.state.activeRecordedTab
                                ].courses.map((course, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={`card_parent p-4 h-100 ${index % 2 === 0 ? "one" : "two"}`}>
                                            <div className="card_img_parent overflow-hidden">
                                                <img
                                                    src={course.img}
                                                    className="card_img w-100"
                                                    alt={course.title}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="pt-3">
                                                <h4 className="fw-bold">{course.title}</h4>
                                                <p className="mb-2">{course.desc}</p>

                                                <div className="d-flex gap-3 py-3">
                                                    <div>{course.rating}</div>
                                                    <div>
                                                        <i className="bi bi-calendar2-minus pe-1"></i>
                                                        {course.sessions}
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <span className="bg-caption">{course.level}</span>
                                                </div>
                                            </div>

                                            <div className="card_button_parent mt-auto">
                                                <button>View more</button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <section className="from_start_sec">
                    <div className="container">
                        <h3 className="section_base_heading text-center">
                            From Start To <span className="text-c2">Success</span>
                        </h3>

                        <div className="journey_wrap position-relative">

                            {/* Center faded icon / graphic */}
                            <div className="journey_bg_icon"></div>
                            <div className="dotted_lines">
                                <div className="position-relative d-flex justify-content-center">
                                    <img src="assets/images/journey/dotted-lines.png" className="dotted-line-img" alt="" />
                                </div>
                            </div>
                            <div className="rocket_wrap">
                                <img src="assets/images/journey/rocket.png" className="rocket_img" alt="" />
                            </div>
                            {/* Item 1 */}
                            <div className="journey_item item_1">
                                <img src="assets/images/journey/step-1.png" alt="" />
                                <h6>Career Guidance With Free Demo</h6>
                                <p>Get expert advice and choose the right IT career path.</p>

                            </div>

                            {/* Item 2 */}
                            <div className="journey_item item_2">
                                <h6>Course Commencement</h6>
                                <p>Start live online classes with structured, beginner-friendly lessons.</p>
                                <img src="assets/images/journey/step-2.png" alt="" />
                            </div>

                            {/* Item 3 */}
                            <div className="journey_item item_3">
                                <img src="assets/images/journey/step-3.png" alt="" />
                                <h6>Periodical Activity & Assessments</h6>
                                <p>Practice regularly with tasks and quick assessments.</p>
                            </div>

                            {/* Item 4 */}
                            <div className="journey_item item_4">
                                <h6>Real Time Projects Submission</h6>
                                <p>Apply your skills through industry-level practical projects.</p>
                                <img src="assets/images/journey/step-4.png" alt="" />
                            </div>

                            {/* Item 5 */}
                            <div className="journey_item item_5">
                                <img src="assets/images/journey/step-5.png" alt="" />
                                <h6>Job Placement Assistance</h6>
                                <p>Boost your resume, crack interviews and step into your dream role.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="pb-5">
                        <div className="section_container p-xl text-center mt-5">
                            <h3 className="section_base_heading text-center">
                                Authorised <span className="text-c2"> Partners</span>
                            </h3>
                            <Swiper
                                className="pt-5"
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
                                            src={`assets/images/partners/${logo}`}
                                            alt={`Partner ${index + 1}`}
                                            className="partner-logo"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="py-5">
                        <div className="section_container p-xl text-center mt-5 ide_sec">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="col-lg-10">
                                    <h3 className="section_base_heading text-center">
                                        Code with <span className="text-c2">Confidence.</span> Learn with <span className="text-c2">Purpose.</span> Grow with <span className="text-c2">Velearn.</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <div className="col-lg-12 col-xl-10">
                                    <div className="row w-100">
                                        <div className="col-lg-6  d-flex justify-content-center align-items-center">
                                            <div className="w-100 h-100 left_box"
                                                style={{ background: 'url("assets/images/text-editor.png")', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                                            ></div>
                                        </div>
                                        <div className="col-lg-6 py-4">
                                            <div className="pb-3 d-flex flex-column justify-content-start">
                                                <h4 className="fw-bold text-start">IDE</h4>
                                                <p className="text-start">
                                                    Velearn offers a fully integrated online IDE where students can write, run, and test code in a real-time development environment. This hands-on setup helps learners build coding confidence and improve practical programming skills with continuous practice.
                                                </p>
                                                <button>Start</button>
                                            </div>
                                            <div className="pt-3 d-flex flex-column justify-content-start">
                                                <h4 className="fw-bold text-start">Debugging</h4>
                                                <p className="text-start">
                                                    Sharpen your problem-solving skills with Velearn’s structured debugging exercises. Students receive curated programs with errors to identify, fix, and optimize—building strong debugging skills essential for industry-ready development
                                                </p>
                                                <button>Start</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="pb-5">
                        <div className="section_container p-xl text-center mt-5">
                            <h3 className="section_base_heading text-center">
                                Prime <span className="text-c2"> Recruiters</span>
                            </h3>
                            <div className="pb-5">
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={5}
                                    autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: true }}
                                    grabCursor={true}
                                    loop={true}
                                    breakpoints={{
                                        320: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 5 },
                                    }}
                                >
                                    {recruiters1.map((logo, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={`assets/images/prime-recruiters/${logo}`}
                                                alt={`Partner ${index + 1}`}
                                                className="partner-logo"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="pt-4">
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
                                    {recruiters2.map((logo, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={`assets/images/prime-recruiters/${logo}`}
                                                alt={`Partner ${index + 1}`}
                                                className="partner-logo"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="w-100 get_started_sec">
                        <div className="section_container">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="col-lg-6">
                                    <h5 className="text-center text-white">Get<span className="text-c2"> Started</span></h5>
                                    <h3 className="section_base_heading text-white text-center">
                                        Ready to Transform
                                        <span className="text-c2"> Your Skills </span>into a Career?
                                    </h3>
                                    <p className="text-center text-white">
                                        Join thousands of learners who are building better futures with flexible leaming.
                                        Take your first step today and unlock real growth through knowledge.
                                    </p>
                                    <div className="d-flex mt-5 justify-content-evenly gap-3">
                                        <div className="d-flex start_learning">
                                            <div className="butt">
                                                Start Learning Now
                                            </div>
                                            <div className="icon_redirect"> <i className="bi bi-arrow-right-short"></i> </div>
                                        </div>
                                        <div className="d-flex view_butt">
                                            <div className="butt">
                                                View Package
                                            </div>
                                            <div className="icon_redirect"> <i className="bi bi-arrow-right-short"></i> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5">
                    <div className="section_container py-5 p-xl d-flex justify-content-center">
                        <div className="row justify-content-center">
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
                                                            <img src="assets/images/bento-vector-1.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 count_top_height">
                                                <div className="count_clr count_clr2 d-flex justify-content-center align-items-center">
                                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Video Lessons</h6>
                                                        <h2>2000+</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 count_top_height">
                                                <div className="count_clr count_clr3">
                                                    <div className="d-flex justify-content-center gap-2 align-items-center">
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
                                    <div className="col-lg-5 count_top_sm_height px-4">
                                        <div className="col-lg-12 h-100">
                                            <div className="count_clr count_clr4">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <h6>Minutes of Video Watched</h6>
                                                    <h2>20000+</h2>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img src="assets/images/bento-vector-3-2.png" className="image-1" alt="" />
                                                    <img src="assets/images/bento-vector-3-1.png" className="image-2" alt="" />
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
                                                    <img src="assets/images/bento-vector-2.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="py-5 form_sec">
                        <form action="#">
                            <h4>Demo, Discounts, or Questions?<span className="text-c2"> Talk to us.</span></h4>
                            <div>
                                <input type="text" placeholder="Name" />
                            </div>
                            <div>
                                <input type="text" placeholder="Phone No" />
                            </div>
                            <div>
                                <input type="text" placeholder="Email" />
                            </div>
                            <button>Submit</button>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}

export default HomePage;
