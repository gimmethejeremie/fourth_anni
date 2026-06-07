import { useEffect, useRef, useState } from "react";
import { TarotReading, TarotReadingResult } from "../components/TarotReading";
import { guides } from "../data/guides";
import { audioManager } from "../lib/audioManager";
import { SavedTarotCard } from "../lib/storage";
import { DialogueOverlayRequest, SectionProps } from "./sectionTypes";

const singlePosition = [{ id: "single", label: "Lá bài" }] as const;
const threeCardPositions = [
  { id: "past", label: "Quá khứ" },
  { id: "present", label: "Hiện tại" },
  { id: "advice", label: "Lời khuyên" },
] as const;

export const Tarot = ({
  setState,
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
}: SectionProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hasQueuedIntroRef = useRef(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!isActive || isInView || !node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: "-20% 0px -30% 0px", threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isActive, isInView]);

  useEffect(() => {
    const dialogueId = "dialogue:tarot:intro";
    if (!isActive || !isInView || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);
    const dialogues: DialogueOverlayRequest[] = [
      {
        speaker: guides.lilWayne,
        lines: ["Ủa thằng nào nghĩ ra đoạn này thế"],
        mood: "funny",
      },
      {
        speaker: guides.nova,
        lines: ["Kịch bản đâu có bói bài hay gì đâu"],
        mood: "serious",
      },
      {
        speaker: guides.lilWayne,
        lines: ["Thực ra cái thằng làm ra web này cực kì tâm linh, nên mới nghĩ ra cái trò bói toán này, chứ thực ra ban đầu cái này đâu có trong kịch bản"],
        mood: "funny",
      },
      {
        speaker: guides.kuro,
        lines: ["Ngộ quá ha?"],
        mood: "funny",
      },
      {
        speaker: guides.imed,
        lines: ["Rảnh dữ, rảnh thế sao không đi kiếm gì học đi cha"],
        mood: "funny",
      },
      {
        speaker: guides.lilWayne,
        lines: ["Ê cho người ta tâm linh tí coi"],
        mood: "funny",
      },
      {
        speaker: guides.kagura,
        lines: ["Thôi thì lỡ đến đây rồi, cùng coi thử quãng thời gian sắp tới của hai cậu sẽ như thế nào nhé!"],
        mood: "soft",
      },
    ];

    dialogues.forEach(requestDialogue);
  }, [hasSeenDialogue, isActive, isInView, markDialogueSeen, requestDialogue]);

  const [readingFinished, setReadingFinished] = useState(false);

  const handleReadingComplete = (reading: TarotReadingResult) => {
    audioManager.setMood("tarot");
    audioManager.playUiSound("draw");

    const positions = reading.spreadCount === 3 ? threeCardPositions : singlePosition;
    const savedCards: SavedTarotCard[] = reading.cards.map((drawnCard, index) => ({
      id: drawnCard.card.id,
      title: drawnCard.card.name,
      viName: drawnCard.card.viName,
      position: positions[index].id,
      positionLabel: positions[index].label,
      orientation: drawnCard.orientation,
      orientationLabel: drawnCard.orientationLabel,
      keywords: drawnCard.keywords,
      meaning: drawnCard.meaning,
    }));

    setState((previous) => ({
      ...previous,
      tarotReading: {
        cards: savedCards,
        topic: reading.topic,
        topicLabel: reading.topicLabel,
        question: reading.question,
        createdAt: new Date().toISOString(),
      },
    }));

    setReadingFinished(true);
  };

  return (
    <div className="partStack tarotSectionWrapper" ref={rootRef}>
      <TarotReading onReadingComplete={handleReadingComplete} />
      {readingFinished && !isCompleted && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', position: 'relative', zIndex: 10 }}>
          <button className="primaryAction" onClick={() => completePart("tarot")}>
            Tiến tới tương lai ✦
          </button>
        </div>
      )}
    </div>
  );
};
