import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "../Components/Styles/IDE.css"

export default function IDEEditor() {
    const iframeRef = useRef(null);

    const [scrolled, setScrolled] = useState(false);
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("Ready");
    const [pyodide, setPyodide] = useState(null);
    const [fileName, setFileName] = useState("Main.py");

    /* -------------------- SCROLL SHADOW ONLY -------------------- */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const templates = {
        html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,

        css: `body {
  background: #222;
  color: white;
  font-family: Arial;
}`,

        javascript: `console.log("Hello from JavaScript");`,

        python: `print("Hello from Python")`,

        java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}`
    };

    useEffect(() => {
        // Reset editor code
        setCode(templates[language] || "");

        // Reset console output
        setOutput("");

        // Reset status
        setStatus("Ready");

        // Reset iframe completely
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.src = "about:blank";
        }
        if (language === "html") setFileName("index.html");
        if (language === "css") setFileName("style.css");
        if (language === "javascript") setFileName("script.js");
        if (language === "python") setFileName("main.py");
        if (language === "java") setFileName("Main.java");
    }, [language]);
    // Load Pyodide
    useEffect(() => {
        const loadPython = async () => {
            const script = document.createElement("script");
            script.src =
                "https://cdn.jsdelivr.net/pyodide/v0.24.1/pyodide.js";
            script.onload = async () => {
                const py = await window.loadPyodide({
                    stdout: (text) => {
                        setOutput(prev => prev + text + "\n");
                    },
                    stderr: (text) => {
                        setOutput(prev => prev + text + "\n");
                    }
                });
                setPyodide(py);
            };
            document.body.appendChild(script);
        };
        loadPython();
    }, []);

    // Run Code
    const runCode = async () => {
        setOutput("");
        setStatus("Running...");
        const startTime = Date.now();

        if (["html", "css", "javascript"].includes(language)) {
            const iframe = iframeRef.current;
            if (!iframe) {
                setStatus("Error: iframe not ready");
                return;
            }

            if (language === "html") {
                iframe.srcdoc = `
        <html>
        <head>
            <style>
                body {
                    background: #000;
                    color: #fff;
                    font-family: Arial;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            ${code}
        </body>
        </html>
    `;
            }

            if (language === "css") {
                iframe.srcdoc = `
        <html>
        <body>
            <style>${code}</style>
            <h1>CSS Preview</h1>
        </body>
        </html>
    `;
            }

            if (language === "javascript") {

                const iframe = iframeRef.current;
                if (!iframe) {
                    setStatus("Error: iframe not ready");
                    return;
                }

                iframe.srcdoc = `
<html>
<head>
<style>
  body {
    background: #000;
    color: #fff;
    font-family: Arial;
    padding: 20px;
  }
</style>
</head>

<body>
<script>
  window.onerror = function(message) {
    parent.postMessage({type:"console", data: message}, "*");
  };

  function send() {
    parent.postMessage(
      {type:"console", data: Array.from(arguments).join(" ")},
      "*"
    );
  }

  const originalLog = console.log;
  console.log = function(...args){
    send(...args);
    originalLog.apply(console, args);
  };

  console.error = console.warn = console.log;

  window.addEventListener("load", function() {
    try {
      ${code}
    } catch (err) {
      send(err.message);
    }
  });
<\/script>
</body>
</html>
`;
                setStatus("Execution Finished");
                return;
            }

            if (language === "python") {
                if (!pyodide) {
                    setStatus("Python loading...");
                    return;
                }

                try {
                    // Capture print output
                    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);

                    pyodide.runPython(code);

                    const result = pyodide.runPython("sys.stdout.getvalue()");

                    setOutput(result);
                    setStatus("Execution Finished");
                } catch (err) {
                    setOutput(err.message);
                    setStatus("Error");
                }

                return;
            }

            if (language === "java") {
                try {
                    const match = code.match(/System\.out\.println\((.*?)\);/);

                    if (match) {
                        let text = match[1]
                            .replace(/^"(.*)"$/, "$1");

                        setOutput(text);
                        setStatus("Execution Finished");
                    } else {
                        setOutput("No output (Only System.out.println supported)");
                        setStatus("Execution Finished");
                    }

                } catch (err) {
                    setOutput("Java Simulation Error");
                    setStatus("Error");
                }

                return;
            }

            setStatus("Execution Finished");
            return;
        }
        if (!language) {
            setStatus("Please select a language");
            return;
        }
    };

    // Capture console logs
    useEffect(() => {
        const handler = (event) => {
            if (event.data?.type === "console") {
                setOutput((prev) => prev + event.data.data + "\n");
                setStatus("Execution Finished");
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            {/* ===== TOP NAVBAR ===== */}
            <div className={`ide_header ${scrolled ? 'scrolled' : ''}`}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ide_header_icon" style={{ display: "flex", gap: 20 }}>
                            <button>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/ide/new-file.png`} alt="" /><br />
                                New File
                            </button>
                            <button>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/ide/upload.png`} alt="" /><br />
                                Upload File
                            </button>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="select_wrapper">
                                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                        <option value="">Language</option>
                                        <option value="html">HTML</option>
                                        <option value="css">CSS</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex justify-content-center justify-content-lg-end align-items-center">
                        <div className="ide_header_right">
                            <button onClick={runCode} > <i className="bi bi-caret-right-fill"></i> Run  </button>
                            <button><i className="bi bi-share-fill"></i> Share</button>
                            <button><i className="bi bi-floppy"></i> Save</button>
                            <button><i className="bi bi-download"></i>Download</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ide_body">
                <div className="ide_filename">
                    {fileName}
                </div>

                <div className="ide_editor_main py-3">
                    <div className="row w-100 ">
                        <div className="col-lg-6">
                            <Editor
                                height="100%"
                                theme="vs-light"
                                language={
                                    language === "html"
                                        ? "html"
                                        : language === "css"
                                            ? "css"
                                            : language === "java"
                                                ? "java"
                                                : language
                                }
                                value={code}
                                onChange={(value) => setCode(value)}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    automaticLayout: true,
                                }}
                                className="editor_left_ide"
                            />
                        </div>
                        <div className="col-lg-6">
                            <div className="section_container">
                                <div className="col-12">
                                    <div className="output_container">
                                        <div className="output_header">
                                            <div className="output_left">
                                                <span className="dot red"></span>
                                                <span className="dot yellow"></span>
                                                <span className="dot green"></span>
                                                <span className="running_text">{status}</span>
                                            </div>

                                            <div className="output_center">
                                                Output
                                            </div>

                                            <div className="output_right">
                                                <i className="bi bi-chevron-down"></i>
                                            </div>
                                        </div>

                                        {/* SHOW IFRAME FOR HTML & CSS */}
                                        <div className="d-flex w-100">
                                            {(language === "html" ||
                                                language === "css" ||
                                                language === "javascript") && (
                                                    <iframe
                                                        ref={iframeRef}
                                                        title="output"
                                                        className="output_iframe"
                                                    />
                                                )}

                                            {(language === "javascript" ||
                                                language === "python" ||
                                                language === "java") && (
                                                    <pre className="output_box">
                                                        {output}
                                                    </pre>
                                                )}
                                        </div>
                                    </div>
                                    {/* ===== STATUS BAR ===== */}
                                    <div style={{
                                        background: "#f0f0f0",
                                        padding: "5px 15px",
                                        fontSize: 14
                                    }}>
                                        {language.toUpperCase()} | {status}
                                    </div>

                                    {/* <iframe ref={iframeRef} style={{ display: "none" }} title="hidden" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



import React, { useState, useEffect } from "react";
import "../Components/Styles/IDE.css"

const WANDBOX_API_URL = "https://wandbox.org/api/compile.json";

const COMPILER_CONFIG = {
    python: "cpython-3.11.10",
    java: "openjdk-jdk-21+35",
    cpp: "gcc-12.3.0",
    typescript: "typescript-5.6.2",
    javascript: "nodejs-18.20.4",
    html: null,
    css: null
};

const JAVA_COMPILER_FALLBACKS = [
    "openjdk-jdk-21+35",
    "openjdk-jdk-17+35",
    "openjdk-latest",
];

const languageTemplates = {
    javascript: `console.log("Hello from React Web!");`,

    html: `<!DOCTYPE html>
<html>
<head>
<title>HTML Preview</title>
</head>
<body>
<h1>Hello HTML!</h1>
<p>Edit and click Run</p>
</body>
</html>`,

    css: `body {
  background-color: #111;
  color: white;
  text-align: center;
  font-family: Arial;
}

h1 {
  color: #00ffcc;
}`,

    python: `print("Hello Python!")`,

    java: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}`,

    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello C++!" << endl;
    return 0;
}`,

    typescript: `const msg: string = "Hello TypeScript";
console.log(msg);`,
};
export default function IDEEditor() {
    const [scrolled, setScrolled] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(languageTemplates.javascript);
    const [inputData, setInputData] = useState("");
    const [output, setOutput] = useState("");
    const [isError, setIsError] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ---------------------------
    // Local JS execution
    // ---------------------------
    const executeLocalJS = (codeString) => {
        return new Promise((resolve) => {
            const logs = [];
            const originalLog = console.log;

            console.log = (...args) =>
                logs.push(
                    args.map((a) =>
                        typeof a === "object" ? JSON.stringify(a) : String(a)
                    ).join(" ")
                );

            try {
                eval(codeString);
                resolve({
                    output: logs.join("\n") || "Success (No output)",
                    isError: false,
                });
            } catch (e) {
                resolve({
                    output: "Error: " + e.message,
                    isError: true,
                });
            } finally {
                console.log = originalLog;
            }
        });
    };

    // ---------------------------
    // Run Code
    // ---------------------------
    const runCode = async () => {
        if (!code.trim()) {
            alert("Please write some code first.");
            return;
        }

        setIsRunning(true);
        setOutput("🚀 Running...");
        setIsError(false);

        try {
            // HTML / CSS Preview
            if (selectedLanguage === "html" || selectedLanguage === "css") {
                const iframe = document.getElementById("previewFrame");

                let htmlContent = "";

                if (selectedLanguage === "html") {
                    htmlContent = code;
                }

                if (selectedLanguage === "css") {
                    htmlContent = `
        <html>
        <head>
        <style>${code}</style>
        </head>
        <body>
        <h1>CSS Preview</h1>
        <p>Edit CSS and click Run</p>
        </body>
        </html>
        `;
                }

                iframe.srcdoc = htmlContent;
                setOutput("✅ Preview updated");
                setIsError(false);
                setIsRunning(false);
                return;
            }
            // Local JS
            if (selectedLanguage === "javascript") {
                const result = await executeLocalJS(code);
                setOutput(result.output);
                setIsError(result.isError);
                setIsRunning(false);
                return;
            }

            const compilers =
                selectedLanguage === "java"
                    ? JAVA_COMPILER_FALLBACKS
                    : [COMPILER_CONFIG[selectedLanguage]];

            let lastError = null;

            for (const compiler of compilers) {
                try {
                    const response = await fetch(WANDBOX_API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            code,
                            compiler,
                            stdin: inputData,
                            save: false,
                        }),
                    });

                    const text = await response.text();
                    if (!response.ok) {
                        lastError = text;
                        continue;
                    }

                    const data = JSON.parse(text);

                    if (data.status === "0" || data.status === 0) {
                        const result =
                            data.program_output ||
                            data.program_message ||
                            "Success (No Output)";
                        setOutput(result);
                        setIsError(false);
                        setIsRunning(false);
                        return;
                    } else {
                        setOutput(
                            data.program_message ||
                            data.compiler_error ||
                            "Execution Error"
                        );
                        setIsError(true);
                        setIsRunning(false);
                        return;
                    }
                } catch (err) {
                    lastError = err.message;
                }
            }

            throw new Error(lastError || "All compilers failed");
        } catch (error) {
            setOutput("❌ " + error.message);
            setIsError(true);
        } finally {
            setIsRunning(false);
        }
    };

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        setCode(languageTemplates[lang]);
        setOutput("");
        setInputData("");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={`ide_header ${scrolled ? 'scrolled' : ''}`}>
                <div className="row w-100 m-auto">
                    <div className="col-lg-4">
                        <div className="ide_header_icon" style={{ display: "flex", gap: 20 }}>
                            <button>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/ide/new-file.png`} alt="" /><br />
                                New File
                            </button>
                            <button>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/ide/upload.png`} alt="" /><br />
                                Upload File
                            </button>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="select_wrapper">
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => handleLanguageChange(e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value="html">HTML</option>
                                        <option value="css">CSS</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                        <option value="cpp">C++</option>
                                        <option value="typescript">TypeScript</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex justify-content-center justify-content-lg-end align-items-center">
                        <div className="ide_header_right">
                            <button onClick={runCode}
                                disabled={isRunning}> <i className="bi bi-caret-right-fill"></i> Run  </button>
                            <button><i className="bi bi-share-fill"></i> Share</button>
                            <button><i className="bi bi-floppy"></i> Save</button>
                            <button><i className="bi bi-download"></i>Download</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ide_body">
                {/* Code Editor */}
                <div className="row w-100 m-auto">
                    <div className="col-lg-6">
                        <textarea
                            style={styles.editor}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        {showInput && (
                            <textarea
                                style={styles.input}
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                placeholder="Enter input (stdin)..."
                            />
                        )}

                        {/* Output */}
                        <div style={styles.output}>
                            <pre style={{ color: isError ? "red" : "#000000" }}>
                                {output || "> Ready to execute..."}
                            </pre>
                        </div>
                        {(selectedLanguage === "html" || selectedLanguage === "css") && (
                            <div style={{ marginTop: "20px" }}>
                                <iframe
                                    id="previewFrame"
                                    title="preview"
                                    style={{
                                        width: "100%",
                                        height: "300px",
                                        background: "#fff",
                                        borderRadius: "8px"
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* Input Toggle */}
                {/* <div style={{ marginTop: 10 }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showInput}
                            onChange={() => setShowInput(!showInput)}
                        />
                        Enable Custom Input
                    </label>
                </div> */}
            </div>
        </div>
    );
}

// Basic inline styling
const styles = {
    container: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#ffffff",
        color: "#000000",
        borderRadius: "12px",
    },
    select: {
        padding: "8px",
        marginBottom: "15px",
    },
    editor: {
        width: "100%",
        height: "300px",
        fontFamily: "monospace",
        fontSize: "14px",
        padding: "12px",
        background: "#ffffff",
        color: "#000000",
        borderRadius: "8px",
    },
    input: {
        width: "100%",
        height: "80px",
        marginTop: "10px",
        padding: "8px",
        fontFamily: "monospace",
    },
    output: {
        marginTop: "20px",
        background: "#ffffff",
        padding: "15px",
        borderRadius: "8px",
        minHeight: "150px",
    },
};