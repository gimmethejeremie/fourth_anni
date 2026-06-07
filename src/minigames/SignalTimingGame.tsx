import { useEffect, useRef, useState } from "react";
import styles from "./minigames.module.css";
import { randomInRange } from "../lib/random";

const GAME_DURATION = 60;
const WIN_SCORE = 5000;

type Zones = {
  okayLeft: number;
  okayWidth: number;
  goodLeft: number;
  goodWidth: number;
  perfectLeft: number;
  perfectWidth: number;
};

const generateZones = (): Zones => {
  // Okay zone width 40-70%
  const okayWidth = randomInRange(40, 70);
  const okayLeft = randomInRange(10, 90 - okayWidth);

  // Good zone inside Okay (width 20-40%)
  const goodWidth = Math.min(randomInRange(20, 40), okayWidth - 10);
  const goodLeft = okayLeft + randomInRange(5, okayWidth - goodWidth - 5);

  // Perfect zone inside Good (width 5-10%)
  const perfectWidth = Math.min(randomInRange(5, 10), goodWidth - 4);
  const perfectLeft = goodLeft + randomInRange(2, goodWidth - perfectWidth - 2);

  return { okayLeft, okayWidth, goodLeft, goodWidth, perfectLeft, perfectWidth };
};

export const SignalTimingGame = ({ onComplete, onBack }: { onComplete: (isWin: boolean) => void; onBack: () => void }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<"playing" | "end">("playing");
  const [lastHit, setLastHit] = useState<"Perfect" | "Good" | "Okay" | "Miss" | null>(null);
  const [zones, setZones] = useState<Zones>(() => generateZones());

  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(Date.now());
  
  const positionRef = useRef(0);
  const speedRef = useRef(0.035); // percent per ms
  const lastKeyTimeRef = useRef(0);
  const zonesRef = useRef<Zones>(zones);

  useEffect(() => {
    zonesRef.current = zones;
  }, [zones]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const tick = () => {
      const now = Date.now();
      const dt = now - timeRef.current;
      timeRef.current = now;

      positionRef.current += speedRef.current * dt;

      if (positionRef.current > 100) {
        positionRef.current = 0; // Wrap around to left
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${positionRef.current}%`;
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    timeRef.current = Date.now();
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      if (e.key !== " " && e.key !== "Enter") return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastKeyTimeRef.current < 200) return; // debounce
      lastKeyTimeRef.current = now;

      const p = positionRef.current;
      const z = zonesRef.current;
      let points = 0;
      let hitType: "Perfect" | "Good" | "Okay" | "Miss" = "Miss";

      if (p >= z.perfectLeft && p <= z.perfectLeft + z.perfectWidth) {
        points = 100;
        hitType = "Perfect";
      } else if (p >= z.goodLeft && p <= z.goodLeft + z.goodWidth) {
        points = 60;
        hitType = "Good";
      } else if (p >= z.okayLeft && p <= z.okayLeft + z.okayWidth) {
        points = 30;
        hitType = "Okay";
      }

      setScore((s) => {
        const newScore = s + points;
        // Update mechanics after hit based on latest score
        if (newScore < 2000) {
          speedRef.current += 0.003; // Tăng tốc độ nhẹ nhàng hơn
        }
        return newScore;
      });
      
      setLastHit(hitType);
      setZones(generateZones()); // Đổi vị trí zones
      // positionRef.current = 0; // ĐÃ XÓA: Không reset trỏ về đầu nữa để trỏ vẫn chạy tiếp
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  const isWin = score >= WIN_SCORE;

  return (
    <div className={styles.minigameOverlay}>
      <div className={styles.minigameHeader}>
        <h3 className={styles.minigameTitle}>Căn Chỉnh Tín Hiệu</h3>
        <div className={styles.minigameStatus}>
          <div className={styles.minigameScore}>Điểm: {score}/{WIN_SCORE}</div>
          <div className={styles.minigameTime}>T/g: {timeLeft}s</div>
        </div>
      </div>
      <div className={styles.minigameBody}>
        <div style={{ width: "80%", maxWidth: "600px", position: "relative" }}>
          {/* Track background */}
          <div style={{ height: "40px", background: "rgba(255,255,255,0.1)", borderRadius: "20px", position: "relative", overflow: "hidden" }}>
            {/* Okay Zone */}
            <div style={{ position: "absolute", left: `${zones.okayLeft}%`, width: `${zones.okayWidth}%`, height: "100%", background: "rgba(34, 197, 94, 0.3)" }}></div>
            {/* Good Zone */}
            <div style={{ position: "absolute", left: `${zones.goodLeft}%`, width: `${zones.goodWidth}%`, height: "100%", background: "rgba(234, 179, 8, 0.5)" }}></div>
            {/* Perfect Zone */}
            <div style={{ position: "absolute", left: `${zones.perfectLeft}%`, width: `${zones.perfectWidth}%`, height: "100%", background: "rgba(239, 68, 68, 0.8)" }}></div>
            
            {/* Cursor */}
            <div
              ref={cursorRef}
              style={{
                position: "absolute",
                top: "-10px",
                bottom: "-10px",
                width: "4px",
                background: "#fff",
                boxShadow: "0 0 10px #fff",
                transform: "translateX(-50%)"
              }}
            ></div>
          </div>
          
          <div style={{ marginTop: "2rem", textAlign: "center", height: "40px", fontSize: "1.5rem", fontWeight: "bold" }}>
            {lastHit && (
              <span style={{
                color: lastHit === "Perfect" ? "#ef4444" : lastHit === "Good" ? "#eab308" : lastHit === "Okay" ? "#22c55e" : "#aaa",
                animation: "fadeIn 0.2s"
              }}>
                {lastHit}!
              </span>
            )}
          </div>
        </div>
        <div className={styles.instructions}>Bấm SPACE hoặc ENTER khi vạch trắng tới vùng màu đỏ</div>
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
