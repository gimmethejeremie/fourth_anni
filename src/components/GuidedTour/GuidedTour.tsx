import React from "react";
import styles from "./GuidedTour.module.css";

interface GuidedTourProps {
  step: "starlog" | "minigame" | "scroll" | null;
  onSkip: () => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ step, onSkip }) => {
  if (!step) return null;

  return (
    <div className={styles.guidedTourOverlay}>
      <button className={styles.skipBtn} onClick={onSkip}>
        Mình biết rồi, bỏ qua
      </button>

      {step === "starlog" && (
        <div className={styles.highlightSpot} style={{ bottom: "2rem", left: "2rem", width: "48px", height: "48px" }}>
          <div className={`${styles.tooltip} ${styles.starlog}`}>
            Nhật ký sao lưu kỷ niệm
          </div>
        </div>
      )}

      {step === "minigame" && (
        <div className={styles.highlightSpot} style={{ bottom: "2rem", right: "2rem", width: "48px", height: "48px" }}>
          <div className={`${styles.tooltip} ${styles.minigame}`}>
            Trạm giải trí (Minigames)
          </div>
        </div>
      )}

      {step === "scroll" && (
        <div className={styles.highlightSpot} style={{ bottom: "2rem", left: "50%", transform: "translateX(-50%)", width: "48px", height: "48px" }}>
          <div className={`${styles.tooltip} ${styles.scroll}`}>
            Cuộn xuống để khám phá
          </div>
        </div>
      )}
    </div>
  );
};
