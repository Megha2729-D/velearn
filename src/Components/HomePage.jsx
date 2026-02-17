import { Component, createRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Link, NavLink } from 'react-router-dom';
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const BASE_API_URL = "https://www.iqvideoproduction.com/api/";
const BASE_IMAGE_URL = "https://www.iqvideoproduction.com/assets/images/";
const BASE_DYNAMIC_IMAGE_URL = "https://www.iqvideoproduction.com/uploads/";

class HomePage extends Component {
    componentDidMount() {
        // --- Counter Animation ---
        const counters = document.querySelectorAll(".counter");
        const counterParent = document.querySelector(".counter_parent");

        if (counterParent && counters.length > 0) {
            const animateCounter = (counter) => {
                const target = +counter.getAttribute("data-target");
                const duration = 3000;
                const startTime = performance.now();

                const update = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * target);

                    counter.innerText = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target + "+";
                    }
                };

                requestAnimationFrame(update);
            };

            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        counters.forEach(animateCounter);
                        observer.disconnect();
                    }
                },
                { threshold: 0.4 }
            );

            observer.observe(counterParent);
        }

        // --- Swipe Support for Carousel ---
        const carousel = document.getElementById("v-banner-carousel");
        let startX = 0, endX = 0;

        if (carousel) {
            carousel.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX;
            });

            carousel.addEventListener("touchmove", (e) => {
                endX = e.touches[0].clientX;
            });

            carousel.addEventListener("touchend", () => {
                const threshold = 50;
                let bsCarousel = bootstrap.Carousel.getInstance(carousel);

                // If Carousel instance does not exist, create one
                if (!bsCarousel) {
                    bsCarousel = new bootstrap.Carousel(carousel);
                }

                if (startX - endX > threshold) {
                    bsCarousel.next();
                } else if (endX - startX > threshold) {
                    bsCarousel.prev();
                }
            });
        }

        // --- Fetch Courses ---
        fetch(`${BASE_API_URL}courses`)
            .then(res => res.json())
            .then((data) => {
                if (data.success && data.courses) {
                    const courses = data.courses;

                    // Set main list
                    this.setState({ coursesList: courses });

                    // Build Latest Courses Per Category
                    const coursesByCategory = courses.reduce((acc, course) => {
                        const cat = course.category || "Other";
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push(course);
                        return acc;
                    }, {});

                    // Sort & take latest 5
                    Object.keys(coursesByCategory).forEach(cat => {
                        coursesByCategory[cat] = coursesByCategory[cat]
                            .sort((a, b) =>
                                new Date(b.updatedAt || b.createdAt || b._id) -
                                new Date(a.updatedAt || a.createdAt || a._id)
                            )
                            .slice(0, 5);
                    });

                    this.setState({
                        recordedCourses: coursesByCategory,
                        activeRecordedTab: "Software Development"
                    });
                }
            })
            .catch(err => console.error("Failed to fetch courses:", err));
    }


    state = {
        coursesList: [],
        activeRecordedTab: "software",
        activeFaqIndex: 0,
        activeImage: "testimonial/arun-vikkashamuthu.png",
        recordedCourses: {},
    };

    testimonialData = [
        {
            img: "testimonial/arun-vikkashamuthu.png",
            text: `I joined with very little knowledge, but the classes
        were explained in a simple way. The trainers cleared my
        doubts patiently every day. The assignments helped me
        understand the concepts better. I feel more confident now.`,
        },
        {
            img: "testimonial/person-1.jpg",
            text: `The assignments helped me a lot to understand the real concepts.
        Trainers supported daily and cleared all doubts quickly.`
        },
        {
            img: "testimonial/person-2.jpg",
            text: `Simple teaching with examples helped me improve quickly.
        Highly recommended for beginners and career transitions.`
        },
        {
            img: "testimonial/arun-vikkashamuthu.png",
            text: `I joined with very little knowledge, but the classes
        were explained in a simple way. The trainers cleared my
        doubts patiently every day. The assignments helped me
        understand the concepts better. I feel more confident now.`,
        },
        {
            img: "testimonial/person-1.jpg",
            text: `The assignments helped me a lot to understand the real concepts.
        Trainers supported daily and cleared all doubts quickly.`
        },
        {
            img: "testimonial/person-2.jpg",
            text: `Simple teaching with examples helped me improve quickly.
        Highly recommended for beginners and career transitions.`
        },
    ];

    handleSlideChange = (swiper) => {
        const newIndex = swiper.realIndex;
        this.setState({ activeImage: this.testimonialData[newIndex].img });
    };
    levelClassMap = {
        Beginner: "level-beginner",
        Intermediate: "level-intermediate",
        Advanced: "level-advanced",
    };

    faqData = [
        {
            question: "Why Should I Choose Velearn  for IT Training?",
            answer: (
                <>
                    <p>
                        Velearn is the best choice for Tamil-based IT training because we offer
                        affordable course fees, flexible batch timings, live + recorded classes,
                        and strong placement support for students. Our teaching style is simple,
                        beginner-friendly, and focused on real-time IT skills. Whether you want
                        to upskill or start a new career, Velearn provides job-oriented training
                        with practical projects, making it one of the most trusted online IT
                        training institutes.
                    </p>
                </>
            )
        },
        {
            question: "What courses are offered by Velearn?",
            answer: (
                <>
                    <p>
                        Velearn offers future-ready IT training programs designed to build strong careers in today’s tech industry. Our live courses cover key areas like software development, data-driven technologies, AI skills, and digital tools, helping students stay job-ready.
                    </p>
                    <p>
                        We also provide recorded IT programs in programming basics, web technologies, IT infrastructure, and other upskilling modules. Every course includes practical training, updated content, and job-focused learning to support your overall IT career growth.
                    </p>

                </>
            )
        },
        {
            question: "How can I book a free demo for any course?",
            answer: (
                <>
                    <p>You can easily attend a free demo class for any course at Velearn. Just submit the demo request form or click the Contact Us button on the website. In the free demo, you will get a complete understanding of the course syllabus, trainer experience, placement process, project training, and learning style. This helps you choose the right IT course before enrolling.</p>
                </>
            )
        },
        {
            question: "What support is available during the course?",
            answer: (
                <>
                    <p>Velearn provides full student support throughout the training. You will get access to a personal support executive who helps you with:</p>
                    <ul>
                        <li>Technical doubts</li>
                        <li>Class issues</li>
                        <li>Batch allocation</li>
                        <li>Rescheduling or shifting batches</li>
                        <li>Assignment guidance</li>
                    </ul>
                    <p>
                        Along with this, you get mentor support, WhatsApp help, and doubt-clearing assistance, making the learning experience smooth and stress-free.
                    </p>
                </>
            )
        },
        {
            question: "How can I interact with mentors?",
            answer: (
                <>
                    <p>You can interact with Velearn mentors anytime through live doubt-clearing sessions, chat support, and WhatsApp guidance. Students can ask questions directly during class or through the support chat whenever needed. Mentors ensure every doubt is solved quickly so your IT learning journey stays smooth and clear.</p>
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
        const CATEGORY_ORDER = [
            "Software Development",
            "Web Development",
            "Business Management",
            "IT Infrastructure Management",
            "Special Programs"
        ];

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
                <section className="v-banner">
                    <div className="section_container h-100">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            autoplay={{ delay: 5000 }}
                            loop={true}
                            navigation={true}
                            slidesPerView={1}
                            style={{ width: "100%", height: "100%" }}
                            className="v-banner-swiper"
                        >
                            {this.state.coursesList?.slice(0, 3).map(course => (
                                <SwiperSlide key={course._id}>
                                    <div className="row align-items-center py-4">
                                        <div className="col-lg-7 d-flex flex-column align-items-center align-items-lg-start">
                                            <h5 className="text-white text-center text-lg-start">{course.title}</h5>
                                            <p className="text-white text-center text-lg-start">{course.sub_description}</p>
                                            <Link to={`/course-details/${course._id}`}>
                                                <button>Explore now</button>
                                            </Link>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="right-banner-bg home-banner-bg"></div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                    {/* <div className="v-banner">
                        <div className="section_container">
                            <div id="v-banner-carousel"
                                className="carousel slide"
                                data-bs-ride="carousel"
                                data-bs-interval="5000"
                                data-bs-pause="false"
                                data-bs-touch="true"
                            >
                                <div className="carousel-inner">
                                    {this.state.coursesList && this.state.coursesList.slice(0, 3).map((course, idx) => (
                                        <div
                                            key={course._id}
                                            className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                        >
                                            <div className="carousel-caption">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-7">
                                                        <h5>{course.title}</h5>
                                                        <p>{course.sub_description}</p>
                                                        <Link to={`/course-details/${course._id}`}>
                                                            <button>Explore now</button>
                                                        </Link>
                                                    </div>
                                                    <div className="col-lg-5 right-banner-bg home-banner-bg"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#v-banner-carousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                <button className="carousel-control-next" type="button" data-bs-target="#v-banner-carousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div> */}
                </section>
                <section>
                    <div className="section_container overflow-hidden">
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
                                            <img src={`${BASE_IMAGE_URL}icons/phone.png`} className="phone-img" alt="" />
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
                                    <img src={`${BASE_IMAGE_URL}about-vector-person.png`} className="vector_about m-auto w-75" alt="" />
                                </div>
                                <div className="dotted_circle_parent">
                                    <div className="dotted_circle outer-dotted"></div>
                                    <div className="dotted_circle inner-dotted"></div>
                                </div>
                                <div className="counter_parent">
                                    <div className="counter_group">
                                        <div className="counter_child counter_one">
                                            <div>
                                                <h4 className="counter" data-target="10">0</h4>
                                                <p className="text-uppercase">Authorized Partner</p>
                                            </div>
                                        </div>
                                        <div className="counter_child counter_two">
                                            <div>
                                                <h4 className="counter" data-target="10">0</h4>
                                                <p className="text-uppercase">Qualified Trainers</p>
                                            </div>
                                        </div>
                                        <div className="counter_child counter_three">
                                            <div>
                                                <h4 className="counter" data-target="50">0</h4>
                                                <p className="text-uppercase">Certified Courses</p>
                                            </div>
                                        </div>
                                        <div className="counter_child counter_four">
                                            <div>
                                                <h4 className="counter" data-target="100">0</h4>
                                                <p className="text-uppercase">Hiring Partner</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="tech_icon">
                                    <div className="tech_wrap">
                                        <img src={`${BASE_IMAGE_URL}icons/react.png`} className="tech-icon tech-icon-one" alt="" />
                                        <img src={`${BASE_IMAGE_URL}icons/js.png`} className="tech-icon tech-icon-two" alt="" />
                                        <img src={`${BASE_IMAGE_URL}icons/angular.png`} className="tech-icon tech-icon-three" alt="" />
                                        <img src={`${BASE_IMAGE_URL}icons/python.png`} className="tech-icon tech-icon-four" alt="" />
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
                            {[
                                {
                                    title: "Full Stack Development",
                                    img: `${process.env.PUBLIC_URL}/assets/images/live-course/full-stack-development.jpg`,
                                    desc: "A live, mentor-led Full Stack Development program designed to take you from fundamentals to production-ready applications — with real projects, real tools, and real career support.",
                                    duration: "3 Months",
                                    link: "/live-course/full-stack-development"
                                },
                                {
                                    title: "UI/UX Design",
                                    img: `${process.env.PUBLIC_URL}/assets/images/live-course/ui-ux.webp`,
                                    desc: "Learn UI/UX design through live classes, hands-on projects, and expert mentorship. Master user research, UX strategy, and modern UI design to become job-ready with a strong portfolio.",
                                    duration: "3 Months",
                                    link: "/live-course/ui-ux-design"
                                },
                                {
                                    title: "Digital Marketing",
                                    img: `${process.env.PUBLIC_URL}/assets/images/live-course/digital-marketing.webp`,
                                    desc: "This live Digital Marketing training program is designed to build job-ready skills through hands-on campaign execution, real-time tools, and expert mentorship— preparing you for high-growth roles in today’s digital economy.",
                                    duration: "3 Months",
                                    link: "/live-course/digital-marketing"
                                },
                                {
                                    title: "Data Science & AI",
                                    img: `${process.env.PUBLIC_URL}/assets/images/live-course/data-science.webp`,
                                    desc: "This live Data Science and AI/ML program helps you develop job-ready analytical and machine learning skills through hands-on projects, real datasets, and continuous mentor guidance—preparing you for high-impact roles in today’s data-driven world.",
                                    duration: "3 Months",
                                    link: "/"
                                }
                            ].map((course, index) => (
                                <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-12 mb-5 mb-lg-0">
                                    <div className={`card_parent h-100 d-flex flex-column ${index % 2 === 0 ? "one" : "two"}`}>
                                        <div className="card_img_parent overflow-hidden position-relative">
                                            <img
                                                src={`${course.img}`}
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

                                            <div className="duration_txt d-flex justify-content-end gap-3 w-100">
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
                                                    <Link to={`${course.link}`}>
                                                        <button>View more</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-12 d-flex justify-content-center more_butt_parent">
                                <NavLink to="/live-course">
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
                <section className="py-5">
                    <h3 className="section_base_heading text-black text-center">
                        Hear from Our <span className="text-c2">Learners</span>
                    </h3>

                    <div className="testimonial_wrap w-100 mt-3">
                        <div className="section_container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="testimonial_parent">

                                        {/* FLOATING IMAGE */}
                                        <div className="testimonial_img_wrap">
                                            <img
                                                src={`${BASE_IMAGE_URL}${this.state.activeImage}`}
                                                className="testi_img"
                                                alt="testimonial"
                                            />
                                        </div>

                                        <Swiper
                                            modules={[Autoplay, Pagination]}
                                            slidesPerView={1}
                                            loop={true}
                                            slidesPerGroup={2}
                                            autoplay={{
                                                delay: 4000,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{ clickable: true }}
                                            onSlideChange={(swiper) => this.handleSlideChange(swiper)}
                                        >
                                            {this.testimonialData.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <p>{item.text}</p>
                                                </SwiperSlide>
                                            ))}
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

                        <div className="mt-4 recorded_tab_parent">
                            {Object.keys(this.state.recordedCourses)
                                .sort((a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b))
                                .map((category) => (
                                    <button
                                        key={category}
                                        className={`course_tab_btn ${this.state.activeRecordedTab === category ? "active" : ""}`}
                                        onClick={() => this.setState({ activeRecordedTab: category })}
                                    >
                                        {category}
                                    </button>
                                ))}
                        </div>

                        {/* Slider */}
                        <div className="row">
                            <Swiper
                                key={this.state.activeRecordedTab}
                                className="py-5"
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={4}
                                loop={true}
                                navigation={true}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                    1300: { slidesPerView: 4 },
                                }}
                            >
                                {(this.state.recordedCourses[this.state.activeRecordedTab] || []).map((course, index) => (
                                    <SwiperSlide key={course._id}>
                                        <Link to={`/course-details/${course._id}`}>
                                            <div className={`card_parent h-100 d-flex flex-column ${index % 2 === 0 ? "one" : "two"}`}>
                                                <div className="card_img_parent overflow-hidden">
                                                    <img src={`${BASE_DYNAMIC_IMAGE_URL}courses/${course.image}`} className="card_img w-100" alt={course.title} />
                                                </div>

                                                <div className="pt-3 d-flex flex-column align-items-start flex-grow-1">
                                                    <h4 className="fw-bold">{course.title}</h4>
                                                    <p className="mb-2">{course.sub_description}</p>

                                                    <div className="d-flex justify-content-between align-items-center gap-3 w-100 mt-auto">
                                                        <div className="recorded_course_duration">
                                                            <div className="my-2">
                                                                <i className="bi bi-clock pe-1 my-2"></i>
                                                                {course.course_duration}
                                                            </div>
                                                            {(course.course_type === "paid" || course.course_type === "combo") && (
                                                                <div className="d-flex align-items-center mt-2">
                                                                    <i className="bi bi-star-fill pe-1"></i>
                                                                    <i className="bi bi-star-fill pe-1"></i>
                                                                    <i className="bi bi-star-fill pe-1"></i>
                                                                    <i className="bi bi-star-fill pe-1"></i>
                                                                    <i className="bi bi-star-fill pe-1"></i>
                                                                    <span>({course.rating || "4.6"})</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            {course.buy_price ? (
                                                                <>
                                                                    <span className="new_price">&#8377; {course.buy_price}</span>
                                                                    <span className="old_price"><s>&#8377; {course.mrp_price}</s></span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {course.course_type === "free" &&
                                                                        <div>
                                                                            <i className="bi bi-star-fill pe-1"></i>
                                                                            <i className="bi bi-star-fill pe-1"></i>
                                                                            <i className="bi bi-star-fill pe-1"></i>
                                                                            <i className="bi bi-star-fill pe-1"></i>
                                                                            <i className="bi bi-star-fill pe-1"></i>
                                                                            (4.6)
                                                                        </div>
                                                                    }</>
                                                                // <span className="free_course">Free</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {course.course_type === "paid" && <div className="paid_butt mt-3"> Paid </div>}
                                                {course.course_type === "free" && <div className="free_butt mt-3"> Free </div>}
                                                {course.course_type === "combo" && <div className="combo_butt mt-3"> Combo </div>}
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="col-12 d-flex justify-content-center more_butt_parent">
                                <NavLink to="/recorded-course">
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
                {/* <section className="from_start_sec">
                    <div className="container">
                        <h3 className="section_base_heading text-center">
                            From Start To <span className="text-c2">Success</span>
                        </h3>

                        <div className="journey_wrap position-relative">

                            <div className="journey_bg_icon"></div>
                            <div className="dotted_lines">
                                <div className="position-relative d-flex justify-content-center">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/journey/dotted-lines.png`} className="dotted-line-img" alt="" />
                                </div>
                            </div>
                            <div className="rocket_wrap">
                                <img src={`${process.env.PUBLIC_URL}assets/images/journey/rocket.png`} className="rocket_img" alt="" />
                            </div>
                            <div className="journey_item item_1">
                                <img src={`${process.env.PUBLIC_URL}assets/images/journey/step-1.png`} alt="" />
                                <h6>Career Guidance With Free Demo</h6>
                                <p>Get expert advice and choose the right IT career path.</p>
                            </div>

                            <div className="journey_item item_2">
                                <h6>Course Commencement</h6>
                                <p>Start live online classes with structured, beginner-friendly lessons.</p>
                                <img src={`${process.env.PUBLIC_URL}assets/images/journey/step-2.png`} alt="" />
                            </div>

                            <div className="journey_item item_3">
                                <img src={`${process.env.PUBLIC_URL}assets/images/journey/step-3.png`} alt="" />
                                <h6>Periodical Activity & Assessments</h6>
                                <p>Practice regularly with tasks and quick assessments.</p>
                            </div>

                            <div className="journey_item item_4">
                                <h6>Real Time Projects Submission</h6>
                                <p>Apply your skills through industry-level practical projects.</p>
                                <img src={`${process.env.PUBLIC_URL}assets/images/journey/step-4.png`} alt="" />
                            </div>

                            <div className="journey_item item_5">
                                <img src={`${process.env.PUBLIC_URL}assets/images/journey/step-5.png`} alt="" />
                                <h6>Job Placement Assistance</h6>
                                <p>Boost your resume, crack interviews and step into your dream role.</p>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section>
                    <div className="pb-5 pt-lg-5 logo_swiper">
                        <div className="section_container p-xl text-center mt-5">
                            <h3 className="section_base_heading text-center">
                                Authorised <span className="text-c2"> Partners</span>
                            </h3>
                            <Swiper
                                className="pt-5"
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={5}
                                speed={3000}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                grabCursor={false}
                                allowTouchMove={false}
                                breakpoints={{
                                    320: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {partners.map((logo, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={`${BASE_IMAGE_URL}partners/${logo}`}
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
                                <div className="col-lg-12">
                                    <div className="row w-100 m-auto">
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
                        <div className="section_container p-xl text-center mt-lg-5 logo_swiper">
                            <h3 className="section_base_heading text-center">
                                Prime <span className="text-c2"> Recruiters</span>
                            </h3>
                            <div className="pb-5">
                                <Swiper
                                    className="pt-5"
                                    modules={[Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={5}
                                    speed={3000}
                                    autoplay={{
                                        delay: 0,
                                        disableOnInteraction: false,
                                        reverseDirection: true
                                    }}
                                    loop={true}
                                    grabCursor={false}
                                    allowTouchMove={false}
                                    breakpoints={{
                                        320: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 5 },
                                    }}
                                >
                                    {recruiters1.map((logo, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={`${BASE_IMAGE_URL}prime-recruiters/${logo}`}
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
                                    speed={3000}
                                    autoplay={{
                                        delay: 0,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    grabCursor={false}
                                    allowTouchMove={false}
                                    breakpoints={{
                                        320: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 5 },
                                    }}
                                >
                                    {recruiters2.map((logo, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={`${BASE_IMAGE_URL}prime-recruiters/${logo}`}
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
                <section className="pt-lg-4">
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
                    <div className="section_container py-5 p-xl d-flex justify-content-center overflow-hidden">
                        <div className="row justify-content-center w-100">
                            {/* <div className="col-lg-10 col-12">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="row px-0 mx-0">
                                            <div className="col-12">
                                                <div className="count_clr count_clr1">
                                                    <div className="row">
                                                        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                                                            <h6>Active Learners</h6>
                                                            <h2>1000+</h2>
                                                        </div>
                                                        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                                                            <img src={`${process.env.PUBLIC_URL}/assets/images/bento-vector-1.png`} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 count_top_height">
                                                <div className="count_clr count_clr2 d-flex justify-content-center align-items-center">
                                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Video Lessons</h6>
                                                        <h2>2000+</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 count_top_height">
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
                                    <div className="col-5 count_top_sm_height px-4">
                                        <div className="col-12 h-100">
                                            <div className="count_clr count_clr4">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <h6 className="text-center">Minutes of Video Watched</h6>
                                                    <h2>20000+</h2>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/bento-vector-3-2.png`} className="image-1" alt="" />
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/bento-vector-3-1.png`} className="image-2" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 count_top_height px-3">
                                        <div className="count_clr count_clr5 d-flex justify-content-center align-items-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <h6>Doubts Cleared</h6>
                                                <h2>4500+</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-7 count_top_height px-3">
                                        <div className="count_clr count_clr6">
                                            <div className="row">
                                                <div className="col-8 ">
                                                    <div className="px-lg-5 ps-5 d-flex flex-column justify-content-center align-items-lg-start align-items-center">
                                                        <h6>Questions Practiced</h6>
                                                        <h2>5000+</h2>
                                                    </div>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/bento-vector-2.png`} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
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
                                                            <img src={`${BASE_IMAGE_URL}bento-vector-1.png`} alt="" />
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
                                                    <h6 className="text-center">Minutes of Video Watched</h6>
                                                    <h2>20000+</h2>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img src={`${BASE_IMAGE_URL}bento-vector-3-2.png`} className="image-1" alt="" />
                                                    <img src={`${BASE_IMAGE_URL}bento-vector-3-1.png`} className="image-2" alt="" />
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
                                                <div className="col-lg-8 col-12">
                                                    <div className="px-lg-5 ps-5 d-flex flex-column justify-content-center align-items-lg-start align-items-center">
                                                        <h6>Questions Practiced</h6>
                                                        <h2>5000+</h2>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12 d-flex justify-content-center align-items-center">
                                                    <img src={`${BASE_IMAGE_URL}bento-vector-2.png`} alt="" />
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
                    <div className="form_sec">
                        <div className="container">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="col-lg-5 col-xl-7">
                                    <form action="#">
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="col-lg-8">
                                                <h3 className="fw-bold text-c1 mb-4 text-center lh-base">Demo, Discounts, or Questions?<span className="text-c2"> Talk to us.</span></h3>
                                            </div>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Name" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Phone No" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Email" />
                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <button>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="faq_section py-5">
                    <div className="section_container p-xl text-center mt-lg-5">
                        <h3 className="section_base_heading">
                            Frequently Asked <span className="text-c2"> Questions</span>
                        </h3>

                        <div className="row mt-5 align-items-center">
                            {/* FAQ Accordion */}
                            <div className="col-lg-6 text-start">
                                {this.faqData.map((item, index) => (
                                    <div className={`faq_item mb-3  ${this.state.activeFaqIndex === index ? "active" : ""
                                        }`} key={index}>
                                        <button
                                            className={`faq_question ${this.state.activeFaqIndex === index ? "active" : ""
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
                                            <div className="faq_answer">
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Image */}
                            <div className="col-lg-6">
                                <img
                                    src={`${BASE_IMAGE_URL}faq.png`}
                                    className="w-100"
                                    alt="velearn FAQ"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default HomePage;
