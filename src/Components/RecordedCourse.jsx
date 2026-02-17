import { Component } from "react";
import { NavLink, Link } from "react-router-dom";

const BASE_API_URL = "https://www.iqvideoproduction.com/api/";
const BASE_DYNAMIC_IMAGE_URL = "https://www.iqvideoproduction.com/uploads/courses/";

class RecordedCourse extends Component {
    state = {
        search: "",
        activeCategory: "Software Development",
        courses: [], // courses fetched from backend
    };

    categories = [
        "Software Development",
        "Web Development",
        "IT Infrastructure Management",
        "Business Management",
        "Special Programs",
    ];

    componentDidMount() {
        fetch(`${BASE_API_URL}courses`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.courses) {
                    this.setState({ courses: data.courses });
                }
            })
            .catch((err) => console.error("Failed to fetch courses:", err));
    }

    renderExploreSection() {
        return (
            <section className="explore_courses_sec py-5">
                <div className="section_container">
                    {/* Title */}
                    <h2 className="text-center fw-bold mb-4">
                        Explore <span className="text-c2">Courses</span> By{" "}
                        <span className="text-c2">Categories</span>
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
                </div>
            </section>
        );
    }

    renderCoursesByType(courseType, badgeText, badgeClass) {
        const filteredCourses = this.state.courses
            .filter((c) => c.course_type === courseType)
            .filter((c) => c.category?.includes(this.state.activeCategory))
            .filter((c) =>
                c.title.toLowerCase().includes(this.state.search.toLowerCase())
            );

        return (
            <section className="pt-3 pb-5">
                <div className="section_container live_courses_sec">
                    <div className="col-12 d-flex justify-content-center mb-4">
                        <div className="col-lg-6 text-center">
                            <h3 className="section_base_heading text-black">
                                <span className="text-c2">{badgeText} Courses</span>
                            </h3>
                        </div>
                    </div>

                    <div className="row">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => (
                                <div
                                    className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4"
                                    key={course._id}
                                >
                                    <Link to={`/course-details/${course._id}`}>
                                        <div
                                            className={`card_parent h-100 d-flex flex-column ${index % 2 === 0 ? "one" : "two"
                                                }`}
                                        >
                                            <div className="card_img_parent overflow-hidden">
                                                <img
                                                    src={`${BASE_DYNAMIC_IMAGE_URL}${course.image}`}
                                                    className="card_img w-100"
                                                    alt={course.title}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="pt-3 d-flex flex-column flex-grow-1">
                                                <h4 className="fw-bold">{course.title}</h4>
                                                <p className="mb-2">{course.sub_description}</p>

                                                <div className="d-flex justify-content-between mt-auto">
                                                    <div className="recorded_course_duration">
                                                        <div>
                                                            <i className="bi bi-clock pe-1"></i>
                                                            {course.course_duration}
                                                        </div>
                                                        <div>
                                                            {[...Array(5)].map((_, i) => (
                                                                <i
                                                                    key={i}
                                                                    className="bi bi-star-fill pe-1"
                                                                ></i>
                                                            ))}
                                                            {course.rating || "(4.6)"}
                                                        </div>
                                                    </div>

                                                    {course.buy_price && (
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="new_price">
                                                                ₹ {course.buy_price}
                                                            </span>
                                                            <s className="old_price">
                                                                ₹ {course.mrp_price}
                                                            </s>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={badgeClass}>{badgeText}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">
                                    No courses available in this category.
                                </p>
                            </div>
                        )}
                    </div>

                    {filteredCourses.length > 0 && (
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
                    )}
                </div>
            </section>
        );
    }

    render() {
        return (
            <>
                {this.renderExploreSection()}
                {this.renderCoursesByType("paid", "Paid", "paid_butt")}
                {this.renderCoursesByType("free", "Free", "free_butt")}
                {this.renderCoursesByType("combo", "Combo", "combo_butt")}
            </>
        );
    }
}

export default RecordedCourse;
