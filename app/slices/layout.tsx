"use client";
import "../slices.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, List, NewspaperIcon, PlayIcon } from "lucide-react";
import { SidebarIcon } from "@phosphor-icons/react";
import ThemeToggleBtn from "../ui/ThemeBtn";
const demoItems = [
  { id: 1, title: "Getting Started", icon: HomeIcon, slug: "getting-started" },
  {
    id: 2,
    title: "Components",
    icon: List,
    sub_list: ["cards", "buttons", "inputs"],
    slug: "components",
  },
  // { id: 3, title: "Utilities", icon: "-", slug: "utilities" },
  {
    id: 4,
    title: "Animations",
    icon:  PlayIcon,
    sub_list: ["scroll", "hover", "click", "landing"],
    slug: "animations",
  },
  { id: 5, title: "Resources", icon: NewspaperIcon, slug: "resources" },
];

export default function SlicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const currentSection = pathname.split("/").pop();



   const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");

      if (saved === "light" || saved === "dark") {
        return saved;
      }

      // fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return "dark";
  });
    useEffect(() => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const handleNavigation = (slug: string) => {
    router.push(`/slices/${slug}`);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] relative"
    >
     
      {/* Navigation Bar */}
      <nav className="fixed flex w-full top-0 left-0 border-b border-[var(--border-2-color)] justify-between items-center px-4 py-2 bg-[var(--bg-color)] z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-xl  hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon  size={24} />
          </button>
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0em" }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center text-center"
          >
            <h1 className="text-[1.8rem] md:text-[1.8rem] text-[var(--text-color)] font-bold">
              Slices
            </h1>
            <Image
              src="/slices.svg"
              width={32}
              height={32}
              alt="Logo"
              className="w-8 h-fit rounded-full object-cover"
            /> 
          </motion.span>
        </div>
        <span className=" px-2 py-1    md:px-4 md:py-2 text-[.45rem]  md:text-[.75rem] rounded-full border z-999">under development</span>
        <span className="gap-2 flex justify-center items-center">
          <Link
            href="/"
            className="hover:text-[var(--accent-color)] font-medium hover:tracking-widest  transition-all mt-2 "
          >
            Portfolio
          </Link>
          <ThemeToggleBtn toggleTheme={toggleTheme} theme=
          {theme} />
        </span>
      </nav>

      <div className="flex pt-[60px]">

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-[60px] left-0 h-[calc(100vh-60px)] bg-[var(--bg-color)] border-r border-[var(--border-2-color)] z-40  ${
            sidebarOpen ? "w-fit" : "-translate-x-full md:translate-x-0"
          } ${sidebarOpen ? "w-64 px-6 " : "w-fit border-0 px-2"}`}
        >
          <div className="py-8 overflow-y-auto h-full">
          
            <ul className="space-y-2">
              {demoItems.map((item) =>{
              
              const Icon = item.icon;
             

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      handleNavigation(item.slug);                     
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors flex flex-col items-center gap-3 group ${
                      currentSection === item.slug
                        ? "bg-gradient-to-r from-[var(--text-color)]/20 to-[var(--text-color)]/10 shadow-[inset_0_2px_3px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.05)] "
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-start w-full gap-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                     <Icon />
                    </span>
                   
                   
                   {sidebarOpen ? <span className="text-[var(--text-color)]">
                      {item.title}
                    </span> : null} 
                    
                    </div>

                 
                  </button>
                </li>
              )
            
            }
              )
              

              }
            </ul>
          </div>
        </aside>
      
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden top-[60px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

      
        {children}
      </div>
    </motion.div>
  );
}
