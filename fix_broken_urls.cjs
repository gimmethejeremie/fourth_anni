const fs = require('fs');
const path = require('path');
const https = require('https');

const fallbackImage = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80";

const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
let content = fs.readFileSync(constellationPath, 'utf8');

const regex = /id:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)"/g;
let match;
const updates = {};

const checkUrl = (url) => {
  return new Promise((resolve) => {
    if (url.startsWith('/stars/')) {
      resolve(true); // Assume local files are fine for now, we only broke the remote ones
      return;
    }
    
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302);
    }).on('error', () => resolve(false)).end();
  });
};

async function fix() {
  const matches = [];
  while ((match = regex.exec(content)) !== null) {
    matches.push({ id: match[1], url: match[2] });
  }

  for (const item of matches) {
    if (item.url.includes('images.unsplash.com')) {
      const isOk = await checkUrl(item.url);
      if (!isOk) {
        console.log(`URL broken for ${item.id}: ${item.url}`);
        updates[item.id] = fallbackImage;
      } else {
        console.log(`URL OK for ${item.id}`);
      }
    }
  }

  for (const [id, url] of Object.entries(updates)) {
    const replaceRegex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
    content = content.replace(replaceRegex, `$1${url}$2`);
  }

  fs.writeFileSync(constellationPath, content);
  console.log(`Fixed ${Object.keys(updates).length} broken URLs.`);
}

fix();
