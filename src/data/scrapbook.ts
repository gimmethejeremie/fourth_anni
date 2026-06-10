export type MarginNoteData = {
  author: string;
  text: string;
};

export type QuoteData = {
  text: string;
  speaker: string;
};

export type ScrapbookChapter = {
  id: string;
  label: string;
  title: string;
  recap: string;
  stamp: string;
  color: string;
  textureClass: string;
  paperclipNote: string;
  image: string;
  video: string;
  imageCaption: string;
  videoCaption: string;
  quote: QuoteData;
  marginNotes: MarginNoteData[];
  yearSpan: string;
};

// LINH LAN'S SCRAPBOOK
export const linhLanChapters: ScrapbookChapter[] = [
  {
    id: "ll-year-01",
    label: "▶▶ YEAR 01 | SIDE A",
    title: "The Beginning",
    recap: "Năm đầu tiên. Không ai biết nó sẽ đi đến đâu. Kể cả họ. Kể cả chúng tôi.",
    yearSpan: "08.2022 → 08.2023",
    stamp: "2022",
    color: "#9B6EC8", // ln-pri
    textureClass: "texture-clean",
    paperclipNote: "Lưu ý: đây chỉ là bắt đầu.",
    image: "Ánh live đầu còn run",
    video: "Tín hiệu đầu tiên",
    imageCaption: "Năm đầu mở tín hiệu",
    videoCaption: "Bản ghi của một khởi đầu",
    quote: {
      text: "Ngày đầu tiên bật live, tay vẫn còn run.",
      speaker: "Linh Lan",
    },
    marginNotes: [
      { author: "lil-wayne", text: "Cái hôm này là tớ không ngủ được" },
      { author: "nova", text: "Cái này tốt hơn tôi nghĩ" },
    ],
  },
  {
    id: "ll-year-02",
    label: "▶▶ YEAR 02 | SIDE B",
    title: "Finding the Voice",
    recap: "Năm thứ hai. Tiếng nói *e*m *c*ất lên *h*òa vào vệt sa*o* băng mờ ảo.",
    yearSpan: "08.2023 → 08.2024",
    stamp: "2023",
    color: "#B28EE0", // ln-pri variant
    textureClass: "texture-creased",
    paperclipNote: "Xem lại stream này nếu bạn cần nhớ tại sao.",
    image: "Giọng hát tìm được đường",
    video: "Những lần thử lại",
    imageCaption: "Khi tiếng nói bắt đầu có hình",
    videoCaption: "Một năm học cách vang xa hơn",
    quote: {
      text: "Đôi khi phải lạc đường mới tìm thấy nhà.",
      speaker: "Linh Lan",
    },
    marginNotes: [
      { author: "imed", text: "Tôi viết lại đoạn này 3 lần" },
      { author: "kuro", text: "Event đó kỳ lắm. Tốt." },
    ],
  },
  {
    id: "ll-year-03",
    label: "▶▶ YEAR 03 | TRACK 3",
    title: "Growing",
    recap: "Năm thứ ba. Không phải lúc nào cũng dễ. Nhưng mọi thứ đang lớn. Theo cách tốt nhất có thể.",
    yearSpan: "08.2024 → 08.2025",
    stamp: "2024",
    color: "#C8A8F0", // ln-acc
    textureClass: "texture-stained",
    paperclipNote: "Ngày khó nhất cũng qua rồi.",
    image: "Một khung hình trưởng thành",
    video: "Ngày khó rồi cũng qua",
    imageCaption: "Lớn lên trong ánh đèn",
    videoCaption: "Những vết xước biến thành nhịp thở",
    quote: {
      text: "Lớn lên đau đấy, nhưng xứng đáng.",
      speaker: "Linh Lan",
    },
    marginNotes: [
      { author: "stone", text: "Frame này tôi thích nhất" },
      { author: "kagura", text: "Ai cũng lớn hơn một chút" },
    ],
  },
  {
    id: "ll-year-04",
    label: "▶▶ YEAR 04 | TRACK 4",
    title: "Here We Are",
    recap: "Năm thứ tư. Đây. Hôm nay. Tất cả những gì đã qua dẫn đến khoảnh khắc này.",
    yearSpan: "08.2025 → 08.2026",
    stamp: "2025–26",
    color: "#EAD8FF", // ln-text
    textureClass: "texture-worn",
    paperclipNote: "Bạn đang đọc cái này vào ngày 20/08/2026.",
    image: "Ở đây, vào hôm nay",
    video: "Bốn năm gom lại",
    imageCaption: "Mọi tín hiệu gặp nhau ở hiện tại",
    videoCaption: "Lời cảm ơn trước chương tiếp theo",
    quote: {
      text: "Cảm ơn vì đã ở đây.",
      speaker: "Linh Lan",
    },
    marginNotes: [
      { author: "kagura", text: "Gần đến rồi" },
      { author: "stone", text: "..." },
    ],
  },
];

// LAN LINH'S SCRAPBOOK
export const lanLinhChapters: ScrapbookChapter[] = [
  {
    id: "lan-year-01",
    label: "▶▶ YEAR 01 | SIDE A",
    title: "The Awakening",
    recap: "Một chương mới. Mọi thứ lạ lẫm nhưng rực rỡ. Những bước chân đầu tiên luôn là những bước đáng nhớ nhất.",
    yearSpan: "08.2022 → 08.2023",
    stamp: "2022",
    color: "#ef88be", // ll-pri
    textureClass: "texture-clean",
    paperclipNote: "Lưu ý: Không quay đầu lại.",
    image: "Bước chân đầu tiên",
    video: "Căn phòng sáng lên",
    imageCaption: "Năm đầu thức dậy cùng sân khấu",
    videoCaption: "Một đoạn băng còn nguyên sự háo hức",
    quote: {
      text: "Không nghĩ là mình làm được, cho đến khi thử.",
      speaker: "Lan Linh",
    },
    marginNotes: [
      { author: "lil-wayne", text: "Wow" },
      { author: "nova", text: "Không ngờ đấy" },
    ],
  },
  {
    id: "lan-year-02",
    label: "▶▶ YEAR 02 | SIDE B",
    title: "The Rhythm",
    recap: "Chậm lại một chút. Lắng ngh*e* *c*hút *h*i vọng nh*o* nhỏ từ bên trong chính mình.",
    yearSpan: "08.2023 → 08.2024",
    stamp: "2023",
    color: "#f29ecb", // ll-pri variant
    textureClass: "texture-creased",
    paperclipNote: "Nghe lại bài này khi mệt.",
    image: "Nhịp riêng khẽ vang",
    video: "Một bài hát để giữ",
    imageCaption: "Khi nhịp điệu tìm thấy chủ nhân",
    videoCaption: "Những khoảng lặng cũng biết hát",
    quote: {
      text: "Nhịp điệu do chính mình tạo ra.",
      speaker: "Lan Linh",
    },
    marginNotes: [
      { author: "imed", text: "Giai điệu này khó quên" },
      { author: "kuro", text: "Hơi buồn nhưng đẹp" },
    ],
  },
  {
    id: "lan-year-03",
    label: "▶▶ YEAR 03 | TRACK 3",
    title: "The Storm",
    recap: "Thử thách đến rồi đi. Những vết xước để lại chỉ làm bức tranh thêm phần chân thực và sâu sắc.",
    yearSpan: "08.2024 → 08.2025",
    stamp: "2024",
    color: "#f6a9d1", // ll-acc
    textureClass: "texture-stained",
    paperclipNote: "Giữ chặt.",
    image: "Sau cơn mưa nhỏ",
    video: "Vẫn đứng dưới ánh đèn",
    imageCaption: "Năm của những thử thách thật hơn",
    videoCaption: "Đi qua bão mà vẫn giữ màu sáng",
    quote: {
      text: "Sau cơn mưa, trời lại sáng.",
      speaker: "Lan Linh",
    },
    marginNotes: [
      { author: "stone", text: "Căng thẳng quá" },
      { author: "kagura", text: "Qua rồi" },
    ],
  },
  {
    id: "lan-year-04",
    label: "▶▶ YEAR 04 | TRACK 4",
    title: "The Horizon",
    recap: "Chân trời mở rộng. Bốn năm là một hành trình dài, nhưng cũng chỉ là sự khởi đầu cho điều tiếp theo.",
    yearSpan: "08.2025 → 08.2026",
    stamp: "2025–26",
    color: "#ffd8ea", // ll-soft
    textureClass: "texture-worn",
    paperclipNote: "Gặp lại ở vạch đích.",
    image: "Chân trời mới mở",
    video: "Bốn năm, một lời hẹn",
    imageCaption: "Đường chân trời không phải điểm kết",
    videoCaption: "Sẵn sàng bước sang ngày mai",
    quote: {
      text: "Sẵn sàng cho ngày mai.",
      speaker: "Lan Linh",
    },
    marginNotes: [
      { author: "kagura", text: "Tiếp tục thôi" },
      { author: "stone", text: "Đẹp" },
    ],
  },
];
