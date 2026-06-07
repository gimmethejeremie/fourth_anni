import { useEffect, useRef, useState } from "react";
import { audioManager } from "../lib/audioManager";
import styles from "./TapeIntro.module.css";

type TapeIntroProps = {
  onPlay: () => void;
};

const TRACKING_REVEAL_DELAY_MS = 3400;
const TRACKING_DURATION_MS = 5000;

const formatTapeTime = (elapsedSeconds: number) => {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
};

export const TapeIntro = ({ onPlay }: TapeIntroProps) => {
  const [tapeSeconds, setTapeSeconds] = useState(0);
  const [trackingComplete, setTrackingComplete] = useState(false);
  const [trackingPercent, setTrackingPercent] = useState(0);
  const hasPlayedTitleCueRef = useRef(false);

  useEffect(() => {
    const startedAt = Date.now();
    const updateTapeTime = () => {
      setTapeSeconds(Math.floor((Date.now() - startedAt) / 1000));
    };

    updateTapeTime();
    const timerId = window.setInterval(updateTapeTime, 250);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    void audioManager.start().then(() => {
      audioManager.setMood("vhs");
      audioManager.playTapeBootSequence();
      audioManager.playCassetteInsertCue();
    });
  }, []);

  useEffect(() => {
    const startedAt = performance.now() + TRACKING_REVEAL_DELAY_MS;
    let animationFrameId = 0;
    let lastPercent = -1;

    const updateProgress = (now: number) => {
      if (now < startedAt) {
        animationFrameId = window.requestAnimationFrame(updateProgress);
        return;
      }

      const progress = Math.min((now - startedAt) / TRACKING_DURATION_MS, 1);
      const nextPercent = Math.floor(progress * 100);

      if (nextPercent !== lastPercent) {
        lastPercent = nextPercent;
        setTrackingPercent(nextPercent);
      }

      if (progress >= 1) {
        setTrackingComplete(true);
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateProgress);
    };

    animationFrameId = window.requestAnimationFrame(updateProgress);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (!trackingComplete || hasPlayedTitleCueRef.current) {
      return;
    }

    hasPlayedTitleCueRef.current = true;
    void audioManager.start().then(() => {
      audioManager.setMood("vhs");
      audioManager.playTitleRevealCue();
    });
  }, [trackingComplete]);

  const handlePlay = () => {
    void audioManager.start().then(() => {
      audioManager.setMood("vhs");
      audioManager.playTapePlayCue();
    });
    onPlay();
  };

  return (
    <section className={styles.tapeIntro} aria-label="Anniversary tape intro">
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.bootScene} aria-hidden="true">
        <div className={styles.tvSet}>
          <div className={styles.tvScreen}>
            <span>AV 02</span>
          </div>
          <div className={styles.tvBase} />
        </div>
        <div className={styles.playerDeck}>
          <div className={styles.playerSlot}>
            <span>TRACKING</span>
          </div>
          <div className={styles.cassette}>
            <span>MEMORY TAPE</span>
            <i />
            <i />
          </div>
          <div className={styles.deckLights}>
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className={styles.frame}>
        <div className={styles.recLine}>
          <span>▼ REC</span>
          <strong>●</strong>
          <span>20.08.2026</span>
        </div>

        <div className={styles.centerText}>
          {!trackingComplete ? (
            <div className={styles.signalGate}>
              <p className={styles.signalLine}>đang dò tìm tín hiệu ký ức...</p>
              <div
                className={styles.memoryProgress}
                role="progressbar"
                aria-label="Tracking memory signal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={trackingPercent}
                aria-valuetext={`${trackingPercent}% tracked`}
              >
                <span style={{ transform: `scaleX(${trackingPercent / 100})` }} />
              </div>
              <div className={styles.progressMeta} aria-hidden="true">
                <span>{String(trackingPercent).padStart(2, "0")}%</span>
              </div>
            </div>
          ) : (
            <div className={styles.titleSequence}>
              <h1 className={styles.nameLockup} aria-label="LINH LAN x LAN LINH">
                <span>LINH LAN</span>
                <em>{"\u00d7"}</em>
                <span>LAN LINH</span>
              </h1>
              <h2>CUỘN BĂNG KỶ NIỆM 4 NĂM</h2>
              <p>20.08.2022 - 20.08.2026</p>
              <button type="button" onClick={handlePlay}>
                [ NHẤN PLAY ĐỂ BẮT ĐẦU ]
              </button>
              <small>Ghi hình bởi: LL Team</small>
            </div>
          )}
        </div>

        <div className={styles.timestamp}>SP {formatTapeTime(tapeSeconds)}</div>
      </div>
    </section>
  );
};
