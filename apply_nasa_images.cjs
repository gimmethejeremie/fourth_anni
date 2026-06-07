const fs = require('fs');
const path = require('path');

const nasaUrls = [
  "https://images-assets.nasa.gov/image/PIA04921/PIA04921~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA07906/PIA07906~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA15656/PIA15656~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04624/PIA04624~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA20695/PIA20695~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04922/PIA04922~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA07142/PIA07142~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04924/PIA04924~medium.jpg",
  "https://images-assets.nasa.gov/image/astronomers-set-a-new-galaxy-distance-record_17389972462_o/astronomers-set-a-new-galaxy-distance-record_17389972462_o~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA12174/PIA12174~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA11805/PIA11805~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA17246/PIA17246~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA08787/PIA08787~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04630/PIA04630~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04264/PIA04264~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA10600/PIA10600~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA10373/PIA10373~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04218/PIA04218~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04234/PIA04234~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA09579/PIA09579~medium.jpg"
];

const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
let content = fs.readFileSync(constellationPath, 'utf8');

let index = 0;
content = content.replace(/image:\s*"[^"]+"/g, (match) => {
  const url = nasaUrls[index % nasaUrls.length];
  index++;
  return `image: "${url}"`;
});

fs.writeFileSync(constellationPath, content);
console.log(`Replaced ${index} images with unique NASA space images.`);
