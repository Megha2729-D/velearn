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