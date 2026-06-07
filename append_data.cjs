const fs = require('fs');
let content = fs.readFileSync('src/data/constellation.ts', 'utf-8');

content = content.replace(/astronomy: "(.*?)",/g, (match, p1) => {
  let ch = "";
  if (p1.includes("Lyrae") || p1.includes("Vega") || p1.includes("Sulafat") || p1.includes("Sheliak") || p1.includes("Double Double")) {
    ch = "Thiên Cầm (Lyra)";
  } else if (p1.includes("Cygni") || p1.includes("Deneb") || p1.includes("Sadr") || p1.includes("Albireo") || p1.includes("Ruchba") || p1.includes("Gienah") || p1.includes("Fawaris")) {
    ch = "Thiên Nga (Cygnus)";
  } else if (p1.includes("Aquilae") || p1.includes("Altair") || p1.includes("Tarazed") || p1.includes("Alshain")) {
    ch = "Đại Bàng (Aquila)";
  } else if (p1.includes("Delphini") || p1.includes("Sualocin") || p1.includes("Rotanev")) {
    ch = "Cá Heo (Delphinus)";
  }

  const newStr = p1 + ", Chòm sao: " + ch + ", Thiên hà: Ngân Hà (Milky Way)";
  return `astronomy: "${newStr}",`;
});

fs.writeFileSync('src/data/constellation.ts', content, 'utf-8');
console.log('Appended constellation and galaxy data.');
