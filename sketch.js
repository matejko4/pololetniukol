let pozadi;
let ptakObj;
class Ptacek {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 80;
      this.gravity = 3;
  }

  draw() {
      image(ptak, this.x, this.y, this.width, this.height);
  }
  update() {
      this.y += this.gravity;
  }
  jump(skok) {
      this.y -= skok;
  }
}

function preload() {
    pozadi = loadImage("pozadi.jpg");
    ptak = loadImage("ptacek.png");
}

function setup() {
    createCanvas(800, 600);
    ptakObj = new Ptacek(100, 300);
}

function draw() {
    background(pozadi);
    ptakObj.update();
    ptakObj.draw();
    if (keyIsDown(32)) { 
      ptakObj.jump(20);
  }
}


