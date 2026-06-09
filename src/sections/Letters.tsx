import { useEffect, useRef, useState } from "react";
import { SectionProps } from "./sectionTypes";
import styles from "./Letters.module.css";
import { guides, GuideCharacter } from "../data/guides";

const teamLetters: Array<{ sender: GuideCharacter; content: string }> = [
  { sender: guides.kagura, content: "Gửi hai nàng tinh linh, 4 năm qua là một chặng đường dài với nhiều thử thách nhưng cũng đầy ắp tiếng cười. Cảm ơn hai cậu đã luôn giữ vững tinh thần rạng rỡ ấy. Chúc hai cậu mãi bình an và hạnh phúc." },
  { sender: guides.imed, content: "Code game này mệt mỏi lắm đó biết không? Nhưng vì là quà cho hai cậu nên tớ sẽ tha thứ. Chúc hai cậu một hành trình mới đầy thú vị và bớt báo nhé." },
  { sender: guides.lilWayne, content: "Lô, làm bố thì không nói nhiều. Chúc hai đứa năm mới vui vẻ, tiền vào như nước, bớt tấu hài nhạt lại. Thế thôi." },
  { sender: guides.kuro, content: "Hai đứa nhớ giữ gìn sức khỏe nhé, đừng thức khuya quá. Cảm ơn vì những năng lượng tích cực hai đứa đã mang lại cho mọi người." },
  { sender: guides.nova, content: "Hệ thống ghi nhận hai mục tiêu đã tồn tại được 4 năm. Đánh giá: Rất tốt. Đề nghị tiếp tục phát huy trong tương lai." },
  { sender: guides.stone, content: "Hy vọng những vì sao này đã mang lại chút ánh sáng cho ngày đặc biệt của hai cậu. Chúc Linh Lan và Lan Linh luôn rực rỡ như những chòm sao kia nhé." },
];

export const Letters = ({
  isActive,
  isCompleted,
  completePart,
  requestDialogue,
  hasSeenDialogue,
  markDialogueSeen,
}: SectionProps) => {
  const hasQueuedIntroRef = useRef(false);
  const [openedLetters, setOpenedLetters] = useState<string[]>([]);
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  useEffect(() => {
    const dialogueId = "dialogue:letters:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);

    requestDialogue({
      speaker: guides.kagura,
      lines: ["Chúng tớ cũng có vài dòng muốn gửi đến hai cậu đây."],
      mood: "intimate",
    });
  }, [isActive, hasSeenDialogue, markDialogueSeen, requestDialogue]);

  const handleContinue = () => {
    completePart("letters");
    requestDialogue({
      speaker: guides.kagura,
      lines: ["Vậy là thư đã đủ rồi. Trước hồi kết, hãy ghé qua khung ảnh của cả team nhé."],
      mood: "soft",
    });
  };

  const handleOpenLetter = (index: number, senderId: string) => {
    setActiveLetter(index);
    if (!openedLetters.includes(senderId)) {
      const newOpened = [...openedLetters, senderId];
      setOpenedLetters(newOpened);

      if (newOpened.length === teamLetters.length && !isCompleted) {
        handleContinue();
      }
    }
  };

  const closeLetter = () => {
    setActiveLetter(null);
  };

  return (
    <div className={styles.lettersContainer}>
      <h2 className={styles.title}>TEAM LETTERS</h2>
      
      <div className={styles.envelopesGrid}>
        {teamLetters.map((letter, index) => {
          const isOpened = openedLetters.includes(letter.sender.id);
          const isActiveEnvelope = activeLetter === index;
          return (
            <button
              key={letter.sender.id}
              className={`${styles.envelope} ${isOpened ? styles.opened : ""} ${isActiveEnvelope ? styles.active : ""}`}
              onClick={() => handleOpenLetter(index, letter.sender.id)}
              type="button"
            >
              <div className={styles.envelopeIcon} style={{ color: letter.sender.color }}>
                {isOpened ? "📭" : "📫"}
              </div>
              <div className={styles.senderName} style={{ color: letter.sender.color }}>
                {letter.sender.name}
              </div>
            </button>
          );
        })}
      </div>

      {activeLetter !== null && (
        <div key={activeLetter} className={styles.letterInPlaceContainer}>
          <div className={styles.scrollLetter}>
            <div className={styles.rodTop}></div>
            <article className={styles.letterPaper}>
              <button className={styles.closeButton} onClick={closeLetter}>×</button>
              
              <p className={styles.letterGreeting} style={{ color: teamLetters[activeLetter].sender.color }}>
                Từ: {teamLetters[activeLetter].sender.name}
              </p>
              
              <p className={styles.letterBody}>
                {teamLetters[activeLetter].content}
              </p>
              
              <p className={styles.letterSignoff}>Thương mến,</p>
              <p className={styles.letterSign} style={{ color: teamLetters[activeLetter].sender.color }}>
                {teamLetters[activeLetter].sender.name}
              </p>
            </article>
            <div className={styles.rodBottom}></div>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className={styles.completedMessage}>
          Đã nhận được toàn bộ thư. Con đường đến khung ảnh team đã mở ra.
        </div>
      )}

      {!isCompleted && (
        <div style={{ marginTop: '2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <button className="primaryAction" type="button" onClick={handleContinue}>
            Tiếp tục hành trình
          </button>
        </div>
      )}
    </div>
  );
};
