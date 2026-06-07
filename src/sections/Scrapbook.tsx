import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { guides } from "../data/guides";
import { linhLanChapters, lanLinhChapters, ScrapbookChapter } from "../data/scrapbook";
import { SectionProps } from "./sectionTypes";
import { Polaroid } from "../components/scrapbook/Polaroid";
import { MarginNote } from "../components/scrapbook/MarginNote";
import { Paperclip } from "../components/scrapbook/Paperclip";
import { ScrapbookQuiz } from "../components/scrapbook/ScrapbookQuiz";

// react-pageflip requires forwardRef on custom page components
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; onWheel?: (e: React.WheelEvent) => void }>(
  ({ children, className = "", onWheel }, ref) => {
    return (
      <div className={`page ${className}`} ref={ref} onWheel={onWheel}>
        {children}
      </div>
    );
  }
);
Page.displayName = "Page";

export const Scrapbook = ({
  state,
  setState,
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
  unlock,
  openStarlog,
}: SectionProps) => {
  const [activeBook, setActiveBook] = useState<"LinhLan" | "LanLinh">("LinhLan");
  const [isSwapping, setIsSwapping] = useState(false);
  const activeChapters = activeBook === "LinhLan" ? linhLanChapters : lanLinhChapters;
  
  // Track page index globally
  const [pageIndex, setPageIndex] = useState(0);
  
  const [openedPaperclips, setOpenedPaperclips] = useState<Set<string>>(new Set());
  const [triggeredMarginNotes, setTriggeredMarginNotes] = useState<Set<string>>(new Set());
  const scrollTracker = useRef({ lastTime: 0, count: 0 });
  const bookRef = useRef<any>(null);
  const hasQueuedIntroRef = useRef(false);

  // Derive chapter index (each chapter has 4 pages, so pageIndex / 4)
  const currentChapterIndex = Math.floor(pageIndex / 4);
  const chapter = activeChapters[currentChapterIndex] || activeChapters[0];

  useEffect(() => {
    if (!state.scrapbookUnlocked) return;
    const dialogueId = "dialogue:scrapbook:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);
    requestDialogue({
      speaker: guides.kuro,
      lines: ["Ký ức thì không phải để giấu đúng không"],
      mood: "soft",
    });
    requestDialogue({
      speaker: guides.imed,
      lines: ["It is what defines us"],
      mood: "mysterious",
    });
  }, [hasSeenDialogue, isActive, markDialogueSeen, requestDialogue, state.scrapbookUnlocked]);

  const handleToggleBook = (book: "LinhLan" | "LanLinh") => {
    if (book === activeBook || isSwapping) return;
    setIsSwapping(true);
    setTimeout(() => {
      setActiveBook(book);
      setPageIndex(0);
      setIsSwapping(false);
    }, 50);
  };

  const onFlip = (e: any) => {
    const newPageIndex = e.data;
    setPageIndex(newPageIndex);
    
    // Calculate new chapter index
    const newChapterIndex = Math.floor(newPageIndex / 4);
    
    // Unlock chapter complete if we flipped to the next chapter
    if (newChapterIndex > 0 && newChapterIndex > currentChapterIndex) {
      unlock(`scrapbook:year-0${newChapterIndex}-complete`);
    }

  };

  const handleContinueToTarot = () => {
    if (!isCompleted) {
      completePart("scrapbook");
    }

    window.setTimeout(() => {
      document.getElementById("tarot")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < -50) {
      const now = Date.now();
      if (now - scrollTracker.current.lastTime < 300) {
        scrollTracker.current.count += 1;
        if (scrollTracker.current.count > 5) {
          window.dispatchEvent(new CustomEvent("easter-egg:rewind-glitch"));
          scrollTracker.current.count = 0;
        }
      } else {
        scrollTracker.current.count = 1;
      }
      scrollTracker.current.lastTime = now;
    }
  };

  const handlePaperclipToggle = (id: string) => {
    setOpenedPaperclips((prev) => {
      const next = new Set(prev);
      next.add(id);
      if (next.size === 4) unlock("scrapbook:all-paperclips");
      return next;
    });
  };

  const handleMarginNoteTrigger = (id: string) => {
    setTriggeredMarginNotes((prev) => {
      const next = new Set(prev);
      next.add(id);
      if (next.size === 8) unlock("scrapbook:all-margin-notes");
      return next;
    });
  };

  const renderCipherDescription = (text: string, ch: ScrapbookChapter) => {
    if (!ch.id.includes("year-02")) return <p>{text}</p>;
    
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return (
      <p>
        {parts.map((part, i) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            const char = part.slice(1, -1);
            return (
              <span key={i} className="cipherChar" style={{ color: 'var(--gold)', textShadow: '0 0 8px rgba(216, 180, 92, 0.6)', fontWeight: 'bold' }}>
                {char}
              </span>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </p>
    );
  };

  if (!state.scrapbookUnlocked) {
    return (
      <div className="partStack scrapbookContainer" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ScrapbookQuiz 
          state={state} 
          setState={setState} 
          completePart={completePart} 
          requestDialogue={requestDialogue} 
          markDialogueSeen={markDialogueSeen} 
          hasSeenDialogue={hasSeenDialogue} 
          isActive={isActive} 
          isCompleted={isCompleted} 
          unlock={unlock} 
          openStarlog={openStarlog}
        />
      </div>
    );
  }

  return (
    <div 
      className="partStack scrapbookContainer" 
      style={{ 
        flexDirection: 'column', 
        alignItems: 'center',
        "--page-tint": activeBook === "LinhLan" ? "rgba(155, 110, 200, 0.08)" : "rgba(239, 136, 190, 0.08)",
        "--theme-accent": activeBook === "LinhLan" ? "#C8A8F0" : "#f6a9d1"
      } as React.CSSProperties}
    >
      <div className="scrapbookToggleUI">
        <button 
          className={`toggleBtn ${activeBook === "LinhLan" ? "active" : ""}`}
          onClick={() => handleToggleBook("LinhLan")}
        >
          Linh Lan's Scrapbook
        </button>
        <button 
          className={`toggleBtn ${activeBook === "LanLinh" ? "active" : ""}`}
          onClick={() => handleToggleBook("LanLinh")}
        >
          Lan Linh's Scrapbook
        </button>
      </div>
      
      <div className="spreadContainer" style={{ width: 'min(1200px, 80vw)', height: 'min(800px, 80vh)', border: 'none', background: 'transparent', boxShadow: 'none' }}>
        {!isSwapping && (
          /* @ts-ignore - react-pageflip typings are somewhat loose */
          <HTMLFlipBook 
            key={activeBook}
            width={600} 
            height={800} 
            size="stretch" 
            minWidth={300} 
            maxWidth={1000} 
            minHeight={400} 
            maxHeight={1533} 
            maxShadowOpacity={0.5} 
            showCover={false} 
            mobileScrollSupport={true} 
            className="scrapbookBook"
            onFlip={onFlip}
            ref={bookRef}
          >
            {activeChapters.map((ch, idx) => (
              [
                /* Page 1 (Left): Recap */
                <Page key={`p1-${ch.id}`} className={`leftPage ${ch.textureClass}`} onWheel={handleWheel}>
                  <div style={{ "--chapter-accent": ch.color } as React.CSSProperties}>
                    <div className="chapterHeader" style={{ color: ch.color }}>{ch.label}</div>
                    <h2 className="chapterTitle">{ch.title}</h2>
                    <div className="chapterDescription">
                      {renderCipherDescription(ch.recap, ch)}
                    </div>
                    <div className="timestamp" onDoubleClick={() => window.dispatchEvent(new CustomEvent("easter-egg:directors-commentary", { detail: { guide: "lil-wayne", chapterYear: ch.stamp } }))} style={{ cursor: 'pointer', marginTop: '2rem' }}>
                      {ch.yearSpan}
                    </div>
                    <div className="pageStamp" style={{ borderColor: ch.color, color: ch.color }}>
                      {ch.stamp}
                    </div>
                  </div>
                </Page>,

                /* Page 2 (Right): Image */
                <Page key={`p2-${ch.id}`} className={`rightPage ${ch.textureClass}`} onWheel={handleWheel}>
                  <div style={{ "--chapter-accent": ch.color, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' } as React.CSSProperties}>
                    <div className="postmarkStamp" style={{ color: "var(--gold)" }}>{ch.stamp} Postmark</div>
                    <Polaroid 
                      id={`img-${ch.id}`}
                      mediaPlaceholder={ch.image}
                      isLarge={true}
                      rotation={Math.random() * 8 - 4} 
                    />
                    <div className="polaroidCaptionHandwritten">
                      [Image for {ch.stamp}]
                    </div>
                    <div className="highlightMark" style={{ backgroundColor: ch.color }} />
                    <div className="paperclipWrapper">
                      <Paperclip 
                        id={`clip-${ch.id}`} 
                        note={ch.paperclipNote} 
                        onOpen={() => handlePaperclipToggle(`clip-${ch.id}`)} 
                      />
                    </div>
                  </div>
                </Page>,

                /* Page 3 (Left): Video */
                <Page key={`p3-${ch.id}`} className={`leftPage ${ch.textureClass}`} onWheel={handleWheel}>
                  <div style={{ "--chapter-accent": ch.color, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } as React.CSSProperties}>
                    <Polaroid 
                      id={`vid-${ch.id}`}
                      mediaPlaceholder={ch.video}
                      isLarge={true}
                      isVideo={true}
                      rotation={Math.random() * 8 - 4}
                    />
                    <div className="polaroidCaptionHandwritten" style={{ marginTop: '2rem' }}>
                      [Video Recap {ch.stamp}]
                    </div>
                  </div>
                </Page>,

                /* Page 4 (Right): Quote and Notes */
                <Page key={`p4-${ch.id}`} className={`rightPage ${ch.textureClass}`} onWheel={handleWheel}>
                  <div style={{ "--chapter-accent": ch.color, display: 'flex', flexDirection: 'column', height: '100%' } as React.CSSProperties}>
                    <div className="quoteBlock">
                      <span className="quoteMark" style={{ color: ch.color }}>❝</span>
                      <p className="quoteText">{ch.quote.text}</p>
                      <span className="quoteMark" style={{ color: ch.color }}>❞</span>
                      <div className="quoteSpeaker">— {ch.quote.speaker}</div>
                    </div>
                    <div className="marginNotesList">
                      {ch.marginNotes.map((note, nIdx) => (
                        <MarginNote 
                          key={nIdx}
                          id={`note-${ch.id}-${nIdx}`}
                          author={note.author}
                          text={note.text}
                          requestDialogue={requestDialogue}
                          onTrigger={() => handleMarginNoteTrigger(`note-${ch.id}-${nIdx}`)}
                        />
                      ))}
                    </div>
                  </div>
                </Page>
              ]
            )).flat()}
          </HTMLFlipBook>
        )}
      </div>

      {!isCompleted ? (
        <div className="scrapbookContinuePanel">
          <div>
            <span>TÍN HIỆU SẴN SÀNG</span>
            <p>Khi đã xem đủ những trang muốn giữ lại, mở thử thách tiếp theo.</p>
          </div>
          <button className="primaryAction" type="button" onClick={handleContinueToTarot}>
            Sang phần Tarot
          </button>
        </div>
      ) : null}
    </div>
  );
};
