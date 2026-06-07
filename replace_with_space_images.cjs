const fs = require('fs');
const path = require('path');

const spaceFallbacks = [
  "https://images.unsplash.com/photo-1419242902214-272b3f66ce7a?w=800&q=80",
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
  "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80",
  "https://images.unsplash.com/photo-1504333638930-c8787321efa0?w=800&q=80",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80",
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80",
  "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=800&q=80"
];

const badUnsplashRegex = /https:\/\/images\.unsplash\.com\/photo-(1462332420958-a05d1e002413|1516339901601-2e1b62dc0c45|1506260408121-e353d10b87c7|1431440898522-b5dfce649710|1447433589675-4aaa56922e70)\?w=800&q=80/g;
const badWikiRegex = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/(thumb\/)?[^"]+(png|jpg|jpeg)/gi;

const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
let content = fs.readFileSync(constellationPath, 'utf8');

let fallbackIndex = 0;
const getFallback = () => spaceFallbacks[(fallbackIndex++) % spaceFallbacks.length];

// Revert local broken URLs like /stars/xxx.jpg too if they don't exist or are too small
const starsDir = path.join(__dirname, 'public', 'stars');

// We will find all stars in constellation.ts and update them properly
const regex = /id:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)"/g;
let match;
const updates = {};

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const imagePath = match[2];
  
  let needsFix = false;
  
  if (imagePath.match(badUnsplashRegex)) {
    needsFix = true;
  } else if (imagePath.startsWith('https://upload.wikimedia.org')) {
    // Replace all wikimedia with space backgrounds since they are hotlink-blocked
    needsFix = true;
  } else if (imagePath.startsWith('/stars/')) {
    const filename = imagePath.replace('/stars/', '');
    const localFile = path.join(starsDir, filename);
    if (!fs.existsSync(localFile) || fs.statSync(localFile).size < 3000) {
      needsFix = true;
    }
  }

  if (needsFix) {
    updates[id] = getFallback();
  }
}

for (const [id, url] of Object.entries(updates)) {
  const replaceRegex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
  content = content.replace(replaceRegex, `$1${url}$2`);
}

fs.writeFileSync(constellationPath, content);
console.log(`Fixed ${Object.keys(updates).length} broken/grassy images in constellation.ts with beautiful space images!`);
