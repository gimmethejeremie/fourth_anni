import { AnimatePresence, motion } from "motion/react";
import styles from "./AchievementToast.module.css";

type AchievementToastProps = {
  title?: string;
};

export const AchievementToast = ({ title }: AchievementToastProps) => (
  <AnimatePresence>
    {title ? (
      <motion.div
        className={styles.toast}
        initial={{ opacity: 0, x: 24, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 18, y: -6 }}
        transition={{ duration: 0.25 }}
        role="status"
      >
        <strong>✦ {title}</strong>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
