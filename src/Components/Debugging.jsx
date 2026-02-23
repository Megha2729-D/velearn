import React, { Component } from "react";
import "../Components/Styles/Debugging.css"

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `${process.env.PUBLIC_URL}/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class Debugging extends Component {

    state = {
        visible: 9,
        selectedLanguage: "All",
        selectedLevel: "All",
        search: "",

        challenges: [
            { id: 1, language: "Python", icon: "python.png", title: "Loops Debugging", level: "Easy", status: "Progress", questions: 14, total: 25, submissions: 2343 },
            { id: 2, language: "JavaScript", icon: "js.png", title: "Array Bug Fix", level: "Easy", status: "Progress", questions: 8, total: 25, submissions: 1203 },
            { id: 3, language: "React", icon: "react.png", title: "State Update Issue", level: "Medium", status: "New", questions: 0, total: 25, submissions: 531 },
            { id: 4, language: "JavaScript", icon: "js.png", title: "Closure Problem", level: "Hard", status: "New", questions: 0, total: 25, submissions: 310 },
            { id: 5, language: "React", icon: "react.png", title: "useEffect Loop", level: "Easy", status: "Solved", questions: 25, total: 25, submissions: 2010 },
            { id: 6, language: "Python", icon: "python.png", title: "Recursion Fix", level: "Hard", status: "Progress", questions: 11, total: 25, submissions: 870 },
        ]

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

        const filteredChallenges = this.state.challenges
            .filter(item => {

                const matchLanguage =
                    this.state.selectedLanguage === "All" ||
                    item.language === this.state.selectedLanguage;

                const matchLevel =
                    this.state.selectedLevel === "All" ||
                    item.level === this.state.selectedLevel;

                const matchSearch =
                    item.language.toLowerCase().includes(this.state.search);

                return matchLanguage && matchLevel && matchSearch;
            })
            .sort((a, b) => {

                // 1️⃣ Status order (Solved > Progress > New)
                if (statusOrder[a.status] !== statusOrder[b.status]) {
                    return statusOrder[a.status] - statusOrder[b.status];
                }

                // 2️⃣ Inside same status → highest progress first
                const progressA = this.getProgress(a.questions, a.total);
                const progressB = this.getProgress(b.questions, b.total);

                return progressB - progressA;
            });

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
                                                                <option value="Python">Python</option>
                                                                <option value="JavaScript">JavaScript</option>
                                                                <option value="React">React</option>
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

                                        {visibleChallenges.map(item => {

                                            const percent = this.getProgress(item.questions, item.total);

                                            return (
                                                <div className="col-lg-4 my-3">
                                                    <div className="debug_card" key={item.id}>

                                                        <span className={`badge ${this.levelColor(item.level)}`} style={{ background: this.getStatusColor(item.status) }}>
                                                            {item.level}
                                                        </span>

                                                        <div className="d-flex align-items-center justify-content-between  mt-5">
                                                            <div className="d-flex align-items-start">
                                                                <img src={`${process.env.PUBLIC_URL}/assets/images/debugging/icon/${item.icon}`} className="debug_icon" alt="" />
                                                                <h3 className="mb-0 mt-2">{item.language}</h3>
                                                            </div>
                                                            <span className="status_badge" >
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                        <p className="track">Debugging Track</p>

                                                        {/* Progress Bar */}
                                                        <div className="progressbar">
                                                            <div
                                                                className="progressfill"
                                                                style={{
                                                                    width: percent + "%",
                                                                    background: this.getStatusColor(item.status)
                                                                }}
                                                            ></div>
                                                        </div>

                                                        {/* Question Stats */}
                                                        <div className="stats">
                                                            <span>Questions Completed</span>
                                                            <span>{item.questions}/{item.total}</span>
                                                        </div>

                                                        {/* Bottom Section */}
                                                        <div className="bottom">
                                                            <span>Submissions: {item.submissions}</span>
                                                            <button
                                                                className="continue"
                                                                style={{ background: this.getStatusColor(item.status) }}
                                                            >
                                                                {percent === 0 ? (
                                                                    <>
                                                                        Start <i class="bi bi-chevron-right"></i>
                                                                    </>
                                                                ) : percent === 100 ? (
                                                                    <>
                                                                        Solved <i class="bi bi-check2-circle"></i>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Continue <i class="bi bi-chevron-right"></i>
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>

                                    {/* Show More Button */}
                                    {this.state.visible < filteredChallenges.length && (
                                        <div className="show_more">
                                            <button onClick={this.loadMore}>Show More</button>
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
