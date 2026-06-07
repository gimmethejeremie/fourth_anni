const fs = require('fs');

const stars = [
  {
    id: "vega", label: "Vega", x: 24, y: 22, radius: 4.5, brightness: 1, kind: "summer",
    astronomy: "Tên IAU: Vega, Tên thông dụng: Chức Nữ, Khoảng cách: 25.04 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng xanh, Độ sáng cực đại: 0.03, Nhiệt độ: 9,600 K.",
    astrology: "Vega mang lại sự lôi cuốn, tinh thần nghệ thuật, tài năng âm nhạc và lý tưởng hóa. Ngôi sao này mang đến sự quyến rũ mạnh mẽ, nhưng cũng nhắc nhở về việc giữ vững đôi chân trên mặt đất.",
    fact: "Trong thần thoại Hy Lạp, Vega đại diện cho chiếc đàn lia của Orpheus, món quà từ thần Apollo. Trong văn hóa Á Đông, Vega là sao Chức Nữ, nàng tiên dệt vải trên thiên đình, người chỉ được gặp lang quân Ngưu Lang mỗi năm một lần qua cầu Ô Thước."
  },
  {
    id: "deneb", label: "Deneb", x: 73, y: 18, radius: 4.2, brightness: 0.95, kind: "summer",
    astronomy: "Tên IAU: Deneb, Tên thông dụng: Thiên Tân, Khoảng cách: ~2,600 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng xanh (siêu khổng lồ), Độ sáng cực đại: 1.25, Nhiệt độ: 8,525 K.",
    astrology: "Deneb tượng trưng cho trí tuệ minh mẫn, khả năng học hỏi nhanh chóng và tầm nhìn xa trông rộng. Ngôi sao này mang đến sự sắc bén trong suy nghĩ và khả năng đạt được thành công nhờ vào năng lực trí tuệ.",
    fact: "Tên Deneb bắt nguồn từ tiếng Ả Rập có nghĩa là 'cái đuôi', tượng trưng cho đuôi của chòm sao Thiên Nga (Cygnus). Theo thần thoại Hy Lạp, đây là con thiên nga mà thần Zeus đã hóa thân để quyến rũ nữ hoàng Leda."
  },
  {
    id: "altair", label: "Altair", x: 48, y: 68, radius: 4.3, brightness: 0.98, kind: "summer",
    astronomy: "Tên IAU: Altair, Tên thông dụng: Ngưu Lang, Khoảng cách: 16.73 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng, Độ sáng cực đại: 0.76, Nhiệt độ: ~7,700 K.",
    astrology: "Altair mang lại lòng dũng cảm, sự tự tin, sự táo bạo và tinh thần độc lập. Nó khuyến khích hành động nhanh nhẹn và quyết đoán, luôn sẵn sàng đón nhận những khởi đầu mới.",
    fact: "Tên Altair xuất phát từ cụm từ Ả Rập có nghĩa là 'con đại bàng đang bay'. Trong sự tích phương Đông, đây là chàng chăn bò Ngưu Lang, người bị chia cắt với vợ mình là Chức Nữ bởi dải Ngân Hà."
  },
  {
    id: "sadr", label: "Sadr", x: 66, y: 32, radius: 3.8, brightness: 0.9, kind: "major",
    astronomy: "Tên IAU: Sadr, Tên thông dụng: Gamma Cygni, Khoảng cách: 1,800 ly, Phát hiện: Thời cổ đại, Màu sắc: Vàng trắng, Độ sáng cực đại: 2.23, Nhiệt độ: 6,100 K.",
    astrology: "Sadr mang năng lượng của sự nuôi dưỡng, từ bi và chở che. Ngôi sao này đại diện cho sự thấu cảm, khơi dậy những giá trị cốt lõi và lòng trắc ẩn của tâm hồn.",
    fact: "Tên Sadr bắt nguồn từ tiếng Ả Rập 'Al Sadr al Dajajah', nghĩa là 'bộ ngực của con thiên nga'. Nó nằm ở vị trí giao nhau của Mạng lưới Thập tự phương Bắc, tạo nên 'trái tim' rực rỡ của chòm Cygnus."
  },
  {
    id: "albireo", label: "Albireo", x: 58, y: 48, radius: 3.5, brightness: 0.85, kind: "key", unlockAchievement: "sky_key_albireo",
    astronomy: "Tên IAU: Albireo, Tên thông dụng: Mỏ thiên nga, Khoảng cách: ~430 ly, Phát hiện: Thời cổ đại, Màu sắc: Vàng và Xanh lam (Sao đôi), Độ sáng cực đại: 3.05, Nhiệt độ: 4,270 K / 13,200 K.",
    astrology: "Albireo đại diện cho sự hài hòa từ những điều khác biệt, sự cân bằng giữa lý trí và cảm xúc. Ngôi sao này tượng trưng cho cái đẹp của sự đồng hành, nơi hai bản thể tỏa sáng mà không làm lu mờ nhau.",
    fact: "Albireo thường được mệnh danh là ngôi sao đôi đẹp nhất trên bầu trời. Qua kính viễn vọng, sự tương phản màu sắc tuyệt đẹp giữa màu vàng rực và xanh sapphire của hai ngôi sao sẽ hiện ra rõ rệt."
  },
  {
    id: "tarazed", label: "Tarazed", x: 42, y: 63, radius: 3.2, brightness: 0.8, kind: "major",
    astronomy: "Tên IAU: Tarazed, Tên thông dụng: Gamma Aquilae, Khoảng cách: 395 ly, Phát hiện: Thời cổ đại, Màu sắc: Cam, Độ sáng cực đại: 2.72, Nhiệt độ: 4,100 K.",
    astrology: "Tarazed gắn liền với tính kiên trì, sự bền bỉ và bảo vệ. Nó như một người hộ vệ trung thành, mang lại sức mạnh để đối mặt với thử thách mà không đòi hỏi ánh hào quang.",
    fact: "Tên của nó xuất phát từ tiếng Ba Tư 'šāhīn-i tarāzū', nghĩa là 'cán cân'. Cùng với Alshain, nó là một trong hai ngôi sao chầu bên cạnh Altair, tạo thành một đường thẳng nổi bật gọi là 'Trục của Đại bàng'."
  },
  {
    id: "alshain", label: "Alshain", x: 54, y: 65, radius: 3.1, brightness: 0.75, kind: "major",
    astronomy: "Tên IAU: Alshain, Tên thông dụng: Beta Aquilae, Khoảng cách: 44.7 ly, Phát hiện: Thời cổ đại, Màu sắc: Vàng nhạt, Độ sáng cực đại: 3.71, Nhiệt độ: 5,100 K.",
    astrology: "Alshain mang năng lượng của sự ổn định, kỷ luật và khả năng nhìn nhận mọi thứ một cách khách quan. Nó giúp con người giữ đôi chân trên mặt đất và xây dựng các nền tảng vững chắc.",
    fact: "Nằm rất gần Altair, Alshain là một phần của cụm sao 'Gia đình Đại bàng'. Tên của nó cũng bắt nguồn từ cụm từ tiếng Ba Tư cổ đại mang ý nghĩa 'cán cân' hoặc 'cánh chim'."
  },
  {
    id: "ruchba", label: "Ruchba", x: 70, y: 38, radius: 2.8, brightness: 0.7, kind: "secondary",
    astronomy: "Tên IAU: Ruchba, Tên thông dụng: Omega1 Cygni, Khoảng cách: ~910 ly, Phát hiện: Thời cổ đại, Màu sắc: Xanh trắng, Độ sáng cực đại: 4.94, Nhiệt độ: 22,000 K.",
    astrology: "Ruchba biểu trưng cho những bước đệm vững chãi, sự khiêm tốn và lòng tận tụy. Dù không phải là ngôi sao rực rỡ nhất, nó đại diện cho sức mạnh thầm lặng nâng đỡ những cấu trúc vĩ đại.",
    fact: "Trong thiên văn học Ả Rập, 'Ruchba' có nghĩa là 'đầu gối' của con thiên nga. Dù chỉ là một điểm sáng nhỏ bé, nó giúp hoàn thiện hình hài vĩ đại của chòm sao Thiên Nga trên bầu trời đêm."
  },
  {
    id: "gienah", label: "Gienah", x: 78, y: 36, radius: 2.9, brightness: 0.72, kind: "secondary",
    astronomy: "Tên IAU: Gienah, Tên thông dụng: Epsilon Cygni, Khoảng cách: 73 ly, Phát hiện: Thời cổ đại, Màu sắc: Cam, Độ sáng cực đại: 2.48, Nhiệt độ: 4,725 K.",
    astrology: "Gienah kết nối với khả năng mở rộng tư duy, sự tự do khám phá và khao khát vượt qua những giới hạn cũ. Nó mang lại năng lượng của những chuyến đi xa và sự cởi mở trong tâm hồn.",
    fact: "Cái tên 'Gienah' bắt nguồn từ tiếng Ả Rập 'Janāḥ', nghĩa là 'đôi cánh'. Ngôi sao này đánh dấu vị trí sải cánh vươn rộng của Thiên Nga khi tung bay dọc theo dải Ngân Hà rực rỡ."
  },
  {
    id: "fawaris", label: "Fawaris", x: 62, y: 24, radius: 3.0, brightness: 0.75, kind: "secondary",
    astronomy: "Tên IAU: Fawaris, Tên thông dụng: Delta Cygni, Khoảng cách: 165 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng xanh, Độ sáng cực đại: 2.87, Nhiệt độ: 9,800 K.",
    astrology: "Fawaris mang tính chất của sự nhanh nhẹn, khả năng thích ứng và linh hoạt. Ngôi sao này đại diện cho sự uyển chuyển khi đối phó với những thay đổi bất ngờ trong cuộc sống.",
    fact: "'Fawaris' có nghĩa là 'những kỵ sĩ' trong tiếng Ả Rập, là tàn tích của một chòm sao cổ đại được người Ả Rập tưởng tượng trước khi áp dụng hệ thống chòm sao Hy Lạp. Ngày nay nó đóng vai trò là một cánh của Thiên Nga."
  },
  {
    id: "zeta-cygni", label: "Zeta Cygni", x: 54, y: 39, radius: 2.7, brightness: 0.65, kind: "secondary",
    astronomy: "Tên IAU: Zeta Cygni, Tên thông dụng: Zeta Cygni, Khoảng cách: 143 ly, Phát hiện: Thời cổ đại, Màu sắc: Vàng, Độ sáng cực đại: 3.20, Nhiệt độ: 4,900 K.",
    astrology: "Zeta Cygni mang đến năng lượng của sự chiêm nghiệm, đánh giá lại quá khứ và tìm kiếm sự trưởng thành từ bên trong. Nó đại diện cho trí tuệ thu được từ những trải nghiệm tĩnh lặng.",
    fact: "Là một ngôi sao khổng lồ màu vàng, Zeta Cygni đã kết thúc quá trình đốt cháy hydro ở lõi và đang tiến vào giai đoạn phát triển thành một ngôi sao già cỗi, một quá trình biến đổi ngoạn mục trong vòng đời các vì sao."
  },
  {
    id: "eta-cygni", label: "Eta Cygni", x: 49, y: 52, radius: 2.5, brightness: 0.6, kind: "secondary",
    astronomy: "Tên IAU: Eta Cygni, Tên thông dụng: Eta Cygni, Khoảng cách: 135 ly, Phát hiện: Thời cổ đại, Màu sắc: Cam, Độ sáng cực đại: 3.89, Nhiệt độ: 4,700 K.",
    astrology: "Eta Cygni được liên kết với sự cẩn trọng, khả năng tập trung vào tiểu tiết và lòng trung thành. Nó nhắc nhở chúng ta về giá trị của những điều nhỏ bé và sự đóng góp không phô trương.",
    fact: "Nằm giữa Sadr và Albireo trên cổ của Thiên Nga, Eta Cygni đang ở trong giai đoạn tiến hóa thành sao khổng lồ đỏ, và là nơi chứa đựng những tàn dư của đám mây khí tạo sao khổng lồ trong dải Ngân Hà."
  },
  {
    id: "epsilon-lyrae", label: "Epsilon Lyrae", x: 29, y: 18, radius: 3.2, brightness: 0.85, kind: "key", unlockAchievement: "sky_key_echo",
    astronomy: "Tên IAU: Epsilon Lyrae, Tên thông dụng: Double Double, Khoảng cách: ~162 ly, Phát hiện: Kỷ nguyên kính viễn vọng (1779), Màu sắc: Trắng, Độ sáng cực đại: 4.67, Nhiệt độ: ~8,200 K.",
    astrology: "Epsilon Lyrae đại diện cho sự đa nguyên, tính cách phức tạp và khả năng nhìn nhận vấn đề từ nhiều góc độ. Nó mang đến cái nhìn sâu sắc và khả năng thấu hiểu những lớp ý nghĩa ẩn giấu.",
    fact: "Được mệnh danh là 'Double Double', hệ sao này nổi tiếng vì khi nhìn bằng mắt thường nó trông như một ngôi sao đôi, nhưng qua kính thiên văn, mỗi ngôi sao trong đó lại tách ra thành một cặp đôi nữa, tạo thành một vũ điệu của 4 mặt trời."
  },
  {
    id: "sheliak", label: "Sheliak", x: 20, y: 31, radius: 2.8, brightness: 0.7, kind: "secondary",
    astronomy: "Tên IAU: Sheliak, Tên thông dụng: Beta Lyrae, Khoảng cách: 960 ly, Phát hiện: Biến quang được phát hiện năm 1784, Màu sắc: Trắng xanh, Độ sáng cực đại: 3.52, Nhiệt độ: 13,300 K.",
    astrology: "Sheliak mang năng lượng của sự biến đổi liên tục, tính chu kỳ và sự tái sinh. Nó liên kết với khả năng thích nghi trước các thăng trầm của số phận và sức mạnh để vươn lên từ nghịch cảnh.",
    fact: "Sheliak là một hệ sao đôi độc đáo đến mức nó trở thành nguyên mẫu cho một lớp sao biến quang. Hai ngôi sao trong hệ này ở gần nhau đến mức lực hấp dẫn kéo chúng thành hình quả trứng, và chúng liên tục trao đổi vật chất cho nhau."
  },
  {
    id: "sulafat", label: "Sulafat", x: 31, y: 34, radius: 2.9, brightness: 0.72, kind: "secondary",
    astronomy: "Tên IAU: Sulafat, Tên thông dụng: Gamma Lyrae, Khoảng cách: 620 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng xanh, Độ sáng cực đại: 3.26, Nhiệt độ: 10,000 K.",
    astrology: "Sulafat được coi là đại diện cho sự bảo vệ, lớp vỏ bọc an toàn và sự khôn ngoan tĩnh lặng. Nó tượng trưng cho khả năng phòng thủ vững chắc và sự kiên nhẫn để vượt qua thử thách dài hạn.",
    fact: "Tên Sulafat xuất phát từ tiếng Ả Rập có nghĩa là 'con rùa'. Điều này gợi nhớ đến thần thoại Hy Lạp kể rằng thần đồng thau Hermes đã chế tạo ra chiếc đàn lia đầu tiên (chòm sao Lyra) bằng cách căng những sợi dây qua một chiếc mai rùa rỗng."
  },
  {
    id: "sualocin", label: "Sualocin", x: 70, y: 59, radius: 3.0, brightness: 0.75, kind: "secret",
    astronomy: "Tên IAU: Sualocin, Tên thông dụng: Alpha Delphini, Khoảng cách: ~254 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng xanh, Độ sáng cực đại: 3.77, Nhiệt độ: 11,600 K.",
    astrology: "Sualocin đại diện cho sự nhanh trí, tính tò mò và khả năng giải quyết vấn đề đầy sáng tạo. Ngôi sao này mang lại niềm vui, sự lạc quan và trí thông minh vô tư của loài cá heo biển cả.",
    fact: "Tên của ngôi sao này thực chất là một trò đùa thế kỷ 19! Nhà thiên văn Niccolò Cacciatore đã viết ngược tên Latin của mình (Nicolaus) thành 'Sualocin' và đưa nó vào danh mục sao. Trò đùa này mãi sau mới bị phát hiện nhưng cái tên đã được giữ lại."
  },
  {
    id: "rotanev", label: "Rotanev", x: 74, y: 56, radius: 3.1, brightness: 0.8, kind: "secret",
    astronomy: "Tên IAU: Rotanev, Tên thông dụng: Beta Delphini, Khoảng cách: 101 ly, Phát hiện: Thời cổ đại, Màu sắc: Vàng trắng, Độ sáng cực đại: 3.63, Nhiệt độ: 6,500 K.",
    astrology: "Rotanev tượng trưng cho tính hài hước, sự phá cách và tinh thần đồng đội. Nó mang đến sự nhẹ nhõm, nhắc nhở chúng ta đừng quá coi trọng bản thân và hãy tìm thấy niềm vui trong những điều bất ngờ.",
    fact: "Tương tự như Sualocin, Rotanev là họ Latin của Cacciatore (Venator) viết ngược lại. Cặp sao này đánh dấu chòm Cá Heo - sinh vật trong thần thoại đã cứu sống nhà thơ Arion khỏi bọn cướp biển nhờ sự rung cảm đặc biệt với âm nhạc."
  },
  {
    id: "gamma-delphini", label: "Gamma Delphini", x: 76, y: 62, radius: 2.7, brightness: 0.65, kind: "secret",
    astronomy: "Tên IAU: Gamma Delphini, Tên thông dụng: Gamma Delphini, Khoảng cách: 115 ly, Phát hiện: Thời cổ đại, Màu sắc: Vàng và Cam (Sao đôi), Độ sáng cực đại: 4.27, Nhiệt độ: 4,700 K.",
    astrology: "Gamma Delphini liên kết với lòng vị tha, sự cứu rỗi và bản năng bảo vệ những người yếu thế. Nó đại diện cho sự hướng dẫn tâm linh, một tấm lòng tử tế và lòng tốt thuần khiết.",
    fact: "Đây là một hệ sao đôi tuyệt đẹp với sự kết hợp màu sắc vàng và cam, được ví như hai viên ngọc đính trên chiếc vương miện nhỏ của chòm Cá Heo. Trong thần thoại, cá heo là sứ giả trung thành và người dẫn đường của thần biển Poseidon."
  },
  {
    id: "delta-delphini", label: "Delta Delphini", x: 72, y: 65, radius: 2.6, brightness: 0.6, kind: "secret",
    astronomy: "Tên IAU: Delta Delphini, Tên thông dụng: Delta Delphini, Khoảng cách: 223 ly, Phát hiện: Thời cổ đại, Màu sắc: Trắng, Độ sáng cực đại: 4.43, Nhiệt độ: 7,000 K.",
    astrology: "Delta Delphini mang năng lượng của giao tiếp, sự nhạy bén và âm nhạc. Nó biểu trưng cho những sóng âm truyền đi xa, kết nối những tâm hồn đồng điệu và vượt qua các rào cản ngôn ngữ.",
    fact: "Delta Delphini cùng với các ngôi sao khác tạo thành nhóm sao hình kim cương thường được gọi là 'Chiếc quan tài của Job'. Tuy nhiên, hình dáng đáng yêu của nó trên bầu trời đêm lại giống như một chú cá heo đang tung mình trên mặt sóng hơn."
  },
  {
    id: "delta-lyrae", label: "Delta Lyrae", x: 16, y: 15, radius: 2.0, brightness: 0.5, kind: "poetic",
    astronomy: "Tên IAU: Delta Lyrae, Tên thông dụng: Delta Lyrae, Khoảng cách: ~1,100 ly (Delta2), Phát hiện: Thời cổ đại, Màu sắc: Đỏ và Xanh, Độ sáng cực đại: 4.30, Nhiệt độ: ~3,600 K.",
    astrology: "Delta Lyrae liên kết với những giấc mơ xa xăm, sự lãng mạn vô hình và những cảm xúc sâu thẳm. Nó đại diện cho sự đồng điệu tâm hồn của những cá thể tưởng chừng như không thuộc về nhau.",
    fact: "Delta Lyrae là một hệ sao 'quang học kép' cực kì độc đáo. Chúng trông như đang ở sát cạnh nhau trên bầu trời nhưng thực chất lại cách xa nhau hàng trăm năm ánh sáng trong không gian. Hai ngôi sao với hai dải màu xanh đỏ rực rỡ tạo nên một ảo ảnh tuyệt đẹp về sự song hành vĩnh cửu."
  }
];

let output = `export type StarKind = "summer" | "key" | "major" | "minor" | "secret" | "poetic" | "secondary";

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
};

export const summerTriangleIds = ["vega", "deneb", "altair"];
export const constellationCode = summerTriangleIds;
export const keyStarIds = ["albireo", "epsilon-lyrae"];

export const constellationStars: StarPoint[] = [
`;

for (const star of stars) {
  const c = "rgba(241, 231, 216, " + star.brightness + ")";
  const ach = star.unlockAchievement ? ", unlockAchievement: \"" + star.unlockAchievement + "\"" : '';

  output += "  {\n";
  output += "    id: \"" + star.id + "\",\n";
  output += "    label: \"" + star.label + "\",\n";
  output += "    skyName: \"" + star.label + "\",\n";
  output += "    x: " + star.x + ",\n";
  output += "    y: " + star.y + ",\n";
  output += "    radius: " + star.radius + ",\n";
  output += "    kind: \"" + star.kind + "\",\n";
  output += "    color: \"" + c + "\",\n";
  output += "    coord: \"X " + star.x + " / Y " + star.y + "\",\n";
  output += "    fact: \"" + star.fact + "\",\n";
  output += "    astronomy: \"" + star.astronomy + "\",\n";
  output += "    astrology: \"" + star.astrology + "\"" + ach + "\n";
  output += "  },\n";
}

output += "];\n\n";
output += "export const backgroundStars: StarPoint[] = Array.from({ length: 60 }).map((_, i) => ({\n";
output += "  id: \`bg-star-\${i}\`,\n";
output += "  label: \"\",\n";
output += "  x: Math.random() * 100,\n";
output += "  y: Math.random() * 100,\n";
output += "  radius: Math.random() * 1.5 + 0.5,\n";
output += "  kind: \"minor\",\n";
output += "  color: \"rgba(241, 231, 216, 0.4)\",\n";
output += "}));\n";

fs.writeFileSync('src/data/constellation.ts', output);
console.log("Rich data rewrite completed.");
