import React, { useState, useEffect } from "react";
import "../Components/Styles/IDE.css"
import { color } from "framer-motion";

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
                            <pre style={{ color: isError ? "red" : "#ffffff" }}>
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
        background: "#000000",
        color: "#ffffff",
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
        background: "#000000",
        color: "#ffffff",
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
        background: "#000000",
        color: "#ffffff",
        padding: "15px",
        borderRadius: "8px",
        minHeight: "150px",
    },
};