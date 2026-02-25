import React, { useState, useRef, useEffect } from 'react';
import "../Components/Styles/IDE.css"

const LANGUAGES = [
    { name: 'javascript', version: '18.15.0', label: 'JavaScript' },
    { name: 'html', label: 'HTML / CSS' },
    { name: 'python', version: '3.10.0', label: 'Python' },
    { name: 'java', version: '15.0.2', label: 'Java' },
    { name: 'cpp', version: '10.2.0', label: 'C++' },
    { name: 'typescript', version: '5.0.3', label: 'TypeScript' },
];

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

export default function IDEEditor() {
    const [scrolled, setScrolled] = useState(false);
    const [langIndex, setLangIndex] = useState(0);
    const [code, setCode] = useState('// Use document.body.innerHTML instead of document.write\ndocument.body.innerHTML = "<h1>Hello JS!</h1>";\nconsole.log("Logged to console");');
    const [output, setOutput] = useState("Output will appear here...");
    const [isLoading, setIsLoading] = useState(false);
    const iframeRef = useRef(null);

    const selected = LANGUAGES[langIndex];

    /* -------------------- SCROLL SHADOW ONLY -------------------- */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleIframeMessages = (event) => {
            if (event.data.type === 'log') {
                setOutput(prev => (prev === "Executing..." || prev === "Web preview updated.") ? event.data.data : prev + "\n" + event.data.data);
            } else if (event.data.type === 'error') {
                setOutput("JS Error: " + event.data.data);
                setIsLoading(false);
            } else if (event.data.type === 'finished') {
                setIsLoading(false);
            }
        };

        window.addEventListener('message', handleIframeMessages);
        return () => window.removeEventListener('message', handleIframeMessages);
    }, []);

    const runCode = async () => {
        setIsLoading(true);
        setOutput("Executing...");

        if (selected.name === 'html' || selected.name === 'javascript') {
            try {
                const doc = iframeRef.current.contentDocument;

                // For HTML, we use srcdoc to reset the frame completely
                if (selected.name === 'html') {
                    doc.open();
                    doc.write(code);
                    doc.close();
                    setOutput("Web preview updated.");
                    setIsLoading(false);
                } else {
                    // For JS, we inject a bridge that handles console.log and errors
                    doc.open();
                    doc.write(`
                        <html>
                        <body>
                        <script>
                            (function() {
                                const oldLog = console.log;
                                console.log = (...args) => {
                                    window.parent.postMessage({type: 'log', data: args.join(' ')}, '*');
                                    oldLog.apply(console, args);
                                };
                                window.onerror = (msg) => {
                                    window.parent.postMessage({type: 'error', data: msg}, '*');
                                };
                                try {
                                    ${code}
                                    window.parent.postMessage({type: 'finished'}, '*');
                                } catch (e) {
                                    window.parent.postMessage({type: 'error', data: e.message}, '*');
                                }
                            })();
                        </script>
                        </body>
                        </html>
                    `);
                    doc.close();
                }
            } catch (err) {
                setOutput("Execution Error: " + err.message);
                setIsLoading(false);
            }
            return;
        }

        // BACKEND LANGUAGES (Python/Java/C++/TS)
        try {
            const response = await fetch(PISTON_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: selected.name,
                    version: selected.version,
                    files: [{ content: code }],
                }),
            });
            const data = await response.json();
            if (data.run) {
                setOutput(data.run.stdout || data.run.stderr || "Program finished with no output.");
            } else {
                setOutput("SERVER: " + data.message);
            }
        } catch (error) {
            setOutput("Connection Error.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLanguageChange = (e) => {
        const index = parseInt(e.target.value);
        setLangIndex(index);
        const lang = LANGUAGES[index].name;
        if (lang === 'java') setCode('public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello Java");\n  }\n}');
        else if (lang === 'cpp') setCode('#include <iostream>\n\nint main() {\n    std::cout << "Hello C++";\n    return 0;\n}');
        else if (lang === 'python') setCode('print("Hello Python")');
        else if (lang === 'javascript') setCode('document.body.innerHTML = "<h1>Hello JS!</h1>";\nconsole.log("Logged to console");');
        else if (lang === 'typescript') setCode('let message: string = "Hello TS";\nconsole.log(message);');
        else setCode('<h1>Hello HTML</h1>');
        setOutput("Output will appear here...");
    };

    return (
        <div className='d-flex flex-column'>
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
                                <div className="select_wrapper text-black">
                                    <select value={langIndex} onChange={handleLanguageChange}>
                                        {LANGUAGES.map((l, i) => <option key={l.name} value={i}>{l.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex justify-content-center justify-content-lg-end align-items-center">
                        <div className="ide_header_right">
                            <button onClick={runCode} disabled={isLoading}>
                                <i className="bi bi-caret-right-fill"></i>
                                {isLoading ? "Running..." : "Run"}
                            </button>
                            <button><i className="bi bi-share-fill"></i> Share</button>
                            <button><i className="bi bi-floppy"></i> Save</button>
                            <button><i className="bi bi-download"></i>Download</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ide_body">
                {/* <header style={styles.header}>
                    <div style={styles.logo}>VeLearn <span style={{ fontWeight: 300 }}>IDE</span></div>
                    <div style={styles.actions}>
                        <select value={langIndex} onChange={handleLanguageChange} style={styles.select}>
                            {LANGUAGES.map((l, i) => <option key={l.name} value={i}>{l.label}</option>)}
                        </select>
                        <button onClick={runCode} disabled={isLoading} style={styles.runBtn}>
                            {isLoading ? "Running..." : "Run Code"}
                        </button>
                    </div>
                </header> */}

                <main style={styles.main}>
                    <textarea
                        style={styles.editor}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                    />

                    <div style={styles.resContainer}>
                        <div style={styles.resHeader}>CONSOLE / PREVIEW</div>

                        <iframe
                            ref={iframeRef}
                            title="preview"
                            style={{ ...styles.preview, display: (selected.name === 'html' || selected.name === 'javascript') ? 'block' : 'none' }}
                        />

                        <pre style={{ ...styles.console, display: (selected.name !== 'html' && selected.name !== 'javascript') ? 'block' : 'none' }}>
                            {output}
                        </pre>

                        {/* JavaScript Console (Always visible for JS mode) */}
                        {selected.name === 'javascript' && (
                            <pre style={styles.jsConsole}>{output}</pre>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

const styles = {
    container: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', color: '#fff' },
    header: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#252526', borderBottom: '1px solid #333', alignItems: 'center' },
    logo: { fontSize: '20px', fontWeight: 'bold', color: '#0078d4' },
    actions: { display: 'flex', gap: '10px' },
    select: { background: '#3c3c3c', color: '#fff', border: '1px solid #555', borderRadius: '4px', padding: '5px' },
    runBtn: { background: '#0078d4', color: '#fff', border: 'none', padding: '5px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    main: { display: 'flex', flex: 1, overflow: 'hidden' },
    editor: { flex: 1, background: '#1e1e1e', color: '#d4d4d4', fontFamily: 'monospace', fontSize: '16px', padding: '20px', border: 'none', outline: 'none', resize: 'none' },
    resContainer: { width: '40%', background: '#000', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #333' },
    resHeader: { padding: '5px 10px', fontSize: '11px', color: '#666', background: '#111' },
    console: { flex: 1, padding: '15px', margin: 0, color: '#0f0', whiteSpace: 'pre-wrap', fontSize: '14px', overflowY: 'auto', fontFamily: 'monospace' },
    jsConsole: { height: '150px', borderTop: '2px solid #333', padding: '10px', margin: 0, color: '#0f0', whiteSpace: 'pre-wrap', fontSize: '13px', overflowY: 'auto', background: '#000' },
    preview: { flex: 1, width: '100%', background: '#fff', border: 'none' }
};