const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
const M = 32;

/*Képek*/
let almakép = new Image();
almakép.src = 'alma.png';

let romlottalmakép = new Image();
romlottalmakép.src = 'romlottalma.png';

let kosárkép = new Image();
kosárkép.src = 'kosár.png';

let törzskép = new Image();
törzskép.src = 'törzs.png';

/*Változók*/
// kosár objektum


// egyéb változók
 // az éppen hulló almákat tároló tömb
 // az éppen lenyomva tartott billentyűket taroló tömb
let almasebesség = 50; // almák sebessége
let almagyakoriság = 100; // hány px legyen két alma között, mennyivel utána jöjjön a következő
let vége = false; // vége van-e a játéknak
let db = 0; // begyűjtött almák száma

// új alma függvény meghívása

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

következő(); // az animáció elindítása

function rajzolás() {
    // háttér
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // talaj
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, canvas.height - M, canvas.width, M);

    // almafa
    //ctx.fillStyle = 'brown';
    //ctx.fillRect(canvas.width - 50, 0, 50, canvas.height - M / 2);
    ctx.drawImage(törzskép, canvas.width - 50, -10, 60, canvas.height - M / 4);

    // felhő
    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, 2 * Math.PI);
    ctx.arc(130, 90, 30, 0, 2 * Math.PI);
    ctx.arc(160, 100, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillRect(100, 100, 60, 20);

    // almák
    

    // kosár
    

    // begyűjtött almák számának kiírása
    
}

function frissítés(dt) {
    // kosár irányítása
    

    // új alma
    

    // almák mozgása és törlése
    

    // játék vége
    
}

/* === ESEMÉNYEK === */

// lenyomott billentyűk eltárolása


/* === SEGÉDFÜGGVÉNYEK === */

// új alma függvény

// véletlen egész
function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// ütközés
function ütköznek(téglalap1, téglalap2) {
    return ! (
        téglalap2.x + téglalap2.szélesség <= téglalap1.x ||
        téglalap2.y + téglalap2.magasság <= téglalap1.y ||
        téglalap2.x >= téglalap1.x + téglalap1.szélesség ||
        téglalap2.y >= téglalap1.y + téglalap1.magasság
    )
}