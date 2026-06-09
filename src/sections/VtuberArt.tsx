import { useEffect, useRef } from "react";
import { guides } from "../data/guides";
import { SectionProps } from "./sectionTypes";

const vtuberArtSlots = [
  {
    name: "Linh Lan",
    label: "VTuber I",
    imageSrc: "",
    note: "Khung art dành cho Linh Lan. Có thể đặt ảnh tại public/vtubers/linh-lan.png rồi gắn vào đây.",
  },
  {
    name: "Lan Linh",
    label: "VTuber II",
    imageSrc: "",
    note: "Khung art dành cho Lan Linh. Có thể đặt ảnh tại public/vtubers/lan-linh.png rồi gắn vào đây.",
  },
];

export const VtuberArt = ({
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
}: SectionProps) => {
  const hasQueuedRef = useRef(false);

  useEffect(() => {
    const dialogueId = "dialogue:vtuber-art:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedRef.current) {
      return;
    }

    hasQueuedRef.current = true;
    markDialogueSeen(dialogueId);
    requestDialogue({
      speaker: guides.stone,
      lines: [
        "Trước khi mở cuốn sổ, để tụi tớ dành riêng một khoảng cho art của hai cậu.",
        "Hai ánh trăng vừa khép lại, giờ đến lượt hai hình bóng được đặt dưới ánh sao.",
      ],
      mood: "intimate",
    });
  }, [hasSeenDialogue, isActive, markDialogueSeen, requestDialogue]);

  return (
    <div className="partStack artShowcaseStack">
      <section className="artShowcaseIntro">
        <span>VTUBER ART</span>
        <h2>Hai hình bóng dưới cùng một bầu trời</h2>
        <p>
          Một phần riêng để lưu art của Linh Lan và Lan Linh trước khi bước vào những trang ký ức.
        </p>
      </section>

      <section className="vtuberArtGrid" aria-label="VTuber art gallery">
        {vtuberArtSlots.map((slot) => (
          <article className="vtuberArtCard" key={slot.name}>
            <div className="vtuberArtFrame">
              {slot.imageSrc ? (
                <img src={slot.imageSrc} alt={`${slot.name} art`} />
              ) : (
                <div className="vtuberArtPlaceholder" aria-hidden="true">
                  <span>{slot.label}</span>
                  <strong>{slot.name}</strong>
                </div>
              )}
            </div>
            <div className="vtuberArtCaption">
              <span>{slot.label}</span>
              <h3>{slot.name}</h3>
              <p>{slot.note}</p>
            </div>
          </article>
        ))}
      </section>

      {!isCompleted ? (
        <button className="primaryAction" type="button" onClick={() => completePart("vtuberArt")}>
          Mở Scrapbook
        </button>
      ) : null}
    </div>
  );
};
