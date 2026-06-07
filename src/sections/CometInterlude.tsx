import { useCallback, useEffect, useRef, useState } from "react";
import { audioManager } from "../lib/audioManager";
import styles from "./CometInterlude.module.css";

type CometInterludeProps = {
  onComplete: () => void;
};

const CONTINUE_REVEAL_MS = 11800;
const REDUCED_MOTION_CONTINUE_REVEAL_MS = 900;

export const CometInterlude = ({ onComplete }: CometInterludeProps) => {
  const completedRef = useRef(false);
  const [canContinue, setCanContinue] = useState(false);

  const finish = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? REDUCED_MOTION_CONTINUE_REVEAL_MS : CONTINUE_REVEAL_MS;

    void audioManager.start().then(() => {
      audioManager.setMood("interlude");
      audioManager.playInterludePianoSequence();
    });

    const timerId = window.setTimeout(() => setCanContinue(true), duration);
    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section className={styles.interlude} aria-label="Comet interlude">
      <div className={styles.skyVeil} aria-hidden="true" />
      <div className={styles.water} aria-hidden="true" />
      <span className={`${styles.ripple} ${styles.rippleOne}`} aria-hidden="true" />
      <span className={`${styles.ripple} ${styles.rippleTwo}`} aria-hidden="true" />
      <span className={`${styles.ripple} ${styles.rippleThree}`} aria-hidden="true" />
      <span className={styles.orb} aria-hidden="true" />
      <span className={`${styles.skyStar} ${styles.starOne}`} aria-hidden="true" />
      <span className={`${styles.skyStar} ${styles.starTwo}`} aria-hidden="true" />

      <div className={styles.storyText}>
        <p>
          Ngày này 4 năm về trước, sao chổi PANSTARS bay qua bầu trời.
        </p>
        <p>
          Người ta đồn rằng, chính hiện tượng này đã làm cho cặp sinh đôi tinh linh bánh ngọt đến với Trái đất.
        </p>
        {canContinue ? (
          <button className={styles.continueButton} type="button" onClick={finish}>
            [ NHẤN ĐỂ TIẾP TỤC ]
          </button>
        ) : null}
      </div>
    </section>
  );
};
