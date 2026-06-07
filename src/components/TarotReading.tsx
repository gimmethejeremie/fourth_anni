import { useMemo, useState } from "react";
import { tarotTopicLabels, TarotTopic } from "../data/tarotDeck";
import { DrawnTarotCard, drawTarotSpread } from "../lib/tarot";

type SpreadCount = 1 | 3;

export type TarotReadingResult = {
  topic: TarotTopic;
  topicLabel: string;
  question: string;
  spreadCount: SpreadCount;
  cards: DrawnTarotCard[];
};

type TarotReadingProps = {
  onReadingComplete?: (reading: TarotReadingResult) => void;
};

const tarotTopics = Object.keys(tarotTopicLabels) as TarotTopic[];
const spreadPositions = ["Quá khứ", "Hiện tại", "Lời khuyên"];

export const TarotReading = ({ onReadingComplete }: TarotReadingProps) => {
  const [topic, setTopic] = useState<TarotTopic>("general");
  const [question, setQuestion] = useState("");
  const [spreadCount, setSpreadCount] = useState<SpreadCount>(1);
  const [drawnCards, setDrawnCards] = useState<DrawnTarotCard[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const trimmedQuestion = useMemo(() => question.trim(), [question]);

  const handleDraw = () => {
    const cards = drawTarotSpread(spreadCount, topic);
    setDrawnCards(cards);
    setImageErrors({});

    // TODO: Later wire generateTarotNarration(question, topic, drawnCards) here when AI narration is introduced.
    onReadingComplete?.({
      topic,
      topicLabel: tarotTopicLabels[topic],
      question: trimmedQuestion,
      spreadCount,
      cards,
    });
  };

  return (
    <div className="tarotReadingModule">
      <section className="tarotConsole" aria-label="Tarot reading controls">
        <div className="tarotConsoleHeader">
          <span>TAROT CHANNEL</span>
          <h2>Máy đọc tín hiệu</h2>
          <p>Chọn một chủ đề, giữ câu hỏi trong đầu, rồi để lá bài trả lời bằng một lớp sương mềm.</p>
        </div>

        <div className="tarotControls">
          <label>
            <span>Chủ đề</span>
            <select value={topic} onChange={(event) => setTopic(event.target.value as TarotTopic)}>
              {tarotTopics.map((item) => (
                <option key={item} value={item}>
                  {tarotTopicLabels[item]}
                </option>
              ))}
            </select>
          </label>

          <div className="tarotSpreadToggle" aria-label="Chọn số lá">
            <button
              type="button"
              className={spreadCount === 1 ? "selected" : ""}
              aria-pressed={spreadCount === 1}
              onClick={() => setSpreadCount(1)}
            >
              1 lá
            </button>
            <button
              type="button"
              className={spreadCount === 3 ? "selected" : ""}
              aria-pressed={spreadCount === 3}
              onClick={() => setSpreadCount(3)}
            >
              3 lá
            </button>
          </div>

          <button className="tarotDrawButton" type="button" onClick={handleDraw}>
            Rút bài
          </button>
        </div>
      </section>

      <section className="tarotResultPanel" aria-live="polite" style={{ display: 'flex', flexDirection: 'column' }}>
        {drawnCards.length ? (
          <>
            <div className={`tarotSpread tarotSpread${drawnCards.length}`}>
              {drawnCards.map((drawnCard, index) => {
                const cardKey = `${drawnCard.card.id}-${drawnCard.orientation}`;
                const hasImageError = imageErrors[drawnCard.card.id];
                const positionLabel = drawnCards.length === 3 ? spreadPositions[index] : "Lá bài";

                return (
                  <article className="tarotResultCard" key={cardKey} style={{ "--card-index": index } as React.CSSProperties}>
                    <span className="tarotPosition">{positionLabel}</span>
                    <div className={`tarotImageFrame ${drawnCard.orientation === "reversed" ? "isReversed" : ""}`}>
                      {hasImageError ? (
                        <div className="tarotCardBack">
                          <span>{drawnCard.card.viName}</span>
                        </div>
                      ) : (
                        // Card images should be stored locally in /public/cards. Prefer public-domain Rider–Waite–Smith scans or original artwork. Do not hotlink random images from the web.
                        <img
                          src={drawnCard.card.image}
                          alt={`${drawnCard.card.name} tarot card`}
                          onError={() =>
                            setImageErrors((previous) => ({
                              ...previous,
                              [drawnCard.card.id]: true,
                            }))
                          }
                        />
                      )}
                    </div>
                    <div className="tarotCardText">
                      <span>{drawnCard.orientationLabel}</span>
                      <h3>
                        {drawnCard.card.name} <small>({drawnCard.card.viName})</small>
                      </h3>
                      <ul className="tarotKeywords">
                        {drawnCard.keywords.map((keyword) => (
                          <li key={keyword}>{keyword}</li>
                        ))}
                      </ul>
                      <p>{drawnCard.meaning}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="tarotIdle">
            <div className="tarotCardBack" aria-hidden="true">
              <span>✦</span>
            </div>
            <p>Hãy nghĩ về câu hỏi của bạn. Khi đã sẵn sàng, hãy rút một lá bài.</p>
          </div>
        )}

        <p className="tarotDisclaimer" style={{ marginTop: 'auto', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
          Phần bói bài này chỉ dành cho giải trí và tự suy ngẫm, không phải lời khuyên chuyên môn.
        </p>
      </section>
    </div>
  );
};
