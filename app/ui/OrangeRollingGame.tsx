"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function OrangeRollingGame({
  onClose,
  embedded = false,
}: {
  onClose?: () => void;
  embedded?: boolean;
}) {
  //sfx

  const audioPoolClick = useRef<HTMLAudioElement[]>([]);
  const poolIndex = useRef(0);
  const unlocked = useRef(false);
  const audioPoolStageClear = useRef<HTMLAudioElement[]>([]);
  const audioPoolRoundOver = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    audioPoolClick.current = Array.from({ length: 6 }, () => {
      const a = new Audio("/jump.mp3");
      a.volume = 0.05;
      return a;
    });
  }, []);

  useEffect(() => {
    audioPoolStageClear.current = Array.from({ length: 6 }, () => {
      const a = new Audio("/audio/stageCleared.mp3");
      a.volume = 0.05;
      return a;
    });
  }, []);
  useEffect(() => {
    audioPoolRoundOver.current = Array.from({ length: 6 }, () => {
      const a = new Audio("/audio/roundOver.mp3");
      a.volume = 0.05;
      return a;
    });
  }, []);

  useEffect(() => {
    const unlock = async () => {
      if (unlocked.current) return;
      for (const audio of audioPoolClick.current) {
        try {
          await audio.play();
          audio.pause();
          audio.currentTime = 0;
        } catch {}
      }
      unlocked.current = true;
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("click", unlock);
    return () => document.removeEventListener("click", unlock);
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
  const [gameWidth, setGameWidth] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const area = gameAreaRef.current;
    if (!area) return;
    const observer = new ResizeObserver(() => setGameWidth(area.clientWidth));
    observer.observe(area);
    if (embedded) area.focus({ preventScroll: true });
    return () => observer.disconnect();
  }, [embedded]);

  const GAME_WIDTH = gameWidth;
  const ORG_WIDTH = embedded ? 32 : 50;
  const OBSTACLE_WIDTH = embedded ? 20 : 25;
  const initialObstacleX = Math.max(0, GAME_WIDTH - OBSTACLE_WIDTH - 8);
  const JUMP_HEIGHT = embedded ? 48 : 100;
  const JUMP_DURATION = 500;
  const INITIAL_SPEED = embedded ? 6.75 : 15;
  const MAX_SPEED = 18;
  const SPEED_INCREMENT = 0.75;
  const DINO_START_X = embedded ? Math.min(90, Math.max(24, gameWidth * 0.18)) : Math.min(300, Math.max(50, gameWidth * 0.25));

  // Game state
  const [isJumping, setIsJumping] = useState(false);
  const [dinoY, setDinoY] = useState(0);
  const [obstacleX, setObstacleX] = useState<number | null>(null);
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
    const newSpeed = INITIAL_SPEED + obstacles * SPEED_INCREMENT;
    return Math.min(MAX_SPEED, newSpeed);
  }, [INITIAL_SPEED]);

  // Jump handler
  const handleJump = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      playClickSound();

      if (isGameOver || isJumping || isPaused) return;

      // Create ripple effect if mouse event
      if (e && "clientX" in e) {
        const newRipple: Ripple = {
          id: Date.now(),
          x: e.clientX - (gameAreaRef.current?.getBoundingClientRect().left ?? 0),
          y: e.clientY - (gameAreaRef.current?.getBoundingClientRect().top ?? 0),
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
    [isGameOver, isJumping, isPaused, JUMP_HEIGHT],
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
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
      setIsGameOver(false);
      setIsPaused(false);
      setIsJumping(false);
      setDinoY(0);
      setObstacleX(initialObstacleX);
      setScore(0);
      setObstaclesPassed(0);
      gameSpeedRef.current = INITIAL_SPEED;
      obstaclePassedRef.current = false;
      lastTimeRef.current = 0;
    },
    [initialObstacleX, INITIAL_SPEED],
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
  }, [DINO_START_X, ORG_WIDTH, OBSTACLE_WIDTH]);

  // Main game loop
  useEffect(() => {
    if (!GAME_WIDTH) return;
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
          const newX = (prevX ?? initialObstacleX) - gameSpeedRef.current;

          if (newX < -OBSTACLE_WIDTH) {
            obstaclePassedRef.current = false;

            setObstaclesPassed((prev) => {
              const newPassed = prev + 1;
              gameSpeedRef.current = calculateSpeed(newPassed);
              return newPassed;
            });

            playStageClearSound();

            setScore((prev) => prev + 10);

            return GAME_WIDTH + Math.random() * Math.min(200, GAME_WIDTH * 0.25);
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
    OBSTACLE_WIDTH,
    initialObstacleX,
  ]);

  // Keep keyboard controls active even if focus moves to the page while playing.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.matches("input, textarea, select"))) return;
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleJump(e);
      } else if (e.key === "Escape" && onClose) {
        e.preventDefault();
        onClose();
      } else if ((e.key === "c" || e.key === "C") && onClose) {
        e.preventDefault();
        onClose();
      } else if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        e.preventDefault();
        togglePause();
      } else if ((e.key === "r" || e.key === "R") && isGameOver) {
        e.preventDefault();
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleJump, togglePause, isGameOver, restartGame, onClose]);

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
      className={`w-full h-full flex select-none flex-col items-center relative text-[var(--text-color)] overflow-hidden bg-[var(--bg-color)] ${embedded ? "p-2 gap-2" : "p-3 gap-5 md:p-0 justify-center"}`}
    >
      {/* Background effects */}
      {!embedded && <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none border border-[#ffffff9a] top-0 left-0 w-[60%] h-[6rem] bg-[#ffffff] blur-[200px]"
      />}
      {!embedded && <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none border border-[#fff] top-0 right-0 w-[40%] h-[6rem] bg-[#ffad55] blur-[130px]"
      />}

      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute w-10 h-10 rounded-full animate-ripple bg-[var(--accent-color)] opacity-40 pointer-events-none"
          style={{
            left: `${ripple.x - 25}px`,
            top: `${ripple.y - 25}px`,
          }}
        />
      ))}

      {/* Header */}
      <div className={`flex justify-between items-center gap-2 w-full ${embedded ? "text-[10px] sm:text-xs" : "w-[70%] flex-wrap m-5 gap-5"}`}>
        <div className="flex items-center gap-2 shrink-0">
          {!embedded && <Link
            className="text-[var(--text-color)] text-[2rem] logoNav"
            href="/orange_rolling"
          >
            आ<span className="text-[var(--accent-color)]">1.</span>
          </Link>}
          {onClose ? (
            <button
              onClick={onClose}
              type="button"
              className={embedded ? "px-2 py-1 border border-[var(--border-color)] hover:bg-[var(--accent-color)]" : "text-[var(--text-color)] text-lg md:text-[1.4rem] w-full md:w-fit border-2 border-[var(--border-color)] p-2 transition-all duration-300 rounded-sm hover:text-[var(--bg-color)] hover:font-semibold hover:bg-[var(--accent-color)]"}
            >
              {embedded ? "✕ Close (C)" : "CLOSE ✕"}
            </button>
          ) : (
            <Link className="w-full md:w-fit" href="/">
              <button className="text-[var(--text-color)] text-lg md:text-[1.4rem] w-full md:w-fit border-2 border-[var(--border-color)] p-2 transition-all duration-300 rounded-sm hover:text-[var(--bg-color)] hover:font-semibold hover:bg-[var(--accent-color)]">
                HOME
              </button>
            </Link>
          )}
        </div>

        <div className={`flex flex-wrap gap-2 text-center items-center justify-end ${embedded ? "text-[10px] sm:text-xs" : "gap-5"}`}>
          {obstaclesPassed > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`px-2 py-1 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-full font-bold ${embedded ? "text-[10px]" : "text-sm"}`}
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
      <div className={`flex gap-2 ${embedded ? "text-xs" : "gap-4 mb-4"}`}>
        <button
          onClick={togglePause}
          className={`${embedded ? "px-2 py-1 border" : "px-4 py-2 border-2"} border-[var(--border-color)] rounded-sm hover:bg-[var(--border-color)] transition-all`}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={restartGame}
          className={`${embedded ? "px-2 py-1 border" : "px-4 py-2 border-2"} border-[var(--border-color)] rounded-sm hover:bg-[var(--border-color)] transition-all`}
        >
          Restart
        </button>
      </div>

      {/* Game Area */}
      <div ref={gameAreaRef} tabIndex={0} role="button" aria-label="Orange Rolling game, click or press Space to jump" onClick={(e) => { e.currentTarget.focus(); handleJump(e); }} className={`relative overflow-hidden border border-[var(--border-color)] game cursor-crosshair touch-manipulation ${embedded ? "w-full flex-1 min-h-0" : "w-full h-[40%] md:w-[70%] md:h-[30%]"}`}>
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
            height: embedded ? "32px" : "40px",
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
            height: embedded ? "32px" : "40px",
            position: "absolute",
            bottom: "0",
            left: `${obstacleX ?? initialObstacleX}px`,
          }}
        />

        {/* Pause Overlay */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-[#00000080] backdrop-blur-[2px] flex items-center justify-center">
            <div className={`${embedded ? "text-lg" : "text-2xl"} text-white font-bold`}>PAUSED</div>
          </div>
        )}
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex flex-col justify-center bg-[var(--bg-color)]/95 backdrop-blur-sm items-center border border-[var(--border-color)] z-10 ${embedded ? "absolute inset-x-2 top-16 bottom-5 gap-1 p-2 text-center" : "relative md:absolute gap-3 p-6"}`}
        >
          <h2 className={`${embedded ? "text-base" : "text-3xl mb-2"} text-[var(--text-color)] font-bold`}>
            Game Over!
          </h2>
          <p className={`${embedded ? "text-xs" : "text-xl"} text-[var(--secondary-text)]`}>
            Orange couldn&apos;t make it :&apos;(
          </p>
          <div className={`flex gap-4 ${embedded ? "text-xs" : "mt-2"}`}>
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
              className={`text-[#ffbf47] font-bold ${embedded ? "text-xs" : "text-lg"}`}
            >
              New High Score! 🎉
            </motion.p>
          )}
          <button
            className={`${embedded ? "px-3 py-1 text-xs" : "px-6 py-2 mt-2"} rounded-sm border font-semibold text-[var(--bg-color)] bg-[var(--accent-color)] hover:text-[var(--text-color)] hover:bg-[var(--border-color)] transition-all`}
            onClick={restartGame}
          >
            Play Again
          </button>
          <p className={`${embedded ? "text-[10px]" : "text-sm mt-2"} text-[var(--secondary-text)]`}>
            Press R to restart{embedded ? " • C to close" : ""}
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      {!isGameOver && !isPaused && (
        <div className={`${embedded ? "text-[10px] sm:text-xs" : "mt-6 text-sm"} text-center text-[var(--secondary-text)]`}>
          <p>Click or press SPACE to jump • P to pause • R to restart{embedded ? " • C to close" : ""}</p>
        </div>
      )}
    </div>
  );
}
