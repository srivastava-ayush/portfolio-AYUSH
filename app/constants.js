import github from "../public/github.svg";
import linkedin from "../public/linked-in.svg";
import insta from "../public/instagram.svg";
import mail from "../public/mail.svg";
import xIcon from "../public/x.svg";
import ReactIcon from "../public/react-2.svg";
import TypescriptIcon from "../public/typescript.svg";
import JavascriptIcon from "../public/javascript.svg";
import NextjsIcon from "../public/nextjs.svg";
import projectImg3 from "../public/project-img3.png";
import projectImg1 from "../public/project-img1.png";
import projectImg2 from "../public/project-img2.png";
import projectImg4 from "../public/project-img4.png";
import projectImg5 from "../public/project-img5.png";
import projectImg6 from "../public/project-img6.png";
import ExpressjsIcon from "../public/express.svg";
import NodejsIcon from "../public/nodejs.svg";
import MongoDBIcon from "../public/mongodb.svg";
import BunjsIcon from "../public/bun.svg";
import PostgresqlIcon from "../public/postgresql.svg";

export const SOCIAL_LINKS = [
  { href: "https://github.com/srivastava-ayush", icon: github, alt: "GitHub" },
  { href: "https://www.linkedin.com/in/constayush/", icon: linkedin, alt: "LinkedIn" },
  { href: "https://www.instagram.com/maihoonayush/", icon: insta, alt: "Instagram" },
  { href: "https://www.x.com/srivastava-ayush/", icon: xIcon, alt: "X" },
  { href: "mailto:srivastava-ayush@outlook.com", icon: mail, alt: "Mail" }
];

export const PROJECTS = [
  {
    projectName: "Slices-UI",
    projectDescriptionShort: "Slices — a fresh collection of UI elements and reusable code snippets I cut, styled, and served.",
    projectDescriptionLong: "Inspired by libraries like Hero UI and Aceternity UI, Slices UI is a curated set of sleek, reusable components designed for fast, modern web dev. Built with love, Tailwind, and way too much coffee.",
    projectImg: projectImg1,
    projectCode: "https://github.com/srivastava-ayush/portfolio-AYUSH/tree/master/src/components/slices",
    projectLive: "https://srivastava-ayush.vercel.app/slices",
    projectId: 1,
    category: ["frontend"],
  }
  ,
  {
    projectName: "Boxlit",
    projectDescriptionShort: "Boxlit — boxing app that helps to learn, practice, & improve, offering valuable resources for all skill levels.",
    projectDescriptionLong: "Boxlit is a comprehensive boxing app designed for everyone—from beginners to experienced fighters. It features interactive tutorials, guided training sessions, and personalized workout plans to help users sharpen their skills and track their progress.",
    projectImg: projectImg2,
    projectCode: "https://github.com/srivastava-ayush/Boxit",
    projectLive: "https://boxlit.vercel.app/",
    projectId: 2,
    category: ["full-stack", "backend", "frontend", "landing-page"],
  },
    {
    projectName: "Kodak",
    projectDescriptionShort: "Kodak — is your always-listening local AI assistant built in Python.",
    projectDescriptionLong: "Kodak is an AI assistant that runs locally on your machine, ensuring your data stays private. Built with Python, it leverages advanced natural language processing to help you manage tasks, answer questions, and streamline your workflow without relying on cloud services.",
    projectImg: projectImg3,
    projectCode: "https://github.com/srivastava-ayush/Kodak",
    // projectLive: "https://kodak.vercel.app/",
    projectId: 3,
    category: ["ai", "backend"],
  },
  {
  projectName: "Can You Remember?",
  projectDescriptionShort: "Can You Remember? — a fast-paced visual memory game that challenges users to recall blinking patterns.",
  projectDescriptionLong: "Can You Remember? is an interactive memory game where players must observe and recall the sequence of blinking blocks in the correct order. Designed to test and improve short-term memory and focus, the game progressively increases difficulty by adding longer and faster sequences. It features smooth UI interactions, real-time feedback, and a dynamic scoring system to keep users engaged while sharpening their cognitive skills.",
  projectImg: projectImg4,
  projectCode: "https://github.com/srivastava-ayush/can-you-remember",
  projectLive: "https://can-you-remember.vercel.app",
  projectId: 4,
  category: ["frontend"],
},
{
  projectName: "Bunk-Tendance",
  projectDescriptionShort: "Bunk-Tendance — a web app that tracks student bunks",
  projectDescriptionLong:" A simple yet powerful tool to help students track and plan their attendance strategically. This app lets you input your current academic stats and calculates exactly how many classes you can safely miss—or how many you must attend—to reach your desired attendance percentage.",
  projectImg: projectImg5,
  projectCode: "https://github.com/srivastava-ayush/Bunk-Tendence",
  projectLive: "https://bunk-tendance.vercel.app/",
  projectId: 5,
  category: ["frontend"],
},
{
  projectName: "Mihika Arts",
  projectDescriptionShort: "Mihika Arts — a platform for showcasing and selling art",
  projectDescriptionLong:"Mihika Arts is an online platform designed to showcase and sell artwork. It provides artists with a space to display their creations, connect with art enthusiasts, and manage sales. The platform features a user-friendly interface, secure payment processing, and tools for artists to promote their work effectively.",
  projectImg: projectImg6,
  projectCode: "https://github.com/srivastava-ayush/mihika-arts",
  projectLive: "https://mihika-arts.vercel.app/",
  projectId: 6,
  category: ["frontend", "landing-page"],
}
];

export const TECH_STACK = [
  { icon: JavascriptIcon, name: "JavaScript" },
  { icon: TypescriptIcon, name: "TypeScript" },
  { icon: ReactIcon, name: "React" },
  { icon: NextjsIcon, name: "Next.js" },
  { icon: NodejsIcon, name: "Node.js" },
  { icon: ExpressjsIcon, name: "Express.js" },
  { icon: MongoDBIcon, name: "MongoDB" },
  { icon: BunjsIcon, name: "Bun.js" },
  { icon: PostgresqlIcon, name: "PostgreSQL" },
];

