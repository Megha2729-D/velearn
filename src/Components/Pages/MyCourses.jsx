import { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/MyCourse.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/";

class MyCourses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: "all",
            search: "",
            courses: {
                all: [],
                ongoing: [],
                completed: [],
                inactive: []
            },
            loading: true
        };
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        fetch(`${BASE_API_URL}my-courses/${user.id}`)
            .then(res => res.json())
            .then(data => {

                if (data.status) {

                    const sortLatest = (arr) =>
                        arr.sort((a, b) =>
                            new Date(b.enrollment?.enrolled_at) -
                            new Date(a.enrollment?.enrolled_at)
                        );

                    this.setState({
                        courses: {
                            all: sortLatest(data.data.all || []),
                            ongoing: sortLatest(data.data.ongoing || []),
                            completed: sortLatest(data.data.completed || []),
                            inactive: sortLatest(data.data.inactive || [])
                        },
                        loading: false
                    });

                } else {
                    this.setState({ loading: false });
                }

            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false });
            });
    }

    getFilteredCourses() {

        const { filter, courses, search } = this.state;

        let list = [];

        if (filter === "all") list = courses.all;
        if (filter === "in-progress") list = courses.ongoing;
        if (filter === "completed") list = courses.completed;
        if (filter === "not-started") list = courses.inactive;

        // SEARCH FILTER
        if (search.trim() !== "") {
            list = list.filter(course =>
                course.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        return list;
    }

    render() {

        const { loading, filter, search } = this.state;
        const filtered = this.getFilteredCourses();

        return (
            <section className="py-5 live_courses_sec my_course_parent">
                <div className="section_container">

                    <h3 className="section_base_heading text-black mb-4">
                        My <span className="text-c2">Courses</span>
                    </h3>

                    {/* Filters */}
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">

                        <div className="d-flex gap-2 flex-wrap">

                            <button
                                className={filter === "all" ? "filter_active_butt" : "filter_butt"}
                                onClick={() => this.setState({ filter: "all" })}
                            >
                                All Courses
                            </button>

                            <button
                                className={filter === "in-progress" ? "filter_active_butt" : "filter_butt"}
                                onClick={() => this.setState({ filter: "in-progress" })}
                            >
                                In Progress
                            </button>

                            <button
                                className={filter === "completed" ? "filter_active_butt" : "filter_butt"}
                                onClick={() => this.setState({ filter: "completed" })}
                            >
                                Completed
                            </button>

                            <button
                                className={filter === "not-started" ? "filter_active_butt" : "filter_butt"}
                                onClick={() => this.setState({ filter: "not-started" })}
                            >
                                Not Started
                            </button>

                        </div>

                        {/* SEARCH */}
                        <input
                            type="text"
                            value={search}
                            placeholder="Search course..."
                            className="form-control form-control-sm"
                            style={{ width: "220px" }}
                            onChange={(e) =>
                                this.setState({ search: e.target.value })
                            }
                        />

                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-5">
                            <h5>Loading Courses...</h5>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filtered.length === 0 && (
                        <div className="text-center py-5">
                            <div className="d-flex justify-content-center align-items-center">
                                <svg width="800" height="500" viewBox="0 150 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M150 150C150 100 250 50 400 50C550 50 650 100 650 200C650 300 550 350 400 350C250 350 150 300 150 200Z" fill="#FDF6E3" fillOpacity="0.6" />

                                    <text x="400" y="240" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#22346b">No Courses Found...</text>

                                    <path d="M180 380Q400 420 620 380L600 400Q400 440 200 400Z" fill="#22346b" fillOpacity="0.8" />

                                    <g transform="translate(180, 300)">
                                        <circle cx="15" cy="15" r="10" fill="#22346b" /> <rect x="10" y="25" width="10" height="35" rx="5" fill="#24b8ec" /> <path d="M20 35 L45 35" stroke="#22346b" strokeWidth="4" strokeLinecap="round" /> <circle cx="55" cy="35" r="12" stroke="#22346b" strokeWidth="3" fill="white" />
                                        <line x1="63" y1="43" x2="70" y2="50" stroke="#22346b" strokeWidth="3" strokeLinecap="round" />
                                    </g>

                                    <g transform="translate(580, 300)">
                                        <circle cx="15" cy="15" r="10" fill="#22346b" /> <rect x="10" y="25" width="10" height="35" rx="5" fill="#24b8ec" /> <path d="M10 35 L-15 35" stroke="#22346b" strokeWidth="4" strokeLinecap="round" /> <path d="M-15 35 L-80 10 L-80 60 Z" fill="#24b8ec" fillOpacity="0.2" />
                                    </g>

                                    <path d="M300 380 Q310 340 330 380" fill="#24b8ec" opacity="0.6" />
                                    <path d="M500 380 Q510 350 530 380" fill="#22346b" opacity="0.4" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Courses Grid */}
                    <div className="row g-4">

                        {filtered.map((course, index) => {

                            const status = course.enrollment?.status;
                            const isInactive = status === "inactive";

                            const completedQuizzes = parseInt(course.enrollment?.completed_quizzes || 0);
                            const totalQuizzes = parseInt(course.enrollment?.total_quizzes || 0);

                            const progress = totalQuizzes > 0
                                ? Math.round((completedQuizzes / totalQuizzes) * 100)
                                : (status === "completed"
                                    ? 100
                                    : status === "ongoing"
                                        ? 40
                                        : 0);

                            const img =
                                `${BASE_DYNAMIC_IMAGE_URL}uploads/courses/${course.thumbnail.replace("/../public/", "")}`;

                            return (

                                <div key={course.id} className="col-lg-3 col-md-4 col-sm-6">

                                    <div className={`card_parent h-100 d-flex flex-column position-relative ${index % 2 === 0 ? "one" : "two"} ${isInactive ? "locked_card" : ""}`}>

                                        {/* LOCKED OVERLAY */}
                                        {isInactive && (
                                            <Link
                                                to="/contact-us"
                                                className="locked_overlay"
                                            >
                                                <div className="locked_box d-flex flex-column align-items-center">
                                                    <div className="lock_icon_circle">
                                                        <i className="bi bi-lock-fill"></i>
                                                    </div>
                                                    <span className="locked_text">Course Locked</span>
                                                    <div className="locked_price mt-1">
                                                        ₹{course.price}
                                                    </div>
                                                    <div className="unlock_hint mt-2">
                                                        Unlock Course <i className="bi bi-chevron-right"></i>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {/* Image */}
                                        <div className="card_img_parent overflow-hidden">
                                            <img
                                                src={img}
                                                className="card_img w-100"
                                                alt={course.title}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="pt-3 d-flex flex-column flex-grow-1">
                                            <h5 className="fw-bold">{course.title}</h5>
                                            <p className="enroll_on_date mb-2">
                                                Enrolled on {course.enrollment?.enrolled_at}
                                            </p>
                                            <div className="mt-auto">
                                                <div className="d-flex justify-content-between small">
                                                    <span>{totalQuizzes > 0 ? "Quizzes Done" : "Progress"}</span>
                                                    <span className="fw-bold">
                                                        {totalQuizzes > 0 ? `${completedQuizzes}/${totalQuizzes}` : `${progress}%`}
                                                    </span>
                                                </div>

                                                <div className="progress mt-1" style={{ height: "6px" }}>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                            {isInactive ? (
                                                <Link to="/contact-us">
                                                    <div className="paid_butt mt-3">
                                                        Unlock Course
                                                    </div>
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={`/learn/${course.slug}`}
                                                    state={{ courseId: course.id }}
                                                >
                                                    <div
                                                        className={`mt-3 paid_butt ${progress === 100
                                                            ? " certificate_butt"
                                                            : progress === 0
                                                                ? "start_course_butt"
                                                                : "continue_course_butt"
                                                            }`}
                                                    >
                                                        {progress === 100 ? (
                                                            <><i className="bi bi-patch-check-fill me-2"></i>View Certificate</>
                                                        ) : progress === 0 ? (
                                                            <><i className="bi bi-play-fill me-2"></i>Start Course</>
                                                        ) : (
                                                            <><i className="bi bi-play-circle-fill me-2"></i>Continue Watching</>
                                                        )}
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default MyCourses;