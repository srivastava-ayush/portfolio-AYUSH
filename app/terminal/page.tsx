"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { PROJECTS } from "../constants";

interface CommandOutput {
  cmd: string;
  output: string | React.ReactNode;
}

interface Project {
  projectName: string;
  projectDescriptionShort: string;
  projectDescriptionLong: string;
  projectCode: string;
  projectLive: string;
}

const PROJECT_MAP: Record<string, number> = {};
(PROJECTS as Project[]).forEach((p, i) => {
  PROJECT_MAP[p.projectName.toLowerCase()] = i;
});

const BOOT_LINES = [
  "> Initializing system boot sequence...",
  "> Locating mainframe node...",
  "> Establishing encrypted uplink [AES-256]...",
  "> Handshake complete. Access token verified.",
  "> Launching terminal interface...",
  "> Connection stable.",
  "> Welcome back, Ayush.",
];

function Page() {
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const bgCounterRef = useRef<number>(1);

  const [output, setOutput] = useState<CommandOutput[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [bootText, setBootText] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [currentDir, setCurrentDir] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const bgImgArr = ["/backgrounds/orangeBg.jpg", "/backgrounds/whiteBg.jpg", "/backgrounds/blackBg.jpg","/backgrounds/orangeDark.jpg", "/backgrounds/multiBg.jpg"];

  // Boot animation
  useEffect(() => {
    let i = 0, j = 0;
    let interval: NodeJS.Timeout;
    const typeLine = () => {
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i];
        interval = setInterval(() => {
          setBootText(prev => {
            const next = [...prev];
            if (!next[i]) next[i] = "";
            next[i] += line[j];
            return next;
          });
          j++;
          if (j >= line.length) {
            clearInterval(interval);
            i++;
            j = 0;
            setTimeout(typeLine, 15);
          }
        }, 15);
      } else {
        setTimeout(() => setBootDone(true), 1000);
      }
    };
    typeLine();
    return () => { if (interval) clearInterval(interval); };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, bootDone]);

  // Focus input on mount and click
  useEffect(() => {
    if (bootDone && inputRef.current) inputRef.current.focus();
  }, [bootDone]);

  const focusInput = useCallback(() => {
    if (bootDone && inputRef.current) inputRef.current.focus();
  }, [bootDone]);

  const addOutput = (cmd: string, out: string | React.ReactNode) => {
    setOutput(prev => [...prev, { cmd, output: out }]);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputVal(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputVal.trim()) {
      const cmd = inputVal.trim();
      setCmdHistory(prev => [...prev, cmd]);
      setHistoryIdx(-1);
      setInputVal("");
      execCommand(cmd);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const idx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInputVal(cmdHistory[idx]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(idx);
        setInputVal(cmdHistory[idx]);
      }
    }
  }

  function execCommand(cmd: string) {
    const lower = cmd.toLowerCase().trim();

    if (lower === "clr" || lower === "clear" || lower === "cls") {
      setOutput([]);
      return;
    }

    if (lower === "exit") {
      router.push("/");
      return;
    }

    if (lower === "whoami") {
      addOutput(cmd, (
        <div className="space-y-1">
          <div><span className="text-[var(--secondary-text)]">name:</span> Ayush Srivastava</div>
          <div><span className="text-[var(--secondary-text)]">role:</span> Full-Stack Engineer</div>
          <div><span className="text-[var(--secondary-text)]">age:</span> 19</div>
          <div><span className="text-[var(--secondary-text)]">location:</span> India</div>
          <div><span className="text-[var(--secondary-text)]">education:</span> B.Tech CSE, 2nd year</div>
          <div><span className="text-[var(--secondary-text)]">stack:</span> TypeScript · React · Next.js · Node.js · PostgreSQL</div>
          <div><span className="text-[var(--secondary-text)]">vibe:</span> clean UIs & creative chaos</div>
        </div>
      ));
      return;
    }

    if (lower === "help") {
      addOutput(cmd, (
        <div>
          <div><span className="text-[var(--accent-color)]">whoami</span>        — about me</div>
          <div><span className="text-[var(--accent-color)]">contact</span>       — social links</div>
          <div><span className="text-[var(--accent-color)]">ls projects</span>   — list projects</div>
          <div><span className="text-[var(--accent-color)]">cd [project]</span>   — explore a project</div>
          <div><span className="text-[var(--accent-color)]">clr / clear</span>    — clear terminal</div>
          <div><span className="text-[var(--accent-color)]">exit</span>          — leave terminal</div>
        </div>
      ));
      return;
    }

    if (lower === "contact") {
      addOutput(cmd, (
        <div className="space-y-1">
          <div><a href="mailto:srivastava-ayush@outlook.com" className="text-[var(--accent-color)] hover:underline">mail</a> — srivastava-ayush@outlook.com</div>
          <div><a href="https://github.com/srivastava-ayush" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:underline">github</a> — /srivastava-ayush</div>
          <div><a href="https://linkedin.com/in/constayush" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:underline">linkedin</a> — /in/constayush</div>
          <div><a href="https://instagram.com/maihoonayush" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:underline">instagram</a> — @maihoonayush</div>
        </div>
      ));
      return;
    }

    if (lower === "ls projects" || lower === "ls") {
      addOutput(cmd, (
        <div>
          {(PROJECTS as Project[]).map((p, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-[var(--accent-color)] font-mono">{p.projectName}</span>
              <span className="text-[var(--secondary-text)] text-sm">— {p.projectDescriptionShort}</span>
            </div>
          ))}
          <div className="mt-2 text-[var(--secondary-text)] text-sm">use <span className="text-[var(--text-color)]">cd [project-name]</span> for details</div>
        </div>
      ));
      return;
    }

    // cd command
    if (lower.startsWith("cd ")) {
      const target = lower.slice(3).trim();
      if (target === ".." || target === "/") {
        setCurrentDir("~");
        addOutput(cmd, "");
        return;
      }
      const projName = Object.keys(PROJECT_MAP).find(k => k === target || k.replace(/\s/g, "") === target);
      if (projName !== undefined) {
        const idx = PROJECT_MAP[projName];
        const p = (PROJECTS as Project[])[idx];
        setCurrentDir(`~/projects/${projName}`);
        addOutput(cmd, (
          <div>
            <div className="text-lg font-semibold text-[var(--text-color)]">{p.projectName}</div>
            <p className="text-[var(--secondary-text)] mt-1">{p.projectDescriptionLong}</p>
            <div className="mt-2 flex gap-5">
              <a href={p.projectCode} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:underline text-sm">[source]</a>
              {p.projectLive && (
                <a href={p.projectLive} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:underline text-sm">[live]</a>
              )}
            </div>
          </div>
        ));
      } else {
        addOutput(cmd, `cd: no such project: ${target}`);
      }
      return;
    }

    addOutput(cmd, (
      <span>command not found: <span className="text-[var(--accent-color)]">{cmd}</span> — try <span className="text-[var(--text-color)]">help</span></span>
    ));
  }

  function changeBg() {
    bgCounterRef.current = (bgCounterRef.current + 1) % bgImgArr.length;
    if (terminalRef.current) {
      terminalRef.current.style.backgroundImage = `url(${bgImgArr[bgCounterRef.current]})`;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="will-change-transform relative w-full lg:h-[98vh] h-[95vh] flex flex-col p-2 bg-cover bg-center transition-all duration-500 overflow-hidden"
      ref={terminalRef}
      style={{ backgroundImage: "url(/backgrounds/blackBg.jpg)" }}
    >
      {/* Terminal window frame */}
      <div className="relative w-full h-full bg-[var(--bg-color)]/40 backdrop-blur-xl rounded-sm border border-[var(--border-color)] flex flex-col overflow-hidden shadow-lg">

        {/* Title bar */}
        <div className="flex items-center justify-between bg-[var(--bg-color)]/50 backdrop-blur-sm text-[var(--secondary-text)] px-3 border-b border-[var(--border-color)] h-7 font-mono text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-color)]">●</span>
            <span>ayush@portfolio: {currentDir}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={changeBg} className="hover:text-[var(--text-color)] transition-colors px-1" title="Change background">
              ~/bg
            </button>
            <button onClick={() => router.push("/")} className="hover:text-[var(--text-color)] transition-colors px-1" title="Close">
              ✕
            </button>
          </div>
        </div>

        {/* Output area */}
        <div
          ref={outputRef}
          onClick={focusInput}
          className="flex-1 overflow-auto font-mono text-sm p-4 space-y-2 bg-[var(--bg-color)] text-[var(--text-color)]"
        >
          {!bootDone && (
            <div className="text-[var(--accent-color)] space-y-1">
              {bootText.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <span className="animate-pulse">█</span>
            </div>
          )}

          {bootDone && (
            <>
              <pre className="text-[var(--accent-color)] leading-tight text-xs">
{`  __     ___    _  _____ _    _
 /\\ \\   / / |  | |/ ____| |  | |
/  \\ \\_/ /| |  | | (___ | |__| |
/ /\\ \\   / | |  | |\\___ \\|  __  |
/ ____ \\| |  | |__| |____) | |  | |
/_/    \\_\\_|   \\____/|_____/|_|  |_|`}
              </pre>
              <p className="text-[var(--secondary-text)]">
                Type <span className="text-[var(--accent-color)]">help</span> for available commands.
              </p>

              {output.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[var(--accent-color)] shrink-0">┌─</span>
                    <span className="text-[var(--secondary-text)]">user@portfolio</span>
                    <span className="text-[var(--accent-color)]">:</span>
                    <span className="text-[var(--text-color)]">{currentDir}</span>
                    <span className="text-[var(--accent-color)]">$</span>
                    <span className="text-[var(--text-color)]">{item.cmd}</span>
                  </div>
                  <div className="pl-6 text-[var(--text-color)]">{item.output}</div>
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-[var(--accent-color)] shrink-0">└─</span>
                <span className="text-[var(--secondary-text)]">user@portfolio</span>
                <span className="text-[var(--accent-color)]">:</span>
                <span className="text-[var(--text-color)]">{currentDir}</span>
                <span className="text-[var(--accent-color)]">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none flex-1 text-[var(--text-color)] caret-[var(--accent-color)] font-mono"
                  autoFocus
                />
              </div>
            </>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-[var(--border-color)] h-6 px-3 font-mono text-[10px] text-[var(--secondary-text)] bg-[var(--bg-color)]/50 backdrop-blur-sm shrink-0">
          <span>cmd history: {cmdHistory.length}</span>
          <span>ayush@portfolio ✓</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Page;
