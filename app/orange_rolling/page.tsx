"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const Page = () => {

  //sfx

  const audioPoolClick = useRef<HTMLAudioElement[]>([]);
  const poolIndex = useRef(0);
  const unlocked = useRef(false);
  const audioPoolStageClear = useRef<HTMLAudioElement[]>([]);
  const audioPoolRoundOver = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    audioPoolClick.current = Array.from({ length: 6 }, () => {
      const a = new Audio('/jump.mp3');
      a.volume = 0.05;
      return a;
    });
  }, []);

    useEffect(() => {
    audioPoolStageClear.current = Array.from({ length: 6 }, () => {
      const a = new Audio('/stageCleared.mp3');
      a.volume = 0.05;
      return a;
    });
  }, []);
  useEffect(() => {
    audioPoolRoundOver.current = Array.from({ length: 6 }, () => {
      const a = new Audio('/roundOver.mp3');
      a.volume = 0.05;
      return a;
    });
  }, []);


  useEffect(() => {
    const unlock = async () => {
      if (unlocked.current) return;
      for (const audio of audioPoolClick.current) {
        try { await audio.play(); audio.pause(); audio.currentTime = 0; } catch {}
      }
      unlocked.current = true;
      document.removeEventListener('click', unlock);
    };
    document.addEventListener('click', unlock);
    return () => document.removeEventListener('click', unlock);
  }, []);


    const playClickSound = () => {
      const pool = audioPoolClick.current;
      if (!pool.length) return;
      const audio = pool[poolIndex.current % pool.length];
      poolIndex.current++;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const playStageClearSound = () => {
      const pool = audioPoolStageClear.current;
      if (!pool.length) return;
      const audio = pool[poolIndex.current % pool.length];
      poolIndex.current++;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

     const playRoundOverSound = () => {
      const pool = audioPoolRoundOver.current;
      if (!pool.length) return;
      const audio = pool[poolIndex.current % pool.length];
      poolIndex.current++;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

  // Game constants
  const GAME_WIDTH =
    typeof window !== "undefined" && window.innerWidth < 700 ? 450 : 800;
  const ORG_WIDTH = 50;
  const OBSTACLE_WIDTH = 25;
  const JUMP_HEIGHT = 100;
  const JUMP_DURATION = 500;
  const INITIAL_SPEED = 8;
  const MAX_SPEED = 5;
  const SPEED_INCREMENT = 0.5;
  const DINO_START_X =
    typeof window !== "undefined" && window.innerWidth < 700 ? 50 : 300;

  // Game state
  const [isJumping, setIsJumping] = useState(false);
  const [dinoY, setDinoY] = useState(0);
  const [obstacleX, setObstacleX] = useState(GAME_WIDTH);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [obstaclesPassed, setObstaclesPassed] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Refs for game loop
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const gameSpeedRef = useRef<number>(INITIAL_SPEED);
  const obstaclePassedRef = useRef<boolean>(false);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate game speed based on obstacles passed
  const calculateSpeed = useCallback((obstacles: number) => {
    const newSpeed = INITIAL_SPEED + (obstacles * SPEED_INCREMENT);
    return Math.max(MAX_SPEED, newSpeed);
  }, []);

  // Jump handler
  const handleJump = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      playClickSound();

      if (isGameOver || isJumping || isPaused) return;

      // Create ripple effect if mouse event
      if (e && "clientX" in e) {
        const newRipple: Ripple = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      setIsJumping(true);
      setDinoY(JUMP_HEIGHT);

      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }

      jumpTimeoutRef.current = setTimeout(() => {
        setDinoY(0);
        setIsJumping(false);
      }, JUMP_DURATION);
    },
    [isGameOver, isJumping, isPaused],
  );

  // Toggle pause
  const togglePause = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPaused((prev) => !prev);
  }, []);

  // Restart game
  const restartGame = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      playRoundOverSound();
      setIsGameOver(false);
      setIsPaused(false);
      setIsJumping(false);
      setDinoY(0);
      setObstacleX(GAME_WIDTH);
      setScore(0);
      setObstaclesPassed(0);
      gameSpeedRef.current = INITIAL_SPEED;
      obstaclePassedRef.current = false;
      lastTimeRef.current = 0;
    },
    [GAME_WIDTH],
  );

  // Collision detection
  const checkCollision = useCallback((obstX: number, dinoYPos: number) => {
    const dinoLeft = DINO_START_X;
    const dinoRight = DINO_START_X + ORG_WIDTH;
    const dinoBottom = dinoYPos;

    const obstLeft = obstX;
    const obstRight = obstX + OBSTACLE_WIDTH;

    if (dinoBottom === 0 && dinoRight > obstLeft && dinoLeft < obstRight) {
      return true;
    }

    return false;
  }, []);

  // Main game loop
  useEffect(() => {
    if (isGameOver || isPaused) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const gameLoop = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime > 16) {
        lastTimeRef.current = currentTime;

        setObstacleX((prevX) => {
          const newX = prevX - gameSpeedRef.current;

          if (newX < -OBSTACLE_WIDTH) {
            obstaclePassedRef.current = false;
            
            setObstaclesPassed((prev) => {
              const newPassed = prev + 1;
              gameSpeedRef.current = calculateSpeed(newPassed);
              return newPassed;
            });

            playStageClearSound();

            setScore((prev) => prev + 10);

            return GAME_WIDTH + Math.random() * 200;
          }

          if (!obstaclePassedRef.current && newX < DINO_START_X) {
            obstaclePassedRef.current = true;
          }

          setDinoY((currentDinoY) => {
            if (checkCollision(newX, currentDinoY)) {
              playRoundOverSound();
              setIsGameOver(true);
              if (score > highscore) {
                setHighscore(Math.round(score));
              }
            }
            return currentDinoY;
          });

          return newX;
        });

        setScore((prev) => prev + 0.1);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [
    isGameOver,
    isPaused,
    score,
    highscore,
    checkCollision,
    calculateSpeed,
    GAME_WIDTH,
    DINO_START_X,
  ]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleJump(e);
      } else if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        e.preventDefault();
        togglePause();
      } else if ((e.key === "r" || e.key === "R") && isGameOver) {
        e.preventDefault();
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleJump, togglePause, isGameOver, restartGame]);

  useEffect(() => {
    return () => {
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, []);

  const displayScore = Math.floor(score);
  const displayHighscore = Math.max(highscore, displayScore);

  return (
    <div
      onClick={handleJump}
      className="w-full h-screen p-3 gap-5 md:p-0 flex select-none flex-col justify-center items-center relative cursor-crosshair text-[var(--text-color)] overflow-hidden bg-[var(--bg-color)]"
    >
      {/* Background effects */}
      <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none border border-[#ffffff9a] top-0 left-0 w-[60%] h-[6rem] bg-[#ffffff] blur-[200px]"
      />
      <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none border border-[#fff] top-0 right-0 w-[40%] h-[6rem] bg-[#ffad55] blur-[130px]"
      />

      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute w-10 h-10 rounded-full animate-ripple bg-[var(--accent-color)] opacity-40"
          style={{
            left: `${ripple.x - 25}px`,
            top: `${ripple.y - 25}px`,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex w-[70%] flex-wrap m-5 gap-5 justify-between items-center">
        <div className="flex gap-6">
          <Link
            className="text-[var(--text-color)] text-[2rem] logoNav"
            href="/orange_rolling"
          >
            आ<span className="text-[var(--accent-color)]">1.</span>
          </Link>
          <Link className="w-full md:w-fit" href="/">
            <button className="text-[var(--text-color)] text-lg md:text-[1.4rem] w-full md:w-fit border-2 border-[var(--border-color)] p-2 transition-all duration-300 rounded-sm hover:text-[var(--bg-color)] hover:font-semibold hover:bg-[var(--accent-color)]">
              HOME
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-5 text-center items-center">
          {obstaclesPassed > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-full text-sm font-bold"
            >
              CLEARED {obstaclesPassed}
            </motion.div>
          )}
          <p
            className={`text-center highscore ${displayScore > highscore && highscore > 0 ? "text-[#ffbf47]" : "text-[var(--secondary-text)]"}`}
          >
            High Score: {displayHighscore}
          </p>
          <p className="text-center text-[var(--secondary-text)]">
            Score: {displayScore}
          </p>
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={togglePause}
          className="px-4 py-2 border-2 border-[var(--border-color)] rounded-sm hover:bg-[var(--border-color)] transition-all"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={restartGame}
          className="px-4 py-2 border-2 border-[var(--border-color)] rounded-sm hover:bg-[var(--border-color)] transition-all"
        >
          Restart
        </button>
      </div>

      {/* Game Area */}
      <div className="w-full h-[40%] md:w-[70%] transition-all duration-200 ease-in-out md:h-[30%] relative overflow-hidden p-1 border border-[var(--border-color)] game">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[var(--border-color)]" />

        {/* Player */}
        <motion.img
          src="/icons/orange.svg"
          alt="Orange"
          className=" dino object-contain"
          animate={{
            y: -dinoY,
            rotate: 360,
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 1, // seconds per full spin
              ease: "linear", // IMPORTANT for smooth infinite rotation
            },
            y: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          style={{
            width: `${ORG_WIDTH}px`,
            height: "40px",
            position: "absolute",
            bottom: "0",
            left: `${DINO_START_X}px`,
          }}
        />




        {/* Obstacle */}
        <img
          className="obstacle object-scale-down relative animate-spin"
          src={"/icons/obs.svg"}
          alt="Obstacle"
     
          style={{
            rotate: "180deg",
            width: `${OBSTACLE_WIDTH}px`,
            height: "40px",
            position: "absolute",
            bottom: "0",
            left: `${obstacleX}px`,
          }}
        />

        {/* Pause Overlay */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-[#00000080] backdrop-blur-[2px] flex items-center justify-center">
            <div className="text-2xl text-white font-bold">PAUSED</div>
          </div>
        )}
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col justify-center md:w-fit w-full relative md:absolute bg-[#ffffff0e] backdrop-blur-[40px] items-center gap-3 p-6 border-2 border-[var(--border-color)]"
        >
          <h2 className="text-3xl text-[var(--text-color)] font-bold mb-2">
            Game Over!
          </h2>
          <p className="text-xl text-[var(--secondary-text)]">
            Orange couldn&apos;t make it :&apos;(
          </p>
          <div className="flex gap-6 mt-2">
            <p className="text-[var(--secondary-text)]">
              Score:{" "}
              <span className="text-[var(--text-color)]">{displayScore}</span>
            </p>
            <p className="text-[var(--secondary-text)]">
              Best: <span className="text-[#ffbf47]">{displayHighscore}</span>
            </p>
          </div>
          {displayScore > highscore && highscore > 0 && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[#ffbf47] font-bold text-lg"
            >
              New High Score! 🎉
            </motion.p>
          )}
          <button
            className="px-6 py-2 mt-2 rounded-sm border-2 font-semibold text-[var(--bg-color)] bg-[var(--accent-color)] hover:text-[var(--text-color)] hover:bg-[var(--border-color)] transition-all"
            onClick={restartGame}
          >
            Play Again
          </button>
          <p className="text-sm text-[var(--secondary-text)] mt-2">
            Press R or click to restart
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      {!isGameOver && !isPaused && (
        <div className="mt-6 text-center text-[var(--secondary-text)] text-sm">
          <p>Click or press SPACE to jump • P to pause • R to restart</p>
        </div>
      )}
    </div>
  );
};

export default Page;
