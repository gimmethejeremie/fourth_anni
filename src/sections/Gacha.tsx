import { useEffect, useRef, useState } from "react";
import { gifts, Gift } from "../data/gacha";
import { guides } from "../data/guides";
import { audioManager } from "../lib/audioManager";
import { weightedPick } from "../lib/random";
import { constellationStars } from "../data/constellation";
import { DialogueOverlayRequest, SectionProps } from "./sectionTypes";
import styles from "./Gacha.module.css";

type DrawingPhase = "idle" | "turning" | "dropping" | "opening" | "revealed";

export const Gacha = ({
  state,
  setState,
  unlock,
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
}: SectionProps) => {
  const [lastGift, setLastGift] = useState<Gift | null>(null);
  const [drawingPhase, setDrawingPhase] = useState<DrawingPhase>("idle");
  const hasQueuedIntroRef = useRef(false);

  const keyStarIds = constellationStars.filter((s) => s.kind === "key").map((s) => s.id);
  const foundHiddenStars = keyStarIds.filter((id) => state.unlockedStars.includes(id)).length;
  const minigameWins = Object.values(state.minigameRecords || {}).reduce((acc, curr) => acc + curr.wins, 0);

  const totalTicketsEarned = foundHiddenStars + minigameWins;
  const ticketsSpent = state.gashaponPulls;
  const ticketsLeft = Math.max(0, totalTicketsEarned - ticketsSpent);

  useEffect(() => {
    const dialogueId = "dialogue:gacha:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);
    const dialogues: DialogueOverlayRequest[] = [
      {
        speaker: guides.lilWayne,
        lines: ["Đứa nào nãy không tìm hết ngôi sao giờ tiếc chưa há há há"],
        mood: "funny",
      },
      {
        speaker: guides.stone,
        lines: ["..."],
        mood: "soft",
      },
      {
        speaker: guides.nova,
        lines: ["Thật luôn? Chèn ép nhau dữ"],
        mood: "funny",
      },
      {
        speaker: guides.imed,
        lines: ["Ừ thì để mở được cậu sẽ có hai cách. Một là tìm hết các ngôi sao ẩn ở trong phần đầu tiên. Hai là chơi minigame mới."],
        mood: "serious",
      },
      {
        speaker: guides.kagura,
        lines: ["Mỗi lượt thắng minigame, cậu sẽ được nhận thêm một lần gacha."],
        mood: "soft",
      },
      {
        speaker: guides.kuro,
        lines: ["Các món quà được xếp hạng từ normal, rare đến legendary."],
        mood: "soft",
      },
      {
        speaker: guides.lilWayne,
        lines: ["Ha ha ha, ta đúng là thiên tài"],
        mood: "funny",
      },
      {
        speaker: guides.nova,
        lines: ["Bớt bớt dùm má, trông có khó coi chưa kìa"],
        mood: "funny",
      },
      {
        speaker: guides.stone,
        lines: ["Thử tìm xem tụi tớ giấu gì ở trong đó nhé hihi"],
        mood: "intimate",
      },
    ];

    dialogues.forEach(requestDialogue);
  }, [hasSeenDialogue, isActive, markDialogueSeen, requestDialogue]);

  const drawGift = () => {
    if (drawingPhase !== "idle" && drawingPhase !== "revealed") return;
    
    if (ticketsLeft <= 0) {
      alert("Bạn không còn lượt để gacha! Hãy đi tìm ngôi sao ẩn hoặc chơi minigame nhé.");
      return;
    }

    const shouldGuaranteeSecret = state.gashaponPity >= 4;
    const pool = shouldGuaranteeSecret ? gifts.filter((gift) => gift.rarity === "secret") : gifts;
    const gift = weightedPick(pool);

    audioManager.setMood("gacha");
    
    // Animation sequence
    setDrawingPhase("turning");
    audioManager.playUiSound("insert");
    
    setTimeout(() => {
      setDrawingPhase("dropping");
      audioManager.playUiSound("unlock");
    }, 1000);
    
    setTimeout(() => {
      setDrawingPhase("opening");
      audioManager.playUiSound("draw");
    }, 2000);
    
    setTimeout(() => {
      setLastGift(gift);
      setDrawingPhase("revealed");
      setState((previous) => ({
        ...previous,
        gashaponInventory: [...previous.gashaponInventory, gift.title],
        gashaponPulls: previous.gashaponPulls + 1,
        gashaponPity: gift.rarity === "secret" ? 0 : previous.gashaponPity + 1,
      }));
    }, 2800);
  };

  const closeResult = () => {
    setDrawingPhase("idle");
    setLastGift(null);
  };

  // Generate some static decorative capsules for the globe
  const bgCapsules = [
    { id: 1, top: '40%', left: '20%', bg: '#eab308' },
    { id: 2, top: '60%', left: '30%', bg: '#ef4444' },
    { id: 3, top: '50%', left: '60%', bg: '#3b82f6' },
    { id: 4, top: '75%', left: '45%', bg: '#22c55e' },
    { id: 5, top: '65%', left: '70%', bg: '#a855f7' },
    { id: 6, top: '80%', left: '25%', bg: '#f97316' },
  ];

  return (
    <div className={styles.arcadeStage} id="gacha">
      <div className={styles.arcadeFrame}>
        
        {/* Neon vertical signs */}
        <div className={styles.verticalSignLeft}>
          <span>ガ</span>
          <span>チ</span>
          <span>ャ</span>
          <span>ポ</span>
          <span>ン</span>
        </div>
        
        <div className={styles.verticalSignRight}>
          <span>L</span>
          <span>U</span>
          <span>C</span>
          <span>K</span>
          <span>Y</span>
        </div>

        {/* Diagonal wrapping neon strips */}
        <div className={styles.neonStrip1} />
        <div className={styles.neonStrip2} />
        <div className={styles.neonStrip3} />

        {/* Top Slogan Banner */}
        <div className={styles.sloganBanner}>
          <span className={styles.sloganText}>WELCOME TO GASHAPON</span>
        </div>

        <div className={styles.gashaponContainer}>
        <h1 className={styles.gachaSign}>GACHA</h1>
        <div className={styles.machineWrapper}>
          <div className={styles.globe}>
            {bgCapsules.map(cap => (
              <div 
                key={cap.id} 
                className={styles.bgCapsule} 
                style={{ top: cap.top, left: cap.left, background: cap.bg }} 
              />
            ))}
          </div>

          <div className={styles.base}>
            <div className={styles.ticketDisplay}>Lượt gacha: {ticketsLeft}</div>
            
            <div className={styles.handleContainer}>
              <div className={styles.pushHereSign}>
                <span className={styles.pushArrow}>⬅</span>
                <span className={styles.pushText}>PUSH HERE</span>
              </div>
              <div 
                className={`${styles.turnHandleWrapper} ${drawingPhase === 'turning' ? styles.turning : ''} ${ticketsLeft <= 0 || (drawingPhase !== "idle" && drawingPhase !== "revealed") ? styles.disabled : ''}`}
                onClick={drawGift}
              >
                <div className={styles.turnHandle} />
              </div>
            </div>

            <div className={`${styles.chute} ${drawingPhase === 'dropping' || drawingPhase === 'opening' ? styles.open : ''}`}>
              <div className={styles.chuteFlap} />
            </div>
          </div>

          <div className={`${styles.activeCapsule} ${styles[drawingPhase]}`} />
        </div>

        {drawingPhase === "revealed" && lastGift && (
          <div className={styles.resultOverlay}>
            <div className={styles.resultPanelPopup}>
              <span className={styles.resultRarity}>{lastGift.rarity}</span>
              <h2 className={styles.resultTitle}>{lastGift.title}</h2>
              <p className={styles.resultDesc}>{lastGift.description}</p>
              <button className={styles.closeBtn} onClick={closeResult}>Nhận quà</button>
            </div>
            <div className="confetti" aria-hidden="true" />
          </div>
        )}

        {!isCompleted && state.gashaponPulls > 0 ? (
          <div style={{ marginTop: '3rem', textAlign: 'center', position: 'relative', zIndex: 20 }}>
            <button className="primaryAction" type="button" onClick={() => completePart("gacha")}>
              Tiếp tục hành trình
            </button>
          </div>
        ) : null}
      </div>
      </div>
    </div>
  );
};
