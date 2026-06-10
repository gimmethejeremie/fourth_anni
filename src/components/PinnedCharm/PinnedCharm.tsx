import React, { useState } from "react";
import { AppState } from "../../lib/storage";
import styles from "./PinnedCharm.module.css";

export const PinnedCharm = ({ state }: { state: AppState }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!state.pinnedCharm) return null;

  return (
    <div className={styles.container}>
      <div className={styles.charm} onClick={() => setShowTooltip(!showTooltip)} title="Lá hộ mệnh">
        <span className={styles.charmIcon}>✦</span>
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <button className={styles.closeTooltip} onClick={() => setShowTooltip(false)}>&times;</button>
          <h4>{state.pinnedCharm.viName}</h4>
          <p>"{state.pinnedCharm.meaning}"</p>
        </div>
      )}
    </div>
  );
};
