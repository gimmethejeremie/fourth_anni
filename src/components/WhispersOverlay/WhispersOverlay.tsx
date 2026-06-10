import React from "react";
import styles from "./WhispersOverlay.module.css";

interface WhispersOverlayProps {
  onComplete?: () => void;
}

export const WhispersOverlay: React.FC<WhispersOverlayProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6500); // Wait for all whispers to finish animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.whisperContainer}>
      <div className={`${styles.whisperText} ${styles.whisper1}`}>
        "Ai đây vậy?"
      </div>
      <div className={`${styles.whisperText} ${styles.whisper2}`}>
        "Nhân vật chính tới rồi kìa..."
      </div>
      <div className={`${styles.whisperText} ${styles.whisper3}`}>
        "Mau chuẩn bị đi!"
      </div>
    </div>
  );
};
