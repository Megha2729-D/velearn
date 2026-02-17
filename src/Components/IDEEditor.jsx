import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

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
            const doc = iframeRef.current.contentDocument;
            doc.open();
            doc.write(`
        <script>
          const log = console.log;
          console.log = (...args)=>{
            parent.postMessage({type:'console',data:args.join(" ")}, "*");
            log(...args);
          };
        <\/script>
        <script>${code}<\/script>
      `);
            doc.close();
            setStatus("Execution Finished");
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
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>

            {/* ===== TOP NAVBAR ===== */}
            <div style={{
                background: "#d9e3ea",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div style={{ display: "flex", gap: 20 }}>
                    <button>New File</button>
                    <button>Upload File</button>
                </div>

                <div className="select_wrapper">
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                    <button
                        onClick={runCode}
                        style={{
                            background: "#2b8cff",
                            color: "white",
                            border: "none",
                            padding: "6px 14px",
                            borderRadius: 6,
                            cursor: "pointer"
                        }}
                    >
                        ▶ Run
                    </button>
                    <button>Save</button>
                    <button>Download</button>
                </div>
            </div>

            {/* ===== FILE TAB ===== */}
            <div style={{
                background: "#1e3a5f",
                color: "white",
                padding: "6px 15px"
            }}>
                {fileName}
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div style={{ flex: 1, display: "flex" }}>

                {/* EDITOR */}
                <div style={{ width: "65%" }}>
                    <Editor
                        height="100%"
                        theme="vs-dark"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            automaticLayout: true,
                        }}
                    />
                </div>

                {/* OUTPUT */}
                <div style={{
                    width: "35%",
                    borderLeft: "1px solid #ccc",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{
                        background: "#2b3d55",
                        color: "white",
                        padding: 8
                    }}>
                        Output
                    </div>

                    <pre style={{
                        flex: 1,
                        margin: 0,
                        padding: 10,
                        background: "#000",
                        color: "#0f0",
                        overflow: "auto"
                    }}>
                        {output}
                    </pre>
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
