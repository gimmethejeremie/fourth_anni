import type { ComponentType } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AchievementToast } from "../components/AchievementToast/AchievementToast";
import { CometEvent } from "../components/CometEvent/CometEvent";
import { CursorTrail } from "../components/CursorTrail/CursorTrail";
import { CustomCursor } from "../components/CustomCursor/CustomCursor";
import { JourneyPart } from "../components/JourneyPart/JourneyPart";
import { PinnedCharm } from "../components/PinnedCharm/PinnedCharm";
import { StarfieldCanvas } from "../components/Starfield/StarfieldCanvas";
import { StarlogDrawer } from "../components/Starlog/StarlogDrawer";
import { TarotJournal } from "../components/TarotJournal/TarotJournal";
import { VisualNovelOverlay } from "../components/VisualNovelOverlay/VisualNovelOverlay";
import { journeyParts } from "../data/journey";
import { ambientDialogues } from "../data/ambientDialogues";
import { guides } from "../data/guides";
import { useAchievement } from "../hooks/useAchievement";
import { useAffinity } from "../hooks/useAffinity";
import { useJourneyProgress } from "../hooks/useJourneyProgress";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { audioManager } from "../lib/audioManager";
import { AppState, createInitialState, normalizeStoredState, PartId, STORAGE_KEY } from "../lib/storage";
import { backgroundStars } from "../data/constellation";
import { CometInterlude } from "../sections/CometInterlude";
import { Constellation } from "../sections/Constellation";
import { DialogueOverlayRequest, SectionProps } from "../sections/sectionTypes";
import { Finale } from "../sections/Finale";
import { Gacha } from "../sections/Gacha";
import { MoonPhase } from "../sections/MoonPhase";
import { VtuberArt } from "../sections/VtuberArt";
import { Scrapbook } from "../sections/Scrapbook";
import { TapeIntro } from "../sections/TapeIntro";
import { Tarot } from "../sections/Tarot";
import { SecretCipher } from "../sections/SecretCipher";
import { Wishes } from "../sections/Wishes";
import { Letters } from "../sections/Letters";
import { TeamGallery } from "../sections/TeamGallery";
import { MinigamesHub } from "../minigames/MinigamesHub";
import "../sections/sections.css";
import styles from "./App.module.css";

const partComponentMap = {
  constellation: Constellation,
  moonphase: MoonPhase,
  vtuberArt: VtuberArt,
  scrapbook: Scrapbook,
  tarot: Tarot,
  gacha: Gacha,
  cipher: SecretCipher,
  wishes: Wishes,
  letters: Letters,
  teamGallery: TeamGallery,
  finale: Finale,
} satisfies Record<PartId, ComponentType<SectionProps>>;

const getResumePartId = (completedParts: PartId[]): PartId => {
  return journeyParts.find((part) => !completedParts.includes(part.id))?.id ?? "finale";
};

const AMBIENT_DIALOGUE_MIN_INTERVAL_MS = 45000;
const getAmbientDialogueDelay = () => 52000 + Math.random() * 68000;

const pickAmbientDialogue = (activePartId: PartId, previousId: string | null) => {
  const freshDialogues = ambientDialogues.filter((dialogue) => dialogue.id !== previousId);
  const candidates = freshDialogues.length > 0 ? freshDialogues : ambientDialogues;
  const contextualDialogues = candidates.filter((dialogue) => dialogue.preferredParts?.includes(activePartId));
  const pool =
    contextualDialogues.length > 0 && Math.random() < 0.58 ? contextualDialogues : candidates;

  return pool[Math.floor(Math.random() * pool.length)];
};

export const App = () => {
  const [state, setState] = useLocalStorage<AppState>(
    STORAGE_KEY,
    createInitialState,
    (value) => normalizeStoredState(value as Partial<AppState> | null),
  );
  const [showCometInterlude, setShowCometInterlude] = useState(false);
  const [starlogOpen, setStarlogOpen] = useState(false);
  const [isTarotJournalOpen, setIsTarotJournalOpen] = useState(false);
  const [dialogueQueue, setDialogueQueue] = useState<DialogueOverlayRequest[]>([]);
  const { unlock, toast } = useAchievement(state, setState);
  const journey = useJourneyProgress(state, setState, unlock);
  const [isMinigameHubOpen, setIsMinigameHubOpen] = useState(false);
  const activeDialogue = dialogueQueue[0] ?? null;
  const lastAmbientDialogueIdRef = useRef<string | null>(null);
  const lastAmbientDialogueAtRef = useRef(0);

  const { increaseAffinity } = useAffinity(state, setState, requestDialogue);

  useEffect(() => {
    const visitKey = "four-years-two-stars:visit-counted";

    try {
      if (window.sessionStorage.getItem(visitKey)) {
        return;
      }

      window.sessionStorage.setItem(visitKey, "true");
    } catch {
      // Visit count is nice-to-have and should not block the experience.
    }

    setState((previous) => ({
      ...previous,
      visitCount: previous.visitCount + 1,
    }));
  }, [setState]);

  const requestDialogue = useCallback((dialogue: DialogueOverlayRequest) => {
    setDialogueQueue((previous) => [...previous, dialogue]);
  }, []);

  const closeActiveDialogue = useCallback(() => {
    setDialogueQueue((previous) => previous.slice(1));
  }, []);

  const markDialogueSeen = useCallback(
    (id: string) => {
      setState((previous) => {
        if (previous.directorCommentary.includes(id)) {
          return previous;
        }

        // Extract speaker from ID format e.g., "ambient:an-chi:..."
        const parts = id.split(":");
        if (parts.length >= 2) {
          const speaker = parts[1];
          // We queue the affinity increase in a timeout to avoid nested state updates
          setTimeout(() => increaseAffinity(speaker, 1), 0);
        }

        return {
          ...previous,
          directorCommentary: [...previous.directorCommentary, id],
        };
      });
    },
    [setState, increaseAffinity],
  );

  const hasSeenDialogue = useCallback(
    (id: string) => state.directorCommentary.includes(id),
    [state.directorCommentary],
  );

  useEffect(() => {
    if (!state.hasStarted || showCometInterlude || activeDialogue || starlogOpen || isMinigameHubOpen) {
      return undefined;
    }

    if (document.hidden) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      if (document.hidden) {
        return;
      }

      const elapsed = Date.now() - lastAmbientDialogueAtRef.current;
      if (elapsed < AMBIENT_DIALOGUE_MIN_INTERVAL_MS) {
        return;
      }

      const nextDialogue = pickAmbientDialogue(state.activePartId, lastAmbientDialogueIdRef.current);
      lastAmbientDialogueIdRef.current = nextDialogue.id;
      lastAmbientDialogueAtRef.current = Date.now();

      requestDialogue({
        speaker: nextDialogue.speaker,
        lines: nextDialogue.lines,
        align: nextDialogue.align,
        mood: nextDialogue.mood,
        dimBackground: false,
      });

      void audioManager.start().then(() => audioManager.playDialoguePopupCue());
    }, getAmbientDialogueDelay());

    return () => window.clearTimeout(timeoutId);
  }, [
    activeDialogue,
    isMinigameHubOpen,
    requestDialogue,
    showCometInterlude,
    starlogOpen,
    state.activePartId,
    state.hasStarted,
  ]);

  const enterJourney = useCallback(() => {
    const resumePartId = getResumePartId(state.completedParts);
    const scrollToResumePart = () => {
      window.setTimeout(() => {
        document.getElementById(resumePartId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    };
    const introDialogues: DialogueOverlayRequest[] = [
      { speaker: guides.kagura, lines: ["Xin chào, chúng tớ là LL Team"], mood: "soft" },
      { speaker: guides.kagura, lines: ["Tớ tên là Nhiên Anh, rất vui được chào hai cậu, tớ là leader của LL Team"], mood: "soft" },
      { speaker: guides.imed, lines: ["Tớ là Demi, phụ trách code, âm thanh và content của game."], mood: "soft" },
      { speaker: guides.anChi, lines: ["Còn tớ là An Chi. Tớ giữ mạch kể chuyện, những tín hiệu nhỏ và cả mấy lá bài hơi khó giải thích."], mood: "mysterious" },
      { speaker: guides.lilWayne, lines: ["Lô. Bổn tôn là Lil'Wayne. Bổn tôn làm bố ở đây."], mood: "funny" },
      { speaker: guides.nova, lines: ["Nói cái gì thế, đứa nào đánh nó một phát coi"], mood: "funny" },
      { speaker: guides.lilWayne, lines: ["Á thôi thôi, tớ là Lil'Wayne, code chơi chơi mấy cái vui vui hoặc đôi lúc chả vui lắm"], mood: "funny" },
      { speaker: guides.lilWayne, lines: ["Nhớ mặt đấy"], mood: "funny" },
      { speaker: guides.kuro, lines: ["Còn tớ là Mashiro, tớ lo phần nội dung và quản mấy nhóc này khỏi làm loạn."], mood: "soft" },
      { speaker: guides.nova, lines: ["Đây là Ren Phạm, nhớ lấy. Đây phụ trách kiểm tra mọi thứ xem có ổn không."], mood: "serious" },
      { speaker: guides.stone, lines: ["Tớ là Akatsuki Đập đá, người thổi chuyển động vào những cảnh mà các cậu sắp đi qua."], mood: "soft" },
      { speaker: guides.anChi, lines: ["Chúng tớ có sứ mệnh là sẽ dẫn dắt các cậu tìm tới ý nghĩa của con đường này"], mood: "mysterious" },
      { speaker: guides.nova, lines: ["Cơ mà, do những thế lực hắc ám, chúng tớ không thể trực tiếp tác động lên những thử thách mà cậu sẽ phải vượt qua."], mood: "serious" },
      { speaker: guides.kagura, lines: ["Chúng ta sẽ cùng đến với thử thách đầu tiên nhé?"], mood: "soft" },
      { speaker: guides.stone, lines: ["Bầu trời đêm thật đẹp phải không? Những ánh sao lấp lánh khiến cho tớ luôn thấy yên bình mỗi lần ngắm nhìn nó"], mood: "intimate" },
      { speaker: guides.anChi, lines: ["Người ta bảo nó cũng ẩn chứa những ý nghĩa, bản chất và năng lượng của con người đấy"], mood: "mysterious" },
      { speaker: guides.lilWayne, lines: ["Tao tưởng cái đấy là bịa ra để lừa trẻ con?"], mood: "funny" },
      { speaker: guides.kagura, lines: ["Suỵt nào, ai lại nói huỵch toẹt thế?"], mood: "funny" },
      { speaker: guides.lilWayne, lines: ["Ờ ờ..."], mood: "funny" },
      { speaker: guides.anChi, lines: ["Quay lại với vấn đề nhé, mỗi cách sắp xếp, các góc độ của từng ngôi sao đều là những phóng chiếu của vũ trụ lên các thực thể sống"], mood: "mysterious" },
      { speaker: guides.kuro, lines: ["Tất nhiên là có cả hai cậu rồi, hai nàng tinh linh bánh ngọt của chúng tớ"], mood: "intimate" },
      { speaker: guides.kagura, lines: ["Nhiệm vụ đầu tiên của các cậu, sẽ là tìm Tam Giác mùa hè trên bầu trời kia"], mood: "serious" },
      { speaker: guides.anChi, lines: ["Các cậu sẽ có được sự hướng dẫn của chúng tớ, nên đừng lo nhé!"], mood: "soft" },
      { speaker: guides.stone, lines: ["À, nó cũng là bầu trời sao vào đúng ngày này 4 năm trước đó!"], mood: "mysterious" },
      { speaker: guides.kagura, lines: ["Chúc may mắn"], mood: "soft", onComplete: scrollToResumePart },
    ];

    setState((previous) => ({
      ...previous,
      hasStarted: true,
      activePartId: resumePartId,
      currentSection: resumePartId,
    }));
    introDialogues.forEach(requestDialogue);
    /*
    requestDialogue({
      speaker: guides.kagura,
      lines: [
        "Cuộn băng bắt đầu rồi.",
        "Đi chậm thôi. Có những thứ chỉ hiện ra khi bạn chịu nhìn kỹ.",
      ],
      mood: "mysterious",
      onComplete: () => {
        window.setTimeout(() => {
          document.getElementById(resumePartId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      },
    });
    */
  }, [requestDialogue, setState, state.completedParts]);

  const handlePlay = () => {
    unlock("journey_started");
    unlock("tape_played");
    setShowCometInterlude(true);
  };

  const handleInterludeComplete = useCallback(() => {
    audioManager.setMood("sky");
    setShowCometInterlude(false);
    enterJourney();
  }, [enterJourney]);

  const handleCatchComet = useCallback(() => {
    unlock("comet_caught");
    increaseAffinity("an-chi", 2);
    requestDialogue({
      speaker: guides.anChi,
      mood: "soft",
      lines: [
        "Cậu vừa bắt được một ngôi sao chổi lướt qua sao?",
        "Tín hiệu này rất hiếm gặp. Nó mang theo một nguyện ước may mắn đấy. Chúc mừng cậu nhé.",
      ],
    });
  }, [unlock, requestDialogue]);

  const sectionBaseProps = useMemo(
    () => ({
      state,
      setState,
      unlock,
      completePart: journey.completePart,
      requestDialogue,
      markDialogueSeen,
      hasSeenDialogue,
      openStarlog: () => setStarlogOpen(true),
      openTarotJournal: () => setIsTarotJournalOpen(true),
    }),
    [hasSeenDialogue, journey.completePart, markDialogueSeen, requestDialogue, setState, state, unlock],
  );

  const visibleParts = journeyParts.filter((part) => journey.getPartStatus(part.id) !== "locked");

  return (
    <div className={styles.app}>
      <div className={styles.backdrop} aria-hidden="true">
        <StarfieldCanvas
          stars={backgroundStars}
          unlockedStars={state.unlockedStars}
          bright={state.activePartId === "finale"}
          showMoon
        />
      </div>
      <CursorTrail />
      <CustomCursor />

      {!state.hasStarted ? (
        showCometInterlude ? (
          <CometInterlude onComplete={handleInterludeComplete} />
        ) : (
          <TapeIntro onPlay={handlePlay} />
        )
      ) : (
        <>
          <main className={styles.journeyPage}>
            {visibleParts.map((part) => {
              const status = journey.getPartStatus(part.id);
              const PartComponent = partComponentMap[part.id];

              return (
                <JourneyPart
                  key={part.id}
                  id={part.id}
                  title={part.title}
                  status={status}
                  noFrame={part.id === "gacha"}
                >
                  <PartComponent
                    {...sectionBaseProps}
                    isActive={status === "active"}
                    isCompleted={status === "completed"}
                  />
                </JourneyPart>
              );
            })}
          </main>
          <button
            className={styles.starlogFab}
            type="button"
            onClick={() => setStarlogOpen(true)}
            aria-label="Open Starlog"
            title="Starlog"
          >
            {"\u2726"}
          </button>
          <button
            className={styles.arcadeFab}
            type="button"
            onClick={() => setIsMinigameHubOpen(true)}
            aria-label="Open Minigames"
            title="Mini Games (Gacha Farm)"
          >
            🎮
          </button>
        </>
      )}

      {isMinigameHubOpen && (
        <MinigamesHub
          state={state}
          setState={setState}
          onClose={() => setIsMinigameHubOpen(false)}
          increaseAffinity={increaseAffinity}
        />
      )}

      {state.hasStarted && !showCometInterlude && <CometEvent onCatch={handleCatchComet} />}

      {activeDialogue ? (
        <VisualNovelOverlay
          open={Boolean(activeDialogue)}
          speaker={activeDialogue.speaker}
          lines={activeDialogue.lines}
          align={activeDialogue.align}
          mood={activeDialogue.mood}
          dimBackground={activeDialogue.dimBackground}
          onComplete={activeDialogue.onComplete}
          onClose={closeActiveDialogue}
        />
      ) : null}

      <PinnedCharm state={state} />

      {isTarotJournalOpen && (
        <TarotJournal state={state} setState={setState} onClose={() => setIsTarotJournalOpen(false)} />
      )}

      <StarlogDrawer open={starlogOpen} state={state} onClose={() => setStarlogOpen(false)} openTarotJournal={() => setIsTarotJournalOpen(true)} />
      <AchievementToast id={toast?.id} title={toast?.title} />
    </div>
  );
};
