import ReactIcon from "../public/icons/react-2.svg";
import TypescriptIcon from "../public/icons/typescript.svg";
import JavascriptIcon from "../public/icons/javascript.svg";
import NextjsIcon from "../public/icons/nextjs.svg";
import projectImg3 from "../public/projects/project-img3.webp";
import projectImg1 from "../public/projects/project-img1.webp";
import projectImg2 from "../public/projects/project-img2.webp";
import projectImg4 from "../public/projects/project-img4.webp";
import projectImg5 from "../public/projects/project-img5.webp";
import projectImg6 from "../public/projects/project-img6.webp";
import projectImg7 from "../public/projects/project-img7.webp";
import projectImg8 from "../public/projects/project-img8.webp";
import ExpressjsIcon from "../public/icons/express.svg";
import NodejsIcon from "../public/icons/nodejs.svg";
import MongoDBIcon from "../public/icons/mongodb.svg";
import BunjsIcon from "../public/icons/bun.svg";
import PostgresqlIcon from "../public/icons/postgresql.svg";
import TailwindIcon from "../public/icons/tailwind.svg";
import PythonIcon from "../public/icons/python.svg";
import HonoIcon from "../public/icons/hono.svg";
import FastapiIcon from "../public/icons/fastapi.svg";
import SocketioIcon from "../public/icons/socketio.svg";
import ReduxIcon from "../public/icons/redux.svg";
import ZustandIcon from "../public/icons/zustand.svg";
import ShadcnuiIcon from "../public/icons/shadcnui.svg";
import FramermotionIcon from "../public/icons/framermotion.svg";
import RedisIcon from "../public/icons/redis.svg";
import PrismaIcon from "../public/icons/prisma.svg";
import DrizzleIcon from "../public/icons/drizzle.svg";
import CloudflareIcon from "../public/icons/cloudflare.svg";
import DockerIcon from "../public/icons/docker.svg";
import GitIcon from "../public/icons/git.svg";
import PostmanIcon from "../public/icons/postman.svg";
import CloudinaryIcon from "../public/icons/cloudinary.svg";
import VercelIcon from "../public/icons/vercel.svg";
import { Tags } from "lucide-react";
import { desc } from "motion/react-client";


// -----------TECH_STACK--------------

export const TECH_STACK = [
  { icon: JavascriptIcon, name: "JavaScript" },
  { icon: TypescriptIcon, name: "TypeScript" },
  { icon: PythonIcon, name: "Python" },
  { icon: NodejsIcon, name: "Node.js" },
  { icon: BunjsIcon, name: "Bun" },
  { icon: ExpressjsIcon, name: "Express" },
  { icon: HonoIcon, name: "Hono" },
  { icon: FastapiIcon, name: "FastAPI" },
  { icon: SocketioIcon, name: "Socket.io" },
  { icon: ReactIcon, name: "React" },
  { icon: NextjsIcon, name: "Next.js" },
  { icon: ReduxIcon, name: "Redux" },
  { icon: ZustandIcon, name: "Zustand" },
  { icon: ShadcnuiIcon, name: "ShadcnUI" },
  { icon: TailwindIcon, name: "TailwindCSS" },
  { icon: FramermotionIcon, name: "FramerMotion" },
  { icon: MongoDBIcon, name: "MongoDB" },
  { icon: PostgresqlIcon, name: "PostgreSQL" },
  { icon: RedisIcon, name: "Redis" },
  { icon: PrismaIcon, name: "Prisma" },
  { icon: DrizzleIcon, name: "Drizzle" },
  { icon: CloudflareIcon, name: "Cloudflare" },
  { icon: DockerIcon, name: "Docker" },
  { icon: GitIcon, name: "Git" },
  { icon: PostmanIcon, name: "Postman" },
  { icon: CloudinaryIcon, name: "Cloudinary" },
  { icon: VercelIcon, name: "Vercel" },
];

// -----------PROJECTS----------------

export const PROJECTS = [
  {
    projectName: "Slices-UI",
    projectDescriptionShort:
      "Slices - a fresh collection of UI elements and reusable code snippets I cut, styled, and served.",
    projectDescriptionLong:
      "Inspired by libraries like Hero UI and Aceternity UI, Slices UI is a curated set of sleek, reusable components designed for fast, modern web dev. Built with love, Tailwind, and way too much coffee.",
    projectImg: projectImg1,
    projectCode:
      "https://github.com/srivastava-ayush/portfolio-AYUSH/tree/master/src/components/slices",
    projectLive: "https://srivastava-ayush.vercel.app/slices",
    projectId: 1,
    category: ["frontend"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    projectName: "Boxlit",
    projectDescriptionShort:
      "Boxlit - boxing app that helps to learn, practice, & improve, offering valuable resources for all skill levels.",
    projectDescriptionLong:
      "Boxlit is a comprehensive boxing app designed for everyone from beginners to experienced fighters. It features interactive tutorials, guided training sessions, and personalized workout plans to help users sharpen their skills and track their progress.",
    projectImg: projectImg2,
    projectCode: "https://github.com/srivastava-ayush/Boxit",
    projectLive: "https://boxlit.vercel.app/",
    projectId: 2,
    category: ["full-stack", "backend", "frontend", "landing-page"],
    techStack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
  },
  {
    projectName: "Kodak",
    projectDescriptionShort:
      "Kodak - is your always-listening local AI assistant built in Python.",
    projectDescriptionLong:
      "Kodak is an AI assistant that runs locally on your machine, ensuring your data stays private. Built with Python, it leverages advanced natural language processing to help you manage tasks, answer questions, and streamline your workflow without relying on cloud services.",
    projectImg: projectImg3,
    projectCode: "https://github.com/srivastava-ayush/Kodak",
    // projectLive: "https://kodak.vercel.app/",
    projectId: 3,
    category: ["ai", "backend"],
    techStack: ["Python", "OpenAI", "SpeechRecognition", "Tkinter"],
  },
  {
    projectName: "Can You Remember?",
    projectDescriptionShort:
      "Can You Remember? - a fast-paced visual memory game that challenges users to recall blinking patterns.",
    projectDescriptionLong:
      "Can You Remember? is an interactive memory game where players must observe and recall the sequence of blinking blocks in the correct order. Designed to test and improve short-term memory and focus, the game progressively increases difficulty by adding longer and faster sequences. It features smooth UI interactions, real-time feedback, and a dynamic scoring system to keep users engaged while sharpening their cognitive skills.",
    projectImg: projectImg4,
    projectCode: "https://github.com/srivastava-ayush/can-you-remember",
    projectLive: "https://can-you-remember.vercel.app",
    projectId: 4,
    category: ["other"],
    techStack: ["React", "JavaScript", "CSS", "Motion"],
  },
  {
    projectName: "Bunk-Tendance",
    projectDescriptionShort:
      "Bunk-Tendance - a web app that tracks student bunks",
    projectDescriptionLong:
      " A simple yet powerful tool to help students track and plan their attendance strategically. This app lets you input your current academic stats and calculates exactly how many classes you can safely miss or how many you must attend to reach your desired attendance percentage.",
    projectImg: projectImg5,
    projectCode: "https://github.com/srivastava-ayush/Bunk-Tendence",
    projectLive: "https://bunk-tendance.vercel.app/",
    projectId: 5,
    category: ["other"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    projectName: "Mihika Arts",
    projectDescriptionShort:
      "Mihika Arts - a platform for showcasing and selling art",
    projectDescriptionLong:
      "Mihika Arts is an online platform designed to showcase and sell artwork. It provides artists with a space to display their creations, connect with art enthusiasts, and manage sales. The platform features a user-friendly interface, secure payment processing, and tools for artists to promote their work effectively.",
    projectImg: projectImg6,
    projectCode: "https://github.com/srivastava-ayush/mihika-arts",
    projectLive: "https://mihika-arts.vercel.app/",
    projectId: 6,
    category: ["frontend", "landing-page"],
    techStack: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
  },
  {
    projectName: "Intervue",
    projectDescriptionShort:
      "Intervue - a platform for conducting virtual interviews",
    projectDescriptionLong:
      "Intervue is a comprehensive platform for conducting virtual interviews, designed to streamline the hiring process. It offers features like scheduled interviews, real-time collaboration, and detailed reporting to help employers make informed decisions.",
    projectImg: projectImg7,
    projectCode: "https://github.com/srivastava-ayush/intervue",
    projectLive: "https://intervue-navy.vercel.app/",
    projectId: 7,
    category: ["landing-page"],
    techStack: ["React", "Node.js", "Socket.io", "Tailwind CSS"],
  },
  {
    projectName: "Call'arity",
    projectDescriptionShort:
      "Callarity - a platform for conducting virtual interviews",
    projectDescriptionLong:
      "Callarity is a comprehensive platform for conducting virtual interviews, designed to streamline the hiring process. It offers features like scheduled interviews, real-time collaboration, and detailed reporting to help employers make informed decisions.",
    projectImg: projectImg8,
    projectCode: "https://github.com/srivastava-ayush/callarity-frontend",
    projectLive: "https://callarity-frontend.vercel.app/",
    projectId: 8,
    category: ["landing-page"],
    techStack: ["React", "Node.js", "Socket.io", "Tailwind CSS"],
  },
];

// -----------SIDE_QUESTS-------------

export const SIDE_QUESTS = [
  {
    category: "Philosophy",
    banner:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLkaXGxpSmJT23quw6n864XuIQGn7eucEUhdYsDnyNTw&s=10",
    entries: [
      {
        title: "what i have been reading recently",
        para:""
      },
      {
        title: "Advaita Vedanta",
        para: "as I understand it, is a school of Hindu philosophy and spiritual practice that emphasizes the idea of non-dualism, asserting that the true self (Atman) is identical to the ultimate reality (Brahman). It teaches that the apparent multiplicity of the world is an illusion (Maya) and that realizing this truth leads to liberation (Moksha).",
      },
      {
        title: "Stoicism",
        para: "Hellenistic philosophy that teaches the development of self-control and fortitude as a means to overcome destructive emotions. It emphasizes rationality, virtue, and the acceptance of fate, advocating for a life in harmony with nature and reason.",
      },
    ],
  },
  {
    category: "linux",
    banner:
      "https://w0.peakpx.com/wallpaper/950/780/HD-wallpaper-linux-union-red-sycle-linux-ussr-hammer-soviet-union.jpg",
    entries: [
      {
        title: "Distribution I am using",
        para: "Arch Linux, yeah mainly because of memes. Took a weekend to install, years to appreciate.",
      },
      {
        title: "Window Manager",
        para: "Hyprland The Tiling, animations are so goated, and a config file that keeps growing till the end of time",
        imgs: [
          {
            src: "/side-quest/entries/distribution-entry-1.webp",
            desc: "my hyprland rice",
          },
          {
            src: "/side-quest/entries/distribution-entry-2.webp",
            desc: "my hyprland rice",
          },
          {
            src: "/side-quest/entries/distribution-entry-3.webp",
            desc: "my hyprland rice",
          },
          {
            src: "/side-quest/entries/distribution-entry-4.webp",
            desc: "my hyprland rice",
          },
        ],
      },
      {
        title: "Terminal",
        para: "Kitty with powerlvl10k and starship prompt, look kinda trash but yeah works",
      },
    ],
  },
  {
    category: "music",
    banner:
      "https://www.hewayasin.com/buckstop/wp-content/uploads/2018/10/hiphopcollage.jpeg",
    entries: [
      {
        title: "Genre",
        para: "HipHop mostly, chill and lowkey hip hop, at workouts hardcore dhh, and the occasional 2010 bollywood.",
      },
      {
        title: "Artists",
        para: "J Cole, Kanye West, Babu Mann, Eminem, Karma, Bella, Logic, Lil Wayne, Jagjit Singh, wolfcryman, Big Scratch, Farak.",
      },
    ],
  },
  {
    category: "anime",
    banner:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVk2tnmQWZnbHtGOAvjp2c4Ngml7-XGTGICXpAsIibIA&s=10"
    ,entries: [
      {
        title: "My favourites",
        para: "Attack On Titan (none of em can top this), Naruto, Vinland Saga, Hajime no Ippo ,Code Geass, Silent Voice.",
        imgs: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQigobSp1b1DRmp6xeC4hcycUCRnUXcP3XQTxdkHxd14w&s=10",
            desc: "AOT 10/10",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSItRnrkgoxPK95_g0qbzjjQ2JTnlYlyLtlYSbL854IiA&s=10",
            desc: "Naruto 9/10",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp00QC8Op6iSALCUeyq6ltT23V9svs2LqPMOhGKJeZ3g&s=10",
            desc: "Vinland saga 9/10",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSpQhbw4bx_fICOeD0WQAdGqa62oT4Uk9EEmpbmAxJA&s=10",
            desc: "hajime no ippo 9/10",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuXs-Eg7A2agMqOMw72Bx3gzWzkVWtN8BJ4G2m4H7wqg&s=10",
            desc: "code geass 9/10",
          },
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSPcS_NX64RcnpA74Ba-z7JNYVXk1T0jMcIOb0-tWfag&s=10",
            desc: "silent voice 810",
          },
        ],
      },
      {
        title: "Recent",
        para: "none, I'm too lazy now",
      },
    ],
  },
];

// -----------Build_Logs--------------

export const BUILD_LOGS = [
  {
    id: 1,
    title: "Auth Flow",
    desc : "everthing about auth",
    sections: [
      {
        heading: "The Problem",
        paras: [
          "Most apps need auth. Most devs copy-paste the same JWT boilerplate without thinking about the tradeoffs. I wanted to build something that scales from a side project to something real - without rebuilding auth three times.",
        ],
      },
      {
        heading: "Choosing the Stack",
        paras: [
          "Went with NextAuth.js (now Auth.js) for the frontend glue - it's framework-native and handles the OAuth dance out of the box. For the backend, I used Hono with JWT + refresh tokens. The database layer is Drizzle ORM on PostgreSQL.",
          "Why not Supabase or Clerk? Overkill for this stage. I wanted to understand the flow end-to-end before abstracting it away.",
        ],
      },
      {
        heading: "JWT Structure",
        paras: [
          "Access token: 15 min expiry, stored in memory. Refresh token: 7 day expiry, httpOnly cookie. The refresh token rotates - every refresh issues a new pair and invalidates the old one.",
          "This prevents replay attacks. If someone steals a refresh token, the next legitimate request will fail because the old token is already invalidated.",
        ],
      },
      {
        heading: "Refresh Token Rotation",
        paras: [
          "Implemented a sliding window with a family tree. Each refresh token has a parent pointer. If a used token is reused (attacker vs. victim race), the entire family gets invalidated and the user is forced to re-login.",
          "This is the most important security pattern most tutorials skip. Without it, leaked tokens are a ticking time bomb.",
        ],
      },
      {
        heading: "Session Management",
        paras: [
          "Sessions are stored in PostgreSQL with device metadata - IP, user agent, and last active timestamp. Users can view and revoke sessions from a dashboard.",
          "Also added a 'logout all devices' button. Surprisingly rare in indie projects.",
        ],
      },
      {
        heading: "What I'd Change",
        paras: [
          "Should have used Drizzle's prepared statements from day one instead of raw SQL for the token queries. Also want to add rate limiting on the refresh endpoint - it's the most vulnerable to brute force currently.",
          "Down the line, I'll migrate to a dedicated auth service. But for now, this is lean, auditable, and I know exactly what every line does.",
        ],
      },
    ],
    imgs:  [],
    tags:  ["backend", "auth", "jwt"],
    date:  "11:58 AM jul 11, 2026",
    links: ["https://authjs.dev", "https://thecopenhagenbook.com/"],
  },
  {
    id: 2,
    title: "OAuth Dance",
    desc : "understanding third party auth",
    sections: [
      {
        heading: "Why Not Build Everything From Scratch",
        paras: [
          "After implementing my own JWT flow, I wanted to understand how OAuth providers fit in. Users don't want to create yet another account - they want to click 'Sign in with Google' and be done.",
        ],
      },
      {
        heading: "The Redirect Flow",
        paras: [
          "OAuth 2.0 looks simple on paper: redirect to provider, get code, exchange for token. The devil is in the state parameter - CSRF protection via a nonce that must match between the initial request and the callback.",
          "NextAuth.js handles this automatically, but I traced through the source to confirm. PKCE is the modern standard, and it's non-optional for mobile flows.",
        ],
      },
      {
        heading: "Linking Accounts",
        paras: [
          "A user might sign in with Google then later with GitHub. Both should map to the same internal user. The tricky part is email verification - if both providers return the same email, you can link them automatically.",
          "If emails differ, you need a manual verification step. Most apps skip this and end up with duplicate accounts.",
        ],
      },
    ],
    imgs:  [],
    tags:  ["auth", "oauth", "security"],
    date:  "11:58 AM jul 11, 2026",
    links: ["https://www.rfc-editor.org/rfc/rfc6749", "https://oauth.net/2/"],
  },
  {
    id: 3,
    title: "RBAC",
    desc : "role based access control",
    sections: [
      {
        heading: "Flat Roles vs. Hierarchical",
        paras: [
          "Started with simple roles: admin, user. Then I needed a moderator role that could do everything a user can plus moderate content, but not access the admin panel.",
          "Hierarchical roles (roles with inheritance) are tempting but create weird edge cases. Instead, I went with permission-based access where roles are just groups of permissions.",
        ],
      },
      {
        heading: "Implementation",
        paras: [
          "Permissions are stored as a bitfield in PostgreSQL. Checking `can(user, 'posts:delete')` is a single bitwise AND operation - fast, no joins needed.",
          "The bitfield approach is compact but terrible for debugging raw database values. Added a helper view that decodes permissions into human-readable labels.",
        ],
      },
      {
        heading: "Middleware",
        paras: [
          "Next.js middleware checks permissions at the route level. API routes have their own guard that validates both the JWT and the required permission before any handler runs.",
          "This double-layer means even if a route is misconfigured on the frontend, the backend rejects unauthorized requests.",
        ],
      },
    ],
    imgs:  [],
    tags:  ["backend", "auth", "security"],
    date:  "11:58 AM jul 11, 2026",
    links: ["https://en.wikipedia.org/wiki/Role-based_access_control"],
  },
  {
    id: 4,
    title: "Reset Flow",
    desc : "password reset without headaches",
    sections: [
      {
        heading: "Token Expiry & Invalidation",
        paras: [
          "Password reset tokens expire in 15 minutes. They're single-use and tied to the specific user - no generic 'reset any account' URLs.",
          "The token is a crypto.randomBytes(32) hex string, hashed with SHA-256 before storage. If the database leaks, attackers can't reverse the tokens.",
        ],
      },
      {
        heading: "Email Delivery",
        paras: [
          "Used Resend for email sending. The template is minimal - just a link and a note that it expires in 15 minutes. No branding, no tracking pixels.",
          "Rate limited to 1 reset request per 5 minutes per account. Prevents email bombing and gives users a clear feedback window.",
        ],
      },
    ],
    imgs:  [],
    tags:  ["auth", "security", "ux"],
    date:  "11:58 AM jul 11, 2026",
    links: ["https://resend.com"],
  },
];