import { Component } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Preloader from "../../Preloader";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class AllCourses extends Component {
    state = {
        search: "",
        activeCategory: "All",
        courses: [],
        enrolledCourses: [],
        isLoading: true,
        isMoreLoading: false,
        visibleCount: {
            paid: 8,
            free: 8,
            combo: 8,
        },
    };

    loadMoreRef = null;
    observer = null;

    categories = [
        "Software Development",
        "Web Development",
        "IT Infrastructure Management",
        "Business Management",
        "Special Programs",
    ];

    componentDidMount() {
        const fetchCourses = fetch(`${BASE_API_URL}recorded-course`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.data) {
                    this.setState({ courses: data.data });
                }
            })
            .catch((err) => console.error("Failed to fetch courses:", err));

        const user = JSON.parse(localStorage.getItem("user"));
        const fetchEnrolled = user
            ? fetch(`${BASE_API_URL}my-courses/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        this.setState({ enrolledCourses: data.data.all || [] });
                    }
                })
                .catch(err => console.error("Failed to fetch enrolled courses:", err))
            : Promise.resolve();

        Promise.all([fetchCourses, fetchEnrolled]).finally(() => {
            this.setState({ isLoading: false }, () => {
                this.setupIntersectionObserver();
            });
        });
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.state.isMoreLoading && this.hasMoreToLoad()) {
                this.handleLoadMore();
            }
        }, options);

        if (this.loadMoreRef) {
            this.observer.observe(this.loadMoreRef);
        }
    }

    hasMoreToLoad() {
        const { filter } = this.props;
        const types = filter ? [filter] : ["paid", "free", "combo"];
        
        return types.some(type => {
            const filtered = this.state.courses
                .filter((c) => c.course_type === type)
                .filter((c) => this.state.activeCategory === "All" || c.categories?.includes(this.state.activeCategory))
                .filter((c) => c.title.toLowerCase().includes(this.state.search.toLowerCase()));
            
            return filtered.length > this.state.visibleCount[type];
        });
    }

    handleLoadMore() {
        this.setState({ isMoreLoading: true });
        
        // Brief delay to show preloader as requested
        setTimeout(() => {
            this.setState(prevState => ({
                visibleCount: {
                    paid: prevState.visibleCount.paid + 8,
                    free: prevState.visibleCount.free + 8,
                    combo: prevState.visibleCount.combo + 8
                },
                isMoreLoading: false
            }));
        }, 1000);
    }

    renderExploreSection() {
        return (
            <section className="explore_courses_sec py-5">
                <div className="section_container">
                    <h2 className="text-center fw-bold mb-4">
                        All <span className="text-c2">Recorded</span> Courses
                    </h2>

                    {/* Categories */}
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                        {this.categories.map((cat, index) => (
                            <button
                                key={index}
                                className={`category_pill ${this.state.activeCategory === cat ? "active" : ""}`}
                                onClick={() => this.setState({ 
                                    activeCategory: cat,
                                    visibleCount: { paid: 8, free: 8, combo: 8 }
                                })}
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
                                    placeholder="Search courses..."
                                    value={this.state.search}
                                    onChange={(e) =>
                                        this.setState({ 
                                            search: e.target.value,
                                            visibleCount: { paid: 8, free: 8, combo: 8 }
                                        })
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
            .filter((c) => this.state.activeCategory === "All" || c.categories?.includes(this.state.activeCategory))
            .filter((c) =>
                c.title.toLowerCase().includes(this.state.search.toLowerCase())
            );

        const visibleCourses = filteredCourses.slice(0, this.state.visibleCount[courseType]);

        if (filteredCourses.length === 0 && !this.state.search && this.state.activeCategory === "All") return null;

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
                        {visibleCourses.length > 0 ? (
                            visibleCourses.map((course, index) => {
                                const isEnrolled = this.state.enrolledCourses.some(ec => ec.id === course.id && ec.enrollment?.status !== "inactive");
                                const targetUrl = isEnrolled ? `/learn/${course.slug}` : `/course-details/${course.slug}`;

                                return (
                                    <div
                                        className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4"
                                        key={course.id}
                                    >
                                        <Link
                                            to={targetUrl}
                                            state={{ courseId: course.id, courseType: course.course_type }}
                                        >
                                            <div
                                                className={`card_parent h-100 d-flex flex-column ${index % 2 === 0 ? "one" : "two"}`}
                                            >
                                                <div className="card_img_parent overflow-hidden">
                                                    <img
                                                        src={`${BASE_DYNAMIC_IMAGE_URL}courses/${course.image}`}
                                                        className="card_img w-100"
                                                        alt={course.title}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <div className="pt-3 d-flex flex-column flex-grow-1">
                                                    <h4 className="fw-bold">{course.title}</h4>
                                                    <p className="mb-2">{course.sub_description}</p>

                                                    <div className="d-flex justify-content-between align-items-center gap-3 w-100 mt-auto overflow-hidden">
                                                        <div className="recorded_course_duration">
                                                            <div className="my-2">
                                                                <i className="bi bi-clock pe-1 my-2"></i>
                                                                {course.recorded_content} hours
                                                            </div>
                                                            <div className="d-flex align-items-center mt-2">
                                                                <i className="bi bi-star-fill pe-1"></i>
                                                                <i className="bi bi-star-fill pe-1"></i>
                                                                <i className="bi bi-star-fill pe-1"></i>
                                                                <i className="bi bi-star-fill pe-1"></i>
                                                                <i className="bi bi-star-fill pe-1"></i>
                                                                <span>({course.rating || "4.6"})</span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            {courseType !== "free" ? (
                                                                <>
                                                                    <span className="new_price">&#8377; {course.buy_price}</span>
                                                                    <span className="old_price">
                                                                        <s>&#8377; {course.mrp_price}</s>
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="new_price text-success">FREE</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={badgeClass}>{badgeText}</div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12 text-center py-5">
                                <div className="no_courses_empty_state p-5 rounded-4 shadow-sm bg-light border border-dashed text-center mx-auto" style={{ maxWidth: '600px' }}>
                                    <div className="mb-4">
                                        <i className="bi bi-book-half display-1 text-muted opacity-25"></i>
                                    </div>
                                    <h3 className="fw-bold mb-3">No {badgeText} Courses Found</h3>
                                    <p className="text-muted mb-4">
                                        Try another category or search term.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    render() {
        const { filter } = this.props;

        if (this.state.isLoading) {
            return <Preloader />;
        }

        return (
            <div className="all_courses_page">
                {this.renderExploreSection()}
                {(!filter || filter === "paid") && this.renderCoursesByType("paid", "Paid", "paid_butt")}
                {(!filter || filter === "free") && this.renderCoursesByType("free", "Free", "free_butt")}
                {(!filter || filter === "combo") && this.renderCoursesByType("combo", "Combo", "combo_butt")}

                {/* Loading Trigger / Preloader for More Content */}
                {this.hasMoreToLoad() && (
                    <div 
                        ref={el => {
                            if (this.observer) {
                                if (this.loadMoreRef) this.observer.unobserve(this.loadMoreRef);
                                if (el) this.observer.observe(el);
                            }
                            this.loadMoreRef = el;
                        }} 
                        className="d-flex justify-content-center py-5 mb-5"
                    >
                        <div className="loader" style={{ transform: 'scale(0.6)' }}>
                            <div className="spinner"></div>
                            <div className="logo-bg">
                                <img src={`https://brainiacchessacademy.com/assets/images/logo-icon.png`} alt="" style={{ width: '40px' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const AllCoursesWrapper = (props) => {
    const location = useLocation();
    const params = useParams();
    const filter = params.filter || location.state?.filter;
    return <AllCourses {...props} filter={filter} />;
};

export default AllCoursesWrapper;
