import ReactIcon from "../public/icons/react-2.svg";
import TypescriptIcon from "../public/icons/typescript.svg";
import JavascriptIcon from "../public/icons/javascript.svg";
import NextjsIcon from "../public/icons/nextjs.svg";
import projectImg3 from "../public/projects/project-img3.png";
import projectImg1 from "../public/projects/project-img1.png";
import projectImg2 from "../public/projects/project-img2.png";
import projectImg4 from "../public/projects/project-img4.png";
import projectImg5 from "../public/projects/project-img5.png";
import projectImg6 from "../public/projects/project-img6.png";
import projectImg7 from "../public/projects/project-img7.png";
import projectImg8 from "../public/projects/project-img8.png";
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



export const PROJECTS = [
  {
    projectName: "Slices-UI",
    projectDescriptionShort:
      "Slices — a fresh collection of UI elements and reusable code snippets I cut, styled, and served.",
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
      "Boxlit — boxing app that helps to learn, practice, & improve, offering valuable resources for all skill levels.",
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
      "Kodak — is your always-listening local AI assistant built in Python.",
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
      "Can You Remember? — a fast-paced visual memory game that challenges users to recall blinking patterns.",
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
      "Bunk-Tendance — a web app that tracks student bunks",
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
      "Mihika Arts — a platform for showcasing and selling art",
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
      "Intervue — a platform for conducting virtual interviews",
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
      "Callarity — a platform for conducting virtual interviews",
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

export const SIDE_QUESTS= [
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
            src: "/side-quest/entries/distribution-entry-1.png",
            desc: "my hyprland rice",
          },
          {
            src: "/side-quest/entries/distribution-entry-2.png",
            desc: "my hyprland rice",
          },
          {
            src: "/side-quest/entries/distribution-entry-3.png",
            desc: "my hyprland rice",
          },
          {
            src: "/side-quest/entries/distribution-entry-4.png",
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
