import { Component } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../Styles/LearnCourse.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";
const BASE_DYNAMIC_COURSE_VIDEO_URL = "https://www.velearn.in/public/";

class LearnCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            videos: [],
            activeVideo: null,
            quiz: [],
            quizMap: {},
            loading: true,
            showQuizModal: false,
            currentQuestion: 0,
            answers: {},
            quizSubmitted: false,
            quizCompleted: false,
            score: 0,
            reviewMode: false,
            reviewQuestion: 0,
            detailedAnswers: []
        };
    }

    componentDidMount() {
        const { courseId } = this.props;
        fetch(BASE_API_URL + "course-videos/" + courseId)
            .then(res => res.json())
            .then(data => {
                if (data.status && data.videos && data.videos.length > 0) {
                    const firstVideo = data.videos[0];
                    this.setState({ course: data.course, videos: data.videos, activeVideo: firstVideo, loading: false });
                    this.loadQuiz(firstVideo.id);
                    this.checkQuizForVideos(data.videos);
                }
            });
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.showQuizModal && this.state.showQuizModal) {
            this.disablePageScroll();
        }

        if (prevState.showQuizModal && !this.state.showQuizModal) {
            this.enablePageScroll();
        }
    }
    componentWillUnmount() {
        this.enablePageScroll();
    }
    closeQuizModal = () => {
        this.setState({ showQuizModal: false });
    };
    disablePageScroll = () => {
        document.body.classList.add("modal-open-custom");
        document.documentElement.classList.add("modal-open-custom");
    };

    enablePageScroll = () => {
        document.body.classList.remove("modal-open-custom");
        document.documentElement.classList.remove("modal-open-custom");
    };

    loadQuiz(videoId) {

        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user?.id;

        fetch(BASE_API_URL + "video-quiz/" + videoId + "?user_id=" + user_id)
            .then(res => res.json())
            .then(data => {

                if (data.status) {

                    if (data.has_submitted) {

                        const prev = data.previous_result;

                        // rebuild answers object
                        const previousAnswers = {};
                        prev.answers.forEach(a => {
                            const quiz = data.data.find(q => q.id === a.quiz_id);
                            if (quiz) {
                                if (quiz.option1 === a.selected) previousAnswers[quiz.id] = "1";
                                if (quiz.option2 === a.selected) previousAnswers[quiz.id] = "2";
                                if (quiz.option3 === a.selected) previousAnswers[quiz.id] = "3";
                            }
                        });

                        this.setState({
                            quiz: data.data,
                            answers: previousAnswers,
                            quizCompleted: true,
                            quizSubmitted: true,
                            score: Math.round(prev.score),
                            detailedAnswers: prev.answers,
                            currentQuestion: 0
                        });

                    } else {

                        this.setState({
                            quiz: data.data,
                            answers: {},
                            quizCompleted: false,
                            quizSubmitted: false,
                            currentQuestion: 0
                        });

                    }

                }

            });

    }

    checkQuizForVideos = (videos) => {
        videos.forEach(v => {
            fetch(BASE_API_URL + "video-quiz/" + v.id)
                .then(res => res.json())
                .then(data => {
                    this.setState(prev => ({ quizMap: { ...prev.quizMap, [v.id]: data.status && data.data.length > 0 } }));
                });
        });
    }

    selectVideo = (video) => {
        this.setState({ activeVideo: video });
        this.loadQuiz(video.id);
    }

    handleAnswer = (qid, option) => {
        this.setState(prev => ({ answers: { ...prev.answers, [qid]: option } }));
    }

    nextQuestion = () => {
        const { quiz, currentQuestion, answers } = this.state;
        const question = quiz[currentQuestion];
        if (!answers[question.id]) {
            alert("Please select an answer before proceeding.");
            return;
        }
        this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    }
    prevQuestion = () => { this.setState({ currentQuestion: this.state.currentQuestion - 1 }); }

    submitQuiz = async () => {
        const { quiz, answers, activeVideo, currentQuestion } = this.state;

        const currentQ = quiz[currentQuestion];
        if (!answers[currentQ.id]) {
            alert("Please select an answer before submitting.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user?.id;

        const formattedAnswers = quiz.map(q => ({
            quiz_id: q.id,
            selected: answers[q.id] || null
        }));

        try {
            const res = await fetch(BASE_API_URL + "submit-quiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user_id,   // ⭐ add this
                    course_video_id: activeVideo.id,
                    answers: formattedAnswers
                })
            });

            const data = await res.json();

            if (data.status) {
                const result = data.data;

                this.setState({
                    quizSubmitted: true,
                    quizCompleted: true,
                    score: Math.round(result.score),
                    showQuizModal: false,
                    reviewMode: true,
                    reviewQuestion: 0,
                    detailedAnswers: result.answers
                });
            }

        } catch (err) {
            console.error(err);
        }
    };

    render() {
        const { videos, activeVideo, quiz, loading, showQuizModal, currentQuestion, answers, quizSubmitted, score, reviewMode, reviewQuestion } = this.state;
        if (loading) return <div className="p-5">Loading...</div>;
        const question = quiz.length ? quiz[currentQuestion] : null;
        const reviewQ = quiz.length ? quiz[reviewQuestion] : null;
        const { course } = this.state;
        let scoreColor = "#f59e0b";
        if (score < 40) { scoreColor = "#ff0509"; } else if (score >= 70) { scoreColor = "#0dba4b"; }
        const thumbnail = course?.image ? `${BASE_DYNAMIC_IMAGE_URL}courses/${course.image}` : "";

        return (
            <div className="learn_page section_container py-5">
                <div className="row">

                    <div className="col-lg-8">
                        <div className="course_header">
                            <div className="breadcrumb_nav">
                                <Link to="/my-courses" className="crumb_home text-decoration-none">My Courses</Link>
                                <i className="bi bi-chevron-right px-1"></i>
                                <span className="crumb_current">{course?.title}</span>
                            </div>
                            <h3 className="course_title fw-bold">{course?.title}</h3>
                            <p className="course_type">Course Type:<span className={`course_badge ${course?.course_type}`}>{course?.course_type}</span></p>
                        </div>

                        <div className="video_box">
                            <div className="video_preview">
                                <video controls poster={thumbnail} width="100%" src={`${BASE_DYNAMIC_COURSE_VIDEO_URL}${activeVideo.video}`} />
                            </div>
                        </div>

                        {this.state.quizMap[activeVideo.id] && (
                            <div className="quiz_section mt-4">
                                <h5 className="mt-3">{activeVideo.title}</h5>
                                {!this.state.quizCompleted ? (
                                    <div className="quiz_intro_box d-flex flex-column justify-content-center align-items-center">
                                        <h2><i class="bi bi-clipboard2-data-fill text-c1"></i></h2>
                                        <p className="fw-bold">Topic Assessment Ready</p>
                                        <p className="quiz_intro_box_desc">Total Questions: {quiz.length} <span className="px-1">|</span> Passing Score: 70%</p>
                                        <button
                                            className="mt-2"
                                            onClick={() =>
                                                this.setState({
                                                    showQuizModal: true,
                                                    reviewMode: false,
                                                    currentQuestion: 0
                                                })
                                            }
                                        >
                                            Start Quiz Now
                                            <i className="bi bi-arrow-right ps-2"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="quiz_result_box text-center">

                                        <div className="quiz_icon mb-3">
                                            <svg viewBox="0 0 100 100" width="70" height="70">
                                                <path d="M30 60 L20 85 L30 80 L35 90 L45 65 Z" fill="#e15c64" />
                                                <path d="M70 60 L80 85 L70 80 L65 90 L55 65 Z" fill="#e15c64" />
                                                <path d="M50 8 L55 12 L62 10 L65 16 L72 17 L73 24 L79 27 L77 34 L82 39 L77 44 L79 51 L73 54 L72 61 L65 62 L62 68 L55 66 L50 72 L45 66 L38 68 L35 62 L28 61 L27 54 L21 51 L23 44 L18 39 L23 34 L21 27 L27 24 L28 17 L35 16 L38 10 L45 12 Z" fill={scoreColor} />
                                                <circle cx="50" cy="41" r="22" fill="#ffffff33" />
                                                <path d="M50 28 L54 36 L63 37 L57 43 L59 52 L50 47 L41 52 L43 43 L37 37 L46 36 Z" fill="#ffffff" />
                                            </svg>
                                        </div>

                                        <h5>Great Work!</h5>
                                        <p>You've successfully completed the assessment for this lesson.</p>

                                        <div className="quiz_score_box">
                                            <h2 style={{ color: scoreColor }}>{score}%</h2>
                                            <span>Resulting Score</span>
                                            <p>
                                                {quiz.filter(q => answers[q.id] === q.answer).length}
                                                <span>  Correct / {quiz.length} Total</span>
                                            </p>
                                        </div>

                                        <div className="quiz_actions mt-3">
                                            <button
                                                className="me-2"
                                                onClick={() =>
                                                    this.setState({
                                                        showQuizModal: true,
                                                        reviewMode: true,
                                                        reviewQuestion: 0
                                                    })
                                                }
                                            >
                                                <i className="bi bi-eye"></i> Preview Answer
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="lesson_list">
                            <div className="lesson_list_header">
                                <p className="fw-bold text-white mb-1">Course Content</p>
                                <span className="text-light">{videos.length} Lesson{videos.length !== 1 ? "s" : ""} • Total time shown in videos</span>
                            </div>

                            {videos.map((v, i) => (
                                <div key={v.id} className={`lesson_item ${activeVideo.id === v.id ? "active" : ""}`} onClick={() => this.selectVideo(v)}>
                                    <span className="lesson_no">{i + 1}</span>
                                    <div className="lesson_title">
                                        <div>{v.title}</div>
                                        <div className="d-flex gap-4">
                                            <span><i className="bi bi-play-circle pe-1"></i>Video</span>
                                            {this.state.quizMap[v.id] && (
                                                <span className="quiz_included_badge">
                                                    <i className="bi bi-patch-question-fill pe-1"></i>Quiz Available
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

                {showQuizModal && (
                    <div className="quiz_modal">
                        <div className="quiz_box">
                            {/* NEW HEADER with Progress */}
                            <div className="quiz_header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-bold text-c1">
                                        {reviewMode ? "Assessment Review" : "Topic Assessment"}
                                    </h5>
                                    <div className="quiz_close_btn" onClick={this.closeQuizModal}>
                                        <i className="bi bi-x-lg"></i>
                                    </div>
                                </div>
                                <div className="quiz_progress_container">
                                    <div
                                        className="quiz_progress_bar"
                                        style={{
                                            width: `${((reviewMode ? reviewQuestion + 1 : currentQuestion + (question && answers[question.id] ? 1 : 0)) / quiz.length) * 100}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="d-flex justify-content-between mt-2 small text-muted">
                                    <span>Question {reviewMode ? reviewQuestion + 1 : currentQuestion + 1} of {quiz.length}</span>
                                    <span>{Math.round(((reviewMode ? reviewQuestion + 1 : currentQuestion + (question && answers[question.id] ? 1 : 0)) / quiz.length) * 100)}% Complete</span>
                                </div>
                            </div>

                            <div className="quiz_content">
                                {!reviewMode ? (
                                    <>
                                        {question && <p className="quiz_question_text">{question.question}</p>}
                                        <div className="quiz_options_list">
                                            {[1, 2, 3].map(opt => (
                                                <div
                                                    key={opt}
                                                    className={`quiz_option_tile ${question && answers[question.id] === String(opt) ? "selected" : ""}`}
                                                    onClick={() => this.handleAnswer(question.id, String(opt))}
                                                >
                                                    <div className="option_radio_circle"></div>
                                                    <span className="option_text">{question["option" + opt]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {reviewQ && <p className="quiz_question_text">{reviewQ.question}</p>}
                                        <div className="quiz_options_list">
                                            {[1, 2, 3].map(opt => {
                                                const reviewAnswer = this.state.detailedAnswers.find(a => a.quiz_id === reviewQ.id);
                                                const optionText = reviewQ["option" + opt];
                                                const isCorrect = reviewAnswer?.correct_answer === optionText;
                                                const isSelected = reviewAnswer?.selected === optionText;

                                                return (
                                                    <div
                                                        key={opt}
                                                        className={`quiz_option_tile ${isCorrect ? "review_correct" : ""} ${isSelected && !isCorrect ? "review_wrong" : ""}`}
                                                    >
                                                        <div className="d-flex align-items-center w-100">
                                                            {isCorrect ? (
                                                                <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                                                            ) : isSelected ? (
                                                                <i className="bi bi-x-circle-fill text-danger fs-5 me-3"></i>
                                                            ) : (
                                                                <div className="option_radio_circle"></div>
                                                            )}
                                                            <span className="option_text">{optionText}</span>
                                                            {isCorrect && <span className="ms-auto badge bg-success-subtle text-success border border-success-subtle fw-bold">Correct Answer</span>}
                                                            {isSelected && !isCorrect && <span className="ms-auto badge bg-danger-subtle text-danger border border-danger-subtle fw-bold">Your Choice</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="quiz_nav">
                                {!reviewMode ? (
                                    <>
                                        <div>
                                            {currentQuestion > 0 && (
                                                <button className="btn_prev" onClick={this.prevQuestion}>
                                                    <i className="bi bi-arrow-left me-2"></i>Previous
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            {currentQuestion < quiz.length - 1 ? (
                                                <button
                                                    onClick={this.nextQuestion}
                                                    disabled={!question || !answers[question.id]}
                                                    className={`btn_next ${(!question || !answers[question.id]) ? "disabled_next" : ""}`}
                                                >
                                                    Next Question<i className="bi bi-arrow-right ms-2"></i>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={this.submitQuiz}
                                                    disabled={!question || !answers[question.id]}
                                                    className={`btn_next ${(!question || !answers[question.id]) ? "disabled_next" : ""}`}
                                                >
                                                    Submit Assessment<i className="bi bi-check-all ms-2"></i>
                                                </button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            {reviewQuestion > 0 && (
                                                <button className="btn_prev" onClick={() => this.setState({ reviewQuestion: reviewQuestion - 1 })}>
                                                    <i className="bi bi-arrow-left me-2"></i>Previous
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            {reviewQuestion < quiz.length - 1 ? (
                                                <button className="btn_next" onClick={() => this.setState({ reviewQuestion: reviewQuestion + 1 })}>
                                                    Next Review<i className="bi bi-arrow-right ms-2"></i>
                                                </button>
                                            ) : (
                                                <button className="btn_next" onClick={this.closeQuizModal}>
                                                    Finish Review<i className="bi bi-check-lg ms-2"></i>
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

export default function LearnWrapper() {
    const params = useParams();
    const location = useLocation();
    const courseId = location.state?.courseId;
    return <LearnCourse courseId={courseId} slug={params.slug} />;
}