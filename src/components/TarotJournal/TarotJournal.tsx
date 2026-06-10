import React from "react";
import { AppState, SavedTarotCard } from "../../lib/storage";
import styles from "./TarotJournal.module.css";

interface TarotJournalProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onClose: () => void;
}

export const TarotJournal = ({ state, setState, onClose }: TarotJournalProps) => {
  const pinCard = (card: SavedTarotCard, readingCreatedAt: string) => {
    setState((prev) => ({
      ...prev,
      pinnedCharm: { ...card, _createdAt: readingCreatedAt } as any, // Attach timestamp to differentiate
    }));
  };

  const unpinCard = () => {
    setState((prev) => ({
      ...prev,
      pinnedCharm: null,
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Nhật Ký Trải Bài Tarot</h2>

        <div className={styles.historyList}>
          {state.tarotHistory.length === 0 ? (
            <p className={styles.empty}>Chưa có trải bài nào được lưu.</p>
          ) : (
            [...state.tarotHistory].reverse().map((reading, index) => (
              <div key={index} className={styles.readingEntry}>
                <div className={styles.readingHeader}>
                  <h3>{reading.topicLabel}</h3>
                  <span className={styles.date}>
                    {new Date(reading.createdAt).toLocaleDateString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {reading.question && <p className={styles.question}>"{reading.question}"</p>}

                <div className={styles.cardsRow}>
                  {reading.cards.map((card, cIndex) => {
                    const isPinned =
                      state.pinnedCharm?.id === card.id &&
                      state.pinnedCharm?.orientation === card.orientation &&
                      (state.pinnedCharm as any)._createdAt === reading.createdAt;

                    return (
                      <div key={cIndex} className={styles.cardInfo}>
                        <div className={styles.cardHeader}>
                          <span className={styles.cardPos}>{card.positionLabel}</span>
                          {card.orientation === "reversed" && (
                            <span className={styles.reversedBadge}>Ngược</span>
                          )}
                        </div>
                        <h4 className={styles.cardName}>{card.viName}</h4>
                        <p className={styles.cardKeywords}>{card.keywords.join(", ")}</p>

                        {isPinned ? (
                          <button className={styles.pinnedBtn} onClick={unpinCard}>
                            Đã ghim lá hộ mệnh
                          </button>
                        ) : (
                          <button className={styles.pinBtn} onClick={() => pinCard(card, reading.createdAt)}>
                            Ghim lá hộ mệnh
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
