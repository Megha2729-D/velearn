import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/Debugging.css"

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class Debugging extends Component {

    state = {
        visible: 9,
        selectedLanguage: "All",
        selectedLevel: "All",
        search: "",
        challenges: [],
        isLoading: true,
        solvedInLocal: {},
        submissionCounts: {}
    }

    componentDidMount() {
        this.fetchDebuggingGroups();
        this.loadLocalProgress();

        // Safety fallback for loading state
        this.loadingTimeout = setTimeout(() => {
            if (this.state.isLoading) {
                console.warn("Loading timed out after 5s. Forcing isLoading to false.");
                this.setState({ isLoading: false });
            }
        }, 5000);
    }

    componentWillUnmount() {
        if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
    }

    loadLocalProgress = () => {
        const solved = JSON.parse(localStorage.getItem("velearn_solved_problems") || "{}");
        const submissions = JSON.parse(localStorage.getItem("velearn_submission_counts") || "{}");
        this.setState({
            solvedInLocal: solved,
            submissionCounts: submissions
        });
    }

    fetchDebuggingGroups = async () => {
        try {
            console.log("Fetching from:", `${BASE_API_URL}debugging-groups`);
            const response = await fetch(`${BASE_API_URL}debugging-groups`);
            const json = await response.json();
            console.log("API Response:", json);
            if (json.status) {
                this.setState({ challenges: json.data || [], isLoading: false });
            } else {
                console.warn("API returned status false for debugging-groups", json);
                this.setState({ challenges: [], isLoading: false });
            }
        } catch (error) {
            console.error("Error fetching debugging groups", error);
            this.setState({ challenges: [], isLoading: false });
        }
    }
    getProgress = (questions, total) => {
        if (!total || total === 0) return 0;
        return Math.round((questions / total) * 100);
    };

    getProgressColor = (percent) => {
        if (percent === 100) return "#22c55e";  // green
        if (percent > 0) return "#eab308";      // yellow
        return "#ef4444";                       // red
    };
    getStatusColor = (status) => {
        if (status === "Solved") return "#069224";
        if (status === "Progress") return "#C2B200";
        return "#C20000";
    };

    loadMore = () => {
        this.setState(prev => ({ visible: prev.visible + 3 }))
    }

    levelColor(level) {
        if (level === "Easy") return "easy";
        if (level === "Hard") return "hard";
        return "medium";
    }
    handleLanguageChange = (e) => {
        this.setState({ selectedLanguage: e.target.value, visible: 9 });
    };

    handleLevelChange = (e) => {
        this.setState({ selectedLevel: e.target.value, visible: 9 });
    };

    handleSearch = (e) => {
        this.setState({ search: e.target.value.toLowerCase(), visible: 9 });
    };

    render() {

        const statusOrder = {
            "Solved": 1,
            "Progress": 2,
            "New": 3
        };

        const challenges = Array.isArray(this.state.challenges) ? this.state.challenges : [];

        const filteredChallenges = challenges
            .filter(item => {
                const matchLanguage =
                    this.state.selectedLanguage === "All" ||
                    (item.language && item.language === this.state.selectedLanguage);

                const matchLevel =
                    this.state.selectedLevel === "All" ||
                    (item.level && item.level === this.state.selectedLevel);

                const searchLower = (this.state.search || "").toLowerCase();
                const matchSearch = !searchLower ||
                    (item.language && item.language.toLowerCase().includes(searchLower)) ||
                    (item.description && item.description.toLowerCase().includes(searchLower)) ||
                    (item.details && item.details.toLowerCase().includes(searchLower)) ||
                    (item.title && item.title.toLowerCase().includes(searchLower));

                return matchLanguage && matchLevel && matchSearch;
            })
            .sort((a, b) => {
                const orderA = statusOrder[a.status] || 4;
                const orderB = statusOrder[b.status] || 4;

                if (orderA !== orderB) {
                    return orderA - orderB;
                }

                const progressA = this.getProgress(a.questions, a.total);
                const progressB = this.getProgress(b.questions, b.total);

                return progressB - progressA;
            });

        console.log("Total Challenges:", challenges.length);
        console.log("Filtered Challenges:", filteredChallenges.length);
        console.log("Is Loading:", this.state.isLoading);

        const visibleChallenges = filteredChallenges.slice(0, this.state.visible);

        return (
            <>
                {/* HERO */}
                <section className="debug_hero">
                    <h2>Find the bug ! Fix the logic.</h2>
                    <button>Get Started</button>
                </section>
                <section className="debug_main">
                    <div className="section_container">

                        {/* FILTER BAR */}
                        <div className="row justify-content-center w-100 m-auto">
                            <div className="col-lg-12">
                                <section className="debug_filters py-3">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div className="row">
                                                <div className="col-lg-6 my-2 my-lg-0">
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <label htmlFor="languages">Language</label>
                                                        <div className="select_wrapper w-100">
                                                            <select className="w-100" name="languages" onChange={this.handleLanguageChange}>
                                                                <option value="All">All</option>
                                                                {[...new Set(this.state.challenges.filter(c => c.language).map(c => c.language))].map(lang => (
                                                                    <option key={lang} value={lang}>{lang}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 my-2 my-lg-0">
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <label htmlFor="problem">Problem</label>
                                                        <div className="select_wrapper w-100">
                                                            <select className="w-100" name="problem" onChange={this.handleLevelChange}>
                                                                <option value="All">All</option>
                                                                <option value="Easy">Easy</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="Hard">Hard</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 my-2 my-lg-0">
                                            <div className="debug_search">
                                                <i className="bi bi-search"></i>
                                                <input type="text" placeholder="Search" onChange={this.handleSearch} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* CARDS */}
                        <div className="row justify-content-center w-100 m-auto pb-5">
                            <div className="col-lg-11">
                                <div className="debug_container mt-3">
                                    <div className="row">

                                        {this.state.isLoading ? (
                                            <div className="col-12 text-center py-5">
                                                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <p className="mt-3 text-secondary">Fetching debugging tracks...</p>
                                            </div>
                                        ) : filteredChallenges.length === 0 ? (
                                            <div className="col-12 text-center py-5 no_results_wrapper">
                                                <div className="empty_state_illust">
                                                    <i className="bi bi-search mb-3 d-block"></i>
                                                    <h3 className="msg_title">No more records</h3>
                                                    <p className="msg_desc">Debugging details are empty based on your current selection.</p>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <button className="reset_btn btn-sm" onClick={() => this.setState({ search: "", selectedLanguage: "All", selectedLevel: "All" })}>
                                                            Clear Filters
                                                        </button>
                                                        <button className="reset_btn btn-sm" style={{ background: "#64748b" }} onClick={() => this.fetchDebuggingGroups()}>
                                                            Refresh
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            visibleChallenges.map((item, idx) => {
                                                const langKey = item.language ? item.language.toLowerCase() : "unknown";
                                                const localSolvedCount = this.state.solvedInLocal[langKey] ? this.state.solvedInLocal[langKey].length : 0;

                                                // Combine with server if needed, or just prioritize local for dynamic feel
                                                const questionsCompleted = Math.max(item.questions, localSolvedCount);
                                                const percent = this.getProgress(questionsCompleted, item.total);

                                                // Adjust status based on progress
                                                let currentStatus = item.status;
                                                if (percent === 100) currentStatus = "Solved";
                                                else if (percent > 0) currentStatus = "Progress";

                                                return (
                                                    <div className="col-lg-4 mb-4" key={item.id || idx}>
                                                        <div className="debug_card text-decoration-none">

                                                            <span className={`badge ${this.levelColor(item.level)}`}>
                                                                {item.level}
                                                            </span>

                                                            <div className="d-flex align-items-center justify-content-between  mt-5">
                                                                <div className="d-flex align-items-start">
                                                                    <img src={`${BASE_IMAGE_URL}debugging/icon/${item.icon}`} className="debug_icon" alt="" />
                                                                    <h3 className="mb-0 mt-2">{item.language}</h3>
                                                                </div>
                                                                <span className="status_badge" >
                                                                    {currentStatus}
                                                                </span>
                                                            </div>
                                                            <p className="debug_desc_text mt-2 mb-0">
                                                                {item.description || item.details || item.subtitle || "Master the logic and fix bugs in this track."}
                                                            </p>
                                                            <p className="track">Debugging Track</p>

                                                            {/* Progress Bar */}
                                                            <div className="progressbar">
                                                                <div
                                                                    className="progressfill"
                                                                    style={{
                                                                        width: percent + "%",
                                                                        background: this.getStatusColor(currentStatus)
                                                                    }}
                                                                ></div>
                                                            </div>

                                                            {/* Question Stats */}
                                                            <div className="stats">
                                                                <span>Questions Completed</span>
                                                                <span>{questionsCompleted}/{item.total}</span>
                                                            </div>

                                                            {/* Bottom Section */}
                                                            <div className="bottom">
                                                                <span>Submissions: {this.state.submissionCounts[langKey] || item.submissions}</span>
                                                                <button
                                                                    className="continue"
                                                                    style={{ background: this.getStatusColor(currentStatus) }}
                                                                >
                                                                    {percent === 0 ? (
                                                                        <Link to={"/debugging-workspace"} state={{ language: item.language, level: item.level }} className="text-white">
                                                                            Start <i className="bi bi-chevron-right"></i>
                                                                        </Link>
                                                                    ) : percent === 100 ? (
                                                                        <>
                                                                            Solved <i className="bi bi-check2-circle"></i>
                                                                        </>
                                                                    ) : (
                                                                        <Link to={"/debugging-workspace"} state={{ language: item.language, level: item.level }} className="text-white">
                                                                            Continue <i className="bi bi-chevron-right"></i>
                                                                        </Link>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}

                                    </div>

                                    {/* Show More Button */}
                                    {this.state.visible < filteredChallenges.length ? (
                                        <div className="show_more">
                                            <button onClick={this.loadMore}>Show More</button>
                                        </div>
                                    ) : filteredChallenges.length > 0 && (
                                        <div className="show_more no_more_records">
                                            <p className="text-muted">No more records</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </>
        );
    }
}

export default Debugging;
