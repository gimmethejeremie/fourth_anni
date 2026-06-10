export type GiftRarity = "common" | "secret";

export type Gift = {
  id: string;
  title: string;
  description: string;
  rarity: GiftRarity;
  weight: number;
};

export const gifts: Gift[] = [
  {
    id: "evening",
    title: "Một buổi tối dịu sáng",
    description: "Một mảnh đêm được giữ ấm bằng tiếng chào, tiếng cười và ánh sao còn vương trên màn hình.",
    rarity: "common",
    weight: 16,
  },
  {
    id: "laughter",
    title: "Tiếng cười giữ sóng",
    description: "Thứ âm thanh đi qua cả lag, cả im lặng, rồi vẫn ở lại như một dấu nhắc nhỏ: hôm ấy vui thật.",
    rarity: "common",
    weight: 16,
  },
  {
    id: "frame",
    title: "Một khung hình còn sáng",
    description: "Một khoảnh khắc đứng yên, nhưng mỗi lần nhìn lại vẫn nghe được cả hành trình đang chuyển động.",
    rarity: "common",
    weight: 14,
  },
  {
    id: "silence",
    title: "Khoảng lặng",
    description: "Một khoảng nghỉ đủ mềm để nhắc hai cậu rằng không phải lúc nào tỏa sáng cũng cần phải ồn ào.",
    rarity: "common",
    weight: 14,
  },
  {
    id: "unsaid",
    title: "Một câu chưa nói",
    description: "Được gấp lại trong bốn mùa kỷ niệm, chờ đúng hôm nay để mở ra thành lời cảm ơn.",
    rarity: "common",
    weight: 13,
  },
  {
    id: "color",
    title: "Màu của hai vì sao",
    description: "Hồng, tím, vàng và tất cả sắc độ nằm giữa những ngày hai cậu làm bầu trời này rực hơn.",
    rarity: "common",
    weight: 13,
  },
  {
    id: "unfinished-song",
    title: "Bài hát chưa khép lại",
    description: "Một đoạn nhạc không chọn kết thúc, chỉ lặng lẽ mở thêm cánh cửa cho năm thứ năm.",
    rarity: "secret",
    weight: 2,
  },
  {
    id: "wrong-turn",
    title: "Ngã rẽ có sao dẫn",
    description: "Con đường từng tưởng là lạc hướng, cho tới khi nó đưa cả hai đến đúng khung trời cần gặp.",
    rarity: "secret",
    weight: 2,
  },
  {
    id: "year-zero",
    title: "Năm số không",
    description: "Khúc dạo đầu bí mật nằm dưới tập đầu tiên, nơi mọi tín hiệu chưa có tên nhưng đã bắt đầu sáng.",
    rarity: "secret",
    weight: 1,
  },
];
