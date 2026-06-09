import { useEffect, useRef } from "react";
import { guides } from "../data/guides";
import { DialogueOverlayRequest, SectionProps } from "./sectionTypes";

const moonFacts = [
  {
    date: "20.08.2022",
    phase: "Waning Crescent",
    viPhase: "Trăng khuyết tàn",
    tone: "Một vệt sáng đang nhỏ lại",
    className: "waning2022",
    stats: ["Khoảng 41% đĩa trăng được chiếu sáng", "Sau Last Quarter ngày 19.08", "Đang đi dần về New Moon 27.08"],
    story:
      "Đêm ấy phần sáng của Mặt Trăng đang thu lại. Bầu trời vì thế tối và sâu hơn, giống một khoảng lặng vừa đủ để các vì sao nhỏ có cơ hội hiện ra.",
  },
  {
    date: "20.08.2026",
    phase: "First Quarter",
    viPhase: "Trăng bán nguyệt đầu tháng",
    tone: "Một nửa sáng vừa bật lên",
    className: "firstQuarter2026",
    stats: [
      "First Quarter rơi vào khoảng 09:46 giờ Việt Nam",
      "Trăng mọc ban ngày và nổi rõ vào buổi tối",
      "Sau mốc này, trăng đi dần về waxing gibbous",
    ],
    story:
      "Bốn năm sau, Mặt Trăng quay lại với nửa mặt sáng rõ hơn. Nó không còn là một dấu lặng, mà giống một cánh cửa vừa hé, dẫn ký ức đi sang chương kế tiếp.",
  },
];

export const MoonPhase = ({
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
}: SectionProps) => {
  const hasQueuedRef = useRef(false);

  useEffect(() => {
    const dialogueId = "dialogue:moonphase:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedRef.current) {
      return;
    }

    hasQueuedRef.current = true;
    markDialogueSeen(dialogueId);
    const dialogues: DialogueOverlayRequest[] = [
      {
        speaker: guides.kagura,
        lines: ["Nghỉ ngơi một chút nhé"],
        mood: "soft",
      },
      {
        speaker: guides.stone,
        lines: [
          "Đây là pha trăng trong ngày cậu lần đầu xuất hiện",
          "Tớ luôn thấy đây là một điều trùng hợp",
          "Trông hai phần nếu ghép vào nhau như vừa khít vào nhau ấy nhỉ",
        ],
        mood: "intimate",
      },
      {
        speaker: guides.lilWayne,
        lines: ["Hả tháng nào chả thế?"],
        mood: "funny",
      },
      {
        speaker: guides.kagura,
        lines: ["*bonk*"],
        mood: "funny",
      },
      {
        speaker: guides.stone,
        lines: ["Đẹp lắm, đúng không?"],
        mood: "intimate",
      },
    ];

    dialogues.forEach(requestDialogue);
  }, [hasSeenDialogue, isActive, markDialogueSeen, requestDialogue]);

  return (
    <div className="partStack moonPhaseStack">
      <section className="moonPhaseHero">
        <div className="moonPhaseIntro">
          <span>PHA TRĂNG 20.08</span>
          <h2>Hai đêm, hai nhịp sáng</h2>
          <p>
            Cùng là ngày 20.08, nhưng ánh trăng của hai năm lại nằm ở hai khoảnh khắc rất khác nhau
            trong chu kỳ 29.5 ngày của Mặt Trăng.
          </p>
        </div>

        <div className="moonPhaseCards">
          {moonFacts.map((item) => (
            <article className="moonPhaseCard" key={item.date}>
              <figure className="moonPhaseFigure">
                <div className={`moonDisc moonPhaseImage ${item.className}`} aria-hidden="true" />
                <figcaption>Mô phỏng pha trăng nhìn từ Trái Đất</figcaption>
              </figure>

              <div className="moonPhaseCopy">
                <span>{item.date}</span>
                <strong>{item.viPhase}</strong>
                <em>{item.phase}</em>
                <small>{item.tone}</small>
                <p>{item.story}</p>
                <ul>
                  {item.stats.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="moonPhaseBridge">
        <div>
          <span>GHI CHÚ NHỎ</span>
          <p>
            Năm 2022 là ánh sáng đang khép lại. Năm 2026 là ánh sáng vừa mở ra. Giữa hai pha trăng
            đó, những mẩu ký ức tiếp theo đang chờ đón.
          </p>
        </div>

        {!isCompleted ? (
          <button className="primaryAction" type="button" onClick={() => completePart("moonphase")}>
            Xem VTuber Art
          </button>
        ) : null}
      </section>
    </div>
  );
};
