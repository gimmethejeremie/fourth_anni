const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public', 'stars');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = {
  vega: "https://upload.wikimedia.org/wikipedia/commons/4/42/Vega_star_black_background.png",
  deneb: "https://upload.wikimedia.org/wikipedia/commons/3/36/Deneb_-_Optical.jpg",
  altair: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Altair_%2835529679801%29.png",
  sadr: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sadr_region.jpg/800px-Sadr_region.jpg",
  albireo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Albireo_double_star.jpg",
  epsilon_lyrae: "https://upload.wikimedia.org/wikipedia/commons/3/35/Epsilon_Lyrae_the_double-double.jpg",
  sheliak: "https://upload.wikimedia.org/wikipedia/commons/6/61/Beta_Lyrae.jpg",
  sualocin: "https://upload.wikimedia.org/wikipedia/commons/5/55/Sualocin_star.png",
  rotanev: "https://upload.wikimedia.org/wikipedia/commons/9/99/Rotanev_star.png",
  cygnus_a: "https://upload.wikimedia.org/wikipedia/commons/5/58/3c405.jpg",
  kepler_186: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Cygnus_Wall.jpg",
  cygnus_x_1: "https://upload.wikimedia.org/wikipedia/commons/8/87/Cygnus_region_in_emission_lines.jpg",
  psr: "https://upload.wikimedia.org/wikipedia/commons/6/65/Chart_Showing_Radio_Signal_of_First_Identified_Pulsar.jpg",
  m57: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Webb_captures_detailed_beauty_of_Ring_Nebula_%28NIRCam_image%29_%28weic2320b%29.jpg/800px-Webb_captures_detailed_beauty_of_Ring_Nebula_%28NIRCam_image%29_%28weic2320b%29.jpg",
  ngc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fireworks_Galaxy.jpg/800px-Fireworks_Galaxy.jpg",
  gienah: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80",
  fawaris: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80",
  sulafat: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=800&q=80",
  tarazed: "https://images.unsplash.com/photo-1431440898522-b5dfce649710?w=800&q=80",
  alshain: "https://images.unsplash.com/photo-1447433589675-4aaa56922e70?w=800&q=80"
};

const download = (name, url) => {
  return new Promise((resolve, reject) => {
    const ext = url.includes('.png') ? '.png' : '.jpg';
    const filepath = path.join(dir, name + ext);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
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

async function run() {
  const results = {};
  for (const [name, url] of Object.entries(images)) {
    try {
      console.log(`Downloading ${name}...`);
      const localPath = await download(name, url);
      results[name] = localPath;
    } catch(e) {
      console.error(`Failed ${name}:`, e);
    }
  }
  fs.writeFileSync(path.join(__dirname, 'downloaded_stars.json'), JSON.stringify(results, null, 2));
  console.log('Done!');
}
run();
