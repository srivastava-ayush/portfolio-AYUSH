import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface LogMeta {
  slug: string;
  title: string;
  desc: string;
  date: string;
  tags: string[];
  links: string[];
}

export interface LogEntry extends LogMeta {
  content: string;
}

const LOGS_DIR = path.join(process.cwd(), "logs");

function formatDate(value: unknown): string {
  if (!value) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function readLog(fileName: string): LogEntry {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(LOGS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    desc: typeof data.desc === "string" ? data.desc : "",
    date: formatDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    links: Array.isArray(data.links) ? data.links.map(String) : [],
    content: content.trim(),
  };
}

function logFiles(): string[] {
  if (!fs.existsSync(LOGS_DIR)) return [];
  return fs
    .readdirSync(LOGS_DIR)
    .filter((name) => /\.mdx?$/.test(name))
    .sort();
}

export function getAllLogs(): LogEntry[] {
  return logFiles()
    .map(readLog)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLogMeta(): LogMeta[] {
  return getAllLogs().map((log) => ({
    slug: log.slug,
    title: log.title,
    desc: log.desc,
    date: log.date,
    tags: log.tags,
    links: log.links,
  }));
}

export function getLog(slug: string): LogEntry | null {
  const fileName = logFiles().find(
    (name) => name.replace(/\.mdx?$/, "") === slug,
  );
  return fileName ? readLog(fileName) : null;
}

export function getLogSlugs(): string[] {
  return logFiles().map((name) => name.replace(/\.mdx?$/, ""));
}

export function getLastEdited(slug?: string): string {
  const files = logFiles().filter(
    (name) => !slug || name.replace(/\.mdx?$/, "") === slug,
  );
  if (files.length === 0) return "";
  const latest = Math.max(
    ...files.map((name) => fs.statSync(path.join(LOGS_DIR, name)).mtimeMs),
  );
  return new Date(latest).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
