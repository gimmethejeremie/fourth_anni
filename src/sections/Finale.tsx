import { useEffect, useRef } from "react";
import { StarfieldCanvas } from "../components/Starfield/StarfieldCanvas";
import { GuideCharacter, guides } from "../data/guides";
import { SectionProps } from "./sectionTypes";

const allSpeaker: GuideCharacter = {
  id: "all",
  name: "Tất cả",
  role: "Chorus",
  color: "#F1E7D8",
  align: "center",
  placeholderLabel: "ALL",
  quirk: "together",
};

const finaleScenes: Array<{ speaker: GuideCharacter; line: string }> = [
  { speaker: guides.kagura, line: "4 năm." },
  { speaker: guides.imed, line: "Vô số câu chuyện." },
  { speaker: guides.lilWayne, line: "Nhiều hơn chúng tôi có thể viết hết." },
  { speaker: guides.kuro, line: "Nhiều hơn chúng tôi có thể tổ chức hết." },
  { speaker: guides.nova, line: "Nhiều hơn chúng tôi có thể đo được." },
  { speaker: guides.stone, line: "Nhiều hơn chúng tôi có thể vẽ hết." },
  { speaker: allSpeaker, line: "Chúc mừng, Linh Lan và Lan Linh." },
  { speaker: allSpeaker, line: "Hẹn gặp lại ở năm thứ 8. ✦" },
];

export const Finale = ({
  state,
  setState,
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
  openStarlog,
}: SectionProps) => {
  const hasQueuedIntroRef = useRef(false);

  useEffect(() => {
    const dialogueId = "dialogue:finale:queue";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);
    finaleScenes.forEach((scene, index) => {
      requestDialogue({
        speaker: scene.speaker,
        lines: [scene.line],
        align: scene.speaker.align,
        mood: scene.speaker.id === "all" ? "intimate" : "soft",
        onComplete:
          index === finaleScenes.length - 1 && !isCompleted
            ? () => {
                completePart("finale");
              }
            : undefined,
      });
    });
  }, [completePart, hasSeenDialogue, isActive, isCompleted, markDialogueSeen, requestDialogue]);

  const handleRewatch = () => {
    setState((previous) => ({
      ...previous,
      hasStarted: false,
      activePartId: "constellation",
      currentSection: "vhs",
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="partStack">
      <div className="finaleSky">
        <StarfieldCanvas unlockedStars={state.unlockedStars} bright />
      </div>
      <div className="finalePanel">
        <span>FOUR YEARS, TWO STARS</span>
        <h2>IV YEARS</h2>
        <p>Linh Lan × Lan Linh</p>
        <p>20.08.2022 → 20.08.2026</p>
        <div className="buttonRow">
          <button type="button" onClick={handleRewatch}>
            Rewatch Tape
          </button>
          <button type="button" onClick={openStarlog}>
            Open Starlog
          </button>
        </div>
      </div>
    </div>
  );
};
