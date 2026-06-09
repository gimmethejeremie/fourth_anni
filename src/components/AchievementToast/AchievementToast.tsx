import { AnimatePresence, motion } from "motion/react";
import styles from "./AchievementToast.module.css";

type AchievementToastProps = {
  id?: string;
  title?: string;
};

export const AchievementToast = ({ id, title }: AchievementToastProps) => {
  return (
    <AnimatePresence>
      {title ? (
        <motion.div
          key={id ?? title}
          className={styles.toast}
          initial={{ opacity: 0, x: 24, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 18, y: -6, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          role="status"
        >
          <span className={styles.messageStack}>
            <span className={styles.notice}>
              Bạn vừa mở được một thành tựu
            </span>
            <strong className={styles.title}>✦ {title}</strong>
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
