export type QuizQuestionType = "multiple_choice" | "text_input";

export type QuizQuestion = {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: string[];
  answer: string | string[]; 
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "Tam giác mùa hè được tạo nên bởi 3 ngôi sao nào?",
    options: [
      "Sirius, Canopus, Rigel",
      "Arcturus, Spica, Regulus",
      "Vega, Deneb, Altair",
      "Capella, Aldebaran, Procyon"
    ],
    answer: "Vega, Deneb, Altair",
    explanation: "Tam giác mùa hè là một mảng sao nổi bật ở Bắc bán cầu, gồm Vega (Chức Nữ), Altair (Ngưu Lang) và Deneb (Thiên Tân)."
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "Có bao nhiêu thiên thể nằm ngoài dải Ngân Hà được đề cập trong danh sách?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    explanation: "Đó là thiên hà vô tuyến Cygnus A và thiên hà pháo hoa NGC 6946. Tất cả các thiên thể còn lại đều nằm trong dải Ngân Hà của chúng ta."
  },
  {
    id: "q3",
    type: "text_input",
    question: "Hai ngôi sao mang tên 'Sualocin' và 'Rotanev' ở chòm Cá Heo thực chất là một trò đùa. Chúng bắt nguồn từ tên viết ngược của nhà thiên văn nào? (Nhập đầy đủ Họ và Tên)",
    answer: ["Nicolaus Venator", "nicolaus venator", "Nicolaus venator", "Niccolò Cacciatore", "niccolò cacciatore", "niccolo cacciatore", "Niccolo Cacciatore"],
    explanation: "Nhà thiên văn người Ý Niccolò Cacciatore (tên Latinh là Nicolaus Venator) đã viết ngược tên mình để đặt cho 2 ngôi sao này."
  },
  {
    id: "q4",
    type: "text_input",
    question: "Cây cầu nào nối Ngưu Lang và Chức Nữ gặp nhau mỗi năm một lần vào ngày Thất Tịch?",
    answer: ["Cầu Ô Thước", "Ô Thước", "ô thước", "cầu ô thước", "othuoc", "o thuoc"],
    explanation: "Cầu Ô Thước do đàn quạ kết lại để tạo đường nối bắc qua dải Ngân Hà (sông Ngân), giúp Ngưu Lang và Chức Nữ hội ngộ."
  },
  {
    id: "q5",
    type: "multiple_choice",
    question: "Thiên thể nào xa nhất so với Trái Đất trong bản đồ sao này?",
    options: ["Kepler-186", "Cygnus A", "M57", "NGC 6946"],
    answer: "Cygnus A",
    explanation: "Cygnus A cách Trái Đất tới 600 triệu năm ánh sáng, là một trong những nguồn phát sóng vô tuyến mạnh nhất vũ trụ."
  },
  {
    id: "q6",
    type: "multiple_choice",
    question: "Tinh vân chiếc nhẫn M57 thực chất là gì?",
    options: [
      "Một hành tinh mới sinh",
      "Tàn dư của một ngôi sao giống Mặt Trời đã chết",
      "Một vụ nổ siêu tân tinh",
      "Một hố đen đang nuốt chửng vật chất"
    ],
    answer: "Tàn dư của một ngôi sao giống Mặt Trời đã chết",
    explanation: "M57 là một tinh vân hành tinh, lớp vỏ ngoài cùng bị tống vào không gian khi ngôi sao lõi cạn kiệt nhiên liệu."
  },
  {
    id: "q7",
    type: "multiple_choice",
    question: "Hố đen đầu tiên được con người phát hiện và công nhận rộng rãi là?",
    options: ["Sagittarius A*", "M87*", "V404 Cygni", "Cygnus X-1"],
    answer: "Cygnus X-1",
    explanation: "Cygnus X-1 được phát hiện vào năm 1964 và là thiên thể đầu tiên được giới khoa học đồng thuận là một hố đen."
  },
  {
    id: "q8",
    type: "multiple_choice",
    question: "Ngôi sao nào từng phát ra tín hiệu vô tuyến đều đặn đến mức bị nhầm là của người ngoài hành tinh (LGM-1)?",
    options: ["Kepler-186", "Cygnus A", "PSR B1919+21", "Vega"],
    answer: "PSR B1919+21",
    explanation: "Đây là sao xung (Pulsar) đầu tiên được phát hiện, chớp tắt với chu kỳ cực kỳ chính xác 1.33 giây."
  },
  {
    id: "q9",
    type: "text_input",
    question: "Hành tinh kích thước tương đương Trái Đất nằm trong vùng sống được quanh sao lùn đỏ Kepler-186 tên là gì?",
    answer: ["Kepler-186f", "kepler-186f", "kepler 186f", "186f"],
    explanation: "Kepler-186f là một cột mốc lịch sử khi là hành tinh đầu tiên cỡ Trái Đất được tìm thấy ở khu vực có thể tồn tại nước lỏng."
  },
  {
    id: "q10",
    type: "multiple_choice",
    question: "Epsilon Lyrae được mệnh danh là gì do cấu trúc đặc biệt của nó?",
    options: ["Trái tim Thiên Cầm", "Double Double", "Ngôi sao cô đơn", "Tam giác nhỏ"],
    answer: "Double Double",
    explanation: "Gọi là 'Double Double' vì nó là một hệ sao đôi, nhưng khi nhìn qua kính viễn vọng mạnh, mỗi ngôi sao trong đó lại phân tách thành một cặp sao nhỏ hơn."
  },
  {
    id: "q11",
    type: "multiple_choice",
    question: "Ngôi sao đôi nào tạo thành chiếc mỏ của Thiên Nga với hai màu vàng và xanh tuyệt đẹp?",
    options: ["Sadr", "Gienah", "Fawaris", "Albireo"],
    answer: "Albireo",
    explanation: "Albireo được coi là hệ sao đôi đẹp nhất bầu trời vì sự tương phản màu sắc rõ rệt giữa hai vì sao thành phần."
  },
  {
    id: "q12",
    type: "multiple_choice",
    question: "'Fawaris' trong tiếng Ả Rập mang ý nghĩa là gì?",
    options: ["Trái tim thiên nga", "Đôi cánh", "Những kỵ sĩ", "Lời nguyền"],
    answer: "Những kỵ sĩ",
    explanation: "Cái tên Fawaris xuất phát từ cụm từ Ả Rập cổ có nghĩa là 'những kỵ sĩ'."
  },
  {
    id: "q13",
    type: "text_input",
    question: "Chòm sao nào chứa ngôi sao Chức Nữ (Vega)?",
    answer: ["Thiên Cầm", "thiên cầm", "Lyra", "lyra", "thien cam"],
    explanation: "Vega nằm trong chòm sao Thiên Cầm (Lyra), mang hình tượng cây đàn thần kỳ của Orpheus."
  },
  {
    id: "q14",
    type: "multiple_choice",
    question: "Cùng với Tarazed và Alshain, ngôi sao nào đóng vai trò tâm điểm tạo nên Trục của Đại bàng?",
    options: ["Deneb", "Altair", "Vega", "Sadr"],
    answer: "Altair",
    explanation: "Altair cùng hai vì sao nằm hai bên tạo thành một đường thẳng nổi bật, giống như đôi cánh và trục của Đại bàng."
  },
  {
    id: "q15",
    type: "multiple_choice",
    question: "Thiên hà nào được mệnh danh là Thiên hà Pháo hoa vì thường xuyên có các vụ nổ siêu tân tinh rực rỡ?",
    options: ["Cygnus A", "M57", "Dải Ngân Hà", "NGC 6946"],
    answer: "NGC 6946",
    explanation: "Trong một thế kỷ qua, người ta đã ghi nhận tới 10 vụ nổ siêu tân tinh tại NGC 6946, một con số kỷ lục."
  }
];
