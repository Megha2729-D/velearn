import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/IDE.css";

const WANDBOX_API_URL = "https://wandbox.org/api/compile.json";
const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = "/velearn/assets/images/";
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

export default function DebuggingWorkspace() {
    const location = useLocation();
    const navigate = useNavigate();
    const passedLanguage = location.state?.language || "Python"; // Default to Python if none provided
    const passedLevel = location.state?.level || "";

    const [problems, setProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [code, setCode] = useState("");
    const [inputData, setInputData] = useState("");

    // Output states
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("Ready");
    const [isError, setIsError] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [exitCode, setExitCode] = useState(null);
    const [execTime, setExecTime] = useState(null);
    const [result, setResult] = useState(null); // Correct / Wrong
    const [showInput, setShowInput] = useState(true); // Always show by default for convenience

    const [currentIndex, setCurrentIndex] = useState(0);

    // Helper to get saved code for a problem
    const getSavedCode = (problemId) => {
        const savedCodeData = JSON.parse(localStorage.getItem("velearn_saved_debugging_code") || "{}");
        const languageKey = passedLanguage.toLowerCase();
        return savedCodeData[languageKey]?.[problemId] || null;
    };

    // Helper to handle input display (don't show "No input required" in the box)
    const formatInputForBox = (rawInput) => {
        if (!rawInput || rawInput.toLowerCase().includes("no input required")) return "";
        return rawInput;
    };

    // Fetch practices on mount
    useEffect(() => {
        const fetchPractices = async () => {
            try {
                const url = `${BASE_API_URL}debugging-practices/${passedLanguage}${passedLevel ? `?level=${passedLevel}` : ''}`;
                const response = await fetch(url);
                const json = await response.json();
                if (json.status && json.data && json.data.length > 0) {
                    setProblems(json.data);

                    const firstProblem = json.data[0];
                    const savedCode = getSavedCode(firstProblem.id);

                    setCode(savedCode || firstProblem.starterCode || "");
                    setInputData(formatInputForBox(firstProblem.input));
                } else {
                    setProblems([]);
                }
            } catch (error) {
                console.error("Error fetching debugging practices", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPractices();
    }, [passedLanguage]);

    const getCompiler = (lang) => {
        const lowercaseLang = lang.toLowerCase();
        if (lowercaseLang.includes("python")) return "cpython-3.13.8";
        if (lowercaseLang.includes("java") && !lowercaseLang.includes("script")) return "openjdk-jdk-22+36";
        if (lowercaseLang.includes("javascript") || lowercaseLang.includes("js")) return "nodejs-20.17.0";
        if (lowercaseLang.includes("c++") || lowercaseLang.includes("cpp")) return "gcc-13.2.0";
        if (lowercaseLang.includes("c")) return "gcc-13.2.0-c";
        if (lowercaseLang.includes("php")) return "php-8.3.12";
        return "cpython-3.13.8"; // Default
    };

    const runCode = async (isSubmit = false) => {

        if (!code.trim()) {
            alert("Write code first");
            return;
        }

        let processCodeForWandbox = code;
        const lowercaseLang = passedLanguage.toLowerCase();

        // Wandbox uses "prog.java" as the default file name. If the user writes "public class Hello", 
        // Java throws a file name mismatch error. Removing "public" fixes this logic easily.
        if (lowercaseLang.includes("java") && !lowercaseLang.includes("script")) {
            processCodeForWandbox = processCodeForWandbox.replace(/public\s+class/g, "class");
        }

        const startTime = performance.now();

        setIsRunning(true);
        setStatus("Running...");
        setOutput("🚀 Running...");
        setIsError(false);
        setExitCode(null);
        setExecTime(null);
        setResult(null);

        try {
            const response = await fetch(WANDBOX_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: processCodeForWandbox,
                    compiler: getCompiler(passedLanguage),
                    stdin: inputData,
                    save: false,
                }),
            });

            const text = await response.text();
            const endTime = performance.now();

            if (!response.ok) throw new Error(text);

            const data = JSON.parse(text);

            let finalOutput = "";

            if (data.status === "0" || data.status === 0) {
                finalOutput =
                    data.program_output ||
                    data.program_message ||
                    "";

                setIsError(false);
                setExitCode(0);
                setStatus("Success");
            } else {
                finalOutput =
                    data.program_message ||
                    data.compiler_error ||
                    "Execution Error";

                setIsError(true);
                setExitCode(1);
                setStatus("Error");
            }

            setOutput(finalOutput);
            setExecTime(((endTime - startTime) / 1000).toFixed(2) + "s");

            // 📊 Track Total Submissions in localStorage
            const submissionsKey = "velearn_submission_counts";
            const submissionsData = JSON.parse(localStorage.getItem(submissionsKey) || "{}");
            const langKey = passedLanguage.toLowerCase();
            submissionsData[langKey] = (submissionsData[langKey] || 0) + 1;
            localStorage.setItem(submissionsKey, JSON.stringify(submissionsData));

            // ✅ JUDGE LOGIC (only on submit)
            if (isSubmit && !isError) {
                const cleanUserOutput = finalOutput.trim();
                const cleanExpected = problems[currentIndex].expectedOutput.trim();

                if (cleanUserOutput === cleanExpected) {
                    setResult("Correct");

                    // 💾 Save to localStorage
                    const solvedKey = "velearn_solved_problems";
                    const solvedData = JSON.parse(localStorage.getItem(solvedKey) || "{}");
                    const languageKey = passedLanguage.toLowerCase();

                    if (!solvedData[languageKey]) {
                        solvedData[languageKey] = [];
                    }

                    const problemId = problems[currentIndex].id;
                    if (!solvedData[languageKey].includes(problemId)) {
                        solvedData[languageKey].push(problemId);
                        localStorage.setItem(solvedKey, JSON.stringify(solvedData));
                    }

                    // 💾 Save the actual successful code
                    const codeKey = "velearn_saved_debugging_code";
                    const savedCodes = JSON.parse(localStorage.getItem(codeKey) || "{}");
                    if (!savedCodes[languageKey]) savedCodes[languageKey] = {};
                    savedCodes[languageKey][problemId] = code;
                    localStorage.setItem(codeKey, JSON.stringify(savedCodes));

                } else {
                    setResult("Wrong");
                }
            }

        } catch (err) {
            setOutput("❌ " + err.message);
            setIsError(true);
            setExitCode(1);
            setStatus("Error");
        } finally {
            setIsRunning(false);
        }
    };

    const clearOutput = () => {
        const currentProblem = problems[currentIndex];
        if (!currentProblem) return;

        // If user already solved it, "Clear" should probably reset to their solved version, not the empty one
        const savedCode = getSavedCode(currentProblem.id);

        setCode(savedCode || currentProblem.starterCode || "");
        setInputData(formatInputForBox(currentProblem.input));

        setOutput("");
        setExitCode(null);
        setExecTime(null);
        setStatus("Ready");
        setResult(null);
    };
    const goNext = () => {
        if (currentIndex < problems.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextProblem = problems[nextIndex];

            const savedCode = getSavedCode(nextProblem.id);

            setCurrentIndex(nextIndex);
            setCode(savedCode || nextProblem.starterCode || "");
            setInputData(formatInputForBox(nextProblem.input));

            // Clear status but keep current result if solved
            setOutput("");
            setExitCode(null);
            setExecTime(null);
            setStatus("Ready");
            setResult(null);
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            const prevProblem = problems[prevIndex];

            const savedCode = getSavedCode(prevProblem.id);

            setCurrentIndex(prevIndex);
            setCode(savedCode || prevProblem.starterCode || "");
            setInputData(formatInputForBox(prevProblem.input));

            setOutput("");
            setExitCode(null);
            setExecTime(null);
            setStatus("Ready");
            setResult(null);
        }
    };
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (problems.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "60vh" }}>
                <h4>No problems found for {passedLanguage} {passedLevel ? `(${passedLevel})` : ''}</h4>
                <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            {/* HEADER */}
            {/* <div className="ide_header">
                <div className="ide_header_right">
                    <button onClick={() => runCode(false)} disabled={isRunning}>
                        ▶ Run
                    </button>

                    <button
                        onClick={() => runCode(true)}
                        disabled={isRunning}
                        style={{ background: "#22c55e" }}
                    >
                        Submit
                    </button>
                </div>
            </div> */}

            <div className="debugging_body mb-5">

                <div className="row w-100 m-auto">

                    {/* LEFT - QUESTION */}
                    {/* LEFT - QUESTION */}
                    <div className="col-lg-6 px-3 py-3 debugging_left">
                        <h5>
                            <b>
                                {problems[currentIndex].id}. Problem: {problems[currentIndex].title}
                            </b>
                        </h5>
                        <hr />

                        <p>{problems[currentIndex].description}</p>

                        <h6>Input:</h6>
                        <code>{problems[currentIndex].input}</code>

                        <h6 className="mt-3">Expected Output:</h6>
                        <code>{problems[currentIndex].expectedOutput}</code>
                    </div>

                    {/* RIGHT - EDITOR + OUTPUT */}
                    <div className="col-lg-6 px-0 h-100">
                        <div className="debugging_actions mb-lg-4 ">
                            <div className="d-flex justify-content-between">
                                <button onClick={() => runCode(false)} disabled={isRunning}>
                                    ▶ Run
                                </button>

                                <button
                                    onClick={() => runCode(true)}
                                    disabled={isRunning}
                                    style={{ background: "#22c55e", color: "#ffffff" }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="ide_left_editor debugging_left_editor"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ height: "200px" }}
                        />

                        <div className="output_container">

                            <div className="output_header d-flex justify-content-between align-items-center">
                                <span>{passedLanguage.toUpperCase()} | {status}</span>
                                <span style={{ fontSize: '11px', opacity: 0.8 }}>Standard Input</span>
                            </div>

                            {/* Always visible Input Box */}
                            <div style={{ borderBottom: "1px solid #333", padding: "10px", background: "#1e1e1e" }}>
                                <textarea
                                    value={inputData}
                                    onChange={(e) => setInputData(e.target.value)}
                                    placeholder="Enter input for testing..."
                                    style={{
                                        height: "60px",
                                        width: "100%",
                                        padding: "10px",
                                        background: "#f8f9fa",
                                        color: "#000",
                                        resize: "vertical",
                                        borderRadius: "4px",
                                        border: "none",
                                        outline: "none",
                                        fontSize: "13px"
                                    }}
                                />
                            </div>

                            <div className="ide_right_output_inner">
                                <pre style={{ color: isError ? "red" : "#fff", margin: 0 }}>
                                    <div>
                                        {output || "> Ready to execute..."}
                                    </div>
                                </pre>
                            </div>

                            {result && (
                                <div style={{
                                    padding: "10px",
                                    fontWeight: "bold",
                                    color: result === "Correct" ? "#22c55e" : "#ef4444"
                                }}>
                                    {result === "Correct" ? "✅ Correct Answer" : "❌ Wrong Answer"}
                                </div>
                            )}

                        </div>

                    </div>

                    {/* BOTTOM STATUS BAR */}
                    <div className="col-12 px-0">
                        <div className="ide_bottom_bar">
                            <div>
                                {passedLanguage.toUpperCase()}
                                {exitCode !== null && ` | Exit Code: ${exitCode}`}
                                {execTime && ` | Executed in: ${execTime}`}
                            </div>

                            <button onClick={clearOutput}>Clear</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3 debugging_navigation">
                        <button onClick={goPrevious} disabled={currentIndex === 0}>
                            <i className="bi bi-arrow-left"></i> Previous
                        </button>

                        <button onClick={goNext} disabled={currentIndex === problems.length - 1}>
                            Next  <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}