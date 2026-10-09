/**
 * Portfolio knowledge base for the "Ask My Portfolio" assistant.
 *
 * This is the single source of truth the assistant is allowed to answer from.
 * Facts that are not documented here are treated as unknown — never guessed.
 *
 * Editing projects / tech stack:
 *   - Project and tech-stack facts are derived from `app/constants.js`,
 *     so updating a project there automatically updates the assistant.
 *   - Everything else (bio, education, contact, links, interests) lives in
 *     this file and can be edited without touching the chat UI or the LLM
 *     integration.
 */

import { PROJECTS, TECH_STACK, SIDE_QUESTS, BUILD_LOGS } from "../../constants";

export const SITE_URL = "https://srivastava-ayush.vercel.app";

export interface ProjectFact {
  name: string;
  summary: string;
  description: string;
  categories: string[];
  techStack: string[];
  repository?: string;
  liveDemo?: string;
}

export interface LinkFact {
  label: string;
  url: string;
}

export interface KnowledgeBase {
  owner: {
    name: string;
    role: string;
    location: string;
    intro: string;
    focus: string;
    guidingPrinciple: string;
  };
  education: Array<{ credential: string; period: string; detail?: string }>;
  skills: {
    languages: string[];
    backend: string[];
    frontend: string[];
    data: string[];
    tooling: string[];
    all: string[];
  };
  projects: ProjectFact[];
  engineeringNotes: string[];
  links: LinkFact[];
  contact: { email: string; links: LinkFact[] };
  siteSections: Array<{ path: string; title: string; blurb: string }>;
  interests: Array<{ category: string; summary: string }>;
  writing: Array<{ title: string; summary: string; tags: string[] }>;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

interface RawProject {
  projectName?: string;
  projectDescriptionShort?: string;
  projectDescriptionLong?: string;
  category?: string[];
  techStack?: string[];
  projectCode?: string;
  projectLive?: string;
}

/** Strip images / runtime-only fields so the knowledge base stays serialisable. */
function toProjectFact(raw: RawProject): ProjectFact {
  return {
    name: raw.projectName ?? "Unknown project",
    summary: raw.projectDescriptionShort ?? "",
    description: raw.projectDescriptionLong ?? "",
    categories: raw.category ?? [],
    techStack: raw.techStack ?? [],
    repository: raw.projectCode || undefined,
    liveDemo: raw.projectLive || undefined,
  };
}

const TECH_NAMES: string[] = (TECH_STACK as Array<{ name?: string }>).map(
  (item) => item?.name ?? "",
).filter(Boolean);

function pickSkills(...groups: Array<string | string[]>): string[] {
  const wanted = new Set(groups.flatMap((g) => (typeof g === "string" ? [g] : g)).map((s) => s.toLowerCase()));
  return TECH_NAMES.filter((name) => wanted.has(name.toLowerCase()));
}

/* ------------------------------------------------------------------ */
/* Knowledge base                                                     */
/* ------------------------------------------------------------------ */

export const KNOWLEDGE: KnowledgeBase = {
  owner: {
    name: "Ayush Srivastava",
    role: "Full-Stack Engineer",
    location: "Noida, Uttar Pradesh, India",
    intro:
      "Engineer from India specialising in the TypeScript/Node.js ecosystem, " +
      "building scalable applications with a focus on clean code and developer " +
      "experience. Works across the full stack — backend APIs and database " +
      "design through to responsive frontend interfaces — using React, Next.js, " +
      "Bun, and PostgreSQL.",
    focus:
      "TypeScript/Node.js ecosystem; full-stack web development; developer experience.",
    guidingPrinciple:
      "Most of what he builds is shaped by one question: does this stay fast " +
      "and cost less as it scales?",
  },

  education: [
    {
      credential: "B.Tech in Computer Science",
      period: "2025 - 2028 | expected",
    },
    {
      credential: "Diploma in Computer Science",
      period: "2022 - 2025 | 8.5 CGPA",
    },
  ],

  skills: {
    languages: pickSkills("JavaScript", "TypeScript", "Python"),
    backend: pickSkills(
      "Node.js",
      "Bun",
      "Express",
      "Hono",
      "FastAPI",
      "Socket.io",
    ),
    frontend: pickSkills(
      "React",
      "Next.js",
      "Redux",
      "Zustand",
      "ShadcnUI",
      "TailwindCSS",
      "FramerMotion",
    ),
    data: pickSkills(
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Drizzle",
      "Cloudinary",
    ),
    tooling: pickSkills(
      "Cloudflare",
      "Docker",
      "Git",
      "Postman",
      "Vercel",
    ),
    all: [...TECH_NAMES],
  },

  projects: (PROJECTS as RawProject[]).map(toProjectFact),

  engineeringNotes: [
    "Design heuristic: prefer solutions that stay fast and cheap as they scale.",
    "Comfortable working across the whole stack — API design, database " +
      "modelling, and UI implementation are all in scope.",
    "Build Logs section of the portfolio documents backend learning notes " +
      "(for example authentication vs. authorization, and how to think about " +
      "credentials), written as personal study notes rather than polished articles.",
    "Deep, undocumented implementation details of individual projects (line " +
      "by line architecture, internal diagrams, metrics, benchmarks) are not " +
      "recorded in this knowledge base. If a visitor asks for them, say they " +
      "are not documented here and point at the repository instead of guessing.",
  ],

  links: [
    { label: "Home", url: `${SITE_URL}/` },
    { label: "Projects", url: `${SITE_URL}/projects` },
    { label: "Slices (UI components)", url: `${SITE_URL}/slices` },
    { label: "Side Quests", url: `${SITE_URL}/side-quests` },
    { label: "Build Logs", url: `${SITE_URL}/build-logs` },
    { label: "Terminal", url: `${SITE_URL}/terminal` },
    { label: "Resume (PDF)", url: `${SITE_URL}/misc/ayush_resume_intern.pdf` },
  ],

  contact: {
    email: "constayush@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/srivastava-ayush" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/constayush/" },
      { label: "X (Twitter)", url: "https://www.x.com/srivastava-ayush/" },
      { label: "Email", url: "mailto:constayush@gmail.com" },
    ],
  },

  siteSections: [
    {
      path: "/",
      title: "Home / About",
      blurb: "Hero, featured work, engineering bio, tech stack, education.",
    },
    {
      path: "/projects",
      title: "Projects",
      blurb: "The full project gallery with source and live-demo links.",
    },
    {
      path: "/slices",
      title: "Slices",
      blurb: "Reusable UI components, utilities and experiences.",
    },
    {
      path: "/build-logs",
      title: "Build Logs",
      blurb: "Notes, ideas, observations and learnings from building things.",
    },
    {
      path: "/side-quests",
      title: "Side Quests",
      blurb: "Philosophy, Linux setup, music and anime — interests outside code.",
    },
    {
      path: "/terminal",
      title: "Terminal",
      blurb: "A terminal-style view of the portfolio.",
    },
  ],

  interests: (SIDE_QUESTS as Array<{ category?: string; entries?: Array<{ title?: string; para?: string }> }>).map(
    (quest) => ({
      category: quest.category ?? "interest",
      summary: (quest.entries ?? [])
        .map((entry) => `${entry.title ?? ""}: ${entry.para ?? ""}`.trim())
        .filter(Boolean)
        .join(" | "),
    }),
  ),

  writing: (BUILD_LOGS as Array<{ title?: string; desc?: string; tags?: string[] }>).map(
    (log) => ({
      title: log.title ?? "Untitled build log",
      summary: log.desc ?? "",
      tags: log.tags ?? [],
    }),
  ),
};

/* ------------------------------------------------------------------ */
/* Serialisation                                                      */
/* ------------------------------------------------------------------ */

function bullets(items: string[]): string {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- (not documented)";
}

/**
 * Flattens the knowledge base into a compact text block that is embedded into
 * the model's system instruction. Keeping this separate means the knowledge
 * source can be swapped (e.g. for a CMS) without touching prompt wording.
 */
export function serializeKnowledge(kb: KnowledgeBase = KNOWLEDGE): string {
  const sections: string[] = [];

  sections.push(`## Owner\n${bullets([
    `Name: ${kb.owner.name}`,
    `Role: ${kb.owner.role}`,
    `Location: ${kb.owner.location}`,
    `Introduction: ${kb.owner.intro}`,
    `Focus: ${kb.owner.focus}`,
    `Guiding principle: ${kb.owner.guidingPrinciple}`,
  ])}`);

  sections.push(
    `## Education\n${bullets(
      kb.education.map((e) => `${e.credential} — ${e.period}`),
    )}`,
  );

  sections.push(
    `## Technical skills (from the portfolio tech stack)\n${bullets([
      `Languages: ${kb.skills.languages.join(", ") || "not documented"}`,
      `Backend: ${kb.skills.backend.join(", ") || "not documented"}`,
      `Frontend: ${kb.skills.frontend.join(", ") || "not documented"}`,
      `Data / ORM: ${kb.skills.data.join(", ") || "not documented"}`,
      `Tooling / infra: ${kb.skills.tooling.join(", ") || "not documented"}`,
      `Full list: ${kb.skills.all.join(", ")}`,
    ])}`,
  );

  const projectBlocks = kb.projects.map((p) => {
    const lines = [
      `### ${p.name}`,
      `- Summary: ${p.summary}`,
      `- Description: ${p.description}`,
      `- Categories: ${p.categories.join(", ") || "not documented"}`,
      `- Tech: ${p.techStack.join(", ") || "not documented"}`,
      `- Source: ${p.repository ?? "not documented"}`,
      `- Live demo: ${p.liveDemo ?? "not documented"}`,
    ];
    return lines.join("\n");
  });
  sections.push(`## Projects\n${projectBlocks.join("\n\n")}`);

  sections.push(`## Engineering notes\n${bullets(kb.engineeringNotes)}`);

  sections.push(
    `## Portfolio links (use full URLs)\n${bullets(
      kb.links.map((l) => `${l.label}: ${l.url}`),
    )}`,
  );

  sections.push(
    `## Contact\n${bullets([
      `Email: ${kb.contact.email}`,
      ...kb.contact.links.map((l) => `${l.label}: ${l.url}`),
    ])}`,
  );

  sections.push(
    `## Site sections\n${bullets(
      kb.siteSections.map((s) => `${s.path} — ${s.title}: ${s.blurb}`),
    )}`,
  );

  sections.push(
    `## Interests (side quests)\n${bullets(
      kb.interests.map((i) => `${i.category}: ${i.summary || "not documented"}`),
    )}`,
  );

  sections.push(
    `## Build logs / writing\n${bullets(
      kb.writing.map((w) => `${w.title}: ${w.summary} [${w.tags.join(", ")}]`),
    )}`,
  );

  return sections.join("\n\n");
}
