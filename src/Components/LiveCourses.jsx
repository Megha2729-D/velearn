import { Component, createRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Link, NavLink } from 'react-router-dom';
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

class LiveCourses extends Component {
    render() {

        return (
            <>
                <section>
                    <div className="v-banner">
                        <div className="section_container">
                            <div id="v-banner-carousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">

                                    {/* Slide 1 - Full Stack Web Dev */}
                                    <div className="carousel-item active">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <p>Live Classes available in English, தமிழ், हिंदी, తెలుగు...</p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 right-banner-bg live-banner-bg"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 2 - UI/UX */}
                                    <div className="carousel-item">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>UI / UX Design Program</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <p>Live Classes available in English, தமிழ், हिंदी, తెలుగు...</p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 right-banner-bg live-banner-bg"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 3 - Python */}
                                    <div className="carousel-item">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Python Programming</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <p>Live Classes available in English, தமிழ், हिंदी, తెలుగు...</p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 right-banner-bg live-banner-bg"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 4 - Data Science */}
                                    <div className="carousel-item">
                                        <div className="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Data Science & AI</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <p>Live Classes available in English, தமிழ், हिंदी, తెలుగు...</p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 banner-bg"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Previous button */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#v-banner-carousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                {/* Next button */}
                                <button className="carousel-control-next" type="button" data-bs-target="#v-banner-carousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="section_container live_courses_sec">
                        <h3 className="section_base_heading text-black text-center">Start Your Career With
                            <span className="text-c2"> Live Classes</span></h3>
                        <div className="row">
                            {[
                                {
                                    title: "Adobe After Effects using VFX Masterclass",
                                    img: "assets/images/course.png",
                                    desc: "Master advanced JavaScript concepts used in real-world applications.",
                                    duration: "3 Months"
                                },
                                {
                                    title: "Adobe After Effects using VFX Masterclass",
                                    img: "assets/images/course.png",
                                    desc: "Master advanced JavaScript concepts used in real-world applications.",
                                    duration: "3 Months"
                                },
                                {
                                    title: "Adobe After Effects using VFX Masterclass",
                                    img: "assets/images/course.png",
                                    desc: "Master advanced JavaScript concepts used in real-world applications.",
                                    duration: "3 Months"
                                },
                                {
                                    title: "Adobe After Effects using VFX Masterclass",
                                    img: "assets/images/course.png",
                                    desc: "Master advanced JavaScript concepts used in real-world applications.",
                                    duration: "3 Months"
                                },
                            ].map((course, index) => (
                                <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-12 mb-5 mb-lg-0">
                                    <div className={`card_parent h-100 d-flex flex-column ${index % 2 === 0 ? "one" : "two"}`}>
                                        <div className="card_img_parent overflow-hidden position-relative">
                                            <img
                                                src={course.img}
                                                className="card_img w-100"
                                                alt={course.title}
                                            />
                                            <div className="live_parent d-flex gap-2 align-items-center justify-content-center">
                                                <div className="live_icon"></div>
                                                <span className="live_word">Live</span>
                                            </div>
                                        </div>

                                        <div className="pt-3 d-flex flex-column align-items-start flex-grow-1">
                                            <h4>{course.title}</h4>

                                            <p className="mb-0">{course.desc}</p>

                                            <div className="duration_txt d-flex justify-content-end gap-3 w-100 mt-auto">
                                                <div>
                                                    <i className="bi bi-clock pe-1"></i>
                                                    {course.duration}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 card_abs_butt">
                                            <div className="col-12 d-flex justify-content-between">
                                                <div className="syllabus_butt">
                                                    <button>Syllabus</button>
                                                </div>
                                                <div className="view_more_butt">
                                                    <button>View more</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-12 d-flex justify-content-center more_butt_parent">
                                <NavLink to="/">
                                    <div className="d-flex more_butt">
                                        <div className="butt">Show More</div>
                                        <div className="icon_redirect">
                                            <i className="bi bi-arrow-right-short"></i>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5 benefits_sec">
                    <div className="section_container">
                        <h3 className="section_base_heading text-center">
                            Benefits of <span className="text-c2">Live Classes</span>
                        </h3>
                        <div className="live_benefits_parent justify-content-center mt-4">
                            <div className="benefit_card b1 small">
                                <div className="flex-column">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-1.png`} alt="" />
                                    <h4>Career Focused Guidance</h4>
                                </div>
                            </div>
                            <div className="benefit_card b2 big">
                                <div className="flex-column flex-md-row flex-lg-row">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-2.png`} alt="" />
                                    <h4>Industry Tools & Technologies</h4>
                                </div>
                            </div>
                            <div className="benefit_card b3 small">
                                <div className="flex-column">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-3.png`} alt="" />
                                    <h4>Live Industry Examples</h4>
                                </div>
                            </div>
                            <div className="benefit_card b4 small">
                                <div className="flex-column">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-4.png`} alt="" />
                                    <h4>Hands-On Live Projects</h4>
                                </div>
                            </div>
                            <div className="benefit_card b5 big">
                                <div className="flex-column flex-md-row flex-lg-row">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-5.png`} alt="" />
                                    <h4>Doubt Solving Sessions</h4>
                                </div>
                            </div>
                            <div className="benefit_card b6 small">
                                <div className="flex-column">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-6.png`} alt="" />
                                    <h4>Mock Test & Practice Questions</h4>
                                </div>
                            </div>

                            <div className="benefit_card b7 small">
                                <div className="flex-column">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-7.png`} alt="" />
                                    <h4>Placement Assistance</h4>
                                </div>
                            </div>
                            <div className="benefit_card b8 big">
                                <div className="flex-column flex-md-row flex-lg-row">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-8.png`} alt="" />
                                    <h4>Weekdays / Weekend Live Classes</h4>
                                </div>
                            </div>
                            <div className="benefit_card b9 small">
                                <div className="flex-column">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-9.png`} alt="" />
                                    <h4>Quick Tech Support</h4>
                                </div>
                            </div>
                            <div className="benefit_card b10 big">
                                <div className="flex-column flex-md-row flex-lg-row">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-vector-10.png`} alt="" />
                                    <h4>Industry Recognized Certificates</h4>
                                </div>
                            </div>
                            <div className="benefit_card b11 big">
                                <div className="position-relative flex-column flex-md-row flex-lg-row">
                                    <img src={`${process.env.PUBLIC_URL}assets/images/live-course-vector/lc-vector-11-1.png`} alt="" />
                                    <h4 className="mb-5 mb-lg-0">Invite Friends & Get Benefits</h4>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-coin-full.png`} className="lc_coin lc_coin_1" alt="" />
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-coin-full.png`} className="lc_coin lc_coin_2" alt="" />
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/live-course-vector/lc-coin-half.png`} className="lc_coin lc_coin_3" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section_container">
                    <div className="pb-5">
                        <div className="queries_sec">
                            <div>
                                <h3 className="text-white fw-bold text-center">Still have queries? Contact Us</h3>
                                <p className="text-white text-center">
                                    Request a Callback. An expert from the admissions office will call you in the next 24 working hours. You can also reach out to us at @@@@@ or +91xxxxxxxx
                                </p>
                                <button>Contact Us</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5 live_course_review">
                    <div className="section_container">
                        <h3 className="section_base_heading text-center">
                            Student <span className="text-c2">Outcomes & Testimonials</span>
                        </h3>

                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={70}
                            slidesPerView={4}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                576: { slidesPerView: 2 },
                                992: { slidesPerView: 4 },
                            }}
                            className="mt-lg-5 mt-3 testimonials_swiper"
                        >
                            {[
                                {
                                    img: "/assets/images/testimonial/live-course/person-1.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-2.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-3.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-4.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-1.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-2.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-3.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                                {
                                    img: "/assets/images/testimonial/live-course/person-4.png",
                                    text: "Live classes were very interactive and easy to understand. Doubts were cleared instantly, which really helped my learning."
                                },
                            ].map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="testimonial_card text-center">
                                        <img src={item.img} alt={item.name} />
                                        <p>{item.text}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            </>
        )
    }
}
export default LiveCourses;
