import { useCallback, useEffect, useMemo, useState } from "react";
import { audioManager } from "../../lib/audioManager";
import { useTypewriter } from "../../hooks/useTypewriter";
import styles from "./DialogueBox.module.css";

type DialogueBoxProps = {
  speakerName: string;
  speakerColor: string;
  lines: string[];
  onComplete?: () => void;
  align: "left" | "right" | "center";
};

export const DialogueBox = ({
  speakerName,
  speakerColor,
  lines,
  onComplete,
  align,
}: DialogueBoxProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const resetKey = useMemo(() => `${speakerName}:${lines.join("|")}`, [lines, speakerName]);
  const currentLine = lines[lineIndex] ?? "";
  const typewriter = useTypewriter(currentLine, 20);

  useEffect(() => {
    setLineIndex(0);
  }, [resetKey]);

  const handleNext = useCallback(() => {
    if (!typewriter.isComplete) {
      typewriter.skip();
      return;
    }

    audioManager.playUiSound("next");

    if (lineIndex < lines.length - 1) {
      setLineIndex((index) => index + 1);
      return;
    }

    onComplete?.();
  }, [lineIndex, lines.length, onComplete, typewriter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar")) {
        return;
      }

      event.preventDefault();
      handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  return (
    <div
      className={`${styles.dialoguePanel} ${styles[align]}`}
      onClick={handleNext}
      data-clickable="true"
      style={{ "--speaker-color": speakerColor } as React.CSSProperties}
    >
      <div className={styles.nameplate}>
        <span>{speakerName}</span>
        <small>
          {lineIndex + 1}/{lines.length}
        </small>
      </div>
      <p className={styles.line}>
        {typewriter.text}
        {typewriter.isComplete ? <span className={styles.cursor}>▌</span> : null}
      </p>
      <button
        className={styles.nextButton}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          handleNext();
        }}
      >
        {typewriter.isComplete ? "Tiếp →" : "Skip"}
      </button>
    </div>
  );
};
