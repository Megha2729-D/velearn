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

    // Load default template
    useEffect(() => {
        setCode(templates[language]);
        setOutput("");
    }, [language]);

    // Load Pyodide
    useEffect(() => {
        const loadPython = async () => {
            const script = document.createElement("script");
            script.src =
                "https://cdn.jsdelivr.net/pyodide/v0.24.1/pyodide.js";
            script.onload = async () => {
                const py = await window.loadPyodide();
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
            const doc = iframe.contentDocument;

            doc.open();

            if (language === "html") {
                doc.write(`
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
    `);
            }

            if (language === "css") {
                doc.write(`
      <style>${code}</style>
      <h1>CSS Preview</h1>
    `);
            }

            if (language === "javascript") {
                doc.write(`
      <script>
        window.addEventListener("error", e => {
          parent.postMessage({type:"console", data:e.message}, "*");
        });

        const send = (...args) => {
          parent.postMessage({type:"console", data:args.join(" ")}, "*");
        };

        console.log = send;
        console.error = send;
        console.warn = send;

        try {
          ${code}
        } catch(err){
          send(err);
        }
      <\/script>
    `);
            }

            doc.close();
            setStatus("Execution Finished");
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
                            <button onClick={runCode} > <i class="bi bi-caret-right-fill"></i> Run  </button>
                            <button><i class="bi bi-share-fill"></i> Share</button>
                            <button><i class="bi bi-floppy"></i> Save</button>
                            <button><i class="bi bi-download"></i>Download</button>
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
                                        {(language === "html" || language === "css") ? (
                                            <iframe
                                                ref={iframeRef}
                                                title="output"
                                                className="output_iframe"
                                            />
                                        ) : (
                                            <pre className="output_box">
                                                {output}
                                            </pre>
                                        )}
                                    </div>
                                    {/* ===== STATUS BAR ===== */}
                                    <div style={{
                                        background: "#f0f0f0",
                                        padding: "5px 15px",
                                        fontSize: 14
                                    }}>
                                        {language.toUpperCase()} | {status}
                                    </div>

                                    <iframe ref={iframeRef} style={{ display: "none" }} title="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
