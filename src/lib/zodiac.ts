import { ArrivalYear, ZodiacElement } from "./storage";

const zodiacByMonth: Array<{ zodiac: string; element: ZodiacElement }> = [
  { zodiac: "Capricorn", element: "earth" },
  { zodiac: "Aquarius", element: "air" },
  { zodiac: "Pisces", element: "water" },
  { zodiac: "Aries", element: "fire" },
  { zodiac: "Taurus", element: "earth" },
  { zodiac: "Gemini", element: "air" },
  { zodiac: "Cancer", element: "water" },
  { zodiac: "Leo", element: "fire" },
  { zodiac: "Virgo", element: "earth" },
  { zodiac: "Libra", element: "air" },
  { zodiac: "Scorpio", element: "water" },
  { zodiac: "Sagittarius", element: "fire" },
];

export const getZodiacProfile = (birthMonth: number) =>
  zodiacByMonth[Math.max(0, Math.min(11, birthMonth - 1))];

export const getArrivalLabel = (arrivalYear: ArrivalYear) => {
  const labels: Record<ArrivalYear, string> = {
    "2022": "FAN TỪ NĂM ĐẦU",
    "2023": "YEAR TWO WITNESS",
    "2024": "THIRD TRACK LISTENER",
    "2025_2026": "NEW STAR ARRIVAL",
  };

  return labels[arrivalYear];
};

export const getProfileMessage = (arrivalYear: ArrivalYear) => {
  const messages: Record<ArrivalYear, string> = {
    "2022": "Bạn ở đây từ khi mọi thứ còn chưa có hình dạng.",
    "2023": "Bạn đến khi giọng nói bắt đầu tìm thấy đường đi.",
    "2024": "Bạn gặp bầu trời lúc nó đang lớn lên từng chút.",
    "2025_2026": "Bạn mới đến, nhưng ánh sao vẫn kịp để dành cho bạn một chỗ.",
  };

  return messages[arrivalYear];
};
