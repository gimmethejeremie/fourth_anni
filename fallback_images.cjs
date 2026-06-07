const fs = require('fs');
const path = require('path');

const fallbacks = [
  "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80",
  "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80",
  "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=800&q=80",
  "https://images.unsplash.com/photo-1431440898522-b5dfce649710?w=800&q=80",
  "https://images.unsplash.com/photo-1447433589675-4aaa56922e70?w=800&q=80",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ce7a?w=800&q=80",
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80"
];

let fallbackIndex = 0;
const getFallback = () => fallbacks[(fallbackIndex++) % fallbacks.length];

const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
let content = fs.readFileSync(constellationPath, 'utf8');

const starsDir = path.join(__dirname, 'public', 'stars');

// Find all image references in constellation.ts
const regex = /id:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)"/g;
let match;
const updates = [];

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const imagePath = match[2];
  
  if (imagePath.startsWith('/stars/')) {
    const filename = imagePath.replace('/stars/', '');
    const localFile = path.join(starsDir, filename);
    
    if (!fs.existsSync(localFile) || fs.statSync(localFile).size < 3000) {
      console.log(`File ${filename} is missing or too small (error page). Using fallback.`);
      updates.push({ id, fallback: getFallback() });
    } else {
      console.log(`File ${filename} is valid.`);
    }
  }
}

for (const update of updates) {
  const replaceRegex = new RegExp(`(id:\\s*"${update.id}",[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
  content = content.replace(replaceRegex, `$1${update.fallback}$2`);
}

fs.writeFileSync(constellationPath, content);
console.log('Fixed constellation.ts with fallback images.');
