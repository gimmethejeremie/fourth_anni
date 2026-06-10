import { useCallback } from "react";
import { AppState } from "../lib/storage";
import { guides } from "../data/guides";
import { DialogueOverlayRequest } from "../sections/sectionTypes";

export const AFFINITY_THRESHOLDS = [5, 10, 20];

export const getAffinityDialogue = (characterId: string, level: number): DialogueOverlayRequest | null => {
  if (characterId === "an-chi") {
    if (level === 5) return { speaker: guides.anChi, mood: "soft", lines: ["Cậu đã dành nhiều thời gian lắng nghe tớ nhỉ. Tớ rất vui."] };
    if (level === 10) return { speaker: guides.anChi, mood: "mysterious", lines: ["Những vì sao đang nói rằng sự kết nối của chúng ta đang mạnh mẽ hơn bao giờ hết."] };
  }
  if (characterId === "lil-wayne") {
    if (level === 5) return { speaker: guides.lilWayne, mood: "funny", lines: ["Ê, chơi game nhiều phết đấy. Nhớ giữ gìn sức khoẻ nhé!"] };
    if (level === 10) return { speaker: guides.lilWayne, mood: "funny", lines: ["Khét đấy, cậu cày game còn trâu hơn bổn tôn nữa."] };
  }
  if (characterId === "imed") {
    if (level === 5) return { speaker: guides.imed, mood: "soft", lines: ["Cậu đọc hết thoại luôn hả? Siêng năng quá vậy."] };
  }
  if (characterId === "kuro") {
    if (level === 5) return { speaker: guides.kuro, mood: "intimate", lines: ["Cảm ơn cậu đã kiên nhẫn đi qua từng trang kỷ niệm."] };
  }
  if (characterId === "nova") {
    if (level === 5) return { speaker: guides.nova, mood: "serious", lines: ["Tín hiệu ổn định. Có vẻ cậu không bỏ sót chi tiết nào."] };
  }
  if (characterId === "stone") {
    if (level === 5) return { speaker: guides.stone, mood: "soft", lines: ["Cậu có thấy những chuyển động tớ tạo ra không? Nhìn cậu xem, thật kỹ tính."] };
  }
  if (characterId === "kagura") {
    if (level === 5) return { speaker: guides.kagura, mood: "soft", lines: ["Hành trình này thật trọn vẹn khi có cậu đồng hành."] };
  }
  return null;
};

export const useAffinity = (
  state: AppState, 
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  requestDialogue?: (dialogue: DialogueOverlayRequest) => void
) => {
  const increaseAffinity = useCallback((characterId: string, amount: number = 1) => {
    // Read from latest state using functional updater to avoid stale closure issues,
    // but we also want to trigger dialogues outside the updater.
    setState(prev => {
      const current = prev.characterAffinity[characterId] || 0;
      const next = current + amount;

      if (requestDialogue) {
        AFFINITY_THRESHOLDS.forEach(threshold => {
          if (current < threshold && next >= threshold) {
            const dialogue = getAffinityDialogue(characterId, threshold);
            if (dialogue) {
               setTimeout(() => requestDialogue(dialogue), 1500);
            }
          }
        });
      }

      return {
        ...prev,
        characterAffinity: {
          ...prev.characterAffinity,
          [characterId]: next
        }
      };
    });
  }, [setState, requestDialogue]);

  return { increaseAffinity };
};
