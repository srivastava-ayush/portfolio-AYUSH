import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Orbitron, Source_Code_Pro, Zen_Dots , Source_Serif_4,} from "next/font/google";
import ScrollToTop from "./ui/utils/ScrollToTop";
import { SoundProvider } from "./ui/SoundProvider";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-orbitron",
});
const code = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code",
});
const zen = Zen_Dots({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen",
});

export const metadata: Metadata = {
  title: "Ayush Srivastava Portfolio",
  description:
    "It is a portfolio of Ayush Srivastava, Hey, I'm Ayush, an 20-year-old web developer fueled by curiosity and passionate about building ui interfaces...",
  authors: [{ name: "Ayush Srivastava" }],
  keywords: [
    "Ayush Srivastava",
    "ayush srivastava portfolio",
    "constayush",
    "srivastava ayush",
    "Ayush Portfolio",
    "AYUSH",
    "maihoonayush",
    "ayush srivastava",
    "ayush srivastava portfolio",
    "ayush portfolio",
    " srivastava-ayush portfolio",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Ayush Srivastava Portfolio",
    description: "Ayush Srivastava (constayush), A Full-Stack Engineer",
    url: "https://srivastava-ayush.vercel.app",
    images: "https://srivastava-ayush.vercel.app/thumbnail.png",
    type: "article",
  },
  verification: {
    google: "ZvV4-8qcmm7ala4RjMTJlyfScxn8SoszBseW9DVbKXY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="shortcut icon" href="/orange.svg" type="image/x-icon" />
      </head>
      <body
        className={` ${montserrat.variable} ${serif.variable} ${orbitron.variable} ${code.variable} ${zen.variable} antialiased`}
      >
        <SoundProvider/>
        <ScrollToTop />
        {children}
        <span className="fixed z-99 bottom-[-40] bg-[var(--bg-color)]  blur-[20px] w-full  h-20"/>
          
      
      </body>
    </html>
  );
}
