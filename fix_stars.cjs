const fs = require('fs');
const path = require('path');

const correctImages = {
  "vega": "https://upload.wikimedia.org/wikipedia/commons/4/42/Vega_star_black_background.png",
  "deneb": "https://upload.wikimedia.org/wikipedia/commons/3/36/Deneb_-_Optical.jpg",
  "altair": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Altair_%2835529679801%29.png",
  "sadr": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sadr_region.jpg/800px-Sadr_region.jpg",
  "albireo": "https://upload.wikimedia.org/wikipedia/commons/5/56/Albireo_double_star.jpg",
  "gienah": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Cygnus_constellation_map.svg/1280px-Cygnus_constellation_map.svg.png",
  "fawaris": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Cygnus_constellation_map.svg/1280px-Cygnus_constellation_map.svg.png",
  "epsilon-lyrae": "https://upload.wikimedia.org/wikipedia/commons/3/35/Epsilon_Lyrae_the_double-double.jpg",
  "sheliak": "https://upload.wikimedia.org/wikipedia/commons/6/61/Beta_Lyrae.jpg",
  "sulafat": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lyra_IAU.svg/1280px-Lyra_IAU.svg.png",
  "tarazed": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aquila_constellation_map.svg/1280px-Aquila_constellation_map.svg.png",
  "alshain": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aquila_constellation_map.svg/1280px-Aquila_constellation_map.svg.png",
  "sualocin": "https://upload.wikimedia.org/wikipedia/commons/5/55/Sualocin_star.png",
  "rotanev": "https://upload.wikimedia.org/wikipedia/commons/9/99/Rotanev_star.png",
  "cygnus-a": "https://upload.wikimedia.org/wikipedia/commons/5/58/3c405.jpg",
  "kepler-186": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Cygnus_Wall.jpg",
  "cygnus-x-1": "https://upload.wikimedia.org/wikipedia/commons/8/87/Cygnus_region_in_emission_lines.jpg",
  "psr-b1919-21": "https://upload.wikimedia.org/wikipedia/commons/6/65/Chart_Showing_Radio_Signal_of_First_Identified_Pulsar.jpg",
  "m57-ring": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Webb_captures_detailed_beauty_of_Ring_Nebula_%28NIRCam_image%29_%28weic2320b%29.jpg/800px-Webb_captures_detailed_beauty_of_Ring_Nebula_%28NIRCam_image%29_%28weic2320b%29.jpg",
  "ngc-6946": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fireworks_Galaxy.jpg/800px-Fireworks_Galaxy.jpg"
};

const constellationPath = path.join(__dirname, 'src', 'data', 'constellation.ts');
let content = fs.readFileSync(constellationPath, 'utf8');

for (const [id, url] of Object.entries(correctImages)) {
  const replaceRegex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
  content = content.replace(replaceRegex, `$1${url}$2`);
}

fs.writeFileSync(constellationPath, content);
console.log('Fixed constellation.ts with direct Wikipedia URLs!');
