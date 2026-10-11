
/**
 * Portfolio knowledge base for the "Ask My Portfolio" assistant.
 *
 * This is the single source of truth the assistant is allowed to answer from.
 * Facts that are not documented here are treated as unknown — never guessed.
 *
 * Project descriptions and tech stacks are derived from constants.js.
 * Resume-specific project metrics, experience, education, and achievements
 * are documented here.
 */

import {
  PROJECTS,
  TECH_STACK,
  SIDE_QUESTS,
} from "../../constants";
import { getLogMeta } from "../logs";

export const SITE_URL = "https://srivastava-ayush.vercel.app";

export interface ProjectFact {
  name: string;
  summary: string;
  description: string;
  categories: string[];
  techStack: string[];
  repository?: string;
  liveDemo?: string;
  highlights?: string[];
}

export interface LinkFact {
  label: string;
  url: string;
}

export interface ExperienceFact {
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
}

export interface AchievementFact {
  title: string;
  detail?: string;
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

  education: Array<{
    credential: string;
    period: string;
    detail?: string;
  }>;

  experience: ExperienceFact[];
  achievements: AchievementFact[];

  skills: {
    languages: string[];
    backend: string[];
    frontend: string[];
    data: string[];
    aiMl: string[];
    tooling: string[];
    coreConcepts: string[];
    all: string[];
  };

  projects: ProjectFact[];
  engineeringNotes: string[];
  links: LinkFact[];

  contact: {
    email: string;
    links: LinkFact[];
  };

  siteSections: Array<{
    path: string;
    title: string;
    blurb: string;
  }>;

  interests: Array<{
    category: string;
    summary: string;
  }>;

  writing: Array<{
    title: string;
    summary: string;
    tags: string[];
  }>;
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

interface RawTech {
  name?: string;
}

interface RawSideQuest {
  category?: string;
  entries?: Array<{
    title?: string;
    para?: string;
  }>;
}

interface RawBuildLog {
  title?: string;
  desc?: string;
  tags?: string[];
}

const TECH_NAMES: string[] = (
  TECH_STACK as RawTech[]
)
  .map((item) => item?.name ?? "")
  .filter(Boolean);

function pickSkills(...groups: Array<string | string[]>): string[] {
  const wanted = new Set(
    groups
      .flatMap((group) =>
        typeof group === "string" ? [group] : group,
      )
      .map((skill) => skill.toLowerCase()),
  );

  return TECH_NAMES.filter((name) =>
    wanted.has(name.toLowerCase()),
  );
}

/**
 * Resume-specific project results.
 *
 * These are separate from constants.js because the resume contains
 * quantitative implementation details that are not necessarily part
 * of the public project descriptions.
 */
const PROJECT_HIGHLIGHTS: Record<string, string[]> = {
  boxlit: [
    "Built a full-stack real-time system processing continuous data streams at 30 FPS with sub-200 ms latency.",
    "Implemented browser-based TensorFlow.js inference optimized to under 50 ms per frame.",
    "Designed asynchronous feedback and session-tracking logic across frontend and backend layers.",
  ],

  kodak: [
    "Built an offline voice assistant supporting 20+ system-level commands.",
    "Implemented real-time speech recognition with zero cloud dependency.",
    "Optimized execution to maintain CPU usage at 10–15%.",
  ],

  "slices ui": [
    "Developed 15+ reusable UI components and custom hooks.",
    "Standardized reusable UI patterns across multiple projects.",
  ],
};

function getProjectHighlights(name: string): string[] {
  const normalized = name.toLowerCase().trim();

  const exactMatch = PROJECT_HIGHLIGHTS[normalized];

  if (exactMatch) {
    return exactMatch;
  }

  const matchingKey = Object.keys(PROJECT_HIGHLIGHTS).find(
    (key) =>
      normalized.includes(key) ||
      key.includes(normalized),
  );

  return matchingKey
    ? PROJECT_HIGHLIGHTS[matchingKey]
    : [];
}

/** Convert portfolio project data into serialisable knowledge. */
function toProjectFact(raw: RawProject): ProjectFact {
  const name = raw.projectName ?? "Unknown project";

  const highlights = getProjectHighlights(name);

  return {
    name,
    summary: raw.projectDescriptionShort ?? "",
    description: raw.projectDescriptionLong ?? "",
    categories: raw.category ?? [],
    techStack: raw.techStack ?? [],
    repository: raw.projectCode || undefined,
    liveDemo: raw.projectLive || undefined,
    highlights: highlights.length ? highlights : undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Knowledge base                                                     */
/* ------------------------------------------------------------------ */

export const KNOWLEDGE: KnowledgeBase = {
  owner: {
    name: "Ayush Srivastava",
    role: "Full-Stack Developer",
    location: "Noida, Uttar Pradesh, India",

    intro:
      "Full-stack developer with hands-on experience building " +
      "AI-integrated applications, Retrieval-Augmented Generation " +
      "(RAG) pipelines, vector search, and LLM-powered systems. " +
      "Works across frontend and backend engineering using " +
      "JavaScript, TypeScript, React, Next.js, and Node.js. " +
      "Experienced in building end-to-end features, designing " +
      "REST APIs, working with databases, and debugging deployed " +
      "services. Interested in AI products, developer tools, " +
      "system design, and performance-oriented engineering.",

    focus:
      "Full-stack engineering, AI integration and RAG, backend " +
      "systems, asynchronous processing, reusable UI components, " +
      "performance optimization, and developer tooling.",

    guidingPrinciple:
      "Build practical products that solve real problems. " +
      "Prefer engineering decisions that balance performance, " +
      "reliability, maintainability, and cost as systems scale.",
  },

  education: [
    {
      credential:
        "B.Tech in Computer Science and Engineering",
      period: "2024 - 2028",
      detail:
        "Galgotia College of Engineering and Technology | GPA: 8.0/10",
    },
    {
      credential: "Diploma in Computer Science Engineering",
      period: "2021 - 2024",
      detail: "Invertis University | GPA: 8.1/10",
    },
  ],

  experience: [
    {
      role: "Full-Stack Intern",
      organization: "CarbonSynq",
      period: "2025 - Present",

      responsibilities: [
        "Built and shipped Retrieval-Augmented Generation (RAG) applications integrating vector databases, semantic search, and embeddings-based retrieval.",
        "Developed end-to-end full-stack features across frontend and backend systems.",
        "Designed REST APIs, data models, and asynchronous data flows.",
        "Worked on deployment, service monitoring, and CI/CD automation using GitHub Actions.",
        "Debugged and optimized backend performance and reliability across services and environments.",
      ],
    },

    {
      role: "Technical Executive",
      organization: "Google Developer Group (GDG)",
      period: "2024 - Present",

      responsibilities: [
        "Organized and conducted 5+ technical workshops and developer events.",
        "Reached 100+ total participants across technical events.",
        "Mentored 20+ students in full-stack development and modern JavaScript frameworks.",
      ],
    },
  ],

  achievements: [
    {
      title: "All-India Rank 6 — Kirwa Hackathon",
      detail:
        "Achieved sixth place in the Kirwa Hackathon.",
    },
    {
      title: "Best Negotiator Award — IEEE JIIT Startup Showdown",
      detail:
        "Recognized with the Best Negotiator Award at the IEEE JIIT Startup Showdown.",
    },
  ],

  skills: {
    languages: pickSkills(
      "JavaScript",
      "TypeScript",
      "Python",
    ),

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

    aiMl: [
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases",
      "Semantic Search",
      "Embeddings",
      "LLM Integration",
      "TensorFlow.js",
      "Browser-based Machine Learning Inference",
      "Speech Recognition",
      "Offline Voice Assistants",
    ],

    tooling: pickSkills(
      "Cloudflare",
      "Docker",
      "Git",
      "Postman",
      "Vercel",
    ),

    coreConcepts: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "System Design",
      "REST API Design",
      "Asynchronous Systems",
      "SQL and NoSQL",
      "CI/CD",
      "Performance Optimization",
    ],

    all: [...new Set([
      ...TECH_NAMES,
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases",
      "Semantic Search",
      "Embeddings",
      "LLM Integration",
      "TensorFlow.js",
      "Speech Recognition",
    ])],
  },

  projects: (PROJECTS as RawProject[]).map(toProjectFact),

  engineeringNotes: [
    "Engineering focus: build useful products with attention to performance, reliability, maintainability, and cost.",

    "Works across frontend interfaces, backend APIs, database modelling, and end-to-end feature development.",

    "Professional experience includes building RAG applications, semantic retrieval pipelines, REST APIs, asynchronous data flows, and CI/CD workflows.",

    "BoxLit uses browser-based TensorFlow.js inference for real-time boxing feedback. Resume-documented performance: 30 FPS data processing, sub-200 ms system latency, and under 50 ms inference per frame.",

    "Kodak is an offline voice assistant supporting 20+ system-level commands, designed for low-latency execution without cloud dependencies.",

    "Slices UI contains 15+ reusable UI components and custom hooks.",

    "Community experience includes organizing technical workshops and mentoring students through Google Developer Group (GDG).",

    "The portfolio Build Logs section contains engineering notes, ideas, observations, and learning resources.",

    "Only documented implementation details and metrics should be presented as facts. If deeper architecture, benchmark methodology, or deployment details are not recorded here, direct visitors to the relevant repository or project documentation instead of guessing.",

    "The resume mentions vector database integration and cloud deployment but does not identify the specific vector database or cloud provider. Do not infer those names.",
  ],

  links: [
    { label: "Home", url: `${SITE_URL}/` },
    { label: "Projects", url: `${SITE_URL}/side-quests#projects` },
    { label: "Slices UI", url: "https://slices-ui.vercel.app/slices" },
    { label: "Side Quests", url: `${SITE_URL}/side-quests` },
    { label: "Build Logs", url: `${SITE_URL}/build-logs` },
    { label: "Terminal", url: `${SITE_URL}/terminal` },
    {
      label: "Resume (PDF)",
      url: `${SITE_URL}/misc/ayush_resume_intern.pdf`,
    },
  ],

  contact: {
    email: "constayush@gmail.com",

    links: [
      {
        label: "GitHub",
        url: "https://github.com/srivastava-ayush",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/constayush/",
      },
      {
        label: "X (Twitter)",
        url: "https://www.x.com/srivastava-ayush/",
      },
      {
        label: "Email",
        url: "mailto:constayush@gmail.com",
      },
    ],
  },

  siteSections: [
    {
      path: "/",
      title: "Home / About",
      blurb:
        "Introduction, featured work, engineering background, tech stack, and education.",
    },
    {
      path: "/side-quests#projects",
      title: "Projects",
      blurb:
        "Project gallery containing descriptions and available source and live-demo links.",
    },
    {
       path: "https://slices-ui.vercel.app/slices",
      title: "Slices UI",
      blurb:
        "Reusable React UI components, custom hooks, and interface patterns.",
    },
    {
      path: "/build-logs",
      title: "Build Logs",
      blurb:
        "Engineering notes, technical learnings, ideas, and observations.",
    },
    {
      path: "/side-quests",
      title: "Side Quests",
      blurb:
        "Interests outside software development, including Linux, music, anime, and personal philosophy.",
    },
    {
      path: "/terminal",
      title: "Terminal",
      blurb:
        "A terminal-style interface for exploring the portfolio.",
    },
  ],

  interests: (
    SIDE_QUESTS as RawSideQuest[]
  ).map((quest) => ({
    category: quest.category ?? "interest",

    summary: (quest.entries ?? [])
      .map(
        (entry) =>
          `${entry.title ?? ""}: ${entry.para ?? ""}`.trim(),
      )
      .filter(Boolean)
      .join(" | "),
  })),

  writing: (
    getLogMeta() as RawBuildLog[]
  ).map((log) => ({
    title: log.title ?? "Untitled build log",
    summary: log.desc ?? "",
    tags: log.tags ?? [],
  })),
};

/* ------------------------------------------------------------------ */
/* Serialisation                                                      */
/* ------------------------------------------------------------------ */

function bullets(items: string[]): string {
  return items.length
    ? items.map((item) => `- ${item}`).join("\n")
    : "- (not documented)";
}

/**
 * Flatten the knowledge base into a compact text block for the
 * assistant's system instruction.
 */
export function serializeKnowledge(
  kb: KnowledgeBase = KNOWLEDGE,
): string {
  const sections: string[] = [];

  sections.push(
    `## Owner\n${bullets([
      `Name: ${kb.owner.name}`,
      `Role: ${kb.owner.role}`,
      `Location: ${kb.owner.location}`,
      `Introduction: ${kb.owner.intro}`,
      `Focus: ${kb.owner.focus}`,
      `Guiding principle: ${kb.owner.guidingPrinciple}`,
    ])}`,
  );

  sections.push(
    `## Education\n${bullets(
      kb.education.map(
        (education) =>
          `${education.credential} — ${education.period}` +
          (education.detail
            ? ` | ${education.detail}`
            : ""),
      ),
    )}`,
  );

  const experienceBlocks = kb.experience.map((experience) =>
    [
      `### ${experience.role} — ${experience.organization}`,
      `- Period: ${experience.period}`,
      ...experience.responsibilities.map(
        (responsibility) => `- ${responsibility}`,
      ),
    ].join("\n"),
  );

  sections.push(
    `## Professional experience\n${experienceBlocks.join("\n\n")}`,
  );

  sections.push(
    `## Achievements and awards\n${bullets(
      kb.achievements.map(
        (achievement) =>
          `${achievement.title}` +
          (achievement.detail
            ? ` — ${achievement.detail}`
            : ""),
      ),
    )}`,
  );

  sections.push(
    `## Technical skills\n${bullets([
      `Languages: ${kb.skills.languages.join(", ") || "not documented"}`,
      `Backend: ${kb.skills.backend.join(", ") || "not documented"}`,
      `Frontend: ${kb.skills.frontend.join(", ") || "not documented"}`,
      `Data / ORM: ${kb.skills.data.join(", ") || "not documented"}`,
      `AI / ML: ${kb.skills.aiMl.join(", ") || "not documented"}`,
      `Tooling / infrastructure: ${kb.skills.tooling.join(", ") || "not documented"}`,
      `Core concepts: ${kb.skills.coreConcepts.join(", ") || "not documented"}`,
      `Full portfolio tech stack: ${kb.skills.all.join(", ") || "not documented"}`,
    ])}`,
  );

  const projectBlocks = kb.projects.map((project) => {
    const lines = [
      `### ${project.name}`,
      `- Summary: ${project.summary}`,
      `- Description: ${project.description}`,
      `- Categories: ${project.categories.join(", ") || "not documented"}`,
      `- Tech: ${project.techStack.join(", ") || "not documented"}`,
      `- Highlights: ${project.highlights?.join(" | ") || "not documented"}`,
      `- Source: ${project.repository ?? "not documented"}`,
      `- Live demo: ${project.liveDemo ?? "not documented"}`,
    ];

    return lines.join("\n");
  });

  sections.push(
    `## Projects\n${projectBlocks.join("\n\n")}`,
  );

  sections.push(
    `## Engineering notes\n${bullets(kb.engineeringNotes)}`,
  );

  sections.push(
    `## Portfolio links (use full URLs)\n${bullets(
      kb.links.map((link) => `${link.label}: ${link.url}`),
    )}`,
  );

  sections.push(
    `## Contact\n${bullets([
      `Email: ${kb.contact.email}`,
      ...kb.contact.links.map(
        (link) => `${link.label}: ${link.url}`,
      ),
    ])}`,
  );

  sections.push(
    `## Site sections\n${bullets(
      kb.siteSections.map(
        (section) =>
          `${section.path} — ${section.title}: ${section.blurb}`,
      ),
    )}`,
  );

  sections.push(
    `## Interests (side quests)\n${bullets(
      kb.interests.map(
        (interest) =>
          `${interest.category}: ${interest.summary || "not documented"}`,
      ),
    )}`,
  );

  sections.push(
    `## Build logs / writing\n${bullets(
      kb.writing.map(
        (writing) =>
          `${writing.title}: ${writing.summary} [${writing.tags.join(", ")}]`,
      ),
    )}`,
  );

  return sections.join("\n\n");
}
