import { useState } from "react";
import { AppState } from "../lib/storage";
import styles from "./minigames.module.css";
import { SignalTimingGame } from "./SignalTimingGame";
import { MemoryCatchGame } from "./MemoryCatchGame";
import { MemoryFlipGame } from "./MemoryFlipGame";
import { SignalRepairCoopGame } from "./SignalRepairCoopGame";
import { BalanceCoopGame } from "./BalanceCoopGame";

type MinigamesHubProps = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onClose: () => void;
};

type GameConfig = {
  id: string;
  title: string;
  desc: string;
  type: "solo" | "coop";
  component: React.ComponentType<{ onComplete: (isWin: boolean) => void; onBack: () => void }>;
};

const GAMES: GameConfig[] = [
  {
    id: "signalTiming",
    title: "Căn Chỉnh Tín Hiệu",
    desc: "Căn đúng thời điểm tín hiệu đi qua vùng an toàn để nhận điểm. Đạt 1500 điểm để thắng.",
    type: "solo",
    component: SignalTimingGame,
  },
  {
    id: "memoryCatch",
    title: "Bắt Mảnh Ký Ức",
    desc: "Nhặt các mảnh ký ức rơi xuống. Tránh nhặt nhầm mảnh vỡ nhiễu sóng. Đạt 300 điểm để thắng.",
    type: "solo",
    component: MemoryCatchGame,
  },
  {
    id: "memoryFlip",
    title: "Lật Mảnh Ký Ức",
    desc: "Trò chơi trí nhớ kinh điển. Lật thẻ bài để tìm các cặp giống nhau trong 60 giây.",
    type: "solo",
    component: MemoryFlipGame,
  },
  {
    id: "signalRepairCoop",
    title: "Sửa Tín Hiệu",
    desc: "Co-op: P1 di chuyển con trỏ (A/D), P2 chốt sửa (L) khi con trỏ ở vùng lỗi.",
    type: "coop",
    component: SignalRepairCoopGame,
  },
  {
    id: "balanceCoop",
    title: "Giữ Thăng Bằng",
    desc: "Co-op: P1 kéo (A/D), P2 kéo (J/L). Phối hợp giữ lõi sao không bị rơi ra ngoài trong 45 giây.",
    type: "coop",
    component: BalanceCoopGame,
  },
];

export const MinigamesHub = ({ state, setState, onClose }: MinigamesHubProps) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const ActiveGameComponent = GAMES.find((g) => g.id === activeGameId)?.component;

  const handleGameComplete = (gameId: string, isWin: boolean) => {
    setState((prev) => {
      const stats = prev.minigameRecords[gameId] || { plays: 0, wins: 0 };
      return {
        ...prev,
        minigameRecords: {
          ...prev.minigameRecords,
          [gameId]: {
            plays: stats.plays + 1,
            wins: isWin ? stats.wins + 1 : stats.wins,
          },
        },
      };
    });
  };

  return (
    <div className={styles.hubOverlay}>
      <div className={styles.hubContainer}>
        {activeGameId && ActiveGameComponent ? (
          <ActiveGameComponent
            onComplete={(isWin) => handleGameComplete(activeGameId, isWin)}
            onBack={() => setActiveGameId(null)}
          />
        ) : (
          <>
            <div className={styles.hubHeader}>
              <div>
                <h2 className={styles.hubTitle}>Gacha Ticket Farm</h2>
              </div>
              <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                &times;
              </button>
            </div>

            <div className={styles.gameGrid}>
              {GAMES.map((game) => {
                const stats = state.minigameRecords[game.id] || { plays: 0, wins: 0 };
                return (
                  <div key={game.id} className={styles.gameCard} data-type={game.type}>
                    <div className={`${styles.gameType} ${styles[game.type]}`}>{game.type}</div>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <p className={styles.gameDesc}>{game.desc}</p>
                    <div className={styles.gameStats}>
                      Đã chơi: {stats.plays} | Thắng: {stats.wins}
                    </div>
                    <button
                      className={styles.playButton}
                      onClick={() => setActiveGameId(game.id)}
                    >
                      Play
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
