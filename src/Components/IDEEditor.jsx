import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "../Components/Styles/IDE.css"

export default function IDEEditor() {
    const iframeRef = useRef(null);

    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("Ready");
    const [pyodide, setPyodide] = useState(null);
    const [fileName, setFileName] = useState("Main.py");

    const templates = {
        javascript: `console.log("Hello from JavaScript");

for(let i=1;i<=5;i++){
  console.log("Number:", i);
}`,

        python: `n = int(input("Enter the number: "))
print(n)`
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
                "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
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

        if (language === "javascript") {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument;

            doc.open();
            doc.write(`
                    <!DOCTYPE html>
                    <html>
                    <body>
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

                        window.runCode = function(code){
                            try{
                                const fn = new Function(code);
                                fn();
                            }catch(err){
                                send(err);
                            }
                        };
                    <\/script>
                    </body>
                    </html>
                    `);
            doc.close();

            // ✅ WAIT FOR IFRAME READY
            iframe.onload = () => {
                iframe.contentWindow.runCode(code);
                setStatus("Execution Finished");
            };

            return;
        }

        if (language === "python") {
            if (!pyodide) {
                setOutput("Loading Python runtime...");
                return;
            }

            try {
                const wrapped = `
                    import sys
                    from io import StringIO
                    _buffer = StringIO()
                    sys.stdout = _buffer

                    ${code}

                    _buffer.getvalue()
                            `;
                const result = await pyodide.runPythonAsync(wrapped);
                const endTime = Date.now();
                setOutput(result || "No output");
                setStatus(
                    "Exit Code: 0 | Executed in " +
                    ((endTime - startTime) / 1000).toFixed(2) +
                    "s"
                );
            } catch (err) {
                setOutput(err.toString());
                setStatus("Execution Failed");
            }
        }
    };

    // Capture console logs
    useEffect(() => {
        const handler = (event) => {
            if (event.data?.type === "console") {
                setOutput((prev) => prev + event.data.data + "\n");
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

            {/* ===== TOP NAVBAR ===== */}
            <div className="ide_header">
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
                                        <option value="" selected>Language</option>
                                        <option value="python">Python</option>
                                        <option value="javascript">JavaScript</option>
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

            <div className="ide_filename">
                {fileName}
            </div>

            <div className="ide_editor_main py-3">
                <div className="row w-100 ">

                    {/* EDITOR */}
                    <div className="col-12">
                        <Editor
                            height="100%"
                            theme="vs-light"
                            language={language}
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

                    {/* OUTPUT */}
                    <div className="col-12">
                        <div> Output </div>
                        <pre>
                            {output}
                        </pre>
                    </div>
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

            <iframe ref={iframeRef} style={{ display: "none" }} title="hidden" />
        </div>
    );
}
