import { Component } from "react";
import { Link } from "react-router-dom";
import "../../Styles/LiveCourseHistory.css";
import { withRouter } from "../../withRouter";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = "https://velearn.in/public/";

class LiveCourseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrolledCourses: [],
            loading: true,
            currentTime: new Date().toLocaleTimeString('en-GB', { hour12: false }) // Initial HH:mm:ss
        };
        this.timer = null;
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            this.props.navigate("/login");
            return;
        }

        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};

        fetch(`${BASE_API_URL}live-course-history/${user.id}`, { headers })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.setState({ enrolledCourses: data.data || [], loading: false });
                } else {
                    this.setState({ loading: false });
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false });
            });

        // Update current time every 10 seconds to refresh Join button state
        this.timer = setInterval(() => {
            this.setState({ currentTime: new Date().toLocaleTimeString('en-GB', { hour12: false }) });
        }, 10000);
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer);
    }

    render() {
        const { enrolledCourses, loading, currentTime } = this.state;
        
        return (
            <div className="live_history_container">
                <section className="container">
                    {/* Professional Header */}
                    {/* Breadcrumbs */}
                    <nav className="mb-4 d-flex align-items-center gap-2 small">
                        <Link to="/" className="text-muted text-decoration-none hover_c2 transition_all">Home</Link>
                        <i className="bi bi-chevron-right text-muted" style={{fontSize: '10px'}}></i>
                        <Link to="/my-courses" className="text-muted text-decoration-none hover_c2 transition_all">My Courses</Link>
                        <i className="bi bi-chevron-right text-muted" style={{fontSize: '10px'}}></i>
                        <span className="text-dark fw-bold">Live History</span>
                    </nav>

                    {/* Elite Header */}
                    <div className="history_header_sec d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-4">
                        <div>
                            <h1 className="history_title">Live Course <span className="text-c2">History</span></h1>
                            <p className="history_subtitle">Manage your live interactive sessions and batches in one place.</p>
                        </div>
                        <div className="header_stats_lux d-flex gap-3">
                            <div className="header_stat_card">
                                <span className="stat_count">{enrolledCourses.length}</span>
                                <span className="stat_label">Batches</span>
                            </div>
                            <div className="header_stat_card active">
                                <span className="stat_count">
                                    {enrolledCourses.filter(c => 
                                        c.batch && c.batch.meeting_link && 
                                        currentTime >= c.batch.from_time && 
                                        currentTime <= c.batch.to_time
                                    ).length}
                                </span>
                                <span className="stat_label">Live Now</span>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="schedule_list_wrapper">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="schedule_card_skeleton">
                                    <div className="row align-items-center g-4">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="skeleton_box banner"></div>
                                                <div className="flex-grow-1">
                                                    <div className="skeleton_box tag"></div>
                                                    <div className="skeleton_box title"></div>
                                                    <div className="skeleton_box subtitle"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6">
                                            <div className="row g-3">
                                                <div className="col-6"><div className="skeleton_box info"></div></div>
                                                <div className="col-6"><div className="skeleton_box info"></div></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-12">
                                            <div className="skeleton_box button"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : enrolledCourses.length === 0 ? (
                        <div className="prof_empty_card">
                            <div className="empty_illustration_wrap">
                                <i className="bi bi-calendar-event"></i>
                            </div>
                            <h3>No active sessions found</h3>
                            <p>You haven't enrolled in any live interactive courses yet. Join a masterclass to kickstart your journey.</p>
                            <Link to="/live-course" className="browse_courses_btn">
                                Browse Live Courses <i className="bi bi-arrow-right-short ms-2"></i>
                            </Link>
                        </div>
                    ) : (
                        <div className="schedule_list_wrapper">
                            {enrolledCourses.map((course) => {
                                const batch = course.batch;
                                
                                // Helper to format 24h time string to 12h AM/PM
                                const formatTime = (timeStr) => {
                                    if (!timeStr) return null;
                                    try {
                                        const [hours, minutes] = timeStr.split(':');
                                        const h = parseInt(hours);
                                        const ampm = h >= 12 ? 'PM' : 'AM';
                                        const displayH = h % 12 || 12;
                                        return `${displayH}:${minutes} ${ampm}`;
                                    } catch (e) { return timeStr; }
                                };

                                const scheduleTime = batch ? (batch.batch_time || 'Pending') : 'TBA';
                                const timeRange = (batch && batch.from_time && batch.to_time) 
                                    ? `${formatTime(batch.from_time)} - ${formatTime(batch.to_time)}` 
                                    : 'TBA';
                                const meetLink = batch ? batch.meeting_link : null;
                                const instructor = batch ? (batch.instructor || 'Allocation Pending') : 'TBA';

                                // Expiry and Status checks
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const isBatchExpired = batch && batch.end_date && new Date(batch.end_date) < today;
                                const isCourseInactive = (course.status != 1) || (course.enrollment && course.enrollment.status === 'inactive');

                                // Validation: Session is ONLY live during scheduled hours AND on scheduled days
                                const isDayMatch = () => {
                                    if (!batch || !batch.batch_time) return false;
                                    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                                    const scheduledDays = batch.batch_time.split(',').map(day => day.trim());
                                    return scheduledDays.includes(currentDay);
                                };

                                const isSessionLive = !isBatchExpired && !isCourseInactive && batch && batch.from_time && batch.to_time && meetLink &&
                                    isDayMatch() && currentTime >= batch.from_time && currentTime <= batch.to_time;

                                return (
                                    <div key={course.id} className="schedule_card">
                                        <div className="row align-items-center g-4">
                                            {/* Course Main Info */}
                                            <div className="col-lg-4 col-md-6">
                                                <div className="course_info_group">
                                                    <div className="course_mini_banner position-relative">
                                                        <img src={BASE_IMAGE_URL + course.thumbnail} alt={course.title} />
                                                        {isSessionLive && (
                                                            <div className="live_status_indicator">
                                                                <span className="pulse_live"></span> LIVE
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="course_details_text">
                                                        <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                                                            <span className="batch_tag">{batch ? batch.name : 'Awaiting Batch'}</span>
                                                            {isCourseInactive ? (
                                                                <span className="status_pill_inactive">
                                                                    <i className="bi bi-exclamation-circle me-1"></i> Inactive
                                                                </span>
                                                            ) : isBatchExpired ? (
                                                                <span className="status_pill_completed">
                                                                    <i className="bi bi-check2-circle me-1"></i> Completed
                                                                </span>
                                                            ) : (
                                                                <span className="status_pill_ongoing">
                                                                    <span className="pulse_green me-1"></span> Ongoing
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h4 className="course_title_prof mb-2">{course.title}</h4>
                                                        <div className="d-flex flex-column gap-1">
                                                            <div className="enroll_meta_prof small text-muted">
                                                                <i className="bi bi-person-badge me-2"></i>
                                                                Instructor: <span className="text-dark fw-bold">{instructor}</span>
                                                            </div>
                                                            <div className="enroll_meta_prof small text-muted">
                                                                <i className="bi bi-calendar-check me-2"></i>
                                                                Enrolled: <span className="text-dark">{course.created_at && !isNaN(new Date(course.created_at)) ? new Date(course.created_at).toLocaleDateString() : 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Detailed Schedule */}
                                            <div className="col-lg-5 col-md-6">
                                                <div className="details_grid_prof">
                                                    <div className="detail_item_prof">
                                                        <div className="detail_label_prof">SESSION DAYS</div>
                                                        <div className="detail_value_prof">
                                                            <i className="bi bi-calendar3 me-2 text-c2"></i>
                                                            {scheduleTime}
                                                        </div>
                                                    </div>
                                                    <div className="detail_item_prof">
                                                        <div className="detail_label_prof">TIMING (IST)</div>
                                                        <div className="detail_value_prof">
                                                            <i className="bi bi-alarm me-2 text-c2"></i>
                                                            {timeRange}
                                                        </div>
                                                    </div>
                                                    {(batch && (batch.start_date || batch.end_date)) && (
                                                        <div className="detail_item_prof full-span">
                                                            <div className="detail_label_prof">BATCH DURATION</div>
                                                            <div className="detail_value_prof">
                                                                <i className="bi bi-calendar-range me-2 text-c2"></i>
                                                                {batch.start_date ? new Date(batch.start_date).toLocaleDateString() : '..'} – {batch.end_date ? new Date(batch.end_date).toLocaleDateString() : '..'}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action / Link */}
                                            <div className="col-lg-3 col-md-12 lch-action-col">
                                                <div className="action_stack_prof">
                                                    {isCourseInactive ? (
                                                        <div className="awaiting_batch_prof text-danger" style={{ borderColor: '#fca5a5', background: '#fef2f2' }}>
                                                            <i className="bi bi-slash-circle me-2"></i> Course Inactive
                                                        </div>
                                                    ) : isBatchExpired ? (
                                                        <div className="awaiting_batch_prof text-muted" style={{ borderColor: '#cbd5e1', background: '#f1f5f9' }}>
                                                            <i className="bi bi-hourglass-bottom me-2"></i> Batch Expired
                                                        </div>
                                                    ) : meetLink ? (
                                                        isSessionLive ? (
                                                            <>
                                                                <a href={meetLink} target="_blank" rel="noopener noreferrer" className="join_session_btn">
                                                                    <i className="bi bi-camera-video-fill"></i> Join Now
                                                                </a>
                                                                <button 
                                                                    className="copy_link_btn_prof"
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(meetLink);
                                                                        alert("Meeting link copied!");
                                                                    }}
                                                                >
                                                                    <i className="bi bi-clipboard me-1"></i> Copy Link
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="awaiting_batch_prof text-muted" style={{ borderColor: '#cbd5e1', background: '#f8fafc', fontSize: '0.8rem' }}>
                                                                <i className="bi bi-calendar-event me-2 text-primary"></i>
                                                                {isDayMatch() ? (
                                                                    <>Join Between {formatTime(batch.from_time)} - {formatTime(batch.to_time)}</>
                                                                ) : (
                                                                    <>Session Not Active Today</>
                                                                )}
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="awaiting_batch_prof">
                                                            <div className="spinner-grow spinner-grow-sm text-c2 me-2" role="status"></div>
                                                            Meet Link Pending
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        );
    }
}

export default withRouter(LiveCourseHistory);
