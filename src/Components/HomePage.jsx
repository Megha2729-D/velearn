import { Component, createRef } from "react";
import "react-circular-progressbar/dist/styles.css";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

class HomePage extends Component {

    render() {
        return (
            <>
                <section>
                    <div className="v-banner">
                        <div className="section_container">
                            <div id="v-banner-carousel" className="carousel slide carousel-fade">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div class="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                                                    <img src="assets/images/banner-card.png" className="w-100" alt="Banner Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div class="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                                                    <img src="assets/images/banner-card.png" className="w-100" alt="Banner Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div class="carousel-caption">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <h5>Master in Full Stack Development</h5>
                                                    <p>
                                                        Become a job-ready full stack developer with hands-on live training in frontend, backend & real-time projects.
                                                    </p>
                                                    <button>Explore more</button>
                                                </div>
                                                <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                                                    <img src="assets/images/banner-card.png" className="w-100" alt="Banner Image" />
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
                                    <h1 className="secton_main_heading">Our Secret to Making
                                        <span> Learning Easy</span>
                                    </h1>
                                    <p className="mt-3">
                                        Velearn delivers clear, Well Designed structured learning with practical relevance.
                                        Fully explained in <span>தமிழ்</span>
                                    </p>
                                    <div className="col-12 mt-5">
                                        <div className="d-flex align-items-center">
                                            <img src="assets/images/icons/phone.png" className="phone-img" alt="" />
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
                                    <img src="assets/images/about-vector-person.png" className="vector_about w-75" alt="" />
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
                                        <img src="assets/images/icons/react.png" className="tech-icon tech-icon-one" alt="" />
                                        <img src="assets/images/icons/js.png" className="tech-icon tech-icon-two" alt="" />
                                        <img src="assets/images/icons/angular.png" className="tech-icon tech-icon-three" alt="" />
                                        <img src="assets/images/icons/python.png" className="tech-icon tech-icon-four" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pb-5">
                    <div className="section_container live_courses_sec">
                        <h3 className="secton_main_heading text-black text-center">Top Trending <span className="text-c2"> Live Courses</span></h3>
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
                                                    alt={course.title}
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
                <section className="pb-5">
                    <h3 className="secton_main_heading text-black text-center">Hear from Our <span className="text-c2"> Learners</span></h3>

                    <div className="testimonial_wrap w-100 mt-3">
                        <div className="section_container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="testimonial_parent">
                                        <p>
                                            I joined with very little knowledge, but the classes were explained in a simple way. The trainers cleared my doubts patiently every day. The assignments actually helped me understand the concepts better. Overall, I feel more confident now than when I started.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </>
        );
    }
}

export default HomePage;
