import { useEffect, useRef, useState } from "react";
import { audioManager } from "../lib/audioManager";
import { guides } from "../data/guides";
import { SectionProps } from "./sectionTypes";
import styles from "./SecretCipher.module.css";
import { hasAchievement } from "../lib/achievements";

export const SecretCipher = ({
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
  const [cipherInput, setCipherInput] = useState("");
  const hasQueuedIntroRef = useRef(false);
  const secretGiftOpened = hasAchievement(state, "secret_gift_opened");

  useEffect(() => {
    const dialogueId = "dialogue:cipher:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);
    
    requestDialogue({
      speaker: guides.nova,
      lines: [
        "Có vẻ như một số tín hiệu đặc biệt đã được bảo vệ bằng mật mã.",
        "Đây không phải là một bài kiểm tra khó đâu.",
      ],
      mood: "mysterious",
    });
  }, [hasSeenDialogue, isActive, markDialogueSeen, requestDialogue]);

  const openSecretGift = () => {
    if (secretGiftOpened) {
      return;
    }
    
    audioManager.setMood("sky");
    audioManager.playUiSound("unlock");
    unlock("secret_gift_opened");
    
    setState((previous) => ({
      ...previous,
      gashaponInventory: previous.gashaponInventory.includes("Hộp quà mở bằng ngôi sao ẩn")
        ? previous.gashaponInventory
        : [...previous.gashaponInventory, "Hộp quà mở bằng ngôi sao ẩn"],
    }));
    
    requestDialogue({
      speaker: guides.nova,
      lines: [
        "Ổ khóa vừa mở ra với một tiếng cạch nhẹ.",
        "Mật mã này... chắc chắn là một kỷ niệm rất ý nghĩa.",
      ],
      mood: "mysterious",
    });
  };

  const handleCipherSubmit = () => {
    if (cipherInput.toLowerCase().trim() === "echo") {
      openSecretGift();
    } else {
      requestDialogue({
        speaker: guides.lilWayne,
        lines: ["Mật mã sai rồi! Thử tìm lại trong cuốn Scrapbook xem sao?"],
        mood: "funny",
      });
    }
  };

  const handleContinue = () => {
    completePart("cipher");
  };

  return (
    <div className={styles.cipherStage} id="cipher">
      <div className={styles.cipherContainer}>
        <h2 className={styles.cipherTitle}>HỘP QUÀ BÍ MẬT</h2>
        <div className={styles.divider}></div>
        
        <div className={styles.cipherPanel}>
          <span>MẬT MÃ BÍ ẨN</span>
          <strong>{secretGiftOpened ? "Hộp quà đã được mở" : "Bảng nhập mật mã bị khóa"}</strong>
          <p>
            {secretGiftOpened
              ? "Bên trong là một mảnh băng rất nhỏ: lời nhắc rằng tò mò cũng là một kiểu yêu thương."
              : "Một ổ khóa chữ số bằng cơ có khắc một dòng chữ: \"Thứ gì luôn đáp lại bạn, nhưng chưa từng cất lời trước? Hãy tìm những tia sáng vàng ở năm thứ hai.\""}
          </p>
          
          {!secretGiftOpened ? (
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                value={cipherInput}
                onChange={(e) => setCipherInput(e.target.value)}
                placeholder="Nhập mật mã..."
                className={styles.cipherInput}
              />
              <button type="button" onClick={handleCipherSubmit} className={styles.unlockBtn}>
                Mở khóa
              </button>
            </div>
          ) : null}
        </div>
        
        {!isCompleted && secretGiftOpened && (
          <div className={styles.continueSection}>
            <button className="primaryAction" type="button" onClick={handleContinue}>
              Tiếp tục hành trình
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
