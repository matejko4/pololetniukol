let background;
let ptak;
let width = 800;
let height = 600;
function preload() {
  background = loadImage('');
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
    if(background) {
    imageMode(CORNER);
    image(background, 0, 0, width, height);
    } else {
            background(20);
        }
    }
