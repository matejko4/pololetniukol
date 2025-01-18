let pozadi; 
let raketaImg; 
let meteoritImg; 
let soundGO; 
let soundNR; 
let soundSH; 
let raketaObj; 
let meteoritObj = []; 
let hra = false; 
let skore = 0; 
let nejSkore = 0; 
let strela = null; 

// Třída Raketa
class Raketa {
    constructor(x, y) {
        this.x = x; // X pozice
        this.y = y; // Y pozice
        this.width = 50; // Šířka rakety
        this.height = 80; // Výška rakety
        this.gravity = 3; // Gravitační efekt na raketu
    }

    draw() {
        imageMode(CENTER); // Nastavení režimu obrázku na střed
        image(raketaImg, this.x, this.y, this.width, this.height); // Kreslení obrázku rakety
    }

    update() {
        this.y += this.gravity; // Aktualizace pozice rakety s gravitací
    }

    detectCollision(meteorit) {
        // Kontrola kolize s meteoritem
        if (this.x < meteorit.x + meteorit.width &&
            this.x + this.width > meteorit.x &&
            this.y < meteorit.y + meteorit.height &&
            this.y + this.height > meteorit.y) {
            return true; // Kolize detekována
        } else {
            return false; // Žádná kolize
        }
    }
}

// Třída Meteorit
class Meteorit {
    constructor() {
        this.x = random(0, width); // Náhodná X pozice
        this.y = -50; // Start nad plátnem
        this.width = 50; // Šířka meteoritu
        this.height = 50; // Výška meteoritu
        this.gravity = 7; // Gravitační efekt na meteorit
    }

    draw() {
        imageMode(CENTER); // Nastavení režimu obrázku na CENTER
        image(meteoritImg, this.x, this.y, this.width, this.height); // Kreslení obrázku meteoritu
    }

    update() {
        this.y += this.gravity; // Aktualizace pozice meteoritu s gravitací
    }
}

// Třída Strela
class Strela {
    constructor(x, y) {
        this.x = x; // X pozice střely
        this.y = y; // Y pozice střely
        this.width = 10; // Šířka střely
        this.height = 20; // Výška střely
        this.speed = 10; // Rychlost střely
    }

    draw() {
        fill(255, 0, 0); // Nastavení barvy střely na červenou
        rect(this.x, this.y, this.width, this.height); // Kreslení střely
    }

    update() {
        this.y -= this.speed; // Aktualizace pozice střely (pohyb nahoru)
    }

    detectCollision(meteorit) {
        // Kontrola kolize s meteoritem
        if (this.x < meteorit.x + meteorit.width &&
            this.x + this.width > meteorit.x &&
            this.y < meteorit.y + meteorit.height &&
            this.y + this.height > meteorit.y) {
            return true; // Kolize detekována
        } else {
            return false; // Žádná kolize
        }
    }
}


function startGame() {
    meteoritObj.splice(0, meteoritObj.length); // Vymazání pole meteorů
    raketaObj = new Raketa(width / 2, height / 2); // Vytvoření nové rakety na střed plátna
    strela = null; // Vymazání střely
    hra = true; // Nastavení stavu hry na aktivní
    skore = 0; // Resetování skóre
    document.getElementById('skore').innerText = skore; // Aktualizace zobrazení skóre
}


function resetGame() {
    meteoritObj.splice(0, meteoritObj.length); // Vymazání pole meteorů
    hra = false; // Nastavení stavu hry na neaktivní
    skore = 0; // Resetování skóre
    nejSkore = 0; // Resetování nejlepšího skóre
    strela = null; // Vymazání střely
    document.getElementById('skore').innerText = skore; // Aktualizace zobrazení skóre
    document.getElementById('nejskore').innerText = nejSkore; // Aktualizace zobrazení nejlepšího skóre
}


function preload() {
    pozadi = loadImage("./obrazky/pozadi.jpg"); // Načtení obrázku pozadí
    raketaImg = loadImage("./obrazky/raketa.png"); // Načtení obrázku rakety
    meteoritImg = loadImage("./obrazky/meteorit.png"); // Načtení obrázku meteoritu
    soundGO = loadSound("./zvuky/gameover.mp3"); // Načtení zvuku pro konec hry
    soundNR = loadSound("./zvuky/newrecord.mp3"); // Načtení zvuku pro nový rekord
    soundSH = loadSound("./zvuky/laser-gun.mp3"); // Načtení zvuku pro střelbu
}


function setup() {
    createCanvas(1200, 700); // Vytvoření plátna o šířce 1200 a výšce 700
    skore = 0; // Inicializace skóre na 0
}


function draw() {
    if (hra) { // Pokud je hra aktivní
        document.getElementById('skore').innerText = skore; // Aktualizace zobrazení skóre
        imageMode(CORNER); // Nastavení režimu obrázku na střed
        background(pozadi); // Vykreslení obrázku pozadí
        raketaObj.draw(); // Vykreslení rakety
        raketaObj.update(); // Aktualizace pozice rakety
        skore++; // Zvýšení skóre

        // Náhodné přidání nových meteorů
        if (random(1) < 0.2) meteoritObj.push(new Meteorit());
        for (let i = 0; i < meteoritObj.length; i++) {
            meteoritObj[i].draw(); // Vykreslení každého meteoritu
            meteoritObj[i].update(); // Aktualizace pozice každého meteoritu

            // Odstranění meteorů, které spadly mimo plátno
            if (meteoritObj[i].y > height + meteoritObj[i].height) {
                meteoritObj.splice(i, 1);
            }

            // Kontrola kolize mezi raketou a meteory
            if (raketaObj.detectCollision(meteoritObj[i]) ||
                raketaObj.x < 0 || raketaObj.x > width - raketaObj.width / 2 ||
                raketaObj.y < 0 || raketaObj.y > height - raketaObj.height / 2) {
                hra = false; // Konec hry, pokud je detekována kolize
            }
        }

        
        if (keyIsDown(32) && !strela) {
            strela = new Strela(raketaObj.x, raketaObj.y); // Vytvoření nové střely
            soundSH.play(); // Přehrání zvuku střelby
        }

        
        if (strela) {
            strela.draw(); // Vykreslení střely
            strela.update(); // Aktualizace pozice střely

            // Kontrola kolize mezi střelou a meteory
            for (let i = 0; i < meteoritObj.length; i++) {
                if (strela.detectCollision(meteoritObj[i])) {
                    meteoritObj.splice(i, 1); // Odstranění meteoritu
                    strela = null; // Odstranění střely
                    skore += 50; // Zvýšení skóre o 50
                    break;
                }
            }
            // Odstranění střely, pokud vyletí mimo plátno
            if (strela && strela.y < 0) {
                strela = null;
            }
        }

        // Pokud je hra ukončena
        if (hra == false) {
            if (skore < nejSkore) {
                soundGO.play(); // Přehrání zvuku pro konec hry
            } else {
                soundNR.play(); // Přehrání zvuku pro nový rekord
            }

            background(0); // Nastavení pozadí na černou
            fill(255); // Nastavení barvy textu na bílou
            textSize(32); // Nastavení velikosti textu
            text("Konec hry!", width / 2 - 100, height / 2); // Zobrazení textu "Konec hry!"
            if (skore > nejSkore) {
                nejSkore = skore - 1; // Aktualizace nejlepšího skóre
                document.getElementById('nejskore').innerText = nejSkore; // Aktualizace zobrazení nejlepšího skóre
            }
        }

        // Pohyb rakety pomocí kláves 'A', 'D', 'W', 'S'
        if (keyIsDown(87)) { // Klávesa 'W'
            raketaObj.y -= 10;
        }
        if (keyIsDown(65)) { // Klávesa 'A'
            raketaObj.x -= 7;
        }
        if (keyIsDown(83)) { // Klávesa 'S'
            raketaObj.y += 7;
        }
        if (keyIsDown(68)) { // Klávesa 'D'
            raketaObj.x += 7;
        }
        
    }

    document.getElementById('start').addEventListener('click', function() {
        startGame();
        this.blur(); // Odstraní fokus z tlačítka
    });
    
    document.getElementById('restart').addEventListener('click', function() {
        resetGame();
        this.blur(); // Odstraní fokus z tlačítka
    });
}