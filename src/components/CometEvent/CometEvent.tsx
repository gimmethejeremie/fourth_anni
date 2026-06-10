import { useState, useEffect, useCallback, CSSProperties } from "react";
import styles from "./CometEvent.module.css";

interface CometEventProps {
  onCatch: () => void;
}

export const CometEvent = ({ onCatch }: CometEventProps) => {
  const [isActive, setIsActive] = useState(false);
  const [cometStyle, setCometStyle] = useState<CSSProperties>({});

  const spawnComet = useCallback(() => {
    const isLeftToRight = Math.random() > 0.5;

    const startY = Math.random() * 40; 
    const endY = 50 + Math.random() * 50; 

    let startX, endX, angle;
    if (isLeftToRight) {
      startX = -30;
      endX = 130;
    } else {
      startX = 130;
      endX = -30;
    }

    const deltaY = (endY - startY) * window.innerHeight / 100;
    const deltaX = (endX - startX) * window.innerWidth / 100;
    angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const duration = 15 + Math.random() * 10;

    setCometStyle({
      "--startX": `${startX}vw`,
      "--startY": `${startY}vh`,
      "--endX": `${endX}vw`,
      "--endY": `${endY}vh`,
      "--angle": `${angle}deg`,
      "--duration": `${duration}s`,
    } as CSSProperties);

    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, duration * 1000 + 500);
  }, []);

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextSpawn = () => {
      // Spawn between 1.5 and 3 minutes
      const nextSpawnIn = (90 + Math.random() * 90) * 1000;
      timeoutId = window.setTimeout(() => {
        setIsActive((currentActive) => {
          if (!currentActive) {
            spawnComet();
          }
          return currentActive;
        });
        scheduleNextSpawn();
      }, nextSpawnIn);
    };

    // First spawn might be a bit earlier so the player can see it during a 5 minute visit.
    const initialDelay = (30 + Math.random() * 60) * 1000;
    timeoutId = window.setTimeout(() => {
      spawnComet();
      scheduleNextSpawn();
    }, initialDelay);

    return () => window.clearTimeout(timeoutId);
  }, [spawnComet]);

  if (!isActive) return null;

  return (
    <div className={styles.cometContainer}>
      <div
        className={styles.comet}
        style={cometStyle}
        onClick={() => {
          setIsActive(false);
          onCatch();
        }}
        title="Bắt lấy sao chổi!"
      >
        <div className={styles.cometVisual} />
        <div className={styles.cometHead} />
      </div>
    </div>
  );
};
