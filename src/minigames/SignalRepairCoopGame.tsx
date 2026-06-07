import { useEffect, useRef, useState } from "react";
import styles from "./minigames.module.css";
import { randomInRange } from "../lib/random";

const GAME_DURATION = 60;
const WIN_SCORE = 30;

type Fault = {
  id: number;
  xPercent: number;
  widthPercent: number;
};

export const SignalRepairCoopGame = ({ onComplete, onBack }: { onComplete: (isWin: boolean) => void; onBack: () => void }) => {
  const [repairs, setRepairs] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<"playing" | "end">("playing");
  
  const [cursorX, setCursorX] = useState(50);
  const [fault, setFault] = useState<Fault | null>(null);

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const cursorXRef = useRef(50);
  const requestRef = useRef<number>();

  // Spawn new fault
  useEffect(() => {
    if (gameState !== "playing") return;
    if (!fault) {
      const width = randomInRange(10, 20);
      setFault({
        id: Date.now(),
        xPercent: randomInRange(width, 100 - width),
        widthPercent: width,
      });
    }
  }, [fault, gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const tick = () => {
      let dx = 0;
      if (keysRef.current["a"] || keysRef.current["A"]) dx -= 0.8;
      if (keysRef.current["d"] || keysRef.current["D"]) dx += 0.8;

      if (dx !== 0) {
        cursorXRef.current += dx;
        if (cursorXRef.current < 0) cursorXRef.current = 0;
        if (cursorXRef.current > 100) cursorXRef.current = 100;
        setCursorX(cursorXRef.current);
      }

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
      onComplete(repairs >= WIN_SCORE && lives > 0);
    }
  }, [gameState, onComplete, repairs, lives]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      keysRef.current[e.key] = true;

      // P2 action
      if (e.key === "l" || e.key === "L" || e.key === "Enter") {
        if (fault) {
          const minX = fault.xPercent - fault.widthPercent / 2;
          const maxX = fault.xPercent + fault.widthPercent / 2;
          const inZone = cursorXRef.current >= minX && cursorXRef.current <= maxX;

          if (inZone) {
            setRepairs(r => r + 1);
            setFault(null);
          } else {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameState("end");
              }
              return newLives;
            });
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState, fault]);

  const isWin = repairs >= WIN_SCORE && lives > 0;

  return (
    <div className={styles.minigameOverlay}>
      <div className={styles.minigameHeader}>
        <h3 className={styles.minigameTitle}>Sửa Tín Hiệu (Co-op)</h3>
        <div className={styles.minigameStatus}>
          <div className={styles.minigameScore}>Đã sửa: {repairs}/{WIN_SCORE}</div>
          <div style={{ color: "#ef4444" }}>HP: {"♥".repeat(lives)}</div>
          <div className={styles.minigameTime}>T/g: {timeLeft}s</div>
        </div>
      </div>
      <div className={styles.minigameBody}>
        <div style={{ width: "80%", maxWidth: "600px", position: "relative" }}>
          {/* Signal Track */}
          <div style={{ height: "40px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", position: "relative" }}>
            {/* Fault Zone */}
            {fault && (
              <div style={{
                position: "absolute",
                left: `${fault.xPercent}%`,
                width: `${fault.widthPercent}%`,
                height: "100%",
                background: "rgba(239, 68, 68, 0.4)",
                transform: "translateX(-50%)",
                animation: "pulse 1s infinite alternate"
              }}></div>
            )}
            
            {/* P1 Cursor */}
            <div
              style={{
                position: "absolute",
                left: `${cursorX}%`,
                top: "-10px",
                bottom: "-10px",
                width: "6px",
                background: "#a855f7",
                boxShadow: "0 0 10px #a855f7",
                transform: "translateX(-50%)"
              }}
            ></div>
          </div>
        </div>
        <div className={styles.instructions}>
          <p><strong>Player 1:</strong> Dùng A / D để di chuyển con trỏ.</p>
          <p><strong>Player 2:</strong> Bấm L khi con trỏ P1 đang ở trong vùng lỗi (đỏ).</p>
        </div>
      </div>

      {gameState === "end" && (
        <div className={styles.minigameResult}>
          <h2 className={`${styles.resultTitle} ${isWin ? styles.win : styles.lose}`}>
            {isWin ? "THÀNH CÔNG" : "THẤT BẠI"}
          </h2>
          <p className={styles.resultDesc}>
            {isWin ? "Hai bạn đã sửa thành công tín hiệu!" : "Tín hiệu đã bị đứt gãy hoàn toàn."}
          </p>
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
