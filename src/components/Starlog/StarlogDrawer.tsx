import { useEffect, useRef, useState } from "react";
import { gifts } from "../../data/gacha";
import { achievements } from "../../data/achievements";
import { canSeeHiddenStarlog, getUnlockedAchievementCount } from "../../lib/achievements";
import { AppState } from "../../lib/storage";
import styles from "./StarlogDrawer.module.css";

type StarlogDrawerProps = {
  open: boolean;
  state: AppState;
  onClose: () => void;
};

export const StarlogDrawer = ({ open, state, onClose }: StarlogDrawerProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const hiddenVisible = canSeeHiddenStarlog(state);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.scrim} onMouseDown={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Starlog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <span>STARLOG</span>
            <h2>Nhật Ký Hành Trình</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close Starlog">
            Đóng
          </button>
        </header>

        <section className={styles.panel}>
          <h3>Tiến Trình Hành Trình</h3>
          <p>Đã bắt đầu hành trình: {state.hasStarted ? "Rồi" : "Chưa"}</p>
          <p>Chặng hiện tại: {state.activePartId}</p>
          <p>Các chặng đã qua: {state.completedParts.length}/5</p>
          <p>
            Thành tựu đạt được: {getUnlockedAchievementCount(state)}/{achievements.length}
          </p>
          <p>Số sao đã chạm: {state.unlockedStars.length}</p>
          <p>Chương Scrapbook đã mở: {Math.min(state.scrapbookChapterIndex + 1, 4)}/4</p>
          <p>Đã nhận quà Gacha: {state.gashaponInventory.length > 0 ? "Rồi" : "Chưa"}</p>
          <p>Đã đến hồi kết: {state.completedParts.includes("finale") ? "Rồi" : "Chưa"}</p>
        </section>

        <section className={styles.panel}>
          <h3>Kỷ Niệm & Thành Tựu</h3>
          <ul className={styles.list}>
            {achievements.map((achievement) => {
              const found = state.achievements.includes(achievement.id);
              return (
                <li key={achievement.id} className={found ? styles.unlocked : styles.locked}>
                  <span>{found ? "✦" : "???"}</span>
                  <div>
                    <strong>{found ? achievement.title : "Tín hiệu mờ"}</strong>
                    <small>{found ? achievement.description : "Hãy tiếp tục hành trình để giải mã tín hiệu này."}</small>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.panel}>
          <h3>Túi Quà Gacha</h3>
          {state.gashaponInventory.length ? (
            <ul className={styles.inventoryList}>
              {state.gashaponInventory.map((title, index) => {
                const itemDetails = gifts.find(g => g.title === title);
                return (
                  <li key={`${title}-${index}`} className={styles.inventoryItem}>
                    <span className={styles.inventoryItemRarity}>{itemDetails?.rarity || "secret"}</span>
                    <strong>{title}</strong>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Chưa nhận được phần quà nào.</p>
          )}
        </section>

        <section className={styles.panel}>
          <h3>Trải Bài Tarot</h3>
          {state.tarotReading ? (
            <>
              <p>Chủ đề: {state.tarotReading.topicLabel}</p>
              {state.tarotReading.question ? <p>Câu hỏi: {state.tarotReading.question}</p> : null}
              <ul className={styles.chips}>
                {state.tarotReading.cards.map((card) => (
                  <li key={`${card.position}-${card.id}`}>
                    {card.positionLabel}: {card.title} ({card.orientationLabel})
                  </li>
                ))}
              </ul>
              <p>{state.tarotReading.cards[0]?.meaning}</p>
            </>
          ) : (
            <p>Các lá bài vẫn đang úp.</p>
          )}
        </section>

        {hiddenVisible ? (
          <section className={`${styles.panel} ${styles.hiddenPanel}`}>
            <h3>Tín Hiệu Ẩn</h3>
            <p>Cuộn băng vẫn giữ một tầng tín hiệu ẩn dành cho những ai đã nhận quà và xem bói bài.</p>
          </section>
        ) : null}

        <button 
          className={styles.resetButton}
          onClick={() => setShowConfirm(true)}
        >
          Làm lại từ đầu
        </button>

        {showConfirm && (
          <div className={styles.confirmOverlay} onMouseDown={(e) => { e.stopPropagation(); setShowConfirm(false); }}>
            <div className={styles.confirmDialog} onMouseDown={(e) => e.stopPropagation()}>
              <h3>Xóa toàn bộ tiến trình?</h3>
              <p>Bạn có chắc chắn muốn xóa toàn bộ tiến trình không? Mọi thứ sẽ bị xóa và bắt đầu lại từ con số 0!</p>
              <div className={styles.confirmActions}>
                <button className={styles.confirmCancelBtn} onClick={() => setShowConfirm(false)}>Hủy</button>
                <button 
                  className={styles.confirmConfirmBtn} 
                  onClick={() => {
                    window.localStorage.removeItem("four-years-two-stars:v4");
                    window.location.reload();
                  }}
                >
                  Chắc chắn xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
