import { ReactNode, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { JourneyPartStatus } from "../../lib/storage";
import styles from "./JourneyPart.module.css";

type JourneyPartProps = {
  id: string;
  title: string;
  status: JourneyPartStatus;
  children: ReactNode;
  lockedHint?: string;
  onEnter?: () => void;
  noFrame?: boolean;
};

export const JourneyPart = ({
  id,
  title,
  status,
  children,
  lockedHint = "Complete the previous memory to stabilize this signal.",
  onEnter,
  noFrame = false,
}: JourneyPartProps) => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !onEnter) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter();
        }
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onEnter]);

  return (
    <motion.section
      ref={rootRef}
      id={id}
      className={`${styles.part} ${styles[status]} ${noFrame ? styles.noFrame : ""}`}
      aria-label={title}
      data-part-status={status}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {title ? (
        <motion.div
          className={styles.titleCue}
          aria-hidden="true"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{
            opacity: [0, 0.9, 0.9, 0],
            y: [14, 0, 0, -10],
          }}
          viewport={{ once: false, amount: 0.62 }}
          transition={{
            duration: 2.8,
            ease: "easeOut",
            times: [0, 0.18, 0.72, 1],
          }}
        >
          <span>{title}</span>
        </motion.div>
      ) : null}

      <div className={styles.content}>{children}</div>

      {status === "locked" ? (
        <div className={styles.lockOverlay} aria-hidden="true">
          <span>SIGNAL LOCKED</span>
          <p>{lockedHint}</p>
        </div>
      ) : null}
    </motion.section>
  );
};
