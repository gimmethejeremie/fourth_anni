import React, { useState, useEffect, useMemo, useRef } from "react";
import { quizQuestions, QuizQuestion } from "../../data/quiz";
import { guides } from "../../data/guides";
import { DialogueOverlayRequest, SectionProps } from "../../sections/sectionTypes";
import styles from "./ScrapbookQuiz.module.css";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const snarkyRemarks = [
  "Gà thế?",
  "Quên nhanh thế?",
  "Tưởng các người nhớ rõ lắm cơ mà?",
  "Thật sự không biết luôn?",
  "Câu dễ thế này mà cũng sai?",
  "Chưa học bài cũ à?"
];

export const ScrapbookQuiz = ({
  state,
  setState,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
}: SectionProps) => {
  const [currentRun, setCurrentRun] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const hasQueuedIntroRef = useRef(false);

  useEffect(() => {
    const dialogueId = "dialogue:scrapbook:quiz-intro";
    if (!isActive || state.scrapbookUnlocked || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);
    const dialogues: DialogueOverlayRequest[] = [
      {
        speaker: guides.lilWayne,
        lines: [
          "Ha ha ha ha, đây là những thử thách mà ta đã đặt ra",
          "Để ngăn chặn những kẻ không xứng đáng xâm phạm đến những gì quý giá",
          "Nếu hai người là người xứng đáng, cứ thử xem",
          "Nhưng ta báo trước rằng, chỉ có 2 lần phạm lỗi là được chấp nhận thôi đấy",
          "Đến lần thứ 3 là...",
          "Mất sạch",
        ],
        mood: "mysterious",
        skipLabel: "Lil'Wayne im đi cho tôi thi",
      },
      {
        speaker: guides.nova,
        lines: ["Nói nhiều thế, bớt khoe mẽ dùm coi"],
        mood: "funny",
      },
      {
        speaker: guides.kagura,
        lines: [
          "Cậu đừng nghe thằng chả dọa",
          "Thằng chả chỉ được cái tự mãn thôi",
          "Nếu cậu nhớ được những thông tin ở phần trước thì cậu sẽ ổn thôi",
          "Cố lên!!",
        ],
        mood: "soft",
      },
    ];

    dialogues.forEach(requestDialogue);
  }, [
    hasSeenDialogue,
    isActive,
    markDialogueSeen,
    requestDialogue,
    state.scrapbookUnlocked,
  ]);

  // Initialize a run when component mounts
  useEffect(() => {
    if (currentRun.length === 0 && !gameFailed) {
      if (state.quizFails >= 3) {
        triggerGameOver();
        return;
      }
      const availableQuestions = quizQuestions.filter((q) => !state.usedQuizIds.includes(q.id));
      // If we somehow run out, just recycle them, but rule is fail 3 times -> game over anyway
      const pool = availableQuestions.length >= 5 ? availableQuestions : quizQuestions;
      const shuffled = shuffleArray(pool);
      setCurrentRun(shuffled.slice(0, 5));
      setCurrentIndex(0);
      setFeedback(null);
    }
  }, [state.usedQuizIds, currentRun.length, gameFailed, state.quizFails]);

  const triggerGameOver = () => {
    setGameFailed(true);
    requestDialogue({
      speaker: guides.lilWayne,
      lines: [
        "Thôi... về ôn bài đi bạn ơi 😐",
      ],
      mood: "funny",
      onComplete: () => {
        // Do nothing automatically, wait for user to click Cho tôi thử lại
      }
    });
  };

  const currentQuestion = currentRun[currentIndex];

  const handleFail = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    
    const newFails = state.quizFails + 1;
    setState((prev) => ({
      ...prev,
      quizFails: newFails,
      usedQuizIds: [...prev.usedQuizIds, ...currentRun.map(q => q.id)]
    }));

    if (newFails >= 3) {
      triggerGameOver();
    } else {
      const remark = snarkyRemarks[Math.floor(Math.random() * snarkyRemarks.length)];
      setFeedback({ type: "wrong", message: "" });
      requestDialogue({
        speaker: guides.lilWayne,
        lines: [remark],
        mood: "funny"
      });
    }
  };

  const handlePass = () => {
    setFeedback({ type: "correct", message: currentQuestion.explanation });
  };

  const handleNext = () => {
    if (feedback?.type === "correct") {
      if (currentIndex === 4) {
        requestDialogue({
          speaker: guides.kagura,
          lines: ["Ổn đó 👏"],
          mood: "soft",
        });
        requestDialogue({
          speaker: guides.imed,
          lines: ["Tôi biết mà!"],
          mood: "soft",
        });
        requestDialogue({
          speaker: guides.lilWayne,
          lines: ["...may."],
          mood: "funny",
          onComplete: () => {
            setState((prev) => ({
              ...prev,
              scrapbookUnlocked: true
            }));
          }
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
        setInputText("");
        setFeedback(null);
      }
    } else if (feedback?.type === "wrong") {
      setCurrentRun([]);
      setInputText("");
      setFeedback(null);
    }
  };

  const submitMultipleChoice = (option: string) => {
    if (feedback) return;
    if (option === currentQuestion.answer) {
      handlePass();
    } else {
      handleFail();
    }
  };

  const submitTextInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) return;
    const normalizedInput = inputText.trim().toLowerCase();
    const answers = Array.isArray(currentQuestion.answer) ? currentQuestion.answer : [currentQuestion.answer];
    
    const isCorrect = answers.some(ans => ans.toLowerCase() === normalizedInput);
    if (isCorrect) {
      handlePass();
    } else {
      handleFail();
    }
  };

  // randomize options once per question
  const shuffledOptions = useMemo(() => {
    if (currentQuestion?.type === "multiple_choice" && currentQuestion.options) {
      return shuffleArray(currentQuestion.options);
    }
    return [];
  }, [currentQuestion]);

  if (gameFailed || currentRun.length === 0) {
    return (
      <div className={styles.quizContainer}>
        {gameFailed ? (
          <div className={styles.feedbackContainer} style={{ background: 'transparent', border: 'none' }}>
            <h1 style={{ color: '#d8b45c', letterSpacing: '4px', margin: '0 0 1rem 0', fontSize: '2.5rem' }}>THỬ THÁCH THẤT BẠI</h1>
            <div style={{ fontSize: '4rem', margin: '1rem 0' }}>🧹</div>
            <p className={styles.feedbackMessage}>Lil'Wayne đang quét dọn mớ hỗn độn của bạn.</p>
            <button 
              className={`${styles.nextButton} ${styles.wrong}`}
              style={{ marginTop: '2rem', borderColor: '#d8b45c', color: '#d8b45c' }}
              onClick={() => {
                setState(prev => ({ ...prev, quizFails: 0 }));
                setGameFailed(false);
                setCurrentRun([]);
              }}
            >
              Cho tôi thử lại
            </button>
          </div>
        ) : (
          <h2 style={{ color: 'var(--cream)' }}>Đang nạp dữ liệu...</h2>
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.quizContainer} ${isShaking ? styles.shake : ""}`}>
      
      <div className={styles.header}>
        <span>Challenge {currentIndex + 1} / 5</span>
        <span className={`${styles.failCount} ${state.quizFails >= 2 ? styles.warning : ""}`}>
          Lỗi: {state.quizFails}/3
        </span>
      </div>
      
      <h3 className={styles.question}>
        {currentQuestion.question}
      </h3>

      {!feedback ? (
        <>
          {currentQuestion.type === "multiple_choice" && (
            <div className={styles.optionsGrid}>
              {shuffledOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => submitMultipleChoice(opt)}
                  className={styles.optionButton}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "text_input" && (
            <form onSubmit={submitTextInput} className={styles.inputForm}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập câu trả lời của bạn..."
                autoFocus
                className={styles.textInput}
              />
              <button type="submit" className={styles.submitButton}>
                Xác nhận
              </button>
            </form>
          )}
        </>
      ) : (
        <div className={`${styles.feedbackContainer} ${feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          <h2 className={`${styles.feedbackTitle} ${feedback.type === 'correct' ? styles.correct : styles.wrong}`}>
            {feedback.type === 'correct' ? "Chính xác!" : "Sai rồi!"}
          </h2>
          {feedback.message && (
            <p className={styles.feedbackMessage}>{feedback.message}</p>
          )}
          <button 
            onClick={handleNext}
            className={`${styles.nextButton} ${feedback.type === 'correct' ? styles.correct : styles.wrong}`}
          >
            {feedback.type === 'correct' ? "Tiếp tục" : "Làm lại vòng khác"}
          </button>
        </div>
      )}
    </div>
  );
};
