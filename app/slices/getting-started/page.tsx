"use client";
import Link from "next/link";
import { motion } from "motion/react";
function page() {
  return (
    <main className="flex-1 relative min-h-screen w-full max-w-4xl mx-auto px-4 md:px-8 py-12">

      <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none z-0 top-0 right-0 w-[60%] h-24 bg-(--blob-color) blur-[200px]"
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
              
      
          <h1 className="text-[2rem] md:text-[2.8rem] flex text-[var(--text-color)] font-bold">
            Slices UI{" "}
    
          </h1>
          <p className="text-md text-[var(--secondary-text)] mt-2">
            components & utilities, engineered, styled, and shipped.
          </p>
        </div>
            <hr className="w-full border-[var(--border-color)]/40" />

        <div className="text-left text-md text-[var(--secondary-text)] flex flex-col gap-4">
          <p>
            Wellcome to Slices UI, here I document my lastest explorations and
            experiments. This is a playground for me to test out new ideas,
            share my learnings.
          </p>

          <p>
            It’s a playground not a polished framework meant for exploration and
            sharing with other developers
          </p>
          <p>
            So you may be wondering what the heck are Slices? <br />
            Slices are reusable components, utilities, and templates which I use
            as building blocks across my projects.
          </p>
          <p>
            Individually, these slices are small and useful on their own but
            when you put enough of them together, they form something whole.
            That whole is Orange
          </p>
        </div>

           <hr className="w-full border-[var(--border-color)]/40" />

        <h1 className="text-xl font-bold">Explore</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Add your content here */}
          <Link href="/slices/components" className="p-6 bg-[#fff]/20  shadow border border-[var(--border-color)] rounded-lg flex justify-center items-center transition-colors">
           <h3 className="text-md font-bold mb-2 underline underline-offset-2">Components ⭧</h3>
            
          </Link>
          <Link href="/slices/animations" className="p-6 bg-[#fff]/20 shadow border border-[var(--border-color)] rounded-lg flex justify-center items-center transition-colors">
            <h3 className="text-md font-bold mb-2 underline underline-offset-2">Animations ⭧</h3>

          </Link>
        </div>
      </div>
    </main>
  );
}

export default page;
