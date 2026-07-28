"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
// @ts-expect-error - highlight.js v10 has no bundled types
import hljs from "highlight.js/lib/core";
// @ts-expect-error
import typescript from "highlight.js/lib/languages/typescript";
// @ts-expect-error
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
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-4xl max-h-[80vh] flex flex-col rounded-xl border border-[var(--border-color)]/30 bg-[#1e1e1e] overflow-hidden shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all"
                />
                <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 transition-all" />
                <button className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 transition-all" />
              </div>
              <span className="text-xs font-mono text-white/40">
                {slug}.tsx
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    copied
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    copy
                  </>
                )}
              </button>
            </div>

            {/* Code area */}
            <div className="flex-1 overflow-auto text-[13px] leading-[1.6]">
              {source ? (
                <pre className="hljs m-0 p-4 bg-transparent">
                  <code
                    className="hljs language-typescript"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  ></code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-48 text-white/30 font-mono text-sm">
                  loading...
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
