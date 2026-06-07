import { motion } from "motion/react";
import { GuideCharacter } from "../../data/guides";
import { DialogueBox } from "../DialogueBox/DialogueBox";
import styles from "./VisualNovelScene.module.css";

type VisualNovelSceneProps = {
  speaker: GuideCharacter;
  lines: string[];
  align?: "left" | "right" | "center";
  mood?: "neutral" | "soft" | "serious" | "funny" | "mysterious" | "intimate";
  backgroundVariant?: "vhs" | "sky" | "scrapbook" | "tarot" | "finale";
  onComplete?: () => void;
};

const entranceForAlign = (align: "left" | "right" | "center") => {
  if (align === "left") {
    return { opacity: 0, x: -34, y: 12 };
  }

  if (align === "right") {
    return { opacity: 0, x: 34, y: 12 };
  }

  return { opacity: 0, scale: 0.96, y: 14 };
};

export const VisualNovelScene = ({
  speaker,
  lines,
  align,
  mood = "neutral",
  backgroundVariant = "sky",
  onComplete,
}: VisualNovelSceneProps) => {
  const resolvedAlign = align ?? speaker.align;

  return (
    <motion.div
      className={`${styles.scene} ${styles[resolvedAlign]} ${styles[mood]} ${styles[backgroundVariant]}`}
      style={{ "--speaker-color": speaker.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <motion.div
        className={styles.characterLayer}
        initial={entranceForAlign(resolvedAlign)}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.46, ease: "easeOut" }}
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
              <p>ART PLACEHOLDER - {speaker.name}</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className={styles.dialogueLayer}>
        <DialogueBox
          speakerName={speaker.name}
          speakerColor={speaker.color}
          lines={lines}
          align={resolvedAlign}
          onComplete={onComplete}
        />
      </div>
    </motion.div>
  );
};
