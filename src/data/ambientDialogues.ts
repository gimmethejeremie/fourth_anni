import type { PartId } from "../lib/storage";
import type { DialogueOverlayRequest } from "../sections/sectionTypes";
import { guides } from "./guides";

export type AmbientDialogue = Omit<DialogueOverlayRequest, "onComplete"> & {
  id: string;
  preferredParts?: PartId[];
};

export const ambientDialogues: AmbientDialogue[] = [
  {
    id: "ambient:an-chi:minor-arcana",
    speaker: guides.anChi,
    mood: "mysterious",
    preferredParts: ["tarot", "gacha", "cipher"],
    lines: [
      "Nếu đang bí, hỏi một lá phụ. Lá nhỏ đôi khi nói chuyện đời thường rõ hơn lá lớn.",
    ],
  },
  {
    id: "ambient:an-chi:signal",
    speaker: guides.anChi,
    mood: "soft",
    lines: [
      "Một tín hiệu nhỏ vẫn có thể là lời nhắc đúng lúc. Hai cậu cứ đi tiếp nhé.",
    ],
  },
  {
    id: "ambient:nhien-anh:stars",
    speaker: guides.kagura,
    mood: "soft",
    preferredParts: ["constellation", "moonphase"],
    lines: [
      "Nếu thấy một ngôi sao sáng hơn bình thường, cứ chạm thử. Ký ức hay làm màu như vậy đó.",
    ],
  },
  {
    id: "ambient:demi:sound",
    speaker: guides.imed,
    mood: "funny",
    lines: [
      "Âm thanh vừa kêu không phải lỗi đâu. Đó là hệ thống tự hào một cách hơi lộ liễu.",
    ],
  },
  {
    id: "ambient:lil-wayne:minigame",
    speaker: guides.lilWayne,
    mood: "funny",
    lines: [
      "Ai mà bỏ qua nút minigame là mất quyền flex với bổn tôn nha.",
    ],
  },
  {
    id: "ambient:mashiro:scrapbook",
    speaker: guides.kuro,
    mood: "intimate",
    preferredParts: ["scrapbook", "letters", "teamGallery"],
    lines: [
      "Lật chậm thôi. Trang nào cũng có người từng ngồi chỉnh rất lâu để nó dịu lại.",
    ],
  },
  {
    id: "ambient:ren:status",
    speaker: guides.nova,
    mood: "serious",
    lines: [
      "Báo cáo nhanh: tiến độ ổn, cảm xúc tăng, khả năng bấm linh tinh vẫn rất cao.",
    ],
  },
  {
    id: "ambient:akatsuki:motion",
    speaker: guides.stone,
    mood: "soft",
    lines: [
      "Có cảnh chỉ đẹp khi nó chuyển động. Có kỷ niệm cũng vậy.",
    ],
  },
  {
    id: "ambient:an-chi:tarot",
    speaker: guides.anChi,
    mood: "mysterious",
    preferredParts: ["tarot"],
    lines: [
      "Một lá bài không tự nói hết mọi thứ. Nó chỉ đẩy nhẹ để hai cậu nhìn nhau kỹ hơn.",
    ],
  },
];
