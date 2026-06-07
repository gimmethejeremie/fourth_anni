import { useEffect, useState, useRef } from "react";
import styles from "./minigames.module.css";

const GAME_DURATION = 60;
const MAX_MOVES = 30;
const CARD_ICONS = ["🌙", "✦", "📷", "🎞", "✉", "🌸", "💫", "🎧"];

type Card = {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export const MemoryFlipGame = ({ onComplete, onBack }: { onComplete: (isWin: boolean) => void; onBack: () => void }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "end">("playing");
  const [isWin, setIsWin] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    // Init game
    const shuffledCards = [...CARD_ICONS, ...CARD_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("end");
          setIsWin(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState]);

  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (gameState === "end" && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete(isWin);
    }
  }, [gameState, isWin, onComplete]);

  const handleCardClick = (index: number) => {
    if (gameState !== "playing" || lockBoard) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      setMoves(m => m + 1);
      
      if (moves + 1 >= MAX_MOVES) {
        setGameState("end");
        setIsWin(false);
      }

      const [first, second] = newFlipped;
      if (newCards[first].icon === newCards[second].icon) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setLockBoard(false);

        if (newCards.every(c => c.isMatched)) {
          setGameState("end");
          setIsWin(true);
        }
      } else {
        setTimeout(() => {
          setCards(prev => {
            const resetCards = [...prev];
            resetCards[first].isFlipped = false;
            resetCards[second].isFlipped = false;
            return resetCards;
          });
          setFlippedCards([]);
          setLockBoard(false);
        }, 700);
      }
    }
  };

  return (
    <div className={styles.minigameOverlay}>
      <div className={styles.minigameHeader}>
        <h3 className={styles.minigameTitle}>Lật Mảnh Ký Ức</h3>
        <div className={styles.minigameStatus}>
          <div className={styles.minigameScore}>Lượt sai: {moves}/{MAX_MOVES}</div>
          <div className={styles.minigameTime}>T/g: {timeLeft}s</div>
        </div>
      </div>
      <div className={styles.minigameBody}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          maxWidth: "400px",
          width: "100%"
        }}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              style={{
                aspectRatio: "1/1",
                background: card.isFlipped || card.isMatched ? "rgba(241, 231, 216, 0.1)" : "rgba(20, 20, 30, 0.8)",
                border: "1px solid rgba(241, 231, 216, 0.3)",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                transition: "all 0.3s transform",
                transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "none",
              }}
            >
              <div style={{ transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "none" }}>
                {(card.isFlipped || card.isMatched) ? card.icon : "?"}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.instructions}>Lật 2 thẻ giống nhau. Không vượt quá {MAX_MOVES} lượt sai.</div>
      </div>

      {gameState === "end" && (
        <div className={styles.minigameResult}>
          <h2 className={`${styles.resultTitle} ${isWin ? styles.win : styles.lose}`}>
            {isWin ? "THÀNH CÔNG" : "THẤT BẠI"}
          </h2>
          <p className={styles.resultDesc}>Bạn đã {isWin ? "hoàn thành trò chơi!" : "hết thời gian hoặc vượt quá lượt sai."}</p>
          <div className={styles.resultActions}>
            <button className={`${styles.actionButton} ${styles.primary}`} onClick={onBack}>
              Quay lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
