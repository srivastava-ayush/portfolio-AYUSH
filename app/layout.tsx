import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Orbitron, Source_Code_Pro, Zen_Dots , Source_Serif_4,} from "next/font/google";
import ScrollToTop from "./ui/utils/ScrollToTop";
import { SoundProvider } from "./ui/SoundProvider";
import { ThemeInitializer } from "./ui/ThemeInitializer";
import { ClarityProvider } from "./ui/ClarityProvider";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

const siteUrl = "https://srivastava-ayush.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Srivastava Portfolio - Full-Stack Engineer & UI Developer",
    template: "%s | Ayush Srivastava",
  },
  description:
    "Ayush Srivastava Portfolio - Full-Stack Engineer specializing in modern UI development. Creator of Slices UI. Explore projects built with React, Next.js & TypeScript.",
  authors: [
    { name: "Ayush Srivastava", url: siteUrl },
  ],
  creator: "Ayush Srivastava",
  publisher: "Ayush Srivastava",
  keywords: [
    "ayush srivastava portfolio",
    "Slices UI",
    "Ayush Srivastava",
    "slices ui library",
    "slices ui ayush",
    "slices library",
    "ayush srivastava developer",
    "Full-Stack Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "UI developer",
    "web developer",
    "maihoonayush",
    "constayush",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Ayush Srivastava Portfolio",
    title: "Ayush Srivastava Portfolio - Full-Stack Engineer & UI Developer",
    description:
      "Ayush Srivastava Portfolio - Full-Stack Engineer building modern web experiences with React, Next.js & TypeScript. Creator of Slices UI component library.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/misc/OG.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Srivastava Portfolio - Full-Stack Engineer & UI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Srivastava Portfolio - Full-Stack Engineer & UI Developer",
    description:
      "Ayush Srivastava Portfolio - Full-Stack Engineer building modern web experiences with React, Next.js & TypeScript. Creator of Slices UI.",
    images: [`${siteUrl}/misc/OG.png`],
    creator: "@maihoonayush",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "fe532f406f3b3d05",
  },
  category: "portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitializer />
        <link rel="shortcut icon" href="/icons/orange.svg" type="image/x-icon" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: "Ayush Srivastava",
                  alternateName: ["constayush", "maihoonayush", "srivastava-ayush"],
                  url: siteUrl,
                  jobTitle: "Full-Stack Engineer",
                  knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "UI Development",
                    "Slices UI",
                  ],
                  sameAs: [
                    "https://github.com/srivastava-ayush",
                    "https://linkedin.com/in/constayush",
                    "https://instagram.com/maihoonayush",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Ayush Srivastava Portfolio",
                  url: siteUrl,
                  description:
                    "Ayush Srivastava Portfolio - a Full-Stack Engineer and UI developer. Creator of Slices UI component library.",
                  author: {
                    "@type": "Person",
                    name: "Ayush Srivastava",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={` ${montserrat.variable} ${serif.variable} ${orbitron.variable} ${code.variable} ${zen.variable} antialiased`}
      >
        <SoundProvider/>
        <ClarityProvider />
        <ScrollToTop />
        {children}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.3] mix-blend-screen"
          style={{ backgroundImage: "url(/textures/noise.png)", backgroundRepeat: "repeat", backgroundSize: "128px" }}
        />
        <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-50"
          style={{
            background: "linear-gradient(to top, var(--bg-color) 0%, transparent 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to top, black 15%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 15%, transparent 100%)",
          }}
        />
          
      
      </body>
    </html>
  );
}
