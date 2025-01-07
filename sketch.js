let pozadi;
let ptak;
let width = 1000;
let length = 600;
function preload(){
  pozadi = loadImage("pozadi.jpg");
  ptak = loadImage("ptacek.png");
}
function setup() {
  createCanvas(1000, 600);
}

function draw() {
  if(pozadi){
    background(pozadi);
  } else {
    background(0,50,0);
  }
  image(ptak, 50, length - 80 , 100, 80);
}