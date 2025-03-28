/* Ez az alkalom egy újabb játéktípus megismerésére szolgál. A játék alapjául egy Instagramon játszható játék
szolgált, így vélhetően több diák ismerős vele. Ha nem, akkor megmutathatjuk nekik a világ első videójátékát,
melynek működéséhez hasonló a mai játék (https://www.youtube.com/watch?v=fiShX2pTz9A). Ebben az Emojipong nevű
játékban egy csúszkával kell a magasban tartani a véletlenszerűen mozgó és falról visszapattanó emojit. A
csúszka állandó y helyen van (a játéktér alján), míg vízszintes pozíciója az egeret követi amíg az a játéktéren
belül van.

KAPCSOLAT A SCRATCH FEJLESZTŐI KÖRNYEZETTEL:
ugorj ide: egérmutató               = e.offsetX
ezen szereplőre kattintáskor        = ki kell számolni, hogy a kattintás helye beleesik-e a helyes területbe */



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
const emojikép = new Image();
emojikép.src = 'cool.png';

/*Változók*/
// játékos
let játékos = {
    x: canvas.width / 2 - 15,
    y: 500,
    szélesség: 30,
    magasság: 20
}

// emoji
let emoji = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    szélesség: 30,
    magasság: 30,
    sebX: véletlenEgész(50, 100),
    sebY: véletlenEgész(100, 150) * (-1)
}

// gomb
let gomb = {
    x: canvas.width / 2 - 50,
    y: 470,
    szélesség: 100,
    magasság: 40
}

let játék = true;
let rekord = 0;
let pont = 0;
let elteltIdő = 0;

/* === ANIMÁCIÓS CIKLUS === */
let előzőIdő = performance.now()
function következő() {
    let aktuálisIdő = performance.now()
    let dt = (aktuálisIdő - előzőIdő) / 1000 // az előző képkocka óta eltelt idő mp-ben
    előzőIdő = aktuálisIdő
    frissítés(dt)
    rajzolás()
    requestAnimationFrame(következő)
}

következő()

function rajzolás() {
    // háttér
    if(játék){
        ctx.fillStyle = 'wheat';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        // Átmenet előállítása
        const átmenet=ctx.createLinearGradient(0, 0, 240, 533);
        átmenet.addColorStop(0, "darkOrchid");
        átmenet.addColorStop(1, "deepPink");

        // Téglalap kitöltése az átmenettel
        ctx.fillStyle = átmenet;
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    // játékos
    if(játék) {
        ctx.fillStyle = 'black';
        ctx.fillRect(játékos.x, játékos.y, játékos.szélesség, játékos.magasság);
    }

    // ÚJRA gomb
    if(!játék) {
        ctx.fillStyle = 'white';
        ctx.fillRect(gomb.x, gomb.y, gomb.szélesség, gomb.magasság);
    }

    // újra szöveg
    if(!játék){
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('ÚJRA', gomb.x + gomb.szélesség / 9, gomb.y + gomb.magasság / 5 * 4);
    }
    
    // rekord
    ctx.font = '10px Arial';
    if(játék){
        ctx.fillStyle = '#8F692A';
    } else {
        ctx.fillStyle = 'lightgray';
    }
    ctx.fillText('REKORD: ' + rekord, 170, 20);

    // pont
    ctx.font = '100px Arial';
    if(játék){
        ctx.fillStyle = '#BBA156';
    } else {
        ctx.fillStyle = 'lightgray';
    }
    if(pont < 10) {
        ctx.fillText(pont, canvas.width / 2 - 25, canvas.height / 2);
    } else {
        ctx.fillText(pont, canvas.width / 2 - 60, canvas.height / 2);
    }

    // emoji
    ctx.drawImage(emojikép, emoji.x, emoji.y, emoji.szélesség, emoji.magasság);
}

function frissítés(dt) {
    //gyorsabb mozgás
    elteltIdő = Math.round(Math.round(performance.now()) / 1000);
    if(elteltIdő > 0 && elteltIdő % 5 == 0) {
        if(emoji.sebX < 0) { emoji.sebX -= dt * 10 } else { emoji.sebX += dt * 10 };
        if(emoji.sebY < 0) { emoji.sebY -= dt * 10} else { emoji.sebY += dt * 10 };
    }

    // emoji mozgása
    emoji.y += emoji.sebY * dt;
    if(emoji.y < 0) {
        emoji.y = 1;
        emoji.sebY *= (-1);
    }
    emoji.x += emoji.sebX * dt;
    if(emoji.x > canvas.width - emoji.szélesség) {
        emoji.sebX *= (-1);
    }
    if(emoji.x < 0) {
        emoji.sebX *= (-1);
    }

    // ütközés
    if(ütköznek(emoji, játékos)) {
        emoji.sebY *= (-1);
        pont += 1;
    }

    // játék vége
    if(emoji.y + emoji.magasság > játékos.y) {
        játék = false;
        if(pont > rekord) {
            rekord = pont;
        }
    }
}

/* === ESEMÉNYEK === */

// játékos mozgatása egérrel
document.addEventListener('mousemove', function(e) {
    if(játék && e.offsetX < canvas.width && e.offsetX > 0) {
        játékos.x = e.offsetX - játékos.szélesség / 2;
    }
})

// újrakezdés
document.addEventListener('click', function(e) {
    if(!játék && e.offsetX > gomb.x && e.offsetX < (gomb.x + gomb.szélesség) && e.offsetY > gomb.y && e.offsetY < (gomb.y + gomb.magasság)){
        kezdés();
    }
})


/* === SEGÉDFÜGGVÉNYEK === */

// ütközés
function ütköznek(téglalap1, téglalap2) {
    return ! (
        téglalap2.x + téglalap2.szélesség <= téglalap1.x ||
        téglalap2.y + téglalap2.magasság <= téglalap1.y ||
        téglalap2.x >= téglalap1.x + téglalap1.szélesség ||
        téglalap2.y - (téglalap2.magasság / 2) >= téglalap1.y + téglalap1.magasság
    )
}

// véletlen egész
function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// játék újrakezdése
function kezdés() {
    játékos.x = canvas.width / 2 - 15;
    játékos.y = 500;
    emoji.x = canvas.width / 2;
    emoji.y = canvas.height / 2;
    emoji.sebX = véletlenEgész(50, 100);
    emoji.sebY = véletlenEgész(100, 150) * (-1);
    játék = true;
    pont = 0;
    elteltIdő = 0;
}