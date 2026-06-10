import { useMemo, useState, useRef } from "react";
import { StarfieldCanvas } from "../components/Starfield/StarfieldCanvas";
import {
  constellationStars,
  keyStarIds,
  StarPoint,
  summerTriangleIds,
} from "../data/constellation";
import { guides } from "../data/guides";
import { audioManager } from "../lib/audioManager";
import { hasAchievement } from "../lib/achievements";
import { SectionProps } from "./sectionTypes";

const REQUIRED_SUMMER_STARS = 3;
const ALL_STARS_MEMORY_NOTE =
  "Vào đêm 20/08, nếu trời đủ trong ở Sài Gòn, cậu có thể ngẩng lên và tìm thấy Tam Giác Mùa Hè. Ba ngôi sao không thuộc cùng một chòm, nhưng lại được con người nối lại thành một dấu hiệu quen thuộc trong suốt hàng nghìn năm qua. Giống như ngày hôm đó là một ngày mà bọn tớ muốn giữ lại khi cả bầu trời đã chứng kiến ngày mà hai cậu đến với mọi người!";

export const Constellation = ({
  state,
  setState,
  unlock,
  completePart,
  requestDialogue,
  isCompleted,
}: SectionProps) => {
  const [showGrid, setShowGrid] = useState(false);
  const [selectedStar, setSelectedStar] = useState<StarPoint | null>(null);
  const [readingStar, setReadingStar] = useState<StarPoint | null>(null);
  const [toastNote, setToastNote] = useState<{ id: string, text: string, x: number, y: number } | null>(null);
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);
  const [showAllStarsPopup, setShowAllStarsPopup] = useState(false);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const choseToStay = useRef(false);
  const watcherUnlocked = hasAchievement(state, "watcher");
  const foundSummerStars = summerTriangleIds.filter((id) =>
    state.constellationSpecialStars.includes(id),
  );
  const summerCount = foundSummerStars.length;
  const nextTargetId = summerTriangleIds.find((id) => !foundSummerStars.includes(id));
  const nextTarget = useMemo(
    () => constellationStars.find((star) => star.id === nextTargetId) ?? null,
    [nextTargetId],
  );
  const foundHiddenStars = keyStarIds.filter((id) => state.unlockedStars.includes(id)).length;

  const handleStarClick = (star: StarPoint) => {
    audioManager.setMood("sky");
    audioManager.playUiSound("star");
    setSelectedStar(star);

    const nextUnlockedStars = state.unlockedStars.includes(star.id)
      ? state.unlockedStars
      : [...state.unlockedStars, star.id];
    const nextSummerStars =
      star.kind === "summer" && !state.constellationSpecialStars.includes(star.id)
        ? [...state.constellationSpecialStars, star.id]
        : state.constellationSpecialStars;
    const nextSummerCount = summerTriangleIds.filter((id) => nextSummerStars.includes(id)).length;

    setState((previous) => ({
      ...previous,
      unlockedStars: previous.unlockedStars.includes(star.id)
        ? previous.unlockedStars
        : [...previous.unlockedStars, star.id],
      constellationSpecialStars:
        star.kind === "summer" && !previous.constellationSpecialStars.includes(star.id)
          ? [...previous.constellationSpecialStars, star.id]
          : previous.constellationSpecialStars,
    }));

    if (nextUnlockedStars.length > state.unlockedStars.length) {
      unlock("constellation_touched");
    }

    if (star.kind === "key" && star.unlockAchievement) {
      const hadKey = hasAchievement(state, star.unlockAchievement);
      unlock(star.unlockAchievement);

      if (!hadKey) {
        requestDialogue({
          speaker: guides.nova,
          lines: [
            "Cậu vừa tìm thấy một ngôi sao ẩn.",
            "Biết đâu sau này nó sẽ có ích.",
          ],
          mood: "mysterious",
        });
      }
    }

    if (nextSummerCount >= REQUIRED_SUMMER_STARS && !watcherUnlocked) {
      unlock("watcher");
    }

    if (star.kind === "secondary" || star.kind === "secret" || star.kind === "poetic") {
      setToastNote({ id: star.id, text: star.fact ?? "", x: star.x, y: star.y });
      setTimeout(() => {
        setToastNote(current => current?.id === star.id ? null : current);
      }, 2500);
    }

    if (nextUnlockedStars.length === 20 && !hasAchievement(state, "all_stars_remembered")) {
      unlock("all_stars_remembered");
      [
        {
          speaker: guides.kagura,
          lines: ["Chúc mừng, toàn bộ những gì chúng tớ ẩn giấu đều đã bị các cậu tìm ra"],
          mood: "soft" as const,
        },
        {
          speaker: guides.lilWayne,
          lines: ["Dễ mà?"],
          mood: "funny" as const,
        },
        {
          speaker: guides.nova,
          lines: ["Đứa nào bắt nó im giúp với"],
          mood: "funny" as const,
        },
        {
          speaker: guides.lilWayne,
          lines: ["Ê ê ê"],
          mood: "funny" as const,
        },
        {
          speaker: guides.imed,
          lines: [
            "Dù sao thì, hãy ghi nhớ những thông tin của những ngôi sao này nhé, biết đâu nó lại có ích thì sao.",
          ],
          mood: "mysterious" as const,
          onComplete: () => setShowAllStarsPopup(true),
        },
      ].forEach(requestDialogue);
    }

    if (
      nextUnlockedStars.length < 20 &&
      nextSummerCount >= REQUIRED_SUMMER_STARS &&
      !isCompleted &&
      !choseToStay.current &&
      !showCompletionPrompt
    ) {
      setShowCompletionPrompt(true);
    }
  };

  const handleComplete = () => {
    setIsZoomingOut(true);
    setTimeout(() => {
      completePart("constellation");
    }, 4000);
  };

  return (
    <div className={`partStack constellationStack ${isZoomingOut ? "zoomingOut" : ""}`}>
      <div className="skyObservationLayout">
        <div className={`constellationStage ${showGrid ? "hasGrid" : ""}`}>
          <StarfieldCanvas unlockedStars={state.unlockedStars} onStarClick={handleStarClick} />
          {showGrid ? (
            <div className="constellationGridOverlay" aria-hidden="true">
              <span className="gridAxis x0">X 0</span>
              <span className="gridAxis x50">X 50</span>
              <span className="gridAxis x100">X 100</span>
              <span className="gridAxis y0">Y 0</span>
              <span className="gridAxis y50">Y 50</span>
              <span className="gridAxis y100">Y 100</span>
            </div>
          ) : null}
          
          {toastNote && (
            <div 
              className="starToastNote" 
              style={{ left: `calc(${toastNote.x}% + 20px)`, bottom: `calc(${toastNote.y}% + 20px)` }}
            >
              {toastNote.text}
            </div>
          )}

          <div className="skyMapHud">
            <div className="tinyPanel constellationReadout">
              <span>SAO MÙA HÈ</span>
              <strong>
                {Math.min(summerCount, REQUIRED_SUMMER_STARS)}/{REQUIRED_SUMMER_STARS}
              </strong>
              <small>
                {foundHiddenStars > 0 ? `${foundHiddenStars} ngôi sao ẩn đã tìm thấy.` : "Hint nằm ở bên cạnh."}
              </small>
            </div>
            <div className="skyMapActions">
              <button type="button" onClick={() => setShowGrid((value) => !value)}>
                {showGrid ? "Tắt lưới tọa độ" : "Bật lưới tọa độ"}
              </button>
            </div>
          </div>
        </div>

        <div className="skyControlPanel">
          <div className="skyPurpose">
            <span>ĐÀI QUAN SÁT 20.08</span>
            <strong>Tìm Tam giác Mùa Hè</strong>
          </div>

          <div className="skyHintCard">
            <span>GỢI Ý TIẾP THEO</span>
            {nextTarget ? (
              <>
                <strong>{nextTarget.skyName ?? nextTarget.label}</strong>
                <p>{nextTarget.fact ?? "Khám phá một vì sao..."}</p>
                <small>{nextTarget.coord}</small>
              </>
            ) : (
              <>
                <strong>Tam giác đã nối xong</strong>
                <p>Khám phá phần còn lại của bầu trời hoặc nhấn Tiếp tục khi đã sẵn sàng.</p>
                {!isCompleted && (choseToStay.current || state.unlockedStars.length >= 20) ? (
                  <button className="readMoreBtn" onClick={handleComplete} style={{ marginTop: "0.5rem" }} disabled={isZoomingOut}>
                    Chuyển sang phần tiếp theo
                  </button>
                ) : null}
              </>
            )}
          </div>

          <div className="skyExplorerPanel">
            <span>{selectedStar ? "SAO ĐANG ĐỌC" : "KHÁM PHÁ"}</span>
            {selectedStar ? (
              <div className="skyExplorerContent">
                <div className="skyExplorerHeader">
                  <strong>{selectedStar.skyName ?? selectedStar.label}</strong>
                  <small>Tọa độ tương đối: {selectedStar.coord}</small>
                </div>
                <div className="skyExplorerDetails">
                  <p>{selectedStar.fact ?? "Một điểm sáng nhỏ trong nền trời mùa hạ."}</p>
                </div>
                {selectedStar.astronomy ? (
                  <button className="readMoreBtn" onClick={() => setReadingStar(selectedStar)}>
                    Đọc thêm thông tin
                  </button>
                ) : null}
                {selectedStar.kind === "key" ? <em className="keyBadge">Ngôi sao ẩn</em> : null}
              </div>
            ) : (
              <p>Chạm một ngôi sao bất kỳ trên bản đồ để xem tên, tọa độ và một mẩu chuyện nhỏ.</p>
            )}
          </div>
        </div>
      </div>

      {readingStar ? (
        <div className="starModalBackdrop" onClick={() => setReadingStar(null)}>
          <div className="starModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="starModalClose" onClick={() => setReadingStar(null)}>
              ✕
            </button>
            <div className="skyExplorerHeader">
              <strong>{readingStar.skyName ?? readingStar.label}</strong>
              <small>Tọa độ tương đối: {readingStar.coord}</small>
            </div>
            <div className="starModalBody">
              {readingStar.image ? (
                <img src={readingStar.image} alt={readingStar.label} className="starModalImage" />
              ) : null}
              <article>
                <b>Thiên văn:</b>
                <div className="astronomyDetails">
                  {readingStar.astronomy?.split(/,\s+(?=[A-ZĐ])/).map((item, i) => (
                    <p key={i}>- {item}</p>
                  ))}
                </div>
              </article>
              <article>
                <b>Chiêm tinh:</b>
                <p>{readingStar.astrology}</p>
              </article>
              <article>
                <b>Fun Fact:</b>
                <p>{readingStar.fact}</p>
              </article>
            </div>
          </div>
        </div>
      ) : null}

      {showCompletionPrompt ? (
        <div className="starModalBackdrop" style={{ zIndex: 200 }}>
          <div className="starModalContent" style={{ textAlign: "center" }}>
            <strong style={{ color: "var(--cream)", fontSize: "1.5rem" }}>Tam giác mùa hè đã nối xong</strong>
            <p style={{ marginTop: "1rem", color: "var(--cream-dim)" }}>Bạn muốn tiếp tục hành trình ngay, hay nán lại một chút để tìm những ngôi sao đang ẩn giấu?</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
              <button className="readMoreBtn" onClick={() => {
                setShowCompletionPrompt(false);
                choseToStay.current = true;
              }}>
                Nán lại một chút
              </button>
              <button className="readMoreBtn" onClick={() => {
                setShowCompletionPrompt(false);
                handleComplete();
              }} style={{ background: "rgba(216, 180, 92, 0.2)" }} disabled={isZoomingOut}>
                Đi tiếp
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showAllStarsPopup ? (
        <div className="starModalBackdrop" style={{ zIndex: 220 }} onClick={() => setShowAllStarsPopup(false)}>
          <div className="starModalContent allStarsAchievementPopup" onClick={(event) => event.stopPropagation()}>
            <button className="starModalClose" onClick={() => setShowAllStarsPopup(false)}>
              ×
            </button>
            <div className="allStarsAchievementBadge">
              <span>Achievement unlocked</span>
              <strong>All Stars Remembered</strong>
            </div>
            <p>{ALL_STARS_MEMORY_NOTE}</p>
            <button className="readMoreBtn" type="button" onClick={() => setShowAllStarsPopup(false)}>
              Giữ lại ký ức này
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
};
