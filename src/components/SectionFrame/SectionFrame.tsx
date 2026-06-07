import { ReactNode } from "react";
import { motion } from "motion/react";
import styles from "./SectionFrame.module.css";

type SectionFrameProps = {
  id: string;
  kicker?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export const SectionFrame = ({ id, kicker, title, children, className = "" }: SectionFrameProps) => (
  <motion.section
    id={id}
    className={`${styles.section} ${className}`}
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <div className={styles.header}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      <h1>{title}</h1>
    </div>
    <div className={styles.content}>{children}</div>
  </motion.section>
);
