import { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class RecordedCourse extends Component {

    state = {
        search: "",
        activeCategory: "Software Development",
    };

    categories = [
        "Software Development",
        "Web Development",
        "IT Infrastructure Management",
        "Business Management",
        "Special Programs",
    ];

    recordedCourseTabs = {
        paid: {
            title: "Paid Courses",
            badgeText: "Paid",
            badgeClass: "paid_butt",
            courses: [
                {
                    title: "Master in Full Stack Development",
                    img: "assets/images/course.png",
                    desc: "Become a job-ready full stack developer with hands-on projects.",
                    rating: "(4.6)",
                    duration: "10 hrs",
                    newPrice: "500",
                    oldPrice: "1000",
                },
                {
                    title: "Master Data Science Course",
                    img: "assets/images/course.png",
                    desc: "Learn Python, ML & Data Analytics with real datasets.",
                    rating: "(4.7)",
                    duration: "10 hrs",
                    newPrice: "500",
                    oldPrice: "1000",
                },
                {
                    title: "Advanced UI/UX Design Course",
                    img: "assets/images/course.png",
                    desc: "Learn UX research, wireframing & Figma.",
                    rating: "(4.6)",
                    duration: "10 hrs",
                    newPrice: "500",
                    oldPrice: "1000",
                },
                {
                    title: "Cloud & DevOps Engineering",
                    img: "assets/images/course.png",
                    desc: "AWS, Docker, Kubernetes & CI/CD pipelines.",
                    rating: "(4.7)",
                    duration: "10 hrs",
                    newPrice: "500",
                    oldPrice: "1000",
                },
            ],
        },

        free: {
            title: "Free Courses",
            badgeText: "Free",
            badgeClass: "free_butt",
            courses: [
                {
                    title: "Master Data Science Course",
                    img: "assets/images/course.png",
                    desc: "Learn Python, ML & Data Analytics with real datasets.",
                    rating: "(4.7)",
                    duration: "10 hrs",
                },
                {
                    title: "Advanced UI/UX Design Course",
                    img: "assets/images/course.png",
                    desc: "Learn UX research, wireframing & Figma.",
                    rating: "(4.6)",
                    duration: "10 hrs",
                },
                {
                    title: "Cloud & DevOps Engineering",
                    img: "assets/images/course.png",
                    desc: "AWS, Docker, Kubernetes & CI/CD pipelines.",
                    rating: "(4.7)",
                    duration: "10 hrs",
                },
                {
                    title: "AI Career Accelerator",
                    img: "assets/images/course.png",
                    desc: "Mentor-led AI program with projects & placement support.",
                    rating: "(4.8)",
                    duration: "10 hrs",
                },
            ],
        },

        combo: {
            title: "Combo Courses",
            badgeText: "Combo",
            badgeClass: "combo_butt",
            courses: [
                {
                    title: "Full Stack + DevOps Combo",
                    img: "assets/images/course.png",
                    desc: "Full Stack + DevOps with real-time projects.",
                    rating: "(4.8)",
                    duration: "20 hrs",
                    newPrice: "900",
                    oldPrice: "1800",
                },
                {
                    title: "Data Science + AI Combo",
                    img: "assets/images/course.png",
                    desc: "Data Science with AI & ML projects.",
                    rating: "(4.9)",
                    duration: "22 hrs",
                    newPrice: "1000",
                    oldPrice: "2000",
                },
                {
                    title: "UI/UX + Frontend Combo",
                    img: "assets/images/course.png",
                    desc: "Design + React frontend mastery.",
                    rating: "(4.7)",
                    duration: "18 hrs",
                    newPrice: "800",
                    oldPrice: "1600",
                },
                {
                    title: "Cloud + DevOps Combo",
                    img: "assets/images/course.png",
                    desc: "AWS, Docker, Kubernetes end-to-end.",
                    rating: "(4.8)",
                    duration: "20 hrs",
                    newPrice: "950",
                    oldPrice: "1900",
                },
            ],
        },
    };

    renderExploreSection() {
        return (
            <section className="explore_courses_sec py-5">
                <div className="section_container">

                    {/* Title */}
                    <h2 className="text-center fw-bold mb-4">
                        Explore <span className="text-c2">Courses</span> By <span className="text-c2">Categories</span>
                    </h2>

                    {/* Categories */}
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                        {this.categories.map((cat, index) => (
                            <button
                                key={index}
                                className={`category_pill ${this.state.activeCategory === cat ? "active" : ""
                                    }`}
                                onClick={() => this.setState({ activeCategory: cat })}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="d-flex justify-content-center mb-4">
                        <div className="search_box">
                            <div className="search_box_inner">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={this.state.search}
                                    onChange={(e) =>
                                        this.setState({ search: e.target.value })
                                    }
                                />
                                <i className="bi bi-search"></i>
                            </div>
                        </div>
                    </div>

                    {/* Breadcrumb + Filters */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="breadcrumb_txt">
                            Home <span>/</span> Recorded courses
                        </div>

                        <div className="d-flex gap-2 filter_select_parent">
                            <select className="filter_select">
                                <option>Sort By</option>
                                <option>Popularity</option>
                                <option>Price</option>
                                <option>Rating</option>
                            </select>

                            <select className="filter_select">
                                <option>Explore</option>
                                <option>Paid</option>
                                <option>Free</option>
                                <option>Combo</option>
                            </select>
                        </div>
                    </div>

                </div>
            </section>
        );
    }

    renderSection = (sectionKey) => {
        const section = this.recordedCourseTabs[sectionKey];

        return (
            <section className="pt-3 pb-5" key={sectionKey}>
                <div className="section_container live_courses_sec">
                    {/* Heading */}
                    <div className="col-12 d-flex justify-content-center mb-4">
                        <div className="col-lg-6 text-center">
                            <h3 className="section_base_heading text-black">
                                <span className="text-c2">{section.title}</span>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        {section.courses.map((course, index) => (
                            <div
                                className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4"
                                key={index}
                            >
                                <Link to={"/course-details"}>
                                    <div
                                        className={`card_parent h-100 d-flex flex-column
                                    ${sectionKey} ${index % 2 === 0 ? "one" : "two"}`}
                                    >

                                        <div className="card_img_parent overflow-hidden">
                                            <img
                                                src={course.img}
                                                className="card_img w-100"
                                                alt={course.title}
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="pt-3 d-flex flex-column flex-grow-1">
                                            <h4 className="fw-bold">{course.title}</h4>
                                            <p className="mb-2">{course.desc}</p>

                                            <div className="d-flex justify-content-between mt-auto">
                                                <div className="recorded_course_duration">
                                                    <div>
                                                        <i className="bi bi-clock pe-1"></i>
                                                        {course.duration}
                                                    </div>
                                                    <div>
                                                        <i className="bi bi-star-fill pe-1"></i>
                                                        <i className="bi bi-star-fill pe-1"></i>
                                                        <i className="bi bi-star-fill pe-1"></i>
                                                        <i className="bi bi-star-fill pe-1"></i>
                                                        <i className="bi bi-star-fill pe-1"></i>
                                                        {course.rating}
                                                    </div>
                                                </div>

                                                {course.newPrice && (
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="new_price">₹ {course.newPrice}</span>
                                                        <s className="old_price">₹ {course.oldPrice}</s>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className={section.badgeClass}>
                                            {section.badgeText}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

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
            </section>
        );
    };

    render() {
        return (
            <>
                {this.renderExploreSection()}
                {this.renderSection("paid")}
                {this.renderSection("free")}
                {this.renderSection("combo")}
            </>
        );
    }
}

export default RecordedCourse;
