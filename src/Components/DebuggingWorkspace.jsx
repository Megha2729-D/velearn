// DebuggingWorkspace.jsx
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "../Components/Styles/Debugging.css"

export default function DebuggingWorkspace() {
    const [code, setCode] = useState(`# Debug the program to print sum of numbers\nnums = list(map(int, input().split()))\nprint(sum(nums))`);
    const [output, setOutput] = useState("Click Submit to run the program");

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
    };

    const handleSubmit = () => {
        // Fake execution simulation (replace with API later)
        setOutput(`Finished in 6 ms\n1 + 2 = 3\n\nFinished in 15 ms\nThe sum of 5 and 6 is 11`);
    };

    return (
        <div className="workspace-wrapper">
            {/* HERO */}
            <section className="debug_hero">
                <h1 className="text-center text-white fw-bold">Python</h1>
            </section>

            {/* Question selector */}
            <div className="question-bar text-center">
                <button className="btn btn-sm btn-light">View Question ▼</button>
            </div>

            <div className="container py-3">
                <div className="row g-3">
                    {/* Problem Statement */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body problem-panel">
                                <h6><b>1. Problem Title: Sum</b></h6>
                                <hr />
                                <p>
                                    Write a program that takes numbers separated by space and prints their sum.
                                </p>
                                <h6>Input Description:</h6>
                                <p>A single line containing space separated integers</p>
                                <h6>Output Description:</h6>
                                <p>Print the sum of numbers</p>
                                <h6>Sample Input:</h6>
                                <code>5 6</code>
                                <h6 className="mt-2">Sample Output:</h6>
                                <code>11</code>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <span>Python</span>
                                <div className="d-flex justify-content-center">
                                    <button className="copy_debug_butt" onClick={handleCopy}><i class="bi bi-copy"></i> Copy</button>
                                    <button className="submit_debug_butt" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>

                            <div className="editor-box">
                                <Editor
                                    height="300px"
                                    defaultLanguage="python"
                                    value={code}
                                    onChange={(v) => setCode(v || "")}
                                    theme="vs-dark"
                                />
                            </div>

                            <div className="card-footer output-panel">
                                <div className="d-flex justify-content-between mb-2">
                                    <button className="btn btn-outline-primary btn-sm">Output</button>
                                    <button className="btn btn-outline-secondary btn-sm">Hint</button>
                                </div>
                                <pre className="output-text">{output}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer navigation */}
            <div className="workspace-footer d-flex justify-content-between px-3 py-2">
                <button className="btn btn-light btn-sm">◀ Previous</button>
                <button className="btn btn-light btn-sm">Next ▶</button>
            </div>
        </div>
    );
}