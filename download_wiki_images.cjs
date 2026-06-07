const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'stars');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const queries = {
  vega: "Vega",
  deneb: "Deneb",
  altair: "Altair",
  sadr: "Gamma Cygni",
  albireo: "Albireo",
  gienah: "Epsilon Cygni",
  fawaris: "Delta Cygni",
  sheliak: "Beta Lyrae",
  sulafat: "Gamma Lyrae",
  tarazed: "Gamma Aquilae",
  alshain: "Beta Aquilae",
  sualocin: "Alpha Delphini",
  rotanev: "Beta Delphini",
  cygnus_a: "Cygnus A",
  kepler_186: "Kepler-186",
  cygnus_x_1: "Cygnus X-1",
  psr: "PSR B1919+21",
  m57: "Ring Nebula",
  ngc: "NGC 6946"
};

const apiUserAgent = 'FourthAnniBot/1.0 (contact@example.com)';
const downloadUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

const getImageUrl = (title) => {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1000`;
    https.get(url, { headers: { 'User-Agent': apiUserAgent } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const page = pages[Object.keys(pages)[0]];
          if (page.thumbnail && page.thumbnail.source) {
            resolve(page.thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(new Error(`Failed to parse: ${data.substring(0, 50)}...`));
        }
      });
    }).on('error', reject);
  });
};

const download = (name, url) => {
  return new Promise((resolve, reject) => {
    const ext = url.toLowerCase().includes('.png') ? '.png' : '.jpg';
    const filepath = path.join(dir, name + ext);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, { headers: { 'User-Agent': downloadUserAgent } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, { headers: { 'User-Agent': downloadUserAgent } }, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve('/stars/' + name + ext); });
        });
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve('/stars/' + name + ext); });
      }
    }).on('error', err => {
      fs.unlink(filepath);
      reject(err);
    });
  });
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  const results = {};
  for (const [name, title] of Object.entries(queries)) {
    try {
      console.log(`Fetching ${name} (${title})...`);
      const url = await getImageUrl(title);
      if (url) {
        console.log(`Downloading ${url}...`);
        const localPath = await download(name, url);
        results[name] = localPath;
      } else {
        console.log(`No image found for ${name}`);
      }
    } catch(e) {
      console.error(`Failed ${name}:`, e.message);
    }
    await delay(1000); // 1 second delay between requests
  }
  
  // Custom for epsilon_lyrae
  console.log(`Downloading Epsilon Lyrae manually...`);
  results['epsilon_lyrae'] = await download('epsilon_lyrae', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Epsilon_Lyrae_the_double-double.jpg');
  
  const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
  let content = fs.readFileSync(constellationPath, 'utf8');
  for (const [name, imgPath] of Object.entries(results)) {
    const ext = imgPath.endsWith('.png') ? 'png' : 'jpg';
    const dashedName = name.replace(/_/g, '-');
    const regex = new RegExp(`(id:\\s*"${dashedName}",[\\s\\S]*?image:\\s*")/[^"]+(")`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `$1/stars/${name}.${ext}$2`);
    } else {
      console.log(`Could not find id: "${dashedName}" in constellation.ts`);
    }
  }
  fs.writeFileSync(constellationPath, content);
  console.log('Updated constellation.ts');
  console.log('Done!');
}
run();
