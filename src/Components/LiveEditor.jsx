import React, { useState, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

export default function LiveEditor() {
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("html");
    const [output, setOutput] = useState("");
    const iframeRef = useRef(null);

    const [pyodide, setPyodide] = useState(null);
    const [loadingPy, setLoadingPy] = useState(false);

    // Load python only once
    useEffect(() => {
        if (lang === "python" && !pyodide && !loadingPy) {
            setLoadingPy(true);

            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
            script.onload = async () => {
                const py = await window.loadPyodide();
                setPyodide(py);
                setLoadingPy(false);
            };
            document.body.appendChild(script);
        }
    }, [lang, pyodide, loadingPy]);

    async function runCode() {

        // HTML
        if (lang === "html") {
            const doc = iframeRef.current.contentDocument;
            doc.open();
            doc.write(code);
            doc.close();
            return;
        }

        // JS
        if (lang === "js") {
            const doc = iframeRef.current.contentDocument;
            doc.open();
            doc.write(`
                <script>
                const log = console.log;
                console.log = (...args) => {
                    parent.postMessage({type:'console',data:args.join(" ")}, "*");
                    log(...args);
                };
                </script>
                <script>${code}<\/script>
            `);
            doc.close();
            return;
        }

        // CSS
        if (lang === "css") {
            const doc = iframeRef.current.contentDocument;
            doc.open();
            doc.write(`<style>${code}</style><div>CSS Applied</div>`);
            doc.close();
            return;
        }

        // PYTHON
        if (lang === "python") {
            if (!pyodide) {
                setOutput("Loading Python runtime...");
                return;
            }

            try {
                setOutput("Running...\n");

                const wrappedCode = `
import sys
from io import StringIO

_buffer = StringIO()
sys.stdout = _buffer

${code}

_buffer.getvalue()
`;

                const result = await pyodide.runPythonAsync(wrappedCode);
                setOutput(result || "No output");
            } catch (err) {
                setOutput(err.toString());
            }
        }
    }

    // Capture console.log from iframe
    useEffect(() => {
        const handler = (event) => {
            if (event.data?.type === "console") {
                setOutput(prev => prev + event.data.data + "\n");
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    const getExtensions = () => {
        if (lang === "html") return [html()];
        if (lang === "css") return [css()];
        return [javascript()];
    };

    return (
        <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
                <select value={lang} onChange={(e) => {
                    setLang(e.target.value);
                    setOutput("");
                }}>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="js">JavaScript</option>
                    <option value="python">Python</option>
                </select>

                <CodeMirror
                    value={code}
                    height="350px"
                    extensions={getExtensions()}
                    onChange={(value) => setCode(value)}
                />

                <button onClick={runCode}>Run</button>
            </div>

            <div style={{ flex: 1 }}>
                {lang !== "python" ? (
                    <iframe
                        ref={iframeRef}
                        title="output"
                        style={{
                            width: "100%",
                            height: "350px",
                            border: "1px solid #ccc",
                            background: "white"
                        }}
                    />
                ) : (
                    <pre
                        style={{
                            width: "100%",
                            height: "350px",
                            border: "1px solid #ccc",
                            padding: "10px",
                            background: "#111",
                            color: "#0f0",
                            overflow: "auto"
                        }}
                    >
                        {output}
                    </pre>
                )}
            </div>
        </div>
    );
}
