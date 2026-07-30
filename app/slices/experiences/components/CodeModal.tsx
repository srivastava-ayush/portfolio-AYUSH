"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
// @ts-expect-error highlight.js v10 has no types
import hljs from "highlight.js/lib/core";
// @ts-expect-error highlight.js v10 has no types
import typescript from "highlight.js/lib/languages/typescript";
// @ts-expect-error highlight.js v10 has no types
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

interface CodeModalProps {
  slug: string;
  open: boolean;
  onClose: () => void;
}

export default function CodeModal({ slug, open, onClose }: CodeModalProps) {
  const [source, setSource] = useState("");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch(`/slices/api/source/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSource(data.source || "");
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug, open]);

  const highlighted = source
    ? hljs.highlight(source, { language: "typescript" }).value
    : "";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(source);
  }, [source]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm"
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />

      <AnimatePresence>
        {open && (
          <div
            key="modal-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
          >
            <motion.div
              layout
              layoutId="code-modal"
              className="w-full max-w-4xl max-h-[80vh] flex flex-col rounded-xl border border-[var(--border-color)] overflow-hidden shadow-2xl bg-[var(--bg-color)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--hover-color)] border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 transition-all" />
                  <button className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 transition-all" />
                </div>
                <span className="text-xs font-mono text-[var(--secondary-text)]">
                  {slug}.tsx
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] transition-colors px-2 py-1 rounded-md hover:bg-[var(--hover-color)]"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  copy
                </button>
              </div>

              {/* Code area */}
              <div className="flex-1 overflow-auto text-[13px] leading-[1.6] text-[var(--text-color)]">
                {source ? (
                  <pre className="hljs m-0 p-4 bg-transparent">
                    <code
                      className="hljs language-typescript"
                      dangerouslySetInnerHTML={{ __html: highlighted }}
                    ></code>
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-48 text-[var(--secondary-text)] font-mono text-sm">
                    loading...
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
