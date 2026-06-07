const fs = require('fs');

const existingData = fs.readFileSync('src/data/constellation.ts', 'utf8');

const astronomyMatches = [...existingData.matchAll(/id:\s*"([^"]+)"[\s\S]*?astronomy:\s*"([^"]+)",\s*astrology:\s*"([^"]+)",/g)];
const richData = {};
for (const match of astronomyMatches) {
  richData[match[1]] = { astronomy: match[2], astrology: match[3] };
}

const stars = [
  { id: "vega", label: "Vega", x: 24, y: 22, radius: 4.5, brightness: 1, kind: "summer" },
  { id: "deneb", label: "Deneb", x: 73, y: 18, radius: 4.2, brightness: 0.95, kind: "summer" },
  { id: "altair", label: "Altair", x: 48, y: 68, radius: 4.3, brightness: 0.98, kind: "summer" },
  { id: "sadr", label: "Sadr", x: 66, y: 32, radius: 3.8, brightness: 0.9, kind: "major", note: "Trái tim của chòm Thiên Nga." },
  { id: "albireo", label: "Albireo", x: 58, y: 48, radius: 3.5, brightness: 0.85, kind: "key", unlockAchievement: "sky_key_albireo" },
  { id: "tarazed", label: "Tarazed", x: 42, y: 63, radius: 3.2, brightness: 0.8, kind: "major", note: "Một ngôi sao đồng hành thầm lặng." },
  { id: "alshain", label: "Alshain", x: 54, y: 65, radius: 3.1, brightness: 0.75, kind: "major", note: "Những giá trị cốt lõi không phô trương." },
  
  { id: "rukh", label: "Rukh", x: 70, y: 38, radius: 2.8, brightness: 0.7, kind: "secondary", note: "Một ánh nhỏ vừa thức dậy." },
  { id: "gienah", label: "Gienah", x: 78, y: 36, radius: 2.9, brightness: 0.72, kind: "secondary", note: "Cánh chim Thiên Nga dang rộng." },
  { id: "delta-cygni", label: "Delta Cygni", x: 62, y: 24, radius: 3.0, brightness: 0.75, kind: "secondary", note: "Có những điều chỉ hiện ra khi cậu chịu nhìn kỹ." },
  { id: "zeta-cygni", label: "Zeta Cygni", x: 54, y: 39, radius: 2.7, brightness: 0.65, kind: "secondary", note: "Đêm đó không chỉ có ba ngôi sao sáng nhất." },
  { id: "eta-cygni", label: "Eta Cygni", x: 49, y: 52, radius: 2.5, brightness: 0.6, kind: "secondary", note: "Một mảnh trời vừa được nhớ lại." },
  
  { id: "epsilon-lyrae", label: "Epsilon Lyrae", x: 29, y: 18, radius: 3.2, brightness: 0.85, kind: "key", unlockAchievement: "sky_key_echo" },
  { id: "sheliak", label: "Sheliak", x: 20, y: 31, radius: 2.8, brightness: 0.7, kind: "secondary", note: "Ánh sáng nhỏ cũng biết cách ở lại." },
  { id: "sulafat", label: "Sulafat", x: 31, y: 34, radius: 2.9, brightness: 0.72, kind: "secondary", note: "Khung đàn Lyra phía xa." },
  
  { id: "alpha-delphini", label: "Sualocin (Alpha Delphini)", x: 70, y: 59, radius: 3.0, brightness: 0.75, kind: "secret", note: "Cá heo nhỏ bơi lội giữa dòng Ngân Hà." },
  { id: "beta-delphini", label: "Rotanev (Beta Delphini)", x: 74, y: 56, radius: 3.1, brightness: 0.8, kind: "secret", note: "Một chú cá heo nhỏ vừa nhảy khỏi biển sao." },
  { id: "gamma-delphini", label: "Gamma Delphini", x: 76, y: 62, radius: 2.7, brightness: 0.65, kind: "secret", note: "Bầu trời luôn cất giấu những người bạn bất ngờ." },
  { id: "delta-delphini", label: "Delta Delphini", x: 72, y: 65, radius: 2.6, brightness: 0.6, kind: "secret", note: "Chòm sao bí mật cho niềm vui thuần khiết." },
  
  { id: "vegas-echo", label: "Vega's Echo", x: 16, y: 15, radius: 2.0, brightness: 0.5, kind: "poetic", note: "Chút vọng âm còn sót lại từ mùa hè trước." },
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
  const rData = richData[star.id];
  let fact = star.note || "Một điểm sáng nhỏ trong nền trời mùa hạ.";
  
  let extra = '';
  if (rData) {
    extra = ",\n    astronomy: \"" + rData.astronomy + "\",\n    astrology: \"" + rData.astrology + "\"";
  }
  
  let ach = star.unlockAchievement ? ", unlockAchievement: \"" + star.unlockAchievement + "\"" : '';

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
  output += "    fact: \"" + fact + "\"" + extra + ach + "\n";
  output += "  },\n";
}

output += "];\n\n";
output += "export const backgroundStars: StarPoint[] = Array.from({ length: 60 }).map((_, i) => ({\n";
output += "  id: `bg-star-${i}`,\n";
output += "  label: \"\",\n";
output += "  x: Math.random() * 100,\n";
output += "  y: Math.random() * 100,\n";
output += "  radius: Math.random() * 1.5 + 0.5,\n";
output += "  kind: \"minor\",\n";
output += "  color: \"rgba(241, 231, 216, 0.4)\",\n";
output += "}));\n";

fs.writeFileSync('src/data/constellation.ts', output);
console.log("Rewrite completed.");
