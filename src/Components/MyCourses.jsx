import { Component } from "react";
import { Link } from "react-router-dom";

class MyCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "all",
            enrolledCourses: [
                {
                    title: "Master in Full Stack Development",
                    desc: "Become job-ready with real projects.",
                    img: "/assets/images/course.png",
                    progress: 65,
                    status: "in-progress",
                },
                {
                    title: "UI/UX Design Mastery",
                    desc: "Learn modern UI/UX workflow.",
                    img: "/assets/images/course.png",
                    progress: 0,
                    status: "not-started",
                },
                {
                    title: "Data Analytics Bootcamp",
                    desc: "Excel, SQL, Python & BI tools.",
                    img: "/assets/images/course.png",
                    progress: 100,
                    status: "completed",
                },
            ],
        };
    }

    getFilteredCourses() {
        const { filter, enrolledCourses } = this.state;
        if (filter === "all") return enrolledCourses;
        return enrolledCourses.filter(c => c.status === filter);
    }

    render() {

        const filtered = this.getFilteredCourses();

        return (
            <section className="py-5 live_courses_sec">
                <div className="section_container">

                    {/* Page Heading */}
                    <h3 className="section_base_heading text-black mb-4">
                        My <span className="text-c2">Courses</span>
                    </h3>

                    {/* Top Filters Row */}
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">

                        {/* Filter Tabs */}
                        <div className="d-flex gap-2 flex-wrap">
                            <button
                                className={`${this.state.filter === "all" ? "filter_active_butt" : "filter_butt"}`}
                                onClick={() => this.setState({ filter: "all" })}
                            >
                                All Courses
                            </button>
                            <button
                                className={`${this.state.filter === "in-progress" ? "filter_active_butt" : "filter_butt"}`}
                                onClick={() => this.setState({ filter: "in-progress" })}
                            >
                                In Progress
                            </button>
                            <button
                                className={`${this.state.filter === "completed" ? "filter_active_butt" : "filter_butt"}`}
                                onClick={() => this.setState({ filter: "completed" })}
                            >
                                Completed
                            </button>
                            <button
                                className={`${this.state.filter === "not-started" ? "filter_active_butt" : "filter_butt"}`}
                                onClick={() => this.setState({ filter: "not-started" })}
                            >
                                Not Started
                            </button>
                        </div>

                        {/* Sort + Explore + Search */}
                        <div className="d-flex gap-2 flex-wrap align-items-center">
                            <div className="select_wrapper">
                                <select className="form-select form-select-sm" style={{ width: "130px" }}>
                                    <option>Sort By</option>
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                    <option>Progress ↑</option>
                                    <option>Progress ↓</option>
                                </select>
                            </div>
                            <div className="select_wrapper">
                                <select className="form-select form-select-sm" style={{ width: "120px" }}>
                                    <option>Explore</option>
                                    <option>Tech</option>
                                    <option>Design</option>
                                    <option>Marketing</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for anything..."
                                className="form-control form-control-sm"
                                style={{ width: "220px" }}
                            />
                        </div>
                    </div>
                    {/* If No Courses After Filter */}
                    {filtered.length === 0 && (
                        <div className="text-center py-5">
                            <img src="/assets/images/empty.png" alt="empty" height="120" />
                            <h5 className="mt-3 fw-bold">Enroll into your Favourite courses</h5>
                            <p className="text-muted">
                                You have no courses to display here. Enroll into courses to begin learning.
                            </p>
                        </div>
                    )}

                    {/* Course Cards Grid */}
                    <div className="row g-4">
                        {filtered.map((course, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                                <div className={`card_parent h-100 d-flex flex-column ${index % 2 === 0 ? "one" : "two"}`}>

                                    {/* Image */}
                                    <div className="card_img_parent overflow-hidden">
                                        <img src={course.img} className="card_img w-100" alt={course.title} />
                                    </div>

                                    {/* Content */}
                                    <div className="pt-3 d-flex flex-column flex-grow-1">
                                        <h5 className="fw-bold">{course.title}</h5>
                                        <p className="small mb-2">{course.desc}</p>

                                        {/* Progress */}
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between small">
                                                <span>Progress</span>
                                                <span className="fw-bold">{course.progress}%</span>
                                            </div>
                                            <div className="progress mt-1" style={{ height: "6px" }}>
                                                <div className="progress-bar bg-success" style={{ width: `${course.progress}%` }} />
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <Link to="/course-details">
                                            <div className="paid_butt mt-3">
                                                {course.progress === 100 ? "View Certificate" : "Continue Watching"}
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        );
    }
}

export default MyCourses;
