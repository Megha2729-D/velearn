import React, { useState } from "react";
import "../Components/Styles/IDE.css";

const WANDBOX_API_URL = "https://wandbox.org/api/compile.json";

export default function DebuggingWorkspace() {
    const problems = [
        {
            id: 1,
            title: "Sum of Numbers",
            description: "Write a program that takes numbers separated by space and prints their sum.",
            input: "5 6",
            expectedOutput: "11",
            starterCode: ``
        },
        {
            id: 2,
            title: "Multiply Two Numbers",
            description: "Take two numbers and print their product.",
            input: "4 5",
            expectedOutput: "20",
            starterCode: ``
        },
        {
            id: 3,
            title: "Reverse String",
            description: "Take a string and print it reversed.",
            input: "hello",
            expectedOutput: "olleh",
            starterCode: ``
        }
    ];

    const [code, setCode] = useState(problems[0].starterCode);

    const [inputData, setInputData] = useState(problems[0].input);
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("Ready");
    const [isError, setIsError] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [exitCode, setExitCode] = useState(null);
    const [execTime, setExecTime] = useState(null);
    const [result, setResult] = useState(null); // Correct / Wrong

    const [currentIndex, setCurrentIndex] = useState(0);
    const runCode = async (isSubmit = false) => {

        if (!code.trim()) {
            alert("Write code first");
            return;
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
                    code,
                    compiler: "cpython-3.11.10",
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

            // ✅ JUDGE LOGIC (only on submit)
            if (isSubmit && !isError) {
                const cleanUserOutput = finalOutput.trim();
                const cleanExpected = problems[currentIndex].expectedOutput.trim();

                if (cleanUserOutput === cleanExpected) {
                    setResult("Correct");
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
        setOutput("");
        setExitCode(null);
        setExecTime(null);
        setStatus("Ready");
        setResult(null);
    };
    const goNext = () => {
        if (currentIndex < problems.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCode(problems[nextIndex].starterCode);
            setInputData(problems[nextIndex].input);
            clearOutput();
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setCode(problems[prevIndex].starterCode);
            setInputData(problems[prevIndex].input);
            clearOutput();
        }
    };
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

                            <div className="output_header">
                                PYTHON | {status}
                            </div>

                            <div className="ide_right_output_inner">
                                <pre style={{ color: isError ? "red" : "#fff" }}>
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
                                PYTHON
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