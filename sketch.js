let pozadi;
let raketaImg;
let meteoritImg;
let soundGO;
let soundNR;
let raketaObj;
let meteoritObj = [];
let hra = false;
let skore = 0;
let nejSkore = 0;

class Raketa {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 80;
        this.gravity = 3;
    }

    draw() {
        imageMode(CENTER);
        image(raketaImg, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.gravity;
    }
    detectCollision(meteorit) {
        if (this.x < meteorit.x + meteorit.width &&
            this.x + this.width > meteorit.x &&
            this.y < meteorit.y + meteorit.height &&
            this.y + this.height > meteorit.y) {
            return true;
        } else {
            return false;
        }
    }
}


class Meteorit {
    constructor() {
        this.x = random(0, width);
        this.y = -50;
        this.width = 50;
        this.height = 50;
        this.gravity = 10;
    }

    draw() {
        imageMode(CENTER);
        image(meteoritImg, this.x, this.y, this.width, this.height);
    }
    update() {
        this.x -= random(1, 5);
        this.y += this.gravity;
    }
}


function startGame() {
    meteoritObj.splice(1);
    hra = true;
    skore = 0;
    raketaObj = new Raketa(width / 2, height / 2);
    document.getElementById('skore').innerText = skore;
}

function resetGame() {
    meteoritObj.splice(1);
    hra = false;
    skore = 0;
    nejSkore = 0;
    raketaObj = new Raketa(10, 10);
    document.getElementById('skore').innerText = skore;
    document.getElementById('nejskore').innerText = nejSkore;
}



function preload() {
    pozadi = loadImage("pozadi.jpg");
    raketaImg = loadImage("raketa.png");
    meteoritImg = loadImage("meteorit.png");
    soundGO = loadSound("gameover.mp3");
    soundNR = loadSound("newrecord.mp3");
}

function setup() {
    createCanvas(1200, 700);
    raketaObj = new Raketa(10, 10);
    skore = 0; 
}


function draw() {   
    if (hra) {
        document.getElementById('skore').innerText = skore;
        imageMode(CORNER);
        background(pozadi);
        raketaObj.draw();
        raketaObj.update();
        skore++;
        
        if(random(1) < 0.2) meteoritObj.push(new Meteorit());
        for (let i = 0; i < meteoritObj.length; i++){
            meteoritObj[i].draw();
            meteoritObj[i].update();
            if (meteoritObj[i].y > height+ meteoritObj.height) {
                meteoritObj.splice(i, 1);
                }
            if (raketaObj.detectCollision(meteoritObj[i]) || raketaObj.x < 0 || raketaObj.x > width - raketaObj.width / 2|| 
                raketaObj.y < 0 || raketaObj.y > height - raketaObj.height / 2) {
                hra = false;
            }
        }


        if (hra == false) {
            if (skore < nejSkore) {
                soundGO.play();
            }else {
                soundNR.play();
            }
            
            background(0);
            fill(255);
            textSize(32);
            text("Konec hry!", width / 2 - 100, height / 2);
            if (skore > nejSkore) {
                nejSkore = skore -1;
                document.getElementById('nejskore').innerText = nejSkore;
            }
        }

        if (keyIsDown(LEFT_ARROW)) {
            raketaObj.x -= 7;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            raketaObj.x += 7;
        }
        if (keyIsDown(UP_ARROW)) {
            raketaObj.y -= 10;
        }
        if (keyIsDown(DOWN_ARROW)) {
            raketaObj.y += 7;
            }
    }
    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('restart').addEventListener('click', resetGame);
}