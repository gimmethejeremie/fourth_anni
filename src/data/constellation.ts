export type StarKind = "summer" | "key" | "major" | "minor" | "secret" | "poetic" | "secondary";

export type StarPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  kind: StarKind;
  color: string;
  skyName?: string;
  coord?: string;
  fact?: string;
  astronomy?: string;
  astrology?: string;
  unlockAchievement?: string;
  labelOffsetX?: number;
  labelOffsetY?: number;
  image?: string;
};

export const summerTriangleIds = ["vega", "deneb", "altair"];
export const constellationCode = summerTriangleIds;
export const keyStarIds = ["albireo", "epsilon-lyrae"];

export const constellationStars: StarPoint[] = [
  // 1. Vega
  {
    id: "vega",
    label: "Vega",
    skyName: "Vega",
    x: 15.0,
    y: 41.8,
    radius: 4.5,
    kind: "summer",
    color: "rgba(241, 231, 216, 1)",
    coord: "X 15 / Y 42",
    image: "https://images-assets.nasa.gov/image/PIA04223/PIA04223~medium.jpg",
    fact: "Trong thần thoại Hy Lạp, Vega đại diện cho chiếc đàn lia của Orpheus, món quà từ thần Apollo. Trong văn hóa Á Đông, Vega là sao Chức Nữ, nàng tiên dệt vải trên thiên đình.",
    astronomy: "Tên IAU: Vega, Tên thông dụng: Chức Nữ, Phân loại: Sao dãy chính (A0V), Khoảng cách: 25.04 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 18h 36m / Dec +38° 47', Chòm sao: Thiên Cầm, Thiên hà: Ngân Hà",
    astrology: "Vega mang lại sự lôi cuốn, tinh thần nghệ thuật, tài năng âm nhạc và lý tưởng hóa."
  },
  // 2. Deneb
  {
    id: "deneb",
    label: "Deneb",
    skyName: "Deneb",
    x: 87.2,
    y: 32.2,
    radius: 4.2,
    kind: "summer",
    color: "rgba(241, 231, 216, 0.95)",
    coord: "X 87 / Y 32",
    image: "https://images-assets.nasa.gov/image/PIA16886/PIA16886~medium.jpg",
    fact: "Tên Deneb bắt bắt nguồn từ tiếng Ả Rập có nghĩa là 'cái đuôi', tượng trưng cho đuôi của chòm sao Thiên Nga (Cygnus).",
    astronomy: "Tên IAU: Deneb, Tên thông dụng: Thiên Tân, Phân loại: Sao siêu khổng lồ (A2Ia), Khoảng cách: ~2,600 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 20h 41m / Dec +45° 16', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Deneb tượng trưng cho trí tuệ minh mẫn, khả năng học hỏi nhanh chóng và tầm nhìn xa trông rộng."
  },
  // 3. Altair
  {
    id: "altair",
    label: "Altair",
    skyName: "Altair",
    x: 57.7,
    y: 86.3,
    radius: 4.3,
    kind: "summer",
    color: "rgba(241, 231, 216, 0.98)",
    coord: "X 58 / Y 86",
    labelOffsetX: 12,
    labelOffsetY: 16,
    image: "https://images-assets.nasa.gov/image/PIA09117/PIA09117~medium.jpg",
    fact: "Tên Altair xuất phát từ cụm từ Ả Rập có nghĩa là 'con đại bàng đang bay'. Trong sự tích phương Đông, đây là chàng chăn bò Ngưu Lang.",
    astronomy: "Tên IAU: Altair, Tên thông dụng: Ngưu Lang, Phân loại: Sao dãy chính (A7V), Khoảng cách: 16.73 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 19h 50m / Dec +8° 52', Chòm sao: Đại Bàng, Thiên hà: Ngân Hà",
    astrology: "Altair mang lại lòng dũng cảm, sự tự tin, sự táo bạo và tinh thần độc lập."
  },
  // 4. Sadr
  {
    id: "sadr",
    label: "Sadr",
    skyName: "Sadr",
    x: 76.5,
    y: 39.6,
    radius: 3.8,
    kind: "major",
    color: "rgba(241, 231, 216, 0.9)",
    coord: "X 77 / Y 40",
    image: "https://images-assets.nasa.gov/image/PIA13108/PIA13108~medium.jpg",
    fact: "Tên Sadr bắt nguồn từ tiếng Ả Rập, nghĩa là 'bộ ngực của con thiên nga'. Nó nằm ở vị trí trung tâm của Thập tự phương Bắc.",
    astronomy: "Tên IAU: Sadr, Tên thông dụng: Gamma Cygni, Phân loại: Sao siêu khổng lồ (F8Iab), Khoảng cách: 1,800 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 20h 22m / Dec +40° 15', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Sadr mang năng lượng của sự nuôi dưỡng, từ bi và chở che."
  },
  // 5. Albireo
  {
    id: "albireo",
    label: "Albireo",
    skyName: "Albireo",
    x: 46.3,
    y: 57.9,
    radius: 3.5,
    kind: "key",
    color: "rgba(241, 231, 216, 0.85)",
    coord: "X 46 / Y 58",
    image: "https://images-assets.nasa.gov/image/PIA13276/PIA13276~medium.jpg",
    fact: "Albireo thường được mệnh danh là ngôi sao đôi đẹp nhất trên bầu trời, với sự tương phản màu sắc tuyệt đẹp giữa vàng rực và xanh sapphire.",
    astronomy: "Tên IAU: Albireo, Tên thông dụng: Mỏ thiên nga, Phân loại: Hệ sao đôi (K3II + B0V), Khoảng cách: ~430 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 19h 30m / Dec +27° 57', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Albireo đại diện cho sự hài hòa từ những điều khác biệt, sự cân bằng giữa lý trí và cảm xúc.",
    unlockAchievement: "sky_key_albireo"
  },
  // 6. Gienah
  {
    id: "gienah",
    label: "Gienah",
    skyName: "Gienah",
    x: 90.0,
    y: 49.0,
    radius: 2.9,
    kind: "secondary",
    color: "rgba(241, 231, 216, 0.72)",
    coord: "X 90 / Y 49",
    image: "https://images-assets.nasa.gov/image/PIA16885/PIA16885~medium.jpg",
    fact: "Cái tên 'Gienah' bắt nguồn từ tiếng Ả Rập 'Janāḥ', nghĩa là 'đôi cánh'. Đánh dấu vị trí sải cánh vươn rộng của Thiên Nga.",
    astronomy: "Tên IAU: Gienah, Phân loại: Sao khổng lồ (K0III), Khoảng cách: 73 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 20h 46m / Dec +33° 58', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Gienah kết nối với khả năng mở rộng tư duy, sự tự do khám phá."
  },
  // 7. Fawaris
  {
    id: "fawaris",
    label: "Fawaris",
    skyName: "Fawaris",
    x: 54.9,
    y: 32.4,
    radius: 3,
    kind: "secondary",
    color: "rgba(241, 231, 216, 0.75)",
    coord: "X 55 / Y 32",
    image: "https://images-assets.nasa.gov/image/PIA13455/PIA13455~medium.jpg",
    fact: "'Fawaris' có nghĩa là 'những kỵ sĩ' trong tiếng Ả Rập. Ngày nay nó đóng vai trò là một cánh của Thiên Nga.",
    astronomy: "Tên IAU: Fawaris, Phân loại: Sao khổng lồ (B9III), Khoảng cách: 165 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 19h 45m / Dec +45° 07', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Fawaris mang tính chất của sự nhanh nhẹn, khả năng thích ứng."
  },
  // 8. Epsilon Lyrae
  {
    id: "epsilon-lyrae",
    label: "Epsilon Lyrae",
    skyName: "Epsilon Lyrae",
    x: 19.5,
    y: 40.5,
    radius: 3.2,
    kind: "key",
    color: "rgba(241, 231, 216, 0.85)",
    coord: "X 20 / Y 41",
    labelOffsetX: 10,
    labelOffsetY: 16,
    image: "https://images-assets.nasa.gov/image/PIA16871/PIA16871~medium.jpg",
    fact: "Được mệnh danh là 'Double Double', hệ sao này nổi tiếng vì qua kính thiên văn, mỗi ngôi sao trong đó lại tách ra thành một cặp đôi nữa, tạo thành 4 mặt trời.",
    astronomy: "Tên IAU: Epsilon Lyrae, Phân loại: Hệ 4 sao (A & F), Khoảng cách: ~162 ly, Phát hiện: 1779, Tọa độ: RA 18h 44m / Dec +39° 40', Chòm sao: Thiên Cầm, Thiên hà: Ngân Hà",
    astrology: "Epsilon Lyrae đại diện cho sự đa nguyên, tính cách phức tạp và khả năng nhìn nhận vấn đề từ nhiều góc độ.",
    unlockAchievement: "sky_key_echo"
  },
  // 9. Sheliak
  {
    id: "sheliak",
    label: "Sheliak",
    skyName: "Sheliak",
    x: 23.0,
    y: 49.9,
    radius: 2.8,
    kind: "secondary",
    color: "rgba(241, 231, 216, 0.7)",
    coord: "X 23 / Y 50",
    image: "https://images-assets.nasa.gov/image/PIA14728/PIA14728~medium.jpg",
    fact: "Sheliak là một hệ sao đôi ở gần nhau đến mức lực hấp dẫn kéo chúng thành hình quả trứng, và chúng liên tục trao đổi vật chất.",
    astronomy: "Tên IAU: Sheliak, Phân loại: Sao đôi che khuất (B7V), Khoảng cách: 960 ly, Phát hiện: 1784 (biến quang), Tọa độ: RA 18h 50m / Dec +33° 21', Chòm sao: Thiên Cầm, Thiên hà: Ngân Hà",
    astrology: "Sheliak mang năng lượng của sự biến đổi liên tục, tính chu kỳ và sự tái sinh."
  },
  // 10. Sulafat
  {
    id: "sulafat",
    label: "Sulafat",
    skyName: "Sulafat",
    x: 27.5,
    y: 50.9,
    radius: 2.9,
    kind: "secondary",
    color: "rgba(241, 231, 216, 0.72)",
    coord: "X 28 / Y 51",
    image: "https://images-assets.nasa.gov/image/PIA14103/PIA14103~medium.jpg",
    fact: "Tên Sulafat xuất phát từ tiếng Ả Rập có nghĩa là 'con rùa'. Gợi nhớ đến chiếc đàn lia được làm từ mai rùa của thần Hermes.",
    astronomy: "Tên IAU: Sulafat, Phân loại: Sao khổng lồ (B9III), Khoảng cách: 620 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 18h 58m / Dec +32° 41', Chòm sao: Thiên Cầm, Thiên hà: Ngân Hà",
    astrology: "Sulafat được coi là đại diện cho sự bảo vệ, lớp vỏ bọc an toàn và sự khôn ngoan tĩnh lặng."
  },
  // 11. Tarazed
  {
    id: "tarazed",
    label: "Tarazed",
    skyName: "Tarazed",
    x: 55.6,
    y: 83.8,
    radius: 3.2,
    kind: "major",
    color: "rgba(241, 231, 216, 0.8)",
    coord: "X 56 / Y 84",
    labelOffsetX: -52,
    labelOffsetY: 14,
    image: "https://images-assets.nasa.gov/image/PIA13301/PIA13301~medium.jpg",
    fact: "Cùng với Alshain, nó là một trong hai ngôi sao chầu bên cạnh Altair, tạo thành 'Trục của Đại bàng'.",
    astronomy: "Tên IAU: Tarazed, Phân loại: Sao khổng lồ sáng (K3II), Khoảng cách: 395 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 19h 46m / Dec +10° 36', Chòm sao: Đại Bàng, Thiên hà: Ngân Hà",
    astrology: "Tarazed gắn liền với tính kiên trì, sự bền bỉ và bảo vệ."
  },
  // 12. Alshain
  {
    id: "alshain",
    label: "Alshain",
    skyName: "Alshain",
    x: 60.8,
    y: 90.0,
    radius: 3.1,
    kind: "major",
    color: "rgba(241, 231, 216, 0.75)",
    coord: "X 61 / Y 90",
    labelOffsetX: -52,
    labelOffsetY: -8,
    image: "https://images-assets.nasa.gov/image/PIA12484/PIA12484~medium.jpg",
    fact: "Nằm rất gần Altair, Alshain là một phần của cụm sao 'Gia đình Đại bàng'.",
    astronomy: "Tên IAU: Alshain, Phân loại: Sao gần khổng lồ (G8IV), Khoảng cách: 44.7 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 19h 55m / Dec +6° 24', Chòm sao: Đại Bàng, Thiên hà: Ngân Hà",
    astrology: "Alshain mang năng lượng của sự ổn định, kỷ luật."
  },
  // 13. Sualocin
  {
    id: "sualocin",
    label: "Sualocin",
    skyName: "Sualocin",
    x: 86.5,
    y: 75.9,
    radius: 3,
    kind: "secret",
    color: "rgba(241, 231, 216, 0.75)",
    coord: "X 87 / Y 76",
    image: "https://images-assets.nasa.gov/image/PIA08516/PIA08516~medium.jpg",
    fact: "Tên thực chất là trò đùa thế kỷ 19! Nhà thiên văn Niccolò Cacciatore đã viết ngược tên mình (Nicolaus) thành 'Sualocin'.",
    astronomy: "Tên IAU: Sualocin, Phân loại: Hệ sao đôi (B9IV), Khoảng cách: ~254 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 20h 39m / Dec +15° 54', Chòm sao: Cá Heo, Thiên hà: Ngân Hà",
    astrology: "Sualocin đại diện cho sự nhanh trí, tính tò mò."
  },
  // 14. Rotanev
  {
    id: "rotanev",
    label: "Rotanev",
    skyName: "Rotanev",
    x: 85.5,
    y: 77.8,
    radius: 3.1,
    kind: "secret",
    color: "rgba(241, 231, 216, 0.8)",
    coord: "X 86 / Y 78",
    image: "https://images-assets.nasa.gov/image/PIA16610/PIA16610~medium.jpg",
    fact: "Tương tự như Sualocin, Rotanev là họ Latin của Cacciatore (Venator) viết ngược lại.",
    astronomy: "Tên IAU: Rotanev, Phân loại: Hệ sao đôi (F5III), Khoảng cách: 101 ly, Phát hiện: Thời cổ đại, Tọa độ: RA 20h 37m / Dec +14° 35', Chòm sao: Cá Heo, Thiên hà: Ngân Hà",
    astrology: "Rotanev tượng trưng cho tính hài hước, sự phá cách."
  },
  // 15. Cygnus A
  {
    id: "cygnus-a",
    label: "Cygnus A",
    skyName: "Cygnus A (Thiên hà Radio)",
    x: 62.9,
    y: 38.9,
    radius: 3.6,
    kind: "poetic",
    color: "rgba(168, 146, 214, 0.9)",
    coord: "X 63 / Y 39",
    image: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001262/GSFC_20171208_Archive_e001262~medium.jpg",
    fact: "Là một trong những nguồn phát sóng vô tuyến mạnh nhất bầu trời. Thực chất đây không phải một ngôi sao, mà là một thiên hà khổng lồ.",
    astronomy: "Phân loại: Thiên hà vô tuyến hình elip (cD), Khoảng cách: 600 triệu ly, Phát hiện: 1939, Tín hiệu: Vô tuyến siêu mạnh, Tọa độ: RA 19h 59m / Dec +40° 44', Thiên hà: Thiên hà Cygnus A (Độc lập)",
    astrology: "Cygnus A đại diện cho những thông điệp ẩn giấu, sức mạnh to lớn từ khoảng cách xa và sự kết nối vượt thời gian."
  },
  // 16. Kepler-186
  {
    id: "kepler-186",
    label: "Kepler-186",
    skyName: "Kepler-186",
    x: 60.1,
    y: 34.1,
    radius: 2.7,
    kind: "poetic",
    color: "rgba(255, 180, 150, 0.85)",
    coord: "X 60 / Y 34",
    image: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001417/GSFC_20171208_Archive_e001417~medium.jpg",
    fact: "Ngôi sao lùn đỏ này là trung tâm của hệ hành tinh chứa Kepler-186f, hành tinh có kích thước tương đương Trái Đất đầu tiên được tìm thấy nằm trong vùng có thể sống được (habitable zone).",
    astronomy: "Tên IAU: Kepler-186, Phân loại: Sao lùn đỏ (M1V), Khoảng cách: 582 ly, Phát hiện: 2014, Tọa độ: RA 19h 54m / Dec +43° 57', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Kepler-186 tượng trưng cho niềm hi vọng mới, những bến đỗ an toàn xa xôi và sự sống tiềm tàng ẩn sau những điều nhỏ bé."
  },
  // 17. Cygnus X-1
  {
    id: "cygnus-x-1",
    label: "Cygnus X-1",
    skyName: "Cygnus X-1 (Hố đen)",
    x: 62.6,
    y: 47.1,
    radius: 2.4,
    kind: "secret",
    color: "rgba(146, 214, 255, 0.9)",
    coord: "X 63 / Y 47",
    image: "https://images-assets.nasa.gov/image/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o~medium.jpg",
    fact: "Thiên thể đầu tiên được giới khoa học công nhận rộng rãi là một hố đen (Black hole). Nó đang từ từ hút và nuốt chửng vật chất từ một ngôi sao khổng lồ xanh lân cận.",
    astronomy: "Phân loại: Hố đen khối lượng sao & Sao siêu khổng lồ xanh, Khoảng cách: 7,300 ly, Phát hiện: 1964, Khối lượng: 21.2 khối lượng Mặt Trời, Tọa độ: RA 19h 58m / Dec +35° 12', Chòm sao: Thiên Nga, Thiên hà: Ngân Hà",
    astrology: "Cygnus X-1 mang năng lượng của sự hấp dẫn mãnh liệt không thể chối từ, sự tái cấu trúc và những bí ẩn sâu thẳm nhất."
  },
  // 18. PSR B1919+21
  {
    id: "psr-b1919-21",
    label: "PSR B1919",
    skyName: "PSR B1919+21 (Pulsar)",
    x: 41.4,
    y: 67.0,
    radius: 2.5,
    kind: "poetic",
    color: "rgba(180, 255, 216, 0.8)",
    coord: "X 41 / Y 67",
    image: "https://images-assets.nasa.gov/image/PIA21085/PIA21085~medium.jpg",
    fact: "Sao xung (pulsar) đầu tiên được con người phát hiện. Nó phát ra xung vô tuyến đều đặn chu kỳ 1.33 giây đến mức ban đầu người ta tưởng đó là tín hiệu của người ngoài hành tinh (LGM-1).",
    astronomy: "Phân loại: Sao xung vô tuyến (Pulsar), Khoảng cách: 2,283 ly, Phát hiện: 1967, Chu kỳ quay: 1.337 giây, Tọa độ: RA 19h 21m / Dec +21° 53', Chòm sao: Cáo (Vulpecula), Thiên hà: Ngân Hà",
    astrology: "PSR B1919+21 đại diện cho nhịp đập bền bỉ, sự chính xác tuyệt đối và những thông điệp lạ lùng đánh thức trí tò mò."
  },
  // 19. M57
  {
    id: "m57-ring",
    label: "M57",
    skyName: "Tinh vân Chiếc Nhẫn (M57)",
    x: 25.4,
    y: 50.4,
    radius: 3.5,
    kind: "secondary",
    color: "rgba(216, 255, 146, 0.75)",
    coord: "X 25 / Y 50",
    image: "https://images-assets.nasa.gov/image/PIA07343/PIA07343~medium.jpg",
    fact: "Một tinh vân tuyệt đẹp mang hình dạng chiếc nhẫn phát sáng. Đây thực chất là tàn dư của một ngôi sao giống Mặt Trời đã chết và đẩy lớp vỏ khí của nó ra ngoài vũ trụ.",
    astronomy: "Phân loại: Tinh vân hành tinh, Khoảng cách: 2,567 ly, Phát hiện: 1779, Cấu trúc: Vỏ khí đang giãn nở, Tọa độ: RA 18h 53m / Dec +33° 01', Chòm sao: Thiên Cầm, Thiên hà: Ngân Hà",
    astrology: "M57 biểu trưng cho vòng tuần hoàn của cái chết và sự tái sinh, vẻ đẹp rực rỡ để lại sau khi kết thúc một hành trình."
  },
  // 20. NGC 6946
  {
    id: "ngc-6946",
    label: "NGC 6946",
    skyName: "Thiên hà Pháo hoa",
    x: 83.8,
    y: 10.0,
    radius: 3.8,
    kind: "poetic",
    color: "rgba(255, 146, 146, 0.8)",
    coord: "X 84 / Y 10",
    image: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000158/GSFC_20171208_Archive_e000158~medium.jpg",
    fact: "Được mệnh danh là 'Thiên hà Pháo hoa' vì nơi đây thường xuyên nổ ra các siêu tân tinh cực kỳ chói lọi rực rỡ.",
    astronomy: "Phân loại: Thiên hà xoắn ốc trung gian (SABcd), Khoảng cách: 25.2 triệu ly, Phát hiện: 1798, Siêu tân tinh: 10 vụ trong thế kỷ qua, Tọa độ: RA 20h 34m / Dec +60° 09', Thiên hà: Thiên hà NGC 6946 (Độc lập)",
    astrology: "NGC 6946 mang nguồn năng lượng bùng nổ, sự hoành tráng không lường trước và khoảnh khắc rực sáng tột độ."
  }
];

export const backgroundStars: StarPoint[] = Array.from({ length: 280 }).map((_, i) => ({
  id: `bg-star-${i}`,
  label: "",
  x: Math.random() * 100,
  y: Math.random() * 100,
  radius: Math.random() * 1.6 + 0.35,
  kind: "minor",
  color: Math.random() > 0.82 ? "rgba(255, 255, 255, 0.84)" : "rgba(241, 231, 216, 0.48)",
  // We'll use labelOffsetX/Y or astrology/astronomy fields as a hack to store the seed since StarPoint type doesn't have a seed.
  // Actually, we can just use the index for the seed in StarfieldCanvas.
}));
