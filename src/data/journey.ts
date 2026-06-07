import { PartId } from "../lib/storage";

export type JourneyPartConfig = {
  id: PartId;
  title: string;
  subtitle?: string;
  requiredAchievement?: string;
};

export const journeyParts: JourneyPartConfig[] = [
  {
    id: "constellation",
    title: "",
    subtitle: "Tìm bốn điểm ký ức mờ ảo trong bầu trời 20.08.",
    requiredAchievement: "constellation_touched",
  },
  {
    id: "moonphase",
    title: "",
    subtitle: "Hãy đọc hai pha mặt trăng trước khi mở cuốn sổ lưu bút.",
    requiredAchievement: "moon_phase_seen",
  },
  {
    id: "scrapbook",
    title: "Sổ Lưu Bút Ký Ức",
    subtitle: "Lật mở qua bốn chương giấy kỷ niệm.",
    requiredAchievement: "scrapbook_opened",
  },
  {
    id: "tarot",
    title: "Trải Bài Tarot",
    subtitle: "Lật ba lá bài: quá khứ, hiện tại, tương lai.",
    requiredAchievement: "tarot_reading",
  },
  {
    id: "gacha",
    title: "Máy Quay Quà Gacha",
    subtitle: "Rút một món quà nhỏ từ cỗ máy ký ức.",
    requiredAchievement: "gift_drawn",
  },
  {
    id: "cipher",
    title: "Quà Tặng Bí Mật",
    subtitle: "Một mật mã ẩn giấu đang chờ được mở khóa.",
    requiredAchievement: "cipher_completed",
  },
  {
    id: "wishes",
    title: "Lời Chúc Từ Fan",
    subtitle: "Ánh sáng từ vô vàn vì sao mang theo những lời nguyện cầu.",
    requiredAchievement: "wishes_read",
  },
  {
    id: "letters",
    title: "Thư Của Đội Ngũ",
    subtitle: "Đôi dòng từ những con người đứng sau các vì sao.",
    requiredAchievement: "letters_read",
  },
  {
    id: "finale",
    title: "Hồi Kết",
    subtitle: "Tín hiệu cuối cùng chỉ mở ra khi mọi thứ đã được đọc.",
    requiredAchievement: "finale_reached",
  },
];

export const partAchievementMap: Record<PartId, string> = {
  constellation: "constellation_touched",
  moonphase: "moon_phase_seen",
  scrapbook: "scrapbook_opened",
  tarot: "tarot_reading",
  gacha: "gift_drawn",
  cipher: "cipher_completed",
  wishes: "wishes_read",
  letters: "letters_read",
  finale: "finale_reached",
};

export const getNextPartId = (partId: PartId): PartId | null => {
  const index = journeyParts.findIndex((part) => part.id === partId);
  return journeyParts[index + 1]?.id ?? null;
};
