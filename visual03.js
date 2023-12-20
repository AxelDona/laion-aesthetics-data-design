let numberOfLines = 360; // Nombre de droites à tracer
let centerX, centerY, radius;
let lineLengths = []; // Tableau pour stocker les longueurs
let lineColors = [];
let circleColor;

let array = new Array(361).fill(0); //tableau avec que des 0

function preload() {
  // Charger le fichier JSON avant le chargement du reste du script
  imageData = loadJSON('image_data.json', dataLoaded); // Utilisation d'une fonction de rappel
}

function dataLoaded(data) {
  // Fonction de rappel appelée lorsque les données sont chargées avec succès
  imageData = data; // Affecte les données chargées à la variable imageData
  console.log(imageData); // Vérifiez dans la console si les données sont correctement chargées

  
  
  for (let i = 0; i < imageData.length; i++) {
    let h = imageData[i].average_hsv.h; // Teinte moyenne 
    let taille = imageData[i].height * imageData[i].width; //taille de l'image en pixel

    array[h] += taille; // on stocke le nombre de pixels de chaque teinte 
    // array[h] ++; // on stocke le nombre de pixels de chaque teinte 

  }


}





function setup() {
  createCanvas(1208, 720);
  centerX = width / 2; // Centre en X du cercle
  centerY = height / 2; // Centre en Y du cercle
  radius = 250; // Rayon du cercle agrandi
  circleColor = color(0); // Couleur noire pour le cercle
  background(255);

  
  let d =0;
  for (let i = 0; i < numberOfLines; i++) {
    colorMode(HSL,360,100,100);

    // lineLengths.push(array[d+1]/260000); // échelle linéaire
    
    lineLengths.push(37*log(array[d+1]/100000+1)); // échelle log pour écraser les grandes valeurs

    lineColors.push(color(d,50 ,50) );
    d++;
    colorMode(RGB,256,256,256);
  }
}

function draw() {
  background(255);
  drawLines();
  drawCircle();
}

function drawLines() {
  // Tracer les droites en fonction des longueurs précalculées
  let angle = -90;
 
  let increment = 1;

  for (let i = 0; i < numberOfLines; i++) {
    drawLineFromCenter(centerX, centerY, radians(angle), lineLengths[i], lineColors[i]);
    angle += increment;
  }
}


function drawLineFromCenter(centerX, centerY, angle, length, lineColor) {
  stroke(lineColor);
  let endX = centerX + cos(angle) * length;
  let endY = centerY + sin(angle) * length;
  line(centerX, centerY, endX, endY);
}
