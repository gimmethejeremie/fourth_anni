import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { GuideCharacter } from "../../data/guides";
import { DialogueBox } from "../DialogueBox/DialogueBox";
import styles from "./VisualNovelOverlay.module.css";

export type VisualNovelOverlayProps = {
  open: boolean;
  speaker: GuideCharacter;
  lines: string[];
  align?: "left" | "right" | "center";
  mood?: "neutral" | "soft" | "serious" | "funny" | "mysterious" | "intimate";
  dimBackground?: boolean;
  skipLabel?: string;
  onClose: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
};

const enterFrom = (align: "left" | "right" | "center") => {
  if (align === "left") {
    return { opacity: 0, x: -58, y: 18 };
  }

  if (align === "right") {
    return { opacity: 0, x: 58, y: 18 };
  }

  return { opacity: 0, scale: 0.96, y: 18 };
};

export const VisualNovelOverlay = ({
  open,
  speaker,
  lines,
  align,
  mood = "neutral",
  dimBackground = true,
  skipLabel,
  onClose,
  onComplete,
  onSkip,
}: VisualNovelOverlayProps) => {
  const resolvedAlign = align ?? speaker.align;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onComplete?.();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onComplete, open]);

  const finish = () => {
    onComplete?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={`${styles.overlay} ${dimBackground ? styles.dimmed : ""} ${styles[resolvedAlign]} ${styles[mood]}`}
          style={{ "--speaker-color": speaker.color } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="dialog"
          aria-label={`${speaker.name} dialogue`}
          aria-modal={dimBackground}
        >
          <motion.div
            className={styles.characterLayer}
            initial={enterFrom(resolvedAlign)}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={enterFrom(resolvedAlign)}
            transition={{ duration: 0.42, ease: "easeOut" }}
          >
            <div className={styles.characterGlow} />
            <div className={styles.characterFrame}>
              {speaker.artSrc ? (
                <img className={styles.characterImage} src={speaker.artSrc} alt={speaker.name} />
              ) : (
                <div className={styles.characterPlaceholder}>
                  <div className={styles.characterSilhouette}>
                    <span />
                  </div>
                  <div className={styles.characterNameTag}>{speaker.placeholderLabel}</div>
                  <p>ART PLACEHOLDER - {speaker.placeholderLabel}</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className={styles.dialogueLayer}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.32, ease: "easeOut", delay: 0.08 }}
          >
            <DialogueBox
              speakerName={speaker.name}
              speakerColor={speaker.color}
              lines={lines}
              align={resolvedAlign}
              onComplete={finish}
            />
            {skipLabel && (
              <button 
                type="button" 
                className={styles.skipButton} 
                onClick={() => {
                  if (onSkip) onSkip();
                  finish();
                }}
              >
                {skipLabel}
              </button>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
