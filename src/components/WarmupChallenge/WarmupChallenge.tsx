import React, { useState, useEffect, useCallback } from "react";
import styles from "./WarmupChallenge.module.css";
import { guides } from "../../data/guides";
import { DialogueOverlayRequest } from "../../sections/sectionTypes";

interface WarmupChallengeProps {
  onComplete: () => void;
  requestDialogue: (req: DialogueOverlayRequest) => void;
}

const TOTAL_SPOTS = 3;
const TIME_LIMIT = 8;

export const WarmupChallenge: React.FC<WarmupChallengeProps> = ({ onComplete, requestDialogue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [spots, setSpots] = useState<{ id: number; x: number; y: number }[]>([]);
  const [clicked, setClicked] = useState<number[]>([]);

  useEffect(() => {
    let timer: number;
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleTimeUp = useCallback(() => {
    setIsPlaying(false);
    requestDialogue({
      speaker: guides.kuro,
      lines: ["Hết giờ rồi, cố gắng tinh mắt ở những thử thách sau nhé!"],
      mood: "soft",
      onComplete: onComplete,
    });
  }, [onComplete, requestDialogue]);

  const startGame = () => {
    setIsPlaying(true);
    setClicked([]);
    setTimeLeft(TIME_LIMIT);
    
    // Generate random positions
    const newSpots = [];
    for (let i = 0; i < TOTAL_SPOTS; i++) {
      newSpots.push({
        id: i,
        x: 10 + Math.random() * 80, // 10% to 90%
        y: 10 + Math.random() * 80,
      });
    }
    setSpots(newSpots);
  };

  const handleSpotClick = (id: number) => {
    if (!isPlaying) return;
    
    const newClicked = [...clicked, id];
    setClicked(newClicked);
    
    if (newClicked.length === TOTAL_SPOTS) {
      setIsPlaying(false);
      requestDialogue({
        speaker: guides.stone,
        lines: ["Thị lực tốt đấy, giờ thì bắt đầu thôi."],
        mood: "funny",
        onComplete: onComplete,
      });
    }
  };

  return (
    <div className={styles.overlay}>
      {!isPlaying && timeLeft === TIME_LIMIT ? (
        <>
          <h2 className={styles.title}>Mắt tinh chưa?</h2>
          <p style={{ color: "var(--cream-dim)", marginBottom: "2rem" }}>Hãy click đủ {TOTAL_SPOTS} chấm sáng trong {TIME_LIMIT} giây nhé!</p>
          <button className={styles.startBtn} onClick={startGame}>Sẵn sàng</button>
        </>
      ) : (
        <>
          <div className={styles.timer}>00:0{timeLeft}</div>
          <div className={styles.gameArea}>
            {spots.map((spot) => (
              !clicked.includes(spot.id) && (
                <div
                  key={spot.id}
                  className={styles.spot}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => handleSpotClick(spot.id)}
                />
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
};
