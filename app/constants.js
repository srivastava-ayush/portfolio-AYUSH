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
import projectImg9 from "../public/projects/project-img9.webp";
import projectImg10 from "../public/projects/project-img10.webp";
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
import { title } from "motion/react-client";


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
      "https://github.com/srivastava-ayush/slice",
    projectLive: "https://slices-ui.vercel.app/slices",
    projectId: 1,
    category: ["frontend"],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
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
    techStack: ["Next.js", "TypeScript", "Motion", "Bun.js", "Postgresql"],
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
  {
    projectName: "Nvidia Shush!",
    projectDescriptionShort:
      "gpu-powerctl (Nvidia Shush!) - manual NVIDIA discrete-GPU power control for Linux laptops. status, off, and on commands. Your battery will thank you.",
    projectDescriptionLong:
      "gpu-powerctl (Nvidia Shush!) is a manual NVIDIA discrete-GPU power control tool for Linux laptops, providing status, off, and on commands. The first release is conservative: it supports one detected NVIDIA PCI display controller and refuses to guess if it finds more than one. It unbinds the NVIDIA GPU from its driver and switches each function's power/control to auto so runtime PM can reach suspended — a sequence that finally stopped it from draining battery with the dGPU idling on.",
    projectImg: projectImg9,
    projectId: 9,
    projectCode: "https://github.com/srivastava-ayush/gpu-powerctl",
    category: ["other"],
    techStack: ["Bash", "Linux", "NVIDIA"],
  },
  {
    projectName: "Menu Deck",
    projectDescriptionShort:
      "A menu worth opening. Build a beautiful digital menu that feels like your restaurant, then share it with one link or a QR code.",
    projectDescriptionLong:
      "Menu Deck helps restaurants create a digital menu that reflects their brand. Make changes in seconds and share the updated menu with customers through a link or QR code, ready for any phone.",
    projectImg: projectImg10,
    projectCode: "https://github.com/srivastava-ayush/menu-deck",
    projectId: 10,
    projectLive: "https://menu-deck.vercel.app/",
    category: ["full-stack", "frontend", "backend", "landing-page"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
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
        title: "what i have been reading recently, note:- sorry for grammatical errors :( ",
        para:""
      },

      {
        title: "Stoicism",
        para: "Hellenistic philosophy that teaches the development of self-control and fortitude as a means to overcome destructive emotions. It emphasizes rationality, virtue, and the acceptance of fate, advocating for a life in harmony with nature and reason.",
      },
      {
        title: "Advaita Vedanta",
        para: "as I understand it, is a school of Hindu philosophy and spiritual practice that emphasizes the idea of non-dualism, asserting that the true self is identical to the ultimate reality. It teaches that the apparent multiplicity of the world is an illusion and that realizing this truth leads to liberation.",
      },
      {
        title: "Aristotelian Virtue Ethics",
        para: "Aristotelian philosophy that talk bout stuff like importance of virtue and moral behavior in achieving a just and righteous life. It basically asks: What kind of person should I become?",
      }
    ],
  },
  {
    category: "linux",
    banner:
      "https://w0.peakpx.com/wallpaper/950/780/HD-wallpaper-linux-union-red-sycle-linux-ussr-hammer-soviet-union.jpg",
    entries: [
      {
        title: "love for Linux",
        para: "I've been using Linux for about 8 years now (flex). Installed it for the first time in 6th grade it was Kali, of course, because I wanted to be like Mr. Robot, Peak script kiddie era. Then I moved to Garuda, hopped through pretty much all the popular distros including sid and gentoo, broke things, fixed things, and kept learning. Eventually I f'ed with Arch and stayed. Arch lets me make my computer feel like MINE, only con is that I probably spend way too long tweaking.",
      },
      {
        title: "Current Linux setup",
        para: "Arch with Hyprland and Kitty. I came for the tiling and smooth animations but stayed for the endless config rabbit hole. It's the setup I keep coming back to after all that distro hopping.",
      },
      {
        title: "Waybar + Rofi rice",
        para: "My earlier Hyprland setup: Waybar with rofi, It was exaclty how i wanted it to be. Here's how it looked.",
        imgs: [
          {
            src: "/side-quest/entries/distribution-entry-1.webp",
            desc: "desktop + Waybar",
          },
          {
            src: "/side-quest/entries/distribution-entry-2.webp",
            desc: "fastfetch",
          },
          {
            src: "/side-quest/entries/distribution-entry-3.webp",
            desc: "Rofi app launcher",
          },
          {
            src: "/side-quest/entries/distribution-entry-4.webp",
            desc: "custom zed editor",
          },
        ],
      },
      {
        title: "Caelestia rice",
        para: "After my Waybar + Rofi setup I tried the Caelestia shell dots (holy eye candy). The panels and animations were a lot more than my old minimal setup, but I gave it a proper run as my daily driver with some customization and tweaks ofc!",
        imgs: [{
          src: "/side-quest/entries/new_shell-1.png",
          desc: "media panel",
        },
          {
            src: "/side-quest/entries/new_shell-2.png",
            desc: "app launcher",
          },
          {
            src: "/side-quest/entries/new_shell-3.png",
            desc: "notifications + power menu",
          },
          {
            src: "/side-quest/entries/new_shell-4.png",
            desc: "performance panel",
          },
          {
            src: "/side-quest/entries/new_shell-5.png",
            desc: "dashboard panel",
          },
        ],
      }
    ],
  },
  {
    category: "Quickshell Rice",
    entries: [
      {
        title: "The latest rice",
        para: "Caelestia got me hooked on what a shell could look and feel like, but you know how it goes: after enough tweaking I wanted to make the whole thing feel more like mine. So the latest chapter is my Quickshell rice on Arch + Hyprland. I'm taking the bits I loved about Caelestia and experimenting with my own layout and interactions instead of calling the old setup done. The rice rabbit hole never ends, and honestly that's half the fun.",
      },
      {title: "ill add details later here!"}
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
    category: "Rewatches",
    banner:"https://imgs.search.brave.com/nn7YlrhrEhqCqHxqf0TNCyNwgkc5DFTzD6135h8GNuk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amFncmFuaW1hZ2Vz/LmNvbS9pbWFnZXMv/bmV3aW1nLzIzMDQy/MDI0LzIzXzA0XzIw/MjQtc2F0eWFqaXRf/cmF5X2RlYXRoX2Fu/bml2ZXJzYXJ5XzIz/NzAyNTMwX20ud2Vi/cA"
    ,entries: [
      {
        title: "Animes",
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
            desc: "silent voice 9/10",
          },
        ],
      },
      {
        title: "Movies",
        imageFormat: "poster",
        imgs: [
          {
            src: "https://upload.wikimedia.org/wikipedia/en/3/33/Taxi_Driver_%281976_film_poster%29.jpg",
            desc: "Taxi Driver (1976)",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/1/18/Rocky_poster.jpg",
            desc: "Rocky (1976)",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
            desc: "Fight Club (1999)",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/d/d4/Nightcrawlerfilm.jpg",
            desc: "Nightcrawler (2014)",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
            desc: "The Godfather (1972)",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
            desc: "Whiplash (2014)",
          },
        ],
      },
      {
        title: "Series",
        imageFormat: "contain",
        imgs: [
          {
            src: "https://upload.wikimedia.org/wikipedia/en/d/d8/Game_of_Thrones_title_card.jpg",
            desc: "Game of Thrones",
          },
          {
            src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Breaking_Bad_logo.svg/500px-Breaking_Bad_logo.svg.png",
            desc: "Breaking Bad",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/f/ff/Lost_in_Space_2018_series_Logo.jpg",
            desc: "Lost in Space (2018)",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Affiche_Mr_Robot.jpg",
            desc: "Mr. Robot",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Black_Mirror_%28British_TV_series%29_logo.svg",
            desc: "Black Mirror",
          },
        ],
      },
    ],
  },
  {
    category: "My Setup",
    banner:"https://imgs.search.brave.com/bMfSVpc2JbPwbtHjg3ryy3c2rfjUcX03oTa7eDFnxr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZ3J0/ZWNoLmNvbS5hdS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNi8w/Ni9zaG90MDAwMS04/MDB4NDIwLnBuZy53/ZWJw",
    entries: [
      {
        title: "Hardware gear",
        items: [
          { label: "Laptop", detail: "ASUS TUF Gaming A15 FA506ICB — Ryzen 7 4800H, RTX 3050 Laptop GPU (4 GB), 16 GB RAM, 512 GB NVMe, 90 Wh battery" },
          { label: "Keyboard", detail: "EvoFox Katana S Mini with lubed blue switches" },
          { label: "Phone", detail: "iQOO Neo 10R" },
          { label: "Headphones", detail: "Spigen SA HP10" },
          { label: "IEMs", detail: "Kz EDX pro" },
          { label: "TWS", detail: "OnePlus Nord Buds 3 Pro" },
        ],
      },
      {
        title: "Terminal",
        para: "Arch + Hyprland, Kitty for the terminal, zsh for the shell and Starship for the prompt. These are the shareable parts of the configs I'm using on this machine; local PATH entries and a missing Kitty theme include are left out.",
        codeBlocks: [
          { label: "zsh config (.zshrc)", href: "/side-quest/configs/zshrc" },
          { label: "Starship config (starship.toml)", href: "/side-quest/configs/starship.toml" },
          { label: "Kitty config (kitty.conf)", href: "/side-quest/configs/kitty.conf" },
        ],
      },
      {
        title: "IDE config",
        para: "Coming soon — I'll add my editor setup and config here later.",
      },
    ],
  },
];
