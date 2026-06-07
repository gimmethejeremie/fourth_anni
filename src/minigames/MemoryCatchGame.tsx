import { useEffect, useRef, useState } from "react";
import styles from "./minigames.module.css";
import { randomInRange } from "../lib/random";

const GAME_DURATION = 60;
const WIN_SCORE = 300;

type FallingObject = {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: "normal" | "bonus" | "bad";
  icon: string;
};

const NORMAL_ICONS = ["✦", "✉", "🌙", "🎞"];
const BONUS_ICONS = ["🌟", "💎"];
const BAD_ICONS = ["⚠", "⚡"];

export const MemoryCatchGame = ({ onComplete, onBack }: { onComplete: (isWin: boolean) => void; onBack: () => void }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<"playing" | "end">("playing");
  const [objects, setObjects] = useState<FallingObject[]>([]);

  const requestRef = useRef<number>();
  const lastSpawnRef = useRef<number>(Date.now());
  const objectsRef = useRef<FallingObject[]>([]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const tick = () => {
      const now = Date.now();
      
      // Spawn new object
      if (now - lastSpawnRef.current > randomInRange(700, 1200)) {
        lastSpawnRef.current = now;
        const typeRand = Math.random();
        let type: FallingObject["type"] = "normal";
        let icon = NORMAL_ICONS[Math.floor(Math.random() * NORMAL_ICONS.length)];
        
        if (typeRand > 0.85) {
          type = "bonus";
          icon = BONUS_ICONS[Math.floor(Math.random() * BONUS_ICONS.length)];
        } else if (typeRand > 0.65) {
          type = "bad";
          icon = BAD_ICONS[Math.floor(Math.random() * BAD_ICONS.length)];
        }

        const newObj: FallingObject = {
          id: now,
          x: randomInRange(10, 90), // % width
          y: -10, // % height
          speed: randomInRange(1.5, 4.0) / 100, // % per ms, falls in ~2.5 - 6.5s
          type,
          icon,
        };
        objectsRef.current = [...objectsRef.current, newObj];
      }

      // Update positions
      objectsRef.current = objectsRef.current
        .map(obj => ({ ...obj, y: obj.y + obj.speed * 16 })) // approx 16ms per frame
        .filter(obj => obj.y < 110); // remove if out of screen

      setObjects(objectsRef.current);
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("end");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearInterval(timerId);
    };
  }, [gameState]);

  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (gameState === "end" && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete(score >= WIN_SCORE);
    }
  }, [gameState, onComplete, score]);

  const handleCatch = (id: number, type: FallingObject["type"]) => {
    if (gameState !== "playing") return;

    objectsRef.current = objectsRef.current.filter(obj => obj.id !== id);
    setObjects(objectsRef.current);

    if (type === "normal") setScore(s => s + 10);
    else if (type === "bonus") setScore(s => s + 30);
    else if (type === "bad") setScore(s => s - 20);
  };

  const isWin = score >= WIN_SCORE;

  return (
    <div className={styles.minigameOverlay}>
      <div className={styles.minigameHeader}>
        <h3 className={styles.minigameTitle}>Bắt Mảnh Ký Ức</h3>
        <div className={styles.minigameStatus}>
          <div className={styles.minigameScore}>Điểm: {score}/{WIN_SCORE}</div>
          <div className={styles.minigameTime}>T/g: {timeLeft}s</div>
        </div>
      </div>
      <div className={styles.minigameBody}>
        {objects.map((obj) => (
          <div
            key={obj.id}
            onClick={() => handleCatch(obj.id, obj.type)}
            style={{
              position: "absolute",
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              fontSize: "2rem",
              userSelect: "none",
              transform: "translate(-50%, -50%)",
              color: obj.type === "bad" ? "#ef4444" : obj.type === "bonus" ? "#eab308" : "#fff",
              textShadow: obj.type === "bonus" ? "0 0 10px #eab308" : "none",
              pointerEvents: "auto" // Ensure it's clickable
            }}
          >
            {obj.icon}
          </div>
        ))}
        <div className={styles.instructions}>Click vào các mảnh ký ức. Tránh click nhầm mảnh nhiễu (⚠)</div>
      </div>

      {gameState === "end" && (
        <div className={styles.minigameResult}>
          <h2 className={`${styles.resultTitle} ${isWin ? styles.win : styles.lose}`}>
            {isWin ? "THÀNH CÔNG" : "THẤT BẠI"}
          </h2>
          <p className={styles.resultDesc}>Điểm của bạn: {score}</p>
          <div className={styles.resultActions}>
            <button className={`${styles.actionButton} ${styles.primary}`} onClick={onBack}>
              Quay lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
