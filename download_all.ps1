$images = @{
  "vega.png" = "https://upload.wikimedia.org/wikipedia/commons/4/42/Vega_star_black_background.png"
  "deneb.jpg" = "https://upload.wikimedia.org/wikipedia/commons/3/36/Deneb_-_Optical.jpg"
  "altair.png" = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Altair_%2835529679801%29.png"
  "sadr.jpg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sadr_region.jpg/800px-Sadr_region.jpg"
  "albireo.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/56/Albireo_double_star.jpg"
  "epsilon_lyrae.jpg" = "https://upload.wikimedia.org/wikipedia/commons/3/35/Epsilon_Lyrae_the_double-double.jpg"
  "sheliak.jpg" = "https://upload.wikimedia.org/wikipedia/commons/6/61/Beta_Lyrae.jpg"
  "sualocin.png" = "https://upload.wikimedia.org/wikipedia/commons/5/55/Sualocin_star.png"
  "rotanev.png" = "https://upload.wikimedia.org/wikipedia/commons/9/99/Rotanev_star.png"
  "cygnus_a.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/58/3c405.jpg"
  "kepler_186.jpg" = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Cygnus_Wall.jpg"
  "cygnus_x_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/8/87/Cygnus_region_in_emission_lines.jpg"
  "psr.jpg" = "https://upload.wikimedia.org/wikipedia/commons/6/65/Chart_Showing_Radio_Signal_of_First_Identified_Pulsar.jpg"
  "m57.jpg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Webb_captures_detailed_beauty_of_Ring_Nebula_%28NIRCam_image%29_%28weic2320b%29.jpg/800px-Webb_captures_detailed_beauty_of_Ring_Nebula_%28NIRCam_image%29_%28weic2320b%29.jpg"
  "ngc.jpg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fireworks_Galaxy.jpg/800px-Fireworks_Galaxy.jpg"
  "gienah.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Cygnus_constellation_map.svg/1280px-Cygnus_constellation_map.svg.png"
  "fawaris.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Cygnus_constellation_map.svg/1280px-Cygnus_constellation_map.svg.png"
  "sulafat.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lyra_IAU.svg/1280px-Lyra_IAU.svg.png"
  "tarazed.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aquila_constellation_map.svg/1280px-Aquila_constellation_map.svg.png"
  "alshain.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aquila_constellation_map.svg/1280px-Aquila_constellation_map.svg.png"
}

$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"

foreach ($key in $images.Keys) {
  $url = $images[$key]
  $out = "public\stars\$key"
  Write-Host "Downloading $key"
  & curl.exe -L -s -o $out $url -H "User-Agent: $ua"
}
