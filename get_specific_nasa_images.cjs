const https = require('https');
const fs = require('fs');
const path = require('path');

const fetchNasaImages = (query, count) => {
  return new Promise((resolve, reject) => {
    https.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const items = JSON.parse(data).collection.items;
          const urls = items
            .map(i => i.links?.[0]?.href)
            .filter(h => h && (h.includes('~medium.jpg') || h.includes('~orig.jpg')));
          resolve(Array.from(new Set(urls)).slice(0, count));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

const mapToStars = async () => {
  const starUrls = await fetchNasaImages('bright star', 14);
  const pulsarUrls = await fetchNasaImages('pulsar', 1);
  const exoplanetUrls = await fetchNasaImages('exoplanet star', 1);
  const galaxyUrls = await fetchNasaImages('spiral galaxy', 2);
  const nebulaUrls = await fetchNasaImages('ring nebula', 1);
  const blackHoleUrls = await fetchNasaImages('black hole', 1);

  const starMapping = {
    "vega": starUrls[0],
    "deneb": starUrls[1],
    "altair": starUrls[2],
    "sadr": starUrls[3],
    "albireo": starUrls[4],
    "gienah": starUrls[5],
    "fawaris": starUrls[6],
    "epsilon-lyrae": starUrls[7],
    "sheliak": starUrls[8],
    "sulafat": starUrls[9],
    "tarazed": starUrls[10],
    "alshain": starUrls[11],
    "sualocin": starUrls[12],
    "rotanev": starUrls[13],
    "kepler-186": exoplanetUrls[0] || starUrls[13], 
    "psr-b1919-21": pulsarUrls[0] || starUrls[13],
    "cygnus-a": galaxyUrls[0],
    "cygnus-x-1": blackHoleUrls[0],
    "m57-ring": nebulaUrls[0],
    "ngc-6946": galaxyUrls[1]
  };

  const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
  let content = fs.readFileSync(constellationPath, 'utf8');

  for (const [id, url] of Object.entries(starMapping)) {
    if (!url) {
      console.warn(`Warning: Missing URL for ${id}`);
      continue;
    }
    const replaceRegex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
    content = content.replace(replaceRegex, `$1${url}$2`);
  }

  fs.writeFileSync(constellationPath, content);
  console.log('Successfully mapped specific NASA images based on object type!');
  console.log(starMapping);
};

mapToStars();
