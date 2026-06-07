import { useEffect, useRef, useState } from "react";
import styles from "./minigames.module.css";
import { randomInRange } from "../lib/random";

const GAME_DURATION = 45;

export const BalanceCoopGame = ({ onComplete, onBack }: { onComplete: (isWin: boolean) => void; onBack: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<"playing" | "end">("playing");
  
  const [position, setPosition] = useState(0); // -100 to 100
  const [dangerTime, setDangerTime] = useState(0); // in seconds, max 3s
  const [isDanger, setIsDanger] = useState(false);

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(Date.now());
  
  const stateRef = useRef({
    position: 0,
    velocity: 0,
    randomDrift: 0,
    dangerTimeMs: 0,
    lastDriftChange: 0,
  });

  useEffect(() => {
    if (gameState !== "playing") return;

    const tick = () => {
      const now = Date.now();
      const dt = now - timeRef.current;
      timeRef.current = now;

      const state = stateRef.current;

      // Change drift randomly (thay đổi nhanh hơn, lực mạnh hơn)
      if (now - state.lastDriftChange > randomInRange(400, 1000)) {
        state.randomDrift = (Math.random() - 0.5) * 0.18;
        state.lastDriftChange = now;
      }

      // Input force
      let force = 0;
      if (keysRef.current["a"] || keysRef.current["A"]) force -= 0.045;
      if (keysRef.current["d"] || keysRef.current["D"]) force += 0.045;
      if (keysRef.current["j"] || keysRef.current["J"]) force -= 0.045;
      if (keysRef.current["l"] || keysRef.current["L"]) force += 0.045;

      // Physics
      state.velocity += (state.randomDrift + force) * (dt / 16);
      state.velocity *= 0.97; // Ít ma sát hơn -> trượt nhiều hơn
      state.position += state.velocity * (dt / 16);

      // Check bounds
      if (state.position < -100 || state.position > 100) {
        setGameState("end");
        return; // lose immediately
      }

      // Check Danger zone (-25 to 25 is safe)
      let currentDanger = false;
      if (state.position < -25 || state.position > 25) {
        currentDanger = true;
        state.dangerTimeMs += dt;
        if (state.dangerTimeMs > 3000) {
          setGameState("end");
          return;
        }
      } else {
        currentDanger = false;
        state.dangerTimeMs = Math.max(0, state.dangerTimeMs - dt * 0.5); // recover slowly
      }

      setPosition(state.position);
      setDangerTime(Math.floor(state.dangerTimeMs / 1000));
      setIsDanger(currentDanger);
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
      onComplete(timeLeft <= 0 && stateRef.current.dangerTimeMs <= 3000 && stateRef.current.position >= -100 && stateRef.current.position <= 100);
    }
  }, [gameState, onComplete, timeLeft]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
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
  }, []);

  // isWin = survived the time
  const isWin = timeLeft <= 0;

  return (
    <div className={styles.minigameOverlay} style={{ 
      boxShadow: isDanger ? "inset 0 0 50px rgba(239, 68, 68, 0.5)" : "none",
      transition: "box-shadow 0.2s"
    }}>
      <div className={styles.minigameHeader}>
        <h3 className={styles.minigameTitle}>Giữ Thăng Bằng (Co-op)</h3>
        <div className={styles.minigameStatus}>
          <div style={{ color: dangerTime > 1 ? "#ef4444" : "#eab308" }}>Nguy hiểm: {dangerTime}/3s</div>
          <div className={styles.minigameTime}>T/g: {timeLeft}s</div>
        </div>
      </div>
      <div className={styles.minigameBody}>
        <div style={{ width: "80%", maxWidth: "600px", position: "relative", height: "100px", display: "flex", alignItems: "center" }}>
          {/* Bar */}
          <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.2)", position: "relative", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px", overflow: "hidden" }}>
            {/* Safe zone (-25 to 25, visual is 37.5% to 62.5%, width 25%) */}
            <div style={{
              position: "absolute",
              left: "37.5%",
              width: "25%",
              height: "100%",
              background: isDanger ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 197, 94, 0.4)",
              transition: "background 0.2s",
              borderLeft: "2px solid rgba(255,255,255,0.5)",
              borderRight: "2px solid rgba(255,255,255,0.5)",
            }}></div>
          </div>
          
          {/* Core/Star */}
          <div
            style={{
              position: "absolute",
              left: `${50 + position / 2}%`,
              top: "50%",
              width: "40px",
              height: "40px",
              background: isDanger ? "radial-gradient(circle, #ef4444 0%, rgba(239, 68, 68, 0) 70%)" : "radial-gradient(circle, var(--gold) 0%, rgba(0,0,0,0) 70%)",
              transform: isDanger ? "translate(-50%, -50%) scale(1.2)" : "translate(-50%, -50%) scale(1)",
              fontSize: "2rem",
              lineHeight: 1,
              textAlign: "center",
              transition: "transform 0.1s, background 0.2s",
              color: isDanger ? "#fca5a5" : "#fff",
              textShadow: isDanger ? "0 0 10px #ef4444" : "0 0 10px var(--gold)"
            }}
          >
            ✦
          </div>
        </div>
        
        <div className={styles.instructions}>
          <p><strong>Player 1:</strong> A/D - <strong>Player 2:</strong> J/L</p>
          <p>Cùng kéo đẩy để giữ lõi sáng nằm trong vùng an toàn!</p>
        </div>
      </div>

      {gameState === "end" && (
        <div className={styles.minigameResult}>
          <h2 className={`${styles.resultTitle} ${isWin ? styles.win : styles.lose}`}>
            {isWin ? "THÀNH CÔNG" : "THẤT BẠI"}
          </h2>
          <p className={styles.resultDesc}>
            {isWin ? "Các bạn phối hợp rất tuyệt!" : "Lõi đã vượt quá giới hạn an toàn."}
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
