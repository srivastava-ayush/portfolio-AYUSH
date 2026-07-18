"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "./utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate("span", {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
    }, {
      duration: duration ? duration : 1,
      delay: stagger(0.12),
    });
  },);

  const renderWords = () => {
    return (
      (<motion.div className="inline" ref={scope}>
        {wordsArray.map((word, idx) => {

            if(word === "FF" || word === "FulFFl" || word === "FF"){
              return (<span key={idx+word+idx}><br className="hidden md:block"/><motion.span
              key={word + idx}
              className="opacity-0 inline"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}{" "}
            </motion.span></span>  )
            }


          return (
            (<motion.span
              key={word + idx}
              className="opacity-0 inline"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}{" "}
            </motion.span>)
          );
        })}
      </motion.div>)
    );
  };

  return (
    (<div className= {cn("font-bold", className)}>
      <div className="mt-4 inline">
        <div
          className=" inline">
          {renderWords()}
        </div>
      </div>
    </div>)
  );
};
