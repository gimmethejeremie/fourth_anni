const fs = require('fs');

const data = {
  "vega": {
    "astronomy": "Vega là ngôi sao sáng thứ 5 trên bầu trời đêm và sáng thứ 2 ở bán cầu Bắc, cách Trái Đất khoảng 25 năm ánh sáng. Nó quay quanh trục rất nhanh, khiến hình dạng bị dẹt ở hai cực.",
    "astrology": "Trong chiêm tinh, Vega gắn liền với sự hy vọng, lý tưởng và nghệ thuật. Giống như Chức Nữ, nó đại diện cho tình yêu bền bỉ và sự sáng tạo."
  },
  "deneb": {
    "astronomy": "Deneb là một sao siêu khổng lồ trắng-lam, cách chúng ta tới 2,600 năm ánh sáng. Dù ở khoảng cách cực xa, nó vẫn nằm trong top các ngôi sao sáng nhất nhờ độ sáng tuyệt đối khổng lồ (gấp gần 200,000 lần Mặt Trời).",
    "astrology": "Deneb tượng trưng cho nền tảng vững chắc, sức mạnh tinh thần và khả năng lãnh đạo bí ẩn từ xa."
  },
  "altair": {
    "astronomy": "Altair (Ngưu Lang) nằm cách chúng ta 16.7 năm ánh sáng. Tương tự Vega, nó quay rất nhanh (khoảng 286 km/s ở xích đạo), hoàn thành một vòng chỉ trong 9 giờ.",
    "astrology": "Ngôi sao này đại diện cho sự dũng cảm, hành động nhanh nhẹn và ý chí vươn lên mọi rào cản."
  },
  "albireo": {
    "astronomy": "Albireo không phải là một ngôi sao đơn lẻ mà là một hệ sao đôi tuyệt đẹp. Khi nhìn qua kính viễn vọng, người ta thấy một sao màu vàng cam (Albireo A) và một sao màu xanh lam (Albireo B).",
    "astrology": "Sự kết hợp hoàn hảo của hai màu sắc đối lập khiến Albireo trở thành biểu tượng của sự hòa hợp, thấu hiểu và gắn kết trong các mối quan hệ."
  },
  "epsilon-lyrae": {
    "astronomy": "Đây là hệ sao bội nổi tiếng, thường gọi là 'Double Double'. Bằng mắt thường, nó trông như hai ngôi sao gần nhau, nhưng qua kính thiên văn, mỗi ngôi sao lại tách ra thành một cặp sao đôi nữa.",
    "astrology": "Nó gợi nhắc về chiều sâu của vạn vật: mọi thứ đều có nhiều lớp ý nghĩa hơn vẻ bề ngoài, cần sự kiên nhẫn để thấu hiểu."
  },
  "sadr": {
    "astronomy": "Sadr nằm ở trung tâm của chòm Thiên Nga (Cygnus), được bao quanh bởi một dải tinh vân phát xạ khổng lồ chứa đầy khí hydro phát sáng đỏ rực rỡ.",
    "astrology": "Đóng vai trò là 'trái tim' của Thiên Nga, Sadr mang ý nghĩa của trung tâm cảm xúc, lòng trắc ẩn và sự cân bằng nội tâm."
  },
  "tarazed": {
    "astronomy": "Tarazed là một sao khổng lồ màu cam sáng, dù trông có vẻ gần Altair trên trời nhưng thực chất nó cách chúng ta đến 395 năm ánh sáng (xa hơn Altair rất nhiều).",
    "astrology": "Nó tượng trưng cho sự hậu thuẫn vững chắc, người đồng hành thầm lặng nhưng đóng vai trò định hướng quan trọng."
  },
  "alshain": {
    "astronomy": "Alshain là một sao lùn vàng phụ cách chúng ta khoảng 44 năm ánh sáng, nhỏ hơn và mát hơn Mặt Trời một chút.",
    "astrology": "Giống như Tarazed, Alshain là biểu tượng của sự khiêm tốn, lòng trung thành và những giá trị cốt lõi không phô trương."
  },
  "rasalgethi": {
    "astronomy": "Rasalgethi là một hệ sao đa cực tạp, trong đó sao chính là một sao siêu khổng lồ đỏ đang ở giai đoạn cuối của cuộc đời, phình to ra hàng trăm lần.",
    "astrology": "Với sắc đỏ trầm mặc, nó nhắc nhở về sự chín muồi, trí tuệ tích lũy qua thời gian và những di sản để lại."
  },
  "sualocin": {
    "astronomy": "Sualocin là ngôi sao chính (Alpha Delphini) của chòm Cá Heo. Cái tên Sualocin thực chất là tên Nicolaus (một nhà thiên văn) đánh vần ngược.",
    "astrology": "Nó đại diện cho sự vui tươi, thông minh, những bất ngờ thú vị và sự tinh nghịch của tuổi trẻ."
  },
  "enif": {
    "astronomy": "Enif là ngôi sao sáng nhất trong chòm Thiên Mã (Pegasus). Đây là một sao siêu khổng lồ cam, đang trong quá trình kết thúc vòng đời.",
    "astrology": "Đóng vai trò là 'cái mũi' của Thiên Mã, nó mang ý nghĩa của trực giác nhạy bén, khả năng đánh hơi cơ hội và những bước ngoặt bất ngờ."
  },
  "sagitta": {
    "astronomy": "Mũi Tên Nhỏ là chòm sao nhỏ thứ ba trên bầu trời, không chứa bất kỳ ngôi sao nào đặc biệt sáng, nhưng lại nằm ngay giữa dải Ngân Hà rực rỡ.",
    "astrology": "Nó tượng trưng cho mục tiêu rõ ràng, sự sắc bén và việc giữ vững định hướng dù xung quanh có nhiều yếu tố xao nhãng."
  }
};

let fileContent = fs.readFileSync('src/data/constellation.ts', 'utf8');

// Add the type properties
fileContent = fileContent.replace('fact?: string;', 'fact?: string;\n  astronomy?: string;\n  astrology?: string;');

// Inject the fields
for (const [id, info] of Object.entries(data)) {
  const regex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?fact:\\s*".*?",)`, 'g');
  fileContent = fileContent.replace(regex, `$1\n    astronomy: "${info.astronomy}",\n    astrology: "${info.astrology}",`);
}

fs.writeFileSync('src/data/constellation.ts', fileContent);
console.log("Successfully updated constellation.ts!");
