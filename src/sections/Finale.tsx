import { useEffect, useRef } from "react";
import { StarfieldCanvas } from "../components/Starfield/StarfieldCanvas";
import { guideList } from "../data/guides";
import { SectionProps } from "./sectionTypes";

const productionCredits = [
  { label: "Anniversary VTubers", names: "Linh Lan / Lan Linh" },
  ...guideList.map((member) => ({ label: member.role, names: member.name })),
  { label: "Special Thanks", names: "Những vì sao đã dẫn đường" },
  { label: "Presented by", names: "LL Team" },
];

export const Finale = ({
  state,
  setState,
  completePart,
  isActive,
  isCompleted,
  openStarlog,
}: SectionProps) => {
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!isActive || isCompleted || hasCompletedRef.current) {
      return undefined;
    }

    hasCompletedRef.current = true;
    const timeout = window.setTimeout(() => completePart("finale"), 21000);
    return () => window.clearTimeout(timeout);
  }, [completePart, isActive, isCompleted]);

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
    <div className="partStack finaleCreditsStack">
      <div className="finaleSky">
        <StarfieldCanvas unlockedStars={state.unlockedStars} bright />
      </div>

      <section className="creditScreen" aria-label="Final credits">
        <div className="creditRoll">
          <div className="creditTitle">
            <span>FOUR YEARS, TWO STARS</span>
            <h2>IV YEARS</h2>
            <p>Linh Lan x Lan Linh</p>
            <p>20.08.2022 -&gt; 20.08.2026</p>
          </div>

          {productionCredits.map((credit) => (
            <article className="creditLine" key={`${credit.label}-${credit.names}`}>
              <span>{credit.label}</span>
              <strong>{credit.names}</strong>
            </article>
          ))}

          <div className="creditTitle creditEnd">
            <span>END SIGNAL</span>
            <h2>Hẹn gặp lại ở năm thứ 8</h2>
            <p>Chúc mừng, Linh Lan và Lan Linh.</p>
          </div>
        </div>
      </section>

      <div className="finalePanel finaleControls">
        <span>{isCompleted ? "CREDIT COMPLETE" : "CREDIT ROLLING"}</span>
        <p>Credit đang chạy như phần kết của một cuốn phim nhỏ.</p>
        <div className="buttonRow">
          {!isCompleted ? (
            <button type="button" onClick={() => completePart("finale")}>
              Skip Credits
            </button>
          ) : null}
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
