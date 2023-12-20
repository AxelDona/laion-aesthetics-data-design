let imageData; // Variable pour stocker les données JSON
colorMode(HSL,360,100,100)

function setup() {
  createCanvas(1280, 720);
  // Pas sûr de pouvoir accéder directement à imageData ici car le chargement n'est pas encore terminé
}

function preload() {
  // Charger le fichier JSON avant le chargement du reste du script
  imageData = loadJSON('image_data.json', dataLoaded); // Utilisation d'une fonction de rappel
}

function dataLoaded(data) {
  // Fonction de rappel appelée lorsque les données sont chargées avec succès
  imageData = data; // Affecte les données chargées à la variable imageData
  console.log(imageData); // Vérifiez dans la console si les données sont correctement chargées
}

function draw() {
  background(255);

  // Dessiner l'axe des abscisses avec légende
  stroke(0);
  line(50, height - 50, width - 50, height - 50); // Axe des abscisses
  textSize(14);
  textAlign(CENTER, CENTER);
  fill(0);
  text('Saturation (0-100)', width / 2, height - 20);

  // Dessiner l'axe des ordonnées avec légende
  line(50, height - 50, 50, 50); // Axe des ordonnées
  translate(15, height / 2);
  rotate(-HALF_PI);
  text('Luminosité (0-100)', 0, 0);
  rotate(HALF_PI);
  translate(-15, -height / 2);

  // Taille fixe pour tous les points
  let pointSize = 5;

  // Dessiner les points représentant les images
  if (imageData) {
    for (let i = 0; i < imageData.length; i++) {
      let h = imageData[i].average_hsv.h; // Teinte moyenne (on ne mappe pas volontairement car la fonction HSVtoRGB prend un 'h' non mappé)
      let s = map(imageData[i].average_hsv.s, 0, 100, 0, 1); // Saturation (0-100 mapped to 0-1)
      let v = map(imageData[i].average_hsv.v, 0, 100, 0, 1); // Luminosité (0-100 mapped to 0-1)

      // Convertir les valeurs de saturation et luminosité en coordonnées sur le canvas
      let x = map(s, 0, 1, 50, width - 50); // Mappage de la saturation sur l'axe des abscisses
      let y = map(v, 0, 1, height - 50, 50); // Mappage de la luminosité sur l'axe des ordonnées

      // Créer une couleur basée sur la teinte moyenne
      let hueColor = color(h,100,100); // Saturation et luminosité à 100% pour une couleur vive
      
      

      // Appliquer la couleur au point  
      noStroke();

      // fill(hueColor);
      // Convertir les valeurs de hsv en rgb
      let rgbColor = HSVtoRGB(h / 360, s, v);
      fill(rgbColor.r, rgbColor.g, rgbColor.b);
      ellipse(x, y, pointSize); // Dessiner le point

      // Dessiner le point avec un contour blanc de 0.5px
      stroke(30);
      strokeWeight(0.5);
      fill(rgbColor.r, rgbColor.g, rgbColor.b);
      ellipse(x, y, pointSize); // Dessiner le point
    }
  }
}


// Fonction pour convertir HSV en RGB
function HSVtoRGB(h, s, v) {
  let r, g, b;
  let i = floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: floor(r * 255),
    g: floor(g * 255),
    b: floor(b * 255)
  };
}





