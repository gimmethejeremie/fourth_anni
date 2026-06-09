import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { guideList, guides } from "../data/guides";
import { SectionProps } from "./sectionTypes";

export const TeamGallery = ({
  completePart,
  requestDialogue,
  markDialogueSeen,
  hasSeenDialogue,
  isActive,
  isCompleted,
}: SectionProps) => {
  const hasQueuedRef = useRef(false);

  useEffect(() => {
    const dialogueId = "dialogue:team-gallery:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedRef.current) {
      return;
    }

    hasQueuedRef.current = true;
    markDialogueSeen(dialogueId);
    requestDialogue({
      speaker: guides.kagura,
      lines: [
        "Trước hồi kết, tụi tớ muốn gom cả team vào cùng một khung hình.",
        "Dù mỗi người phụ trách một phần khác nhau, món quà này là tín hiệu chung của tất cả.",
      ],
      mood: "soft",
    });
  }, [hasSeenDialogue, isActive, markDialogueSeen, requestDialogue]);

  return (
    <div className="partStack teamGalleryStack">
      <section className="teamGalleryIntro">
        <span>FULL TEAM PHOTO</span>
        <h2>Những người đứng sau tín hiệu</h2>
        <p>
          Một phần để chứa ảnh của toàn bộ thành viên LL Team trước khi credit cuối cùng bắt đầu chạy.
        </p>
      </section>

      <section className="teamPhotoWall" aria-label="Team member gallery">
        {guideList.map((member) => (
          <article
            className="teamPhotoCard"
            key={member.id}
            style={{ "--member-color": member.color } as CSSProperties}
          >
            <div className="teamPhotoFrame">
              {member.artSrc ? (
                <img src={member.artSrc} alt={member.name} />
              ) : (
                <div className="teamPhotoPlaceholder" aria-hidden="true">
                  {member.placeholderLabel}
                </div>
              )}
            </div>
            <div>
              <span>{member.role}</span>
              <h3>{member.name}</h3>
            </div>
          </article>
        ))}
      </section>

      <div className="teamGalleryGroupFrame">
        <span>GROUP IMAGE SLOT</span>
        <strong>Ảnh toàn bộ thành viên</strong>
        <p>Đặt ảnh team thật vào khung này khi asset đã sẵn sàng.</p>
      </div>

      {!isCompleted ? (
        <button className="primaryAction" type="button" onClick={() => completePart("teamGallery")}>
          Chạy credit
        </button>
      ) : null}
    </div>
  );
};
