import { useEffect, useRef, useState } from "react";
import { SectionProps } from "./sectionTypes";
import styles from "./Wishes.module.css";
import { guides } from "../data/guides";

const wishesData = [
  { id: 1, icon: "🎂", author: "Fan giấu tên", content: "Chúc em sống thọ" },
  { id: 2, icon: "✨", author: "Fan giấu tên", content: "Chúc Linh Lan sinh nhật vui vẻ 🎂\nMong bạn luôn xinh xắn, may mắn và ngày nào cũng ngập tràn tiếng cười!" },
  { id: 3, icon: "🎉", author: "Fan giấu tên", content: "Chúc Lan Linh tuổi mới thật nhiều niềm vui 🎉\nChúc lan đạt được những điều mình mong muốn và luôn hạnh phúc! Và bt ko nụ cười của thần tượng đã nở thì cx ko ngọt bằng bánh kem trong buổi tối sinh nhật linh" },
  { id: 4, icon: "💌", author: "Wibu cắt moi", content: "Hello đại ka của em,\nCũng đã lâu từ ngày chị debut rồi nhỉ, vẫn nhớ những buổi freetalk vui zẻ của chị, nhớ lắm những ngày chị chơi Bang bang, nhớ khi handcam và nhiều stream khác. Từ ngày ra mắt gen 2.5 đến nay, em cảm thấy chị luôn là tấm gương sáng, một con người nghị lực, dẫu có ốm hay mệt mỏi vẫn cố gắng stream cho bọn em xem. Điều đó khiến em ngưỡng mộ chị.\nEm thì không dám viết dài và muốn stream chị có thể đọc đc nhiều thư nhất nên là viết lủng củng như này thui.\nDo điều kiện ko cho phép nên em cx ko thể tặng quà sinh nhật cho chị và Lan nhưng em hứa, sau khi năm nay ra trường có công việc ổn định, nhất định nếu có fes trong Nam (hoặc ngoài Bắc) có sự góp mặt của các chị em sẽ đến chơi và tặng 1 chút \"tấm lòng nhỏ\" của bản thân ạ. (Mong là lời hứa thành hiện thức)\nký tên: Wibu cắt moi." },
  { id: 5, icon: "🌹", author: "Linh1706", content: "Há lo Linh,\nChúc mừng sinh nhật lần thứ 3 của Linh nha! Tuy một năm qua em bận \"đi bụi\" nên không xem stream đều được, nhưng mà cái đáng yêu của Linh thì em vẫn nhớ rõ lắm. Chúc Linh tuổi mới luôn tràn đầy năng lượng, lúc nào cũng cười tươi và đạt được mọi mục tiêu đề ra nha. Mong Linh và Lan mãi là cặp bài trùng xịn xò nhứt! Mà nhớ giữ gìn sức khoẻ đó 2 bà 🌹\nHy vọng là dù em ít xuất hiện nhưng Linh vẫn thấy cái tên em quen thuộc mỗi khi em ghé thăm nhó 💗\nLinh1706" },
  { id: 6, icon: "🎮", author: "Fan giấu tên", content: "xinh chào chúc mừng sinhh nhật ck lâu rồi không gặp,dạo này em đã vô con đường tư bản nên ko có nhìu thời gian coi ck nữa,chúc ck vẫn tiếp tục cố gắng gặt hái nhiều thành công trên con đường vtuber này,nếu có dịp mình nhau chơi pubg chung nhá :>>>" },
  { id: 7, icon: "💛", author: "Fan giấu tên", content: "Sinh nhật vui vẻ nha Linh! lâu lâu có xem stream của Linh dễ thương lắm tạo cảm giác dễ chịu cho mọi người quá trời. Chúc Linh sẽ đạt được những mục tiêu mình mong muốn, và luôn luôn được mọi người ủng hộ. Và đạt 30k subs sớm nha!" },
  { id: 8, icon: "🌟", author: "Fan giấu tên", content: "Tuy chưa xem bạn nhiều nhưng chúc bạn sớm đạt được các mục tiêu của bản thân và truyền những năng lượng tích cực cho người xem của mình." },
  { id: 9, icon: "🫶", author: "Fan giấu tên", content: "Chúc mừng sinh nhật Linh nha :3 Cảm ơn Linh vì đã mang đến thật nhiều tiếng cười, năng lượng dễ thương và những khoảnh khắc đáng nhớ cho các Kani nha. Chúc Linh luôn vui vẻ, hạnh phúc và đạt được nhiều điều mà Linh luôn mong muốn nha, và cũng như ngày càng được nhiều người yêu quý và gia nhập vào nồi lẩu nhiều hơn nữa💛" },
  { id: 10, icon: "🎁", author: "Fan giấu tên", content: "Happy Birthday Linh Lõm nhé =]]]]" },
  { id: 11, icon: "💪", author: "Fan giấu tên", content: "Chúc mừng sinh nhật quý cô ngầu lợi tuy hơi còi nhưng được cái tài giỏi và làm việc không mệt mỏi để nhanh kiếm được tiền tỏi :3" },
  { id: 12, icon: "💖", author: "Fan giấu tên", content: "Gái iu sinh nhật vui vẻ, tuổi mới năng động hơn tuổi cũ nhó, mong gái không phá thêm gì nữa  TvT" },
  { id: 13, icon: "🐧", author: "Fan giấu tên", content: "Năm mới, tuổi mới, một khởi đầu mới. Tui chúc Linh sinh nhật năm nay nhiều sức khỏe, ít bị cảm hơn nha. Hồi mới debut Linh có đặt mục tiêu là chơi thật nhiều game, nên năm nay nhớ chơi nhiều game hơn nữa để cho mấy con Cua xem nha, chứ không thôi mấy nhỏ quên giọng Linh á 🐧. 🐸💢" },
  { id: 14, icon: "🎊", author: "Fan giấu tên", content: "\"Em chúc chị sinh nhật thật vui vẻ, có 1 buổii ăn sinh nhật tuyệt vời nhất, chúc chị ngày càng xinh gái hơn, thuận lợi hơn trên còn đường mình chọn, em hong có xem chị nhiều lắm nhưng em mong chị sẽ thành công hơn những gì mình muốn, chúc chị sinh nhật vui vẻ nha>< Cố lên chị nhe!!\"" },
  { id: 15, icon: "🌈", author: "Fan giấu tên", content: "Chúc Linh Tuổi mới ngày càng đẹp, càng giải trí, tuổi mới vui vẻ ko quạu nghe!!" },
  { id: 16, icon: "📝", author: "Fan giấu tên", content: "Dù không xem Linh nhưng lướt được vài cái short thấy giọng Linh khá thú vị. Chúc Linh sinh nhật vv." },
  { id: 17, icon: "🎂", author: "Fan giấu tên", content: "Snvv nhen" },
  { id: 18, icon: "💛", author: "Demi", content: "helu Linh, Demi chúc Linh tuổi mới luôn xinh đẹp, bình an và gặt hái được thật nhiều thành công ạ💛" },
  { id: 19, icon: "🦀", author: "Fan giấu tên", content: "Chúc mừng sinh nhật Linh, chúc Linh một năm đầy vui vẻ, hạnh phúc và nhiều điều may mắn 🦀🦀🦀" },
  { id: 20, icon: "🌟", author: "Fan giấu tên", content: "Đợt anniversary này hi vọng Linh sẽ gặp nhiều thành công hơn, gặp được nhiều con cua lọt hố hơn, đồng thời cũng mong rằng nàng tinh linh xứ bánh kẹo đây sẽ thống lĩnh cả 1 đàn cua đông đảo trong tương lai không xa" },
  { id: 21, icon: "💌", author: "cong95751", content: "Chúc bạn giữ gìn sức khỏe thật tốt, từ đó đạt được nhiều thành công trong công việc cũng như cuộc sống cá nhân và đặc biệt là phát triển mạnh mẽ hơn nữa tài năng ca hát. (cong95751 - discord =)))" },
  { id: 22, icon: "💜", author: "Fan giấu tên", content: "Chúc Lan vui vẻ hạnh phúc" },
  { id: 23, icon: "🎉", author: "Fan giấu tên", content: "Chúc mừng sinh nhật Lan nha :3 Chúc Lan luôn tràn đầy năng lượng, sáng tạo thật nhiều nội dung hay và tiếp tục mang lại niềm vui cho Nal mỗi ngày. Mong rằng năm nay và kế tiếp Lan sẽ có những buổi stream thật bùng nổ và thật nhiều kỷ niệm đẹp với Nal💜" },
  { id: 24, icon: "🎂", author: "Fan giấu tên", content: "Chúc em sống lâu" },
  { id: 25, icon: "🎵", author: "Wibu cắt moi", content: "Hi Lan,\nTừ ngày debut đến nay, chắc ghé qua Lan ở những buổi karaoke và freetalk, không phải vì mình ko thích các stream khác mà bởi vì những stream karaoke và freetalk luôn mang lại cảm giác khá là chill, những stream đó luôn giúp bản thân mình có động lực để bước tiếp vào mỗi hôm sau.\nNhân tiện ngày sinh nhật Lan và Linh, chúc 2 chị em sinh nhật vui vẻ, mong Lan có thể live nhiều về freetalk và karaoke để mình chill sau mỗi buổi học căng thẳng ạ.\nKí tên: Wibu cắt moi." },
  { id: 26, icon: "🌟", author: "Linh1706", content: "Hé lo Lan, ✨\nChúc mừng sinh nhật lần thứ 3 của Lan nha! Thú thật là dạo này em hơi bận rộn với cuộc sống bên ngoài nên ít có thời gian ghé xem stream, nhưng mà tới ngày vui của Lan là em phải xuất hiện để chúc mừng liền nè. Chúc Lan tuổi mới ngày càng xinh đẹp, nũng nịu, đẫm lệ; stream lúc nào cũng cháy và nhận được thật nhiều yêu thương từ mọi người nhó. Mà Lan cũng phải giữ gìn sức khoẻ á, em thấy bệnh quàii à!\nCơ mà... hong biết Lan còn nhớ em hong ta? Hay là Lan quên mất tiêu gòi\nLinh1706" },
  { id: 27, icon: "🎈", author: "Fan giấu tên", content: "hallo Lan chúc lan sinh nhật vui vẻ, năm nay mình đã ra trường và đi làm gặp nhiều áp lực nên không có nhiều thời gian xem stream như trước,nhưng mà chúc lan vẫn cố gắng trên con đường vtuber này nhá :>>>>" },
  { id: 28, icon: "🌷", author: "Fan giấu tên", content: "Hé lô Lan! Theo dõi Lan cũng khá lâu rồi, dù chưa có điều kiện donate hay chưa bao giờ comment, mà stream vẫn xem đều đều, lâu cỡ nào cũng đợi đc :)) nghe Lan kara hay lắm luôn á. Chúc chị em Lan với Linh tuổi mới vui vẻ, nhớ giữ gìn sức khỏe, quan tâm bản thân mình với luôn lan truyền năng lượng tích cực cho mọi người nha. Mong Lan đạt 40k subs sớm!!! (Hi vọng Lan sẽ đọc tin nhắn mn trên stream :3 )" },
  { id: 29, icon: "👑", author: "Fan giấu tên", content: "=]]] Sinh Nhật vui vẻ nhé Công Chúa :3" },
  { id: 30, icon: "🍀", author: "Fan giấu tên", content: "Chúc Lan sinh nhật vui vẻ luôn xinh đẹp và trẻ khoẻ tắm rửa sạch sẽ không bị ghẻ và làm việc gì cũng suôn sẻ Happy birthday :v" },
  { id: 31, icon: "🎤", author: "Fan giấu tên", content: "Chúc mừng sinh nhật nhá gái, chúc gái tuổi mới hát hay hơn tuổi cũ, khỏe mạnh hơn và vui vẻ hơn nhaaaa" },
  { id: 32, icon: "🐸", author: "Fan giấu tên", content: "Tui không biết chúc gì nhiều, nhưng chúc Lan sinh nhật năm nay tràn đầy niềm vui, đỡ stress hơn năm trước, và stream nhiều hơn cho các Nal xem, đặc biệt là anh R giấu tên nào đó . 🐸💢" },
  { id: 33, icon: "💖", author: "Fan giấu tên", content: "\"Em chúc chị có 1 buổi sinh nhật thật bùng nổ, vui vẻ và hạnh phúc mọi thứ suôn sẽ và tuyệt vời hơn đến với chị, em biết chị có thể sẽ khó khăn ở 1 lúc nào đó, 1 điều mà k thể chia sẻ cho mng được, nhưng chị cố lên nhé, cố gắng thì chị sẽ hái được trái ngọt, chúc chị sinh nhật vui vẻ nha<33 Chị đừng cố quá sức nữa nhen!!\"" },
  { id: 34, icon: "🎊", author: "Fan giấu tên", content: "Chúc Lan tuổi mới càng ngày càng xinh đẹp, hát hay, càng hài, càng giàu nhé!!" },
  { id: 35, icon: "💜", author: "Fan giấu tên", content: "Chúc Lan sinh nhật vv, tuổi mới thành công và rực rỡ hơn nữa, có thêm nhiều content thú vị hơn (hy vọng được thấy Lan làm asmr), luôn tươi cười và hạnh phúc." },
  { id: 36, icon: "🎂", author: "Fan giấu tên", content: "Snvv nhen" },
  { id: 37, icon: "🫶", author: "Demi", content: "hello Lan lại là Demi đây :D, chúc Lan tuổi mới bel, vui vẻ và thật nhìu sức khỏe để stream nhìu hơn nhaa💜" },
  { id: 38, icon: "🍀", author: "Fan giấu tên", content: "Chúc mừng sinh nhật Lan, chúc Lan nhiều điều may mắn, niềm vui xảy đến 💜💜💜" },
  { id: 39, icon: "🌸", author: "Fan giấu tên", content: "Chúc Lan sinh nhật vui vẻ, dù rằng bản thân tôi gần như rất ít xem hay tương tác trên stream của Lan nhưng tôi cũng hi vọng rằng quý cô đây sẽ gặp được nhiều thành công hơn trong tương lai." }
];

const reactionTypes = ["❤️", "✨", "🔥"];

export const Wishes = ({
  isActive,
  isCompleted,
  completePart,
  requestDialogue,
  hasSeenDialogue,
  markDialogueSeen,
}: SectionProps) => {
  const hasQueuedIntroRef = useRef(false);
  const [readWishes, setReadWishes] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedWish, setSelectedWish] = useState<typeof wishesData[0] | null>(null);
  
  // Local state for reaction counts per wish
  const [reactions, setReactions] = useState<Record<number, Record<string, number>>>({});

  useEffect(() => {
    const dialogueId = "dialogue:wishes:intro";
    if (!isActive || hasSeenDialogue(dialogueId) || hasQueuedIntroRef.current) {
      return;
    }

    hasQueuedIntroRef.current = true;
    markDialogueSeen(dialogueId);

    requestDialogue({
      speaker: guides.kagura,
      lines: ["Nơi này chứa đựng những lời nguyện cầu từ khắp nơi gửi đến các cậu đấy."],
      mood: "soft",
    });
    requestDialogue({
      speaker: guides.kuro,
      lines: ["Hãy thử chạm vào những vì sao lấp lánh này xem nhé."],
      mood: "soft",
    });
  }, [isActive, hasSeenDialogue, markDialogueSeen, requestDialogue]);

  const handleReadWish = (wish: typeof wishesData[0]) => {
    setSelectedWish(wish);
    if (!readWishes.includes(wish.id)) {
      const newRead = [...readWishes, wish.id];
      setReadWishes(newRead);
      if (newRead.length >= 10 && !isCompleted) {
        // Trigger micro celebration: animate read wishes
        setTimeout(() => {
          const cards = document.querySelectorAll(`.${styles.read}`);
          cards.forEach(card => card.classList.add(styles.floatUpLight));
          
          requestDialogue({
            speaker: guides.anChi,
            lines: ["Mỗi lời ở đây đều thật."],
            mood: "soft",
            onComplete: () => {
              completePart("wishes");
            }
          });
        }, 500);
      }
    }
  };

  const closeModal = () => setSelectedWish(null);

  const loadMore = () => {
    setVisibleCount(wishesData.length);
  };

  const handleReaction = (e: React.MouseEvent, wishId: number, type: string) => {
    e.stopPropagation();
    setReactions(prev => {
      const currentCounts = prev[wishId] || {};
      const newCount = (currentCounts[type] || 0) + 1;
      return {
        ...prev,
        [wishId]: {
          ...currentCounts,
          [type]: newCount
        }
      };
    });
  };

  return (
    <div className={`${styles.wishesContainer} ${styles.royalPanel}`}>
      <h2 className={styles.royalTitle}>WISHES FROM THE FANS</h2>
      <div className={styles.royalDivider}></div>
      <div className={styles.wishesGrid}>
        {wishesData.slice(0, visibleCount).map((wish) => (
          <button
            type="button"
            key={wish.id}
            className={`${styles.wishCard} ${readWishes.includes(wish.id) ? styles.read : ""}`}
            onClick={() => handleReadWish(wish)}
          >
            <div className={styles.wishHead}>
              <span className={styles.wishIcon}>{wish.icon}</span>
              <span className={styles.wishAuthor}>{wish.author}</span>
            </div>
            <div className={styles.wishContent}>{wish.content}</div>
            <div className={styles.reactionsContainer}>
              {reactionTypes.map(type => {
                const count = reactions[wish.id]?.[type] || 0;
                return (
                  <div 
                    key={type} 
                    className={styles.reactionBtn}
                    onClick={(e) => handleReaction(e, wish.id, type)}
                  >
                    {type} {count > 0 && <span className={styles.reactionCount}>{count}</span>}
                  </div>
                );
              })}
            </div>
          </button>
        ))}
      </div>
      
      {visibleCount < wishesData.length && (
        <button className={styles.loadMoreBtn} onClick={loadMore}>
          Xem thêm
        </button>
      )}

      {selectedWish && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>&times;</button>
            <div className={styles.modalHead}>
              <div className={styles.modalIcon}>{selectedWish.icon}</div>
              <div className={styles.modalAuthor}>{selectedWish.author}</div>
            </div>
            <div className={styles.modalText}>{selectedWish.content}</div>
            <div className={styles.modalReactions}>
              {reactionTypes.map(type => {
                const count = reactions[selectedWish.id]?.[type] || 0;
                return (
                  <button 
                    key={type} 
                    className={styles.reactionBtn}
                    onClick={(e) => handleReaction(e, selectedWish.id, type)}
                  >
                    {type} {count > 0 && <span className={styles.reactionCount}>{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className={styles.completedMessage}>
          Tín hiệu đã ổn định. Hãy bước tiếp sang kỷ niệm tiếp theo.
        </div>
      )}

      {!isCompleted && (
        <div style={{ marginTop: '2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <button className="primaryAction" type="button" onClick={() => completePart("wishes")}>
            Tiếp tục hành trình
          </button>
        </div>
      )}
    </div>
  );
};
