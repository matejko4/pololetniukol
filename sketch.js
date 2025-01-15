let pozadi = null;
let panakObj;
let panakImg = null;
let gameOver = false; // Stav hry
let score = 0; 

class Panacek {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 80;
        this.gravity = 3;
    }

    draw() {
        image(panakImg, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.gravity;
    }
}

function preload() {
    pozadi = loadImage("pozadi.jpg");
    panakImg = loadImage("panacek.png");
}

function setup() {
    createCanvas(1200, 700);
    panakObj = new Panacek(100, 300);
    score = 0; // Reset skóre
}

function draw() {
    if (!gameOver) {
        
        background(pozadi);
        panakObj.draw();
        panakObj.update();

        
        score++;

        
        if (keyIsDown(LEFT_ARROW)) {
            panakObj.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            panakObj.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            panakObj.y -= 10;
        }
        if (keyIsDown(DOWN_ARROW)) {
            panakObj.y += 5;
        }

        
        if (panakObj.y > height - panakObj.height /2|| panakObj.y < 0 || panakObj.x > width - panakObj.width /2|| panakObj.x < 0) {
            endGame();
        }

        // Zobrazení skóre
        fill(0);
        textSize(32);
        text(`Score: ${score}`, 20, 40);
    } else {
        background(200);
        textSize(48);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2 - 50);
        textSize(32);
        fill(0);
        text(`Final Score: ${score}`, width / 2, height / 2);

        
        fill(0, 100, 255);
        rect(width / 2 - 100, height / 2 + 50, 200, 50);
        fill(255);
        text("Restart", width / 2, height / 2 + 75);

        noLoop(); // Zastaví smyčku kreslení
    }
}

function endGame() {
    gameOver = true;
}

function mousePressed() {
    if (gameOver) {
        const buttonX = width / 2 - 100;
        const buttonY = height / 2 + 50;
        const buttonWidth = 200;
        const buttonHeight = 50;

        if (
            mouseX > buttonX &&
            mouseX < buttonX + buttonWidth &&
            mouseY > buttonY &&
            mouseY < buttonY + buttonHeight
        ) {
            // Restart hry
            gameOver = false;
            score = 0;
            panakObj = new Panacek(100, 300);
            loop(); 
        }
    }
}


