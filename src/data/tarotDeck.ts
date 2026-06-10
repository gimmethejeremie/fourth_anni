export type TarotTopic = "general" | "love" | "study" | "future" | "self";

export type TarotMeaningGroup = {
  keywords: string[];
  general: string[];
  love: string[];
  study: string[];
  future: string[];
  self: string[];
};

export type TarotCard = {
  id: string;
  name: string;
  viName: string;
  arcana: "major" | "minor";
  suit?: "cups" | "wands" | "swords" | "pentacles";
  image: string;
  upright: TarotMeaningGroup;
  reversed: TarotMeaningGroup;
};

export const tarotTopicLabels: Record<TarotTopic, string> = {
  general: "Tổng quan",
  love: "Tình cảm",
  study: "Học tập",
  future: "Tương lai",
  self: "Bản thân",
};

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const featuredTarotCards: TarotCard[] = [
  {
    id: "the-fool",
    name: "The Fool",
    viName: "Kẻ Khởi Hành",
    arcana: "major",
    image: publicAsset("cards/the-fool.jpg"),
    upright: {
      keywords: ["khởi đầu", "tự do", "niềm tin"],
      general: [
        "Một lối rẽ mới đang gọi khẽ, và bạn có thể bước thử mà chưa cần biết hết bản đồ.",
        "Lá bài này gợi một tinh thần nhẹ tênh: bắt đầu nhỏ, giữ mắt mở, để hành trình dạy phần còn lại.",
        "Có điều gì đó còn non nhưng sáng; nếu nâng niu đúng cách, nó có thể thành một chương đáng nhớ.",
      ],
      love: [
        "Trong tình cảm, The Fool mời hai người thành thật hơn với sự tò mò dành cho nhau.",
        "Một nhịp rung mới có thể xuất hiện, mềm và hơi vụng, nhưng không vì thế mà kém đáng yêu.",
        "Nếu trái tim muốn bước tới, hãy để sự nhẹ nhàng đi trước thay vì vội đặt tên mọi thứ.",
      ],
      study: [
        "Việc học có thể cần một cách tiếp cận mới, bớt sợ sai và cho phép mình thử nghiệm.",
        "Bạn đang ở đoạn mở đầu của một kỹ năng; tiến bộ nhỏ hôm nay vẫn là tín hiệu tốt.",
        "Hãy chọn một bước dễ làm trước, rồi để sự tò mò kéo bạn đi xa hơn.",
      ],
      future: [
        "Phía trước có cảm giác của một trang trắng, chưa rõ nét nhưng không hề trống rỗng.",
        "Tương lai gần có thể mở bằng một quyết định nhỏ, kiểu quyết định khiến bạn thấy mình còn sống động.",
        "Lá bài không hứa trước kết quả, chỉ nhắc rằng cánh cửa mới thường mở khi bạn chịu chạm tay.",
      ],
      self: [
        "Bạn có thể đang cần cho mình quyền được bắt đầu lại mà không tự trách quá nhiều.",
        "Có một phần trong bạn vẫn muốn chơi, muốn tin, muốn đi; phần ấy xứng đáng được lắng nghe.",
        "The Fool nhắc bạn nhẹ tay với bản thân: chưa biết hết không có nghĩa là không được bước.",
      ],
    },
    reversed: {
      keywords: ["chần chừ", "vội vàng", "lạc nhịp"],
      general: [
        "Có thể bạn đang đứng trước cửa nhưng vừa muốn chạy, vừa muốn quay về; hãy thở chậm hơn một nhịp.",
        "Lá bài ngược gợi rằng sự tự do cần thêm chút nền tảng để không biến thành lạc hướng.",
        "Một lựa chọn đang cần được nhìn kỹ hơn, không phải để sợ, mà để bước cho vững.",
      ],
      love: [
        "Trong tình cảm, có thể ai đó đang né sự rõ ràng bằng cách tỏ ra quá nhẹ nhàng.",
        "Một cuộc trò chuyện nhỏ có thể giúp hai người bớt đoán mò và bớt tự làm mình rối.",
        "Đừng ép trái tim nhảy qua những đoạn nó chưa kịp hiểu; nhịp chậm vẫn có thể rất thật.",
      ],
      study: [
        "Bạn có thể đang học theo hứng quá nhiều; một lịch nhỏ sẽ giữ ngọn lửa khỏi tắt.",
        "Nếu thấy mình dễ bỏ ngang, hãy thu bài học lại thành một mục tiêu gần hơn.",
        "Lá bài ngược nhắc rằng thử nghiệm vẫn cần ghi chú, nếu không kinh nghiệm sẽ trôi mất.",
      ],
      future: [
        "Tương lai gần có thể cần bạn dọn bớt sự hấp tấp trước khi mở thêm đường.",
        "Một cơ hội chưa mất đi, nhưng có lẽ nó muốn bạn chuẩn bị kỹ hơn một chút.",
        "Đừng vội gọi sự mơ hồ là dấu xấu; đôi khi nó chỉ đang yêu cầu thêm ánh sáng.",
      ],
      self: [
        "Bạn có thể đang nghi ngờ bản thân vì chưa thấy lối đi rõ; điều đó không làm bạn kém can đảm.",
        "Hãy phân biệt tiếng gọi thật với cảm giác muốn chạy trốn khỏi hiện tại.",
        "Một phần trong bạn cần được ôm lại trước khi được bảo phải mạnh mẽ hơn.",
      ],
    },
  },
  {
    id: "the-magician",
    name: "The Magician",
    viName: "Nhà Giả Kim",
    arcana: "major",
    image: publicAsset("cards/the-magician.jpg"),
    upright: {
      keywords: ["ý chí", "kỹ năng", "biến hóa"],
      general: [
        "Bạn đang có nhiều công cụ hơn mình nghĩ; chỉ cần gom chúng về cùng một hướng.",
        "The Magician gợi một khoảnh khắc biến ý tưởng thành hình, chậm nhưng có chủ đích.",
        "Điều quan trọng lúc này có thể không phải là thêm phép màu, mà là dùng đúng thứ đã có.",
      ],
      love: [
        "Trong tình cảm, lời nói rõ ràng có thể trở thành chiếc cầu dịu dàng giữa hai người.",
        "Một cử chỉ nhỏ, nếu làm bằng sự có mặt thật, có thể sáng hơn nhiều lời hứa lớn.",
        "Lá bài này khuyến khích bạn chủ động nhưng vẫn giữ sự tinh tế của trái tim.",
      ],
      study: [
        "Bạn có thể học tốt hơn khi biến kiến thức thành thứ chạm được: ghi, nói, làm thử.",
        "Những kỹ năng rời rạc đang chờ được nối lại thành một hệ thống của riêng bạn.",
        "Hãy chọn một phương pháp và thực hành đều; phép màu của lá này nằm ở bàn tay lặp lại.",
      ],
      future: [
        "Tương lai gần có thể mở ra khi bạn dám đặt tên cho điều mình muốn tạo.",
        "Một dự định đang có đủ nguyên liệu cơ bản, chỉ thiếu khoảnh khắc bạn bắt tay vào.",
        "The Magician không cam kết kết quả, nhưng gợi rằng quyền khởi động đang ở gần bạn.",
      ],
      self: [
        "Bạn không chỉ là người chờ dấu hiệu; bạn cũng là người có thể tạo ra dấu hiệu.",
        "Có một năng lực đã ngủ yên khá lâu, và nó đang muốn được gọi bằng tên thật.",
        "Lá bài nhắc bạn tin vào sự khéo léo mềm mại của mình, không cần phô trương.",
      ],
    },
    reversed: {
      keywords: ["phân tán", "nghi ngờ", "thiếu rõ ràng"],
      general: [
        "Năng lượng đang có, nhưng có thể bị chia nhỏ vào quá nhiều hướng cùng lúc.",
        "The Magician ngược nhắc bạn kiểm tra lại mục đích trước khi cố làm mọi thứ thật nhanh.",
        "Một chút thành thật với động cơ của mình có thể làm màn nhiễu trong đầu dịu xuống.",
      ],
      love: [
        "Trong tình cảm, hãy để lời nói và hành động đi gần nhau hơn.",
        "Có thể một người đang cố tỏ ra ổn hơn thực tế; sự mềm thật sẽ chữa được nhiều hơn vai diễn.",
        "Nếu thấy tín hiệu lẫn lộn, hãy hỏi bằng giọng hiền thay vì tự dựng cả câu chuyện trong đầu.",
      ],
      study: [
        "Bạn có thể đang gom quá nhiều tài liệu mà chưa thật sự tiêu hóa được gì.",
        "Một kế hoạch học gọn hơn sẽ giúp năng lượng bớt tản ra như sóng nhiễu.",
        "Hãy quay lại nền tảng; kỹ năng lớn thường cần một động tác nhỏ được làm đúng.",
      ],
      future: [
        "Tương lai gần có thể chưa rõ vì hiện tại đang có quá nhiều tín hiệu cạnh tranh.",
        "Trước khi mở thêm dự án, hãy hỏi điều nào thật sự đáng đặt năng lượng vào.",
        "Lá bài không đóng cửa, chỉ nhắc bạn chỉnh lại tần số trước khi phát sóng.",
      ],
      self: [
        "Bạn có thể đang đánh giá thấp mình vì chưa thấy mọi thứ vào khuôn.",
        "Đừng biến sự đa tài thành áp lực phải làm tất cả cùng một lúc.",
        "The Magician ngược mời bạn trở về với một câu hỏi giản dị: mình thật sự muốn tạo gì?",
      ],
    },
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    viName: "Nữ Tư Tế",
    arcana: "major",
    image: publicAsset("cards/the-high-priestess.jpg"),
    upright: {
      keywords: ["trực giác", "bí mật", "lắng nghe"],
      general: [
        "Có điều gì đó chưa nói thành lời, nhưng bạn có thể đã cảm thấy nó từ trước.",
        "Nữ Tư Tế mời bạn giảm tiếng ồn bên ngoài để nghe rõ tiếng thì thầm bên trong.",
        "Không phải mọi câu trả lời đều đến bằng ánh đèn lớn; vài điều chỉ hiện khi bạn đủ yên.",
      ],
      love: [
        "Trong tình cảm, sự im lặng có thể chứa nhiều thông tin, miễn là bạn không dùng nó để tự làm đau mình.",
        "Một kết nối đang cần thêm lắng nghe, không chỉ lắng nghe người kia mà cả cảm giác của bạn.",
        "Có thể trái tim đã biết điều lý trí còn đang cố giải thích.",
      ],
      study: [
        "Việc học lúc này hợp với quan sát sâu, đọc chậm và để kiến thức lắng xuống.",
        "Bạn có thể cần tin hơn vào cách mình tự nhận ra mẫu hình và liên kết.",
        "Một ghi chú tưởng nhỏ có thể mở ra hiểu biết lớn nếu bạn quay lại đúng lúc.",
      ],
      future: [
        "Tương lai gần còn phủ một lớp sương, nhưng trực giác có thể là chiếc đèn nhỏ.",
        "Đừng vội ép câu trả lời; một vài dữ kiện vẫn đang trên đường hiện ra.",
        "Lá bài gợi rằng điều cần biết sẽ đến dịu hơn nếu bạn không đuổi theo quá mạnh.",
      ],
      self: [
        "Bạn có một vùng sâu rất tinh tế, và nó không cần phải giải thích cho mọi người hiểu ngay.",
        "Hãy tin vào cảm giác lặp lại nhiều lần trong lòng, nhất là khi nó đến rất khẽ.",
        "Nữ Tư Tế nhắc bạn giữ một khoảng riêng để mình được nghe lại chính mình.",
      ],
    },
    reversed: {
      keywords: ["nhiễu sóng", "giấu lòng", "mất kết nối"],
      general: [
        "Có thể bạn đang biết điều gì đó nhưng cố bỏ qua vì nó chưa tiện để nhìn thẳng.",
        "Lá bài ngược nhắc rằng im lặng quá lâu có thể làm trực giác biến thành lo âu.",
        "Hãy phân biệt linh cảm với tiếng sợ hãi; cả hai đều khẽ, nhưng cảm giác để lại rất khác.",
      ],
      love: [
        "Trong tình cảm, điều chưa nói có thể đang lớn lên trong bóng tối.",
        "Một câu hỏi hiền và rõ có thể tốt hơn nhiều ngày đoán ý nhau.",
        "Nếu bạn thấy mình phải thu nhỏ cảm xúc quá lâu, hãy cho nó một nơi an toàn để lên tiếng.",
      ],
      study: [
        "Bạn có thể đang thiếu dữ kiện nhưng lại tự trách mình vì chưa hiểu ngay.",
        "Đừng học trong trạng thái quá nhiễu; nghỉ một chút có thể làm trí nhớ sáng lại.",
        "Một phần bài học đang bị bỏ qua vì nó trông không quan trọng, hãy kiểm tra lại.",
      ],
      future: [
        "Tương lai gần có thể bị che bởi giả định cũ; hãy chờ thêm tín hiệu thật.",
        "Đừng để nỗi lo đóng vai trực giác quá lâu.",
        "Lá bài gợi rằng sự rõ ràng sẽ đến khi bạn dám hỏi đúng câu hỏi.",
      ],
      self: [
        "Bạn có thể đang giấu cảm giác của mình để dễ đi tiếp, nhưng cơ thể vẫn nhớ.",
        "Hãy cho mình một khoảng yên không cần biểu diễn sự ổn định.",
        "Nữ Tư Tế ngược mời bạn nối lại với giọng nói bên trong bằng sự dịu dàng.",
      ],
    },
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    viName: "Những Người Yêu Nhau",
    arcana: "major",
    image: publicAsset("cards/the-lovers.jpg"),
    upright: {
      keywords: ["kết nối", "lựa chọn", "hòa hợp"],
      general: [
        "Một lựa chọn đang cần được làm bằng cả lý trí lẫn trái tim.",
        "The Lovers gợi sự hòa hợp khi các phần khác nhau trong bạn chịu ngồi cùng bàn.",
        "Có một kết nối đáng quý quanh đây, nhưng nó cần sự thành thật để không biến thành ảo ảnh.",
      ],
      love: [
        "Trong tình cảm, lá bài này nói về sự chọn nhau từng chút, không chỉ rung động ban đầu.",
        "Một mối liên hệ có thể sâu hơn nếu hai người dám nói thật mà vẫn giữ sự mềm.",
        "Tình yêu ở đây giống một bản song ca: đẹp nhất khi cả hai còn nghe thấy nhau.",
      ],
      study: [
        "Việc học có thể tốt lên khi bạn chọn đúng người đồng hành hoặc đúng môi trường.",
        "Bạn đang cần chọn giữa nhiều hướng; hãy ưu tiên hướng khiến mình thấy tỉnh táo và có trách nhiệm.",
        "Một sự kết hợp giữa sở thích và kỷ luật có thể tạo ra nhịp học bền hơn.",
      ],
      future: [
        "Tương lai gần có thể xoay quanh một lựa chọn quan trọng nhưng không cần vội vàng.",
        "Một mối liên kết hoặc hợp tác có thể mở đường nếu được xây bằng sự rõ ràng.",
        "Lá bài gợi rằng điều bạn chọn nên phản ánh giá trị thật, không chỉ cảm xúc nhất thời.",
      ],
      self: [
        "Bạn đang được mời hòa giải với những phần tưởng như trái ngược trong mình.",
        "Hãy hỏi: lựa chọn nào khiến mình gần với con người mình muốn trở thành hơn?",
        "The Lovers nhắc rằng yêu bản thân cũng là học cách chọn điều không làm mình biến mất.",
      ],
    },
    reversed: {
      keywords: ["lệch nhịp", "mâu thuẫn", "chưa rõ lòng"],
      general: [
        "Có thể hai mong muốn trong bạn đang kéo về hai phía, và cả hai đều cần được nghe.",
        "Lá bài ngược gợi rằng một lựa chọn thiếu rõ ràng đang làm năng lượng bị kẹt.",
        "Đừng vội ép mình đồng ý với điều trái tim chưa kịp chấp nhận.",
      ],
      love: [
        "Trong tình cảm, có thể hai người đang hiểu khác nhau về cùng một tín hiệu.",
        "Một khoảng lệch không nhất thiết là kết thúc; đôi khi nó chỉ cần lời nói thật hơn.",
        "Hãy để sự tôn trọng dẫn đường trước khi cố kéo mọi thứ về cùng một nhịp.",
      ],
      study: [
        "Bạn có thể đang chọn theo kỳ vọng bên ngoài nhiều hơn nhu cầu thật của mình.",
        "Nếu mất tập trung, hãy xem lại mục tiêu này có còn thuộc về bạn không.",
        "Một nhóm học hoặc kế hoạch cũ có thể cần chỉnh lại vai trò để bớt lệch.",
      ],
      future: [
        "Tương lai gần có thể yêu cầu bạn không né tránh quyết định quá lâu.",
        "Một hướng đi đang cần được cân lại bằng giá trị, giới hạn và sự thật.",
        "Lá bài không bảo phải cắt bỏ, chỉ nhắc rằng sự mập mờ cũng có trọng lượng.",
      ],
      self: [
        "Bạn có thể đang cố làm vừa lòng quá nhiều phía và bỏ quên tiếng mình.",
        "Hãy hỏi bản thân điều gì là mong muốn thật, điều gì chỉ là sợ làm ai thất vọng.",
        "The Lovers ngược mời bạn quay lại với sự trung thực dịu dàng dành cho chính mình.",
      ],
    },
  },
  {
    id: "the-chariot",
    name: "The Chariot",
    viName: "Cỗ Xe Chiến",
    arcana: "major",
    image: publicAsset("cards/the-chariot.jpg"),
    upright: {
      keywords: ["tiến lên", "kỷ luật", "định hướng"],
      general: [
        "Bạn có thể đang cần cầm dây cương lại, không phải để kiểm soát tất cả, mà để chọn hướng.",
        "The Chariot gợi một nhịp tiến chắc hơn khi ý chí và cảm xúc không còn kéo nhau quá xa.",
        "Một mục tiêu đang có thể đi tiếp nếu bạn giữ mắt trên đường và tay trên bánh lái.",
      ],
      love: [
        "Trong tình cảm, sự chủ động rõ ràng có thể giúp mối liên hệ bớt trôi theo đoán định.",
        "Hai người có thể cần cùng nhìn về một hướng, dù cách di chuyển không hoàn toàn giống nhau.",
        "Lá bài khuyến khích tiến tới, nhưng vẫn nhớ rằng trái tim không thích bị kéo lê.",
      ],
      study: [
        "Việc học đang cần một kế hoạch có nhịp, có điểm đến và có khoảng nghỉ.",
        "Nếu bạn chọn một mục tiêu cụ thể, năng lượng rải rác có thể gom lại khá nhanh.",
        "The Chariot ủng hộ sự bền bỉ: không cần ồn ào, chỉ cần quay lại bàn học đều hơn.",
      ],
      future: [
        "Tương lai gần có thể mở bằng hành động có kỷ luật hơn là chờ cảm hứng.",
        "Một chuyến đi, một dự án, hoặc một mục tiêu đang muốn bạn nói rõ hướng của mình.",
        "Lá bài gợi rằng tiến triển sẽ rõ hơn khi bạn bớt để hoàn cảnh lái thay.",
      ],
      self: [
        "Bạn có thể mạnh hơn khi không phủ nhận những phần yếu mềm của mình.",
        "Cỗ xe chỉ đi xa khi người lái biết lắng nghe cả hai con ngựa trong lòng.",
        "Hãy chọn một hướng đủ thật, rồi cho bản thân quyền tiến từng đoạn.",
      ],
    },
    reversed: {
      keywords: ["mất lái", "căng kéo", "quá sức"],
      general: [
        "Có thể bạn đang cố lao tới trong khi bên trong chưa thật sự đồng thuận.",
        "The Chariot ngược nhắc rằng tốc độ cao không luôn đồng nghĩa với tiến bộ.",
        "Một nhịp chậm lại có thể giúp bạn lấy lại hướng mà không cần tự trách.",
      ],
      love: [
        "Trong tình cảm, ai đó có thể đang muốn thắng một cuộc tranh luận hơn là hiểu nhau.",
        "Nếu mọi thứ trở nên căng, hãy quay về câu hỏi: hai người đang cùng đi đâu?",
        "Đừng biến sự chủ động thành áp lực; kết nối cần không gian để tự thở.",
      ],
      study: [
        "Bạn có thể đang ép mình quá mạnh, khiến việc học mất đi độ thấm.",
        "Một kế hoạch tham vọng cần được chia nhỏ để không làm bạn kiệt sức.",
        "Nếu trượt nhịp, hãy chỉnh lịch thay vì bỏ cả hành trình.",
      ],
      future: [
        "Tương lai gần có thể yêu cầu bạn kiểm tra lại hướng đi trước khi tăng tốc.",
        "Một mục tiêu chưa mất giá trị, nhưng cách tiếp cận có thể cần mềm hơn.",
        "Lá bài gợi rằng tiến chậm mà vững vẫn tốt hơn kéo mình qua mọi giới hạn.",
      ],
      self: [
        "Bạn có thể đang nhầm sự cứng rắn với việc không được nghỉ.",
        "Hãy hỏi phần nào trong bạn đang bị bỏ lại phía sau khi bạn cố đi nhanh.",
        "The Chariot ngược mời bạn học cách dẫn dắt bản thân bằng lòng kiên nhẫn.",
      ],
    },
  },
  {
    id: "strength",
    name: "Strength",
    viName: "Sức Mạnh Dịu Dàng",
    arcana: "major",
    image: publicAsset("cards/strength.jpg"),
    upright: {
      keywords: ["can đảm", "dịu dàng", "kiên nhẫn"],
      general: [
        "Sức mạnh lúc này có thể không ồn ào; nó giống bàn tay đặt lên vai mình và nói: đi tiếp nhé.",
        "Lá bài này gợi sự can đảm mềm, kiểu không cần thắng ai để vẫn đứng vững.",
        "Một tình huống cần được xử lý bằng kiên nhẫn nhiều hơn là phản ứng nhanh.",
      ],
      love: [
        "Trong tình cảm, sự dịu dàng có thể là cách mạnh nhất để giữ cửa mở.",
        "Một mối liên hệ đang cần lòng kiên nhẫn, nhưng không phải sự chịu đựng im lặng.",
        "Bạn có thể nói thật mà vẫn ấm, đặt giới hạn mà vẫn thương.",
      ],
      study: [
        "Việc học cần sự bền bỉ hiền hơn là ép mình cháy hết trong một ngày.",
        "Bạn đang xây cơ bắp tinh thần qua từng lần quay lại với bài khó.",
        "Strength nhắc rằng chậm mà đều có thể tạo nền rất chắc.",
      ],
      future: [
        "Tương lai gần có thể thử sự kiên nhẫn của bạn, nhưng cũng cho bạn thấy mình đã lớn hơn.",
        "Một điều tốt đẹp có thể cần thời gian được thuần hóa, đừng vội kéo nó nở sớm.",
        "Lá bài gợi rằng cách bạn đi qua đoạn này sẽ quan trọng không kém kết quả.",
      ],
      self: [
        "Bạn có thể đang học cách ôm phần hoang dại trong mình thay vì xua nó đi.",
        "Sự nhạy cảm không làm bạn yếu; nó chỉ cần được dẫn bằng một trái tim vững hơn.",
        "Strength mời bạn tin rằng mình có thể mềm mà không dễ vỡ.",
      ],
    },
    reversed: {
      keywords: ["mệt mỏi", "tự nghi ngờ", "nén lòng"],
      general: [
        "Có thể bạn đã cố mạnh quá lâu và cần một nơi để được thật lòng mệt.",
        "Strength ngược nhắc rằng tự trách không làm bạn can đảm hơn.",
        "Một chút nghỉ ngơi và tự thương có thể giúp sức mạnh quay về tự nhiên hơn.",
      ],
      love: [
        "Trong tình cảm, bạn có thể đang nén điều mình cần để giữ mọi thứ yên.",
        "Sự dịu dàng không nên chỉ dành cho người kia; bạn cũng cần được nhận nó.",
        "Nếu thấy mình luôn phải gồng, hãy xem lại kết nối này đang phân chia sức lực thế nào.",
      ],
      study: [
        "Bạn có thể đang học trong trạng thái cạn pin; nghỉ đúng lúc cũng là một phần của kế hoạch.",
        "Đừng lấy một ngày thiếu tập trung làm bằng chứng rằng mình không đủ khả năng.",
        "Hãy giảm độ khó xuống một nấc để lấy lại nhịp thay vì bỏ cuộc.",
      ],
      future: [
        "Tương lai gần có thể cần bạn hồi sức trước khi bước vào đoạn mới.",
        "Một thử thách chưa chắc cần nhiều lực hơn; có khi nó cần cách mềm hơn.",
        "Lá bài gợi rằng đừng đi tiếp bằng phần đã quá mỏi của mình.",
      ],
      self: [
        "Bạn có thể đang quên rằng mình cũng xứng đáng được đối xử dịu dàng.",
        "Hãy nhìn phần yếu trong mình như một tín hiệu cần chăm sóc, không phải lỗi.",
        "Strength ngược mời bạn thôi đánh nhau với chính mình trong im lặng.",
      ],
    },
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    viName: "Ẩn Sĩ",
    arcana: "major",
    image: publicAsset("cards/the-hermit.jpg"),
    upright: {
      keywords: ["soi đường", "một mình", "chiêm nghiệm"],
      general: [
        "Bạn có thể cần một khoảng lùi để nhìn rõ điều đang bị đám đông làm mờ.",
        "The Hermit mang chiếc đèn nhỏ, không soi hết thế giới, chỉ soi đủ bước kế tiếp.",
        "Một câu trả lời có thể đến khi bạn ngừng hỏi mọi người và quay lại hỏi mình.",
      ],
      love: [
        "Trong tình cảm, khoảng cách vừa đủ có thể giúp hai người nghe rõ lòng hơn.",
        "Một người có thể đang cần thời gian riêng, không nhất thiết vì hết thương.",
        "Lá bài mời bạn phân biệt cô đơn với sự tĩnh lặng cần thiết.",
      ],
      study: [
        "Việc học hợp với nghiên cứu sâu, tự ôn và loại bớt nhiễu.",
        "Một buổi học một mình có thể mở ra điều mà học vội trong nhóm chưa chạm tới.",
        "The Hermit nhắc bạn ghi lại những hiểu biết nhỏ, vì chúng là ánh đèn của riêng bạn.",
      ],
      future: [
        "Tương lai gần có thể yêu cầu một giai đoạn thu mình để chọn hướng sáng hơn.",
        "Đừng sợ đoạn đường yên; nó có thể đang chuẩn bị cho một quyết định rõ.",
        "Lá bài gợi rằng câu trả lời sẽ không quá ồn khi nó đến.",
      ],
      self: [
        "Bạn có thể đang cần được ở một mình theo cách lành, để trở lại với lõi của mình.",
        "Ẩn Sĩ nhắc rằng ánh sáng nhỏ trong tay bạn vẫn là ánh sáng.",
        "Hãy cho mình quyền chậm lại và hiểu sâu hơn thay vì luôn phải phản ứng.",
      ],
    },
    reversed: {
      keywords: ["cô lập", "quá lặng", "lạc đèn"],
      general: [
        "Có thể bạn đã ở trong đầu mình quá lâu và cần một tiếng gọi dịu từ bên ngoài.",
        "The Hermit ngược nhắc rằng tĩnh lặng tốt không nên biến thành tự nhốt mình.",
        "Một cuộc trò chuyện an toàn có thể giúp chiếc đèn trong tay bạn sáng lại.",
      ],
      love: [
        "Trong tình cảm, khoảng cách có thể đang kéo dài hơn mức cần thiết.",
        "Nếu bạn biến im lặng thành cách tự bảo vệ duy nhất, người kia có thể không biết đường tìm vào.",
        "Một lời giải thích ngắn và thật có thể làm dịu nhiều hiểu lầm.",
      ],
      study: [
        "Bạn có thể đang tự học quá cô lập; hỏi một người phù hợp có thể tiết kiệm nhiều vòng lặp.",
        "Đừng để sự cầu toàn khiến bạn âm thầm kẹt trong một bài quá lâu.",
        "Một nguồn hướng dẫn rõ hơn có thể giúp bạn bật lại nhịp học.",
      ],
      future: [
        "Tương lai gần có thể sáng hơn khi bạn cho phép mình nhận hỗ trợ.",
        "Một hướng đi đang bị che vì bạn chỉ nhìn nó từ một góc quá lâu.",
        "Lá bài gợi rằng chiếc đèn cần được đưa ra khỏi hang một chút.",
      ],
      self: [
        "Bạn có thể đang gọi sự cô lập là bình yên, dù lòng không thật sự nhẹ.",
        "Hãy kiểm tra xem mình đang nghỉ ngơi hay đang biến mất.",
        "The Hermit ngược mời bạn quay lại với thế giới bằng một bước nhỏ, không cần ồn ào.",
      ],
    },
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    viName: "Bánh Xe Vận Hội",
    arcana: "major",
    image: publicAsset("cards/wheel-of-fortune.jpg"),
    upright: {
      keywords: ["chu kỳ", "chuyển động", "cơ hội"],
      general: [
        "Một vòng quay mới có thể đang bắt đầu, mang theo sự thay đổi nhẹ nhưng khó bỏ qua.",
        "Bánh Xe nhắc rằng mọi thứ đang chuyển động; bạn không cần giữ mãi một tư thế cũ.",
        "Có một cơ hội đến từ nhịp đổi thay, nếu bạn đủ linh hoạt để nhận ra nó.",
      ],
      love: [
        "Trong tình cảm, một chu kỳ cũ có thể đang khép lại để hai người học cách gặp nhau khác đi.",
        "Một cuộc gặp hoặc một nhịp quay bất ngờ có thể làm trái tim nhìn lại điều quen thuộc.",
        "Lá bài gợi rằng tình cảm cũng có mùa; mùa nào cũng cần cách chăm riêng.",
      ],
      study: [
        "Việc học có thể bước sang pha mới, nơi cách cũ không còn đủ hiệu quả.",
        "Một thay đổi về lịch, phương pháp hoặc môi trường có thể giúp bạn mở khóa lại động lực.",
        "Bánh Xe khuyên bạn tận dụng nhịp thuận khi nó đến, dù chỉ bằng một buổi học tử tế.",
      ],
      future: [
        "Tương lai gần có thể xoay theo một hướng bạn chưa dự đoán hết.",
        "Một thay đổi nhỏ có thể kéo theo cảm giác mới, nhưng chưa cần gọi nó là kết luận cuối.",
        "Lá bài gợi rằng linh hoạt sẽ giúp bạn đi cùng vòng quay thay vì bị nó kéo đi.",
      ],
      self: [
        "Bạn có thể đang nhận ra mình không còn là phiên bản cũ, và điều đó rất tự nhiên.",
        "Hãy để bản thân thay đổi mà không cần xin phép quá khứ.",
        "Bánh Xe mời bạn tin vào khả năng thích nghi dịu dàng của mình.",
      ],
    },
    reversed: {
      keywords: ["kẹt vòng", "kháng cự", "lỡ nhịp"],
      general: [
        "Có thể một vòng lặp cũ đang quay lại để bạn nhìn nó bằng mắt khác.",
        "Bánh Xe ngược nhắc rằng kháng cự thay đổi đôi khi làm ta mệt hơn thay đổi.",
        "Nếu cảm thấy kẹt, hãy tìm một điểm nhỏ có thể dịch chuyển ngay hôm nay.",
      ],
      love: [
        "Trong tình cảm, một mẫu hình quen có thể đang lặp lại và xin được gọi đúng tên.",
        "Bạn không cần sửa mọi thứ ngay, nhưng có thể bắt đầu bằng việc nhận ra vòng lặp.",
        "Một thay đổi nhỏ trong cách phản ứng có thể làm cuộc trò chuyện bớt cũ.",
      ],
      study: [
        "Bạn có thể đang học theo thói quen không còn hợp với giai đoạn này.",
        "Nếu kết quả đứng yên, hãy thử đổi nhịp trước khi tự nghi ngờ năng lực.",
        "Bánh Xe ngược gợi rằng sự trì trệ có thể là tín hiệu cần chỉnh phương pháp.",
      ],
      future: [
        "Tương lai gần có thể chưa mở nhanh vì một bài học cũ còn đang đòi hoàn tất.",
        "Đừng xem việc chậm lại là thất bại; đôi khi nó là đoạn bánh xe lấy đà.",
        "Lá bài mời bạn chú ý nơi mình cứ quay về, vì ở đó có manh mối.",
      ],
      self: [
        "Bạn có thể đang trách mình vì chưa thoát khỏi một vòng cảm xúc quen thuộc.",
        "Hãy bắt đầu bằng một thay đổi rất nhỏ, đủ để chứng minh bạn vẫn có lựa chọn.",
        "Bánh Xe ngược nhắc rằng bạn không phải vòng lặp của mình; bạn là người đang học cách bước ra.",
      ],
    },
  },
  {
    id: "the-moon",
    name: "The Moon",
    viName: "Mặt Trăng",
    arcana: "major",
    image: publicAsset("cards/the-moon.jpg"),
    upright: {
      keywords: ["mơ hồ", "tiềm thức", "ảo ảnh"],
      general: [
        "Mọi thứ có thể đang phủ sương, nên hãy đi chậm và đừng vội tin ấn tượng đầu tiên.",
        "The Moon gợi một vùng cảm xúc sâu, nơi sự thật và nỗi sợ đôi khi mặc áo giống nhau.",
        "Bạn có thể cần thêm dữ kiện trước khi đặt tên cho điều đang xảy ra.",
      ],
      love: [
        "Trong tình cảm, sự bất an có thể đang khuếch đại vài tín hiệu nhỏ.",
        "Hãy hỏi nhẹ thay vì đoán nặng; trái tim đang cần ánh trăng, không cần đèn pha.",
        "Một cảm xúc mơ hồ đáng được lắng nghe, nhưng chưa chắc cần phản ứng ngay.",
      ],
      study: [
        "Việc học có thể bị nhiễu bởi lo lắng; hãy tách điều bạn biết khỏi điều bạn sợ.",
        "Một phần kiến thức chưa rõ cần được soi lại bằng ví dụ cụ thể hơn.",
        "The Moon khuyên bạn ghi ra điểm mù thay vì để chúng trôi trong đầu.",
      ],
      future: [
        "Tương lai gần có thể chưa rõ nét, và đó là lý do nên chọn bước thận trọng.",
        "Một điều còn ẩn có thể dần hiện ra nếu bạn không ép nó trả lời ngay.",
        "Lá bài gợi rằng bạn nên chờ ánh sáng ổn định hơn trước khi kết luận.",
      ],
      self: [
        "Bạn có thể đang gặp một phần sâu trong mình qua giấc mơ, nỗi lo hoặc cảm giác lặp lại.",
        "Đừng sợ sự mơ hồ bên trong; nó thường chỉ muốn được gọi tên.",
        "The Moon mời bạn dịu với những cảm xúc chưa biết phải đứng ở đâu.",
      ],
    },
    reversed: {
      keywords: ["tan sương", "bớt sợ", "lộ diện"],
      general: [
        "Một lớp sương có thể đang mỏng dần, đủ để bạn nhìn lại mọi chuyện tỉnh hơn.",
        "The Moon ngược gợi rằng nỗi sợ đang mất bớt quyền kể chuyện thay bạn.",
        "Bạn có thể bắt đầu phân biệt tín hiệu thật với tiếng vọng của quá khứ.",
      ],
      love: [
        "Trong tình cảm, một hiểu lầm có thể dịu đi khi được nói bằng giọng bình tĩnh.",
        "Điều từng làm bạn bất an có thể cần được kiểm chứng thay vì giữ trong bóng tối.",
        "Lá bài gợi rằng sự rõ ràng đang đến theo kiểu chậm, nhưng có ích.",
      ],
      study: [
        "Một phần bài khó có thể bắt đầu sáng hơn sau khi bạn đổi cách nhìn.",
        "Bạn đang bớt bị cảm giác hoang mang dẫn dắt, và điều đó giúp việc học thấm hơn.",
        "Hãy ghi lại điều vừa hiểu ra; nó là dấu mốc nhỏ trong màn sương.",
      ],
      future: [
        "Tương lai gần có thể dần rõ khi bạn thôi đi theo kịch bản đáng sợ nhất.",
        "Một thông tin mới có thể làm bạn nhẹ lòng hơn, dù chưa giải hết mọi chuyện.",
        "Lá bài mời bạn chờ thêm chút ánh sáng trước khi tự đặt áp lực phải biết hết.",
      ],
      self: [
        "Bạn có thể đang bước ra khỏi một vùng cảm xúc từng làm mình lạc hướng.",
        "Hãy công nhận sự tiến bộ nhỏ: bạn đã nhìn nỗi sợ bằng mắt mềm hơn.",
        "The Moon ngược nhắc rằng chữa lành đôi khi chỉ là bớt tin vào bóng tối trong một phút.",
      ],
    },
  },
  {
    id: "the-world",
    name: "The World",
    viName: "Thế Giới",
    arcana: "major",
    image: publicAsset("cards/the-world.jpg"),
    upright: {
      keywords: ["hoàn tất", "trọn vẹn", "mở rộng"],
      general: [
        "Một vòng hành trình có thể đang khép lại đẹp đẽ, không phải để hết, mà để mở rộng.",
        "The World gợi cảm giác gom được nhiều mảnh rời thành một hình ảnh có nghĩa.",
        "Bạn có thể đang ở gần một điểm hoàn tất đủ dịu để tự hào về mình.",
      ],
      love: [
        "Trong tình cảm, lá bài này nói về cảm giác được nhìn thấy như một con người trọn vẹn hơn.",
        "Một mối liên hệ có thể bước vào giai đoạn rộng rãi hơn, nơi hai người bớt phải chứng minh.",
        "Tình yêu ở đây giống một vòng tròn ấm: có chỗ cho ký ức, hiện tại và điều đang lớn lên.",
      ],
      study: [
        "Việc học có thể đi tới đoạn tổng hợp, nơi những mảnh nhỏ bắt đầu nối thành hệ thống.",
        "Bạn có thể sắp hoàn thành một chặng đáng kể; hãy ghi nhận công sức đã tích lại.",
        "The World khuyên bạn nhìn bức tranh lớn trước khi chọn bài học tiếp theo.",
      ],
      future: [
        "Tương lai gần có thể mở ra sau một điểm kết nhẹ, kiểu kết thúc để bước sang tầng mới.",
        "Một thành quả có thể đủ chín để được chia sẻ hoặc đóng gói lại.",
        "Lá bài gợi rằng điều bạn đã học sẽ đi cùng bạn vào chương kế tiếp.",
      ],
      self: [
        "Bạn có thể đang học cách nhìn mình như một tổng thể, không chỉ qua vài lỗi nhỏ.",
        "The World mời bạn công nhận hành trình đã đi, cả phần sáng lẫn phần khó.",
        "Có một cảm giác trở về với chính mình, rộng hơn và ít khắt khe hơn.",
      ],
    },
    reversed: {
      keywords: ["chưa khép", "thiếu mảnh", "ngần ngại"],
      general: [
        "Có thể một chương gần xong nhưng còn một mảnh nhỏ cần được đặt vào đúng chỗ.",
        "The World ngược nhắc rằng hoàn tất không cần hoàn hảo, nhưng cần đủ thật.",
        "Một điều dang dở có thể đang xin bạn quay lại để kết thúc tử tế hơn.",
      ],
      love: [
        "Trong tình cảm, có thể hai người đang thiếu một cuộc nói chuyện để cảm thấy trọn vẹn hơn.",
        "Một vòng lặp cũ chưa khép hẳn, nhưng nó có thể dịu lại nếu được nhìn bằng lòng thành.",
        "Đừng ép kết luận khi trái tim còn một câu chưa nói.",
      ],
      study: [
        "Bạn có thể đã đi rất xa nhưng còn thiếu bước tổng kết để kiến thức thật sự ở lại.",
        "Một bài hoặc dự án gần xong cần sự chăm chút cuối, không cần tự làm nó thành áp lực lớn.",
        "Hãy kiểm tra phần nền trước khi chuyển sang chương mới.",
      ],
      future: [
        "Tương lai gần có thể chờ bạn khép lại một việc cũ bằng cách nhẹ nhàng hơn.",
        "Một cánh cửa mới chưa mở rộng vì tay bạn còn giữ vài mảnh chưa xếp xong.",
        "Lá bài gợi rằng việc hoàn tất một điều nhỏ có thể tạo nhiều khoảng trống.",
      ],
      self: [
        "Bạn có thể đang đòi mình phải trọn vẹn theo một chuẩn quá khắt khe.",
        "Hãy nhìn lại cả hành trình, không chỉ đoạn cuối còn thiếu.",
        "The World ngược mời bạn học cách nói: mình đang hoàn thiện, và như thế cũng đáng quý.",
      ],
    },
  },
];

type GeneratedMajorCard = {
  id: string;
  name: string;
  viName: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightEssence: string;
  reversedEssence: string;
};

type GeneratedMinorSuit = {
  id: NonNullable<TarotCard["suit"]>;
  viName: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightEssence: string;
  reversedEssence: string;
};

type GeneratedMinorRank = {
  id: string;
  name: string;
  viName: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightEssence: string;
  reversedEssence: string;
};

const makeMeaningGroup = (
  keywords: string[],
  viName: string,
  essence: string,
  orientation: "upright" | "reversed",
): TarotMeaningGroup => {
  const isReversed = orientation === "reversed";
  const pacing = isReversed ? "chậm lại" : "đi tiếp";
  const soften = isReversed ? "nhìn thẳng vào phần đang lệch nhịp" : "tin vào phần đang sáng lên";

  return {
    keywords,
    general: [
      `${viName} mang tín hiệu về ${essence}; hãy ${pacing} và để lá bài chỉ ra điều cần được chú ý nhất lúc này.`,
      `Ở tầng tổng quan, lá này nhắc bạn ${soften} trước khi quyết định bước kế tiếp.`,
      `Nếu mọi thứ đang nhiều lớp, ${viName} khuyên bạn chọn một dấu hiệu nhỏ nhưng thật để bắt đầu đọc lại tình hình.`,
    ],
    love: [
      `Trong tình cảm, ${viName} nói về ${essence} giữa hai trái tim, nhất là những điều chưa kịp gọi tên.`,
      `Lá này mời một cuộc trò chuyện dịu hơn, rõ hơn, để cảm xúc không phải tự đoán đường đi.`,
      `Nếu đang nghĩ về một mối liên kết, hãy xem điều gì cần được giữ, điều gì cần được thả lỏng.`,
    ],
    study: [
      `Trong học tập, ${viName} gợi ý biến ${essence} thành một bước thực hành cụ thể và vừa sức.`,
      `Một ghi chú nhỏ, một lịch học gọn hoặc một lần hỏi lại đúng chỗ có thể giúp tín hiệu sáng hơn.`,
      `Lá này nhắc bạn học bằng nhịp bền, không ép bản thân phải hiểu hết trong một lần.`,
    ],
    future: [
      `Với tương lai gần, ${viName} cho thấy ${essence} có thể là chiếc la bàn mềm cho bước kế tiếp.`,
      `Chưa cần biết toàn bộ con đường; hãy nhìn dấu hiệu gần nhất và chọn cách đi tử tế với mình.`,
      `Lá này không đóng khung kết quả, chỉ mở một hướng để bạn bước vào ngày mai tỉnh táo hơn.`,
    ],
    self: [
      `Với bản thân, ${viName} chạm vào ${essence} và nhắc bạn lắng nghe nhu cầu thật phía dưới phản ứng đầu tiên.`,
      `Có một phần trong bạn đang muốn được nhìn nhận nhẹ tay hơn, không phải sửa ngay lập tức.`,
      `Hãy để lá bài này trở thành một câu hỏi nhỏ: mình cần chăm phần nào của mình hôm nay?`,
    ],
  };
};

const missingMajorArcana: GeneratedMajorCard[] = [
  {
    id: "the-empress",
    name: "The Empress",
    viName: "Nữ Hoàng",
    uprightKeywords: ["nuôi dưỡng", "sáng tạo", "trù phú"],
    reversedKeywords: ["cạn kiệt", "quên chăm mình", "bí dòng"],
    uprightEssence: "sự nuôi dưỡng và khả năng làm điều đẹp đẽ lớn lên",
    reversedEssence: "sự cạn năng lượng khi cho đi quá nhiều mà chưa được bồi lại",
  },
  {
    id: "the-emperor",
    name: "The Emperor",
    viName: "Hoàng Đế",
    uprightKeywords: ["trật tự", "ranh giới", "nền tảng"],
    reversedKeywords: ["cứng nhắc", "kiểm soát", "áp lực"],
    uprightEssence: "cấu trúc vững và quyền được đặt ranh giới rõ ràng",
    reversedEssence: "sự kiểm soát quá tay khiến điều cần bảo vệ trở nên nặng nề",
  },
  {
    id: "the-hierophant",
    name: "The Hierophant",
    viName: "Giáo Hoàng",
    uprightKeywords: ["truyền thống", "học hỏi", "niềm tin"],
    reversedKeywords: ["khuôn cũ", "nghi vấn", "tự chọn đường"],
    uprightEssence: "bài học từ cộng đồng, thầy cô và những nghi thức giúp mình đứng vững",
    reversedEssence: "nhu cầu xem lại một khuôn mẫu trước khi tiếp tục tin theo",
  },
  {
    id: "justice",
    name: "Justice",
    viName: "Công Lý",
    uprightKeywords: ["cân bằng", "sự thật", "trách nhiệm"],
    reversedKeywords: ["thiên lệch", "né tránh", "chưa công bằng"],
    uprightEssence: "sự thật rõ ràng và lựa chọn có trách nhiệm",
    reversedEssence: "một cán cân đang lệch và cần được nhìn lại trung thực",
  },
  {
    id: "the-hanged-man",
    name: "The Hanged Man",
    viName: "Người Treo Ngược",
    uprightKeywords: ["tạm dừng", "đổi góc nhìn", "buông"],
    reversedKeywords: ["kẹt lâu", "kháng cự", "hy sinh vô ích"],
    uprightEssence: "khoảng dừng cần thiết để nhìn đời từ một góc khác",
    reversedEssence: "sự mắc kẹt vì chưa chịu buông cách nhìn đã cũ",
  },
  {
    id: "death",
    name: "Death",
    viName: "Cái Chết",
    uprightKeywords: ["kết thúc", "chuyển hóa", "tái sinh"],
    reversedKeywords: ["bám giữ", "sợ đổi thay", "trì hoãn"],
    uprightEssence: "một kết thúc cần thiết để điều mới có chỗ thở",
    reversedEssence: "sự bám víu vào điều đã hết vai trò vì sợ khoảng trống sau đó",
  },
  {
    id: "temperance",
    name: "Temperance",
    viName: "Tiết Chế",
    uprightKeywords: ["hòa hợp", "điều độ", "chữa lành"],
    reversedKeywords: ["quá đà", "lệch nhịp", "mất cân bằng"],
    uprightEssence: "sự pha trộn vừa đủ để những phần khác nhau tìm lại nhịp chung",
    reversedEssence: "một nhịp sống đang lệch và cần được điều chỉnh nhẹ nhưng thật",
  },
  {
    id: "the-devil",
    name: "The Devil",
    viName: "Ác Quỷ",
    uprightKeywords: ["ràng buộc", "ham muốn", "bóng tối"],
    reversedKeywords: ["giải phóng", "nhận diện", "cắt dây"],
    uprightEssence: "những ràng buộc, cám dỗ hoặc thói quen khiến mình tưởng là không thể rời",
    reversedEssence: "khoảnh khắc nhận ra sợi dây nào có thể được nới lỏng",
  },
  {
    id: "the-tower",
    name: "The Tower",
    viName: "Tòa Tháp",
    uprightKeywords: ["đột biến", "sụp đổ", "thức tỉnh"],
    reversedKeywords: ["né chấn động", "rụng chậm", "xây lại"],
    uprightEssence: "sự thật bất ngờ làm rơi một cấu trúc không còn chịu lực",
    reversedEssence: "một thay đổi đã âm ỉ lâu và đang xin được xử lý trước khi quá mạnh",
  },
  {
    id: "the-star",
    name: "The Star",
    viName: "Ngôi Sao",
    uprightKeywords: ["hy vọng", "chữa lành", "dẫn đường"],
    reversedKeywords: ["mất tin", "khô cạn", "xa ánh sáng"],
    uprightEssence: "hy vọng dịu và khả năng hồi phục sau một đoạn đường dài",
    reversedEssence: "cảm giác xa khỏi nguồn sáng của mình nhưng chưa thật sự mất nó",
  },
  {
    id: "the-sun",
    name: "The Sun",
    viName: "Mặt Trời",
    uprightKeywords: ["rạng rỡ", "thành công", "rõ ràng"],
    reversedKeywords: ["mây che", "vui gượng", "chậm sáng"],
    uprightEssence: "sự rõ ràng, niềm vui và cảm giác được sống dưới ánh sáng thật",
    reversedEssence: "niềm vui bị che bớt bởi mệt mỏi hoặc kỳ vọng quá lớn",
  },
  {
    id: "judgement",
    name: "Judgement",
    viName: "Phán Xét",
    uprightKeywords: ["thức gọi", "tái sinh", "nhìn lại"],
    reversedKeywords: ["tự trách", "trì hoãn", "sợ tiếng gọi"],
    uprightEssence: "tiếng gọi thức tỉnh để nhìn lại mình bằng lòng can đảm mới",
    reversedEssence: "sự tự phán xét quá nặng khiến lời gọi bên trong bị nhỏ đi",
  },
];

const minorSuits: GeneratedMinorSuit[] = [
  {
    id: "cups",
    viName: "Cốc",
    uprightKeywords: ["cảm xúc", "kết nối", "dịu dàng"],
    reversedKeywords: ["tràn cảm xúc", "khép lòng", "mơ hồ"],
    uprightEssence: "dòng cảm xúc và khả năng kết nối bằng sự chân thành",
    reversedEssence: "cảm xúc bị nghẽn, tràn hoặc chưa tìm được nơi an toàn để chảy",
  },
  {
    id: "wands",
    viName: "Gậy",
    uprightKeywords: ["hành động", "đam mê", "khởi phát"],
    reversedKeywords: ["tản lửa", "nóng vội", "mất đà"],
    uprightEssence: "ngọn lửa hành động, cảm hứng và ý chí muốn tạo ra điều mới",
    reversedEssence: "năng lượng bị tản, cháy quá nhanh hoặc chưa có hướng rõ",
  },
  {
    id: "swords",
    viName: "Kiếm",
    uprightKeywords: ["suy nghĩ", "sự thật", "quyết định"],
    reversedKeywords: ["nhiễu trí", "lời sắc", "kẹt nghĩ"],
    uprightEssence: "sự rõ ràng của suy nghĩ, lời nói và quyết định cần thiết",
    reversedEssence: "tâm trí nhiều nhiễu khiến sự thật bị sắc cạnh hoặc khó nghe",
  },
  {
    id: "pentacles",
    viName: "Tiền Xu",
    uprightKeywords: ["thực tế", "công sức", "nền tảng"],
    reversedKeywords: ["chậm trễ", "thiếu chăm", "bất ổn"],
    uprightEssence: "đời sống thực tế, công sức tích lũy và những nền tảng có thể chạm vào",
    reversedEssence: "một nền tảng cần được chăm lại vì đang thiếu nhịp bền",
  },
];

const minorRanks: GeneratedMinorRank[] = [
  {
    id: "ace",
    name: "Ace",
    viName: "Át",
    uprightKeywords: ["hạt mầm", "khởi đầu", "cơ hội"],
    reversedKeywords: ["chưa nảy", "lỡ nhịp", "khó mở"],
    uprightEssence: "một hạt mầm mới vừa xuất hiện",
    reversedEssence: "một hạt mầm còn chờ đủ điều kiện để nảy lên",
  },
  {
    id: "two",
    name: "Two",
    viName: "Hai",
    uprightKeywords: ["song hành", "lựa chọn", "cân nhịp"],
    reversedKeywords: ["lệch đôi", "do dự", "khó chọn"],
    uprightEssence: "hai lực đang học cách đi cạnh nhau",
    reversedEssence: "hai hướng chưa tìm được nhịp chung",
  },
  {
    id: "three",
    name: "Three",
    viName: "Ba",
    uprightKeywords: ["phát triển", "hợp tác", "mở rộng"],
    reversedKeywords: ["lệch nhóm", "chậm lớn", "thiếu nối"],
    uprightEssence: "sự lớn lên qua kết nối và cộng hưởng",
    reversedEssence: "một sự hợp tác hoặc tiến triển đang thiếu điểm nối",
  },
  {
    id: "four",
    name: "Four",
    viName: "Bốn",
    uprightKeywords: ["ổn định", "nghỉ", "khung giữ"],
    reversedKeywords: ["kẹt khung", "bất an", "khó nghỉ"],
    uprightEssence: "một khung ổn định để nghỉ và gom sức",
    reversedEssence: "sự ổn định biến thành chật chội hoặc khó thở",
  },
  {
    id: "five",
    name: "Five",
    viName: "Năm",
    uprightKeywords: ["va chạm", "thử thách", "thiếu hụt"],
    reversedKeywords: ["hồi phục", "bớt căng", "rút bài học"],
    uprightEssence: "một va chạm khiến điều yếu cần được nhìn rõ",
    reversedEssence: "đoạn sau thử thách, khi bài học bắt đầu dịu lại",
  },
  {
    id: "six",
    name: "Six",
    viName: "Sáu",
    uprightKeywords: ["hồi âm", "hỗ trợ", "cân bằng"],
    reversedKeywords: ["lệch cho-nhận", "kẹt cũ", "khó nhận"],
    uprightEssence: "sự nâng đỡ và cân bằng trở lại sau một đoạn chao",
    reversedEssence: "một nhịp cho-nhận cần được cân lại tử tế",
  },
  {
    id: "seven",
    name: "Seven",
    viName: "Bảy",
    uprightKeywords: ["đánh giá", "chọn lọc", "kiên trì"],
    reversedKeywords: ["mơ hồ", "nghi ngờ", "quá thủ"],
    uprightEssence: "thời điểm đánh giá kỹ trước khi đi tiếp",
    reversedEssence: "sự nghi ngờ hoặc phòng thủ làm lựa chọn bị mờ",
  },
  {
    id: "eight",
    name: "Eight",
    viName: "Tám",
    uprightKeywords: ["chuyển động", "luyện tập", "tập trung"],
    reversedKeywords: ["kẹt nhịp", "vội sai", "lặp mệt"],
    uprightEssence: "nhịp chuyển động đều và sự rèn luyện có hướng",
    reversedEssence: "một vòng lặp mệt vì đi nhanh nhưng chưa đúng hướng",
  },
  {
    id: "nine",
    name: "Nine",
    viName: "Chín",
    uprightKeywords: ["gần trọn", "bền bỉ", "tự lập"],
    reversedKeywords: ["kiệt sức", "cô độc", "thiếu nghỉ"],
    uprightEssence: "độ chín của nỗ lực và sức bền đã tích lại",
    reversedEssence: "sự kiệt sức khi cố đi một mình quá lâu",
  },
  {
    id: "ten",
    name: "Ten",
    viName: "Mười",
    uprightKeywords: ["hoàn tất", "gánh vác", "chu kỳ"],
    reversedKeywords: ["quá tải", "chưa khép", "thả bớt"],
    uprightEssence: "một chu kỳ đang đi đến điểm kết hoặc điểm thu hoạch",
    reversedEssence: "gánh nặng cuối chặng cần được thả bớt để thật sự khép lại",
  },
  {
    id: "page",
    name: "Page",
    viName: "Tiểu Đồng",
    uprightKeywords: ["tin nhắn", "học việc", "tò mò"],
    reversedKeywords: ["non vội", "ngại hỏi", "tin nhiễu"],
    uprightEssence: "một tín hiệu trẻ, tò mò và đang học cách lên tiếng",
    reversedEssence: "sự non vội hoặc ngại hỏi khiến thông điệp dễ bị méo",
  },
  {
    id: "knight",
    name: "Knight",
    viName: "Kỵ Sĩ",
    uprightKeywords: ["truy đuổi", "chuyển động", "can đảm"],
    reversedKeywords: ["hấp tấp", "lệch hướng", "căng lực"],
    uprightEssence: "động lực tiến lên và can đảm đi theo điều mình chọn",
    reversedEssence: "sự hấp tấp hoặc căng lực khiến hướng đi bị lệch",
  },
  {
    id: "queen",
    name: "Queen",
    viName: "Nữ Hoàng",
    uprightKeywords: ["làm chủ", "nuôi dưỡng", "trực giác"],
    reversedKeywords: ["quên mình", "quá ôm", "khép quyền"],
    uprightEssence: "năng lực làm chủ mềm mại và biết nuôi dưỡng điều quan trọng",
    reversedEssence: "sự ôm đồm hoặc quên chăm mình trong lúc chăm điều khác",
  },
  {
    id: "king",
    name: "King",
    viName: "Nhà Vua",
    uprightKeywords: ["lãnh đạo", "ổn định", "trách nhiệm"],
    reversedKeywords: ["áp đặt", "cứng quyền", "thiếu linh hoạt"],
    uprightEssence: "quyền làm chủ chín chắn và trách nhiệm với điều mình xây",
    reversedEssence: "quyền kiểm soát trở nên cứng hoặc thiếu khả năng lắng nghe",
  },
];

const makeGeneratedMajorCard = (card: GeneratedMajorCard): TarotCard => ({
  id: card.id,
  name: card.name,
  viName: card.viName,
  arcana: "major",
  image: publicAsset(`cards/${card.id}.jpg`),
  upright: makeMeaningGroup(card.uprightKeywords, card.viName, card.uprightEssence, "upright"),
  reversed: makeMeaningGroup(card.reversedKeywords, card.viName, card.reversedEssence, "reversed"),
});

const makeGeneratedMinorCard = (suit: GeneratedMinorSuit, rank: GeneratedMinorRank): TarotCard => {
  const viName = `${rank.viName} ${suit.viName}`;
  const name = `${rank.name} of ${suit.viName === "Tiền Xu" ? "Pentacles" : suit.viName === "Cốc" ? "Cups" : suit.viName === "Gậy" ? "Wands" : "Swords"}`;

  return {
    id: `${rank.id}-of-${suit.id}`,
    name,
    viName,
    arcana: "minor",
    suit: suit.id,
    image: publicAsset(`cards/${rank.id}-of-${suit.id}.jpg`),
    upright: makeMeaningGroup(
      [...rank.uprightKeywords, ...suit.uprightKeywords],
      viName,
      `${rank.uprightEssence} trong vùng ${suit.uprightEssence}`,
      "upright",
    ),
    reversed: makeMeaningGroup(
      [...rank.reversedKeywords, ...suit.reversedKeywords],
      viName,
      `${rank.reversedEssence} trong vùng ${suit.reversedEssence}`,
      "reversed",
    ),
  };
};

const generatedTarotCards: TarotCard[] = [
  ...missingMajorArcana.map(makeGeneratedMajorCard),
  ...minorSuits.flatMap((suit) => minorRanks.map((rank) => makeGeneratedMinorCard(suit, rank))),
];

export const tarotDeck: TarotCard[] = [...featuredTarotCards, ...generatedTarotCards];
