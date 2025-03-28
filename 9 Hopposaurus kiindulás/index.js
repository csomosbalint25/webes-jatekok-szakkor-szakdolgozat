const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
const M = 40;

/*Képek*/
let dínókép = new Image();
dínókép.src = 'dínó.png';

let kaktuszkép = new Image();
kaktuszkép.src = 'kaktusz.png';

/*Változók*/
// dínó


// egyéb változók
let pont = 0;

// nem eshetünk rögtön kaktuszba, ezért a játék kezdetén 10 db 0 típusú elemekkel kell feltölteni a tömböt - ciklussal is megvalósítható


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
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // talaj
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, canvas.height - M, canvas.width, M);

    // kaktuszok
    

    // dínó
    

    // felirat
    ctx.font = '15px Courier New';
    ctx.fillStyle = 'black';
    ctx.fillText(pont, 0, 15);
}

function frissítés(dt) {
    // dínó irányítása
    

    // ugrás
    

    // új kaktusz
    

    // kaktuszok mozgása és törlése


    // játék vége
    
}

/* === ESEMÉNYEK === */

// lenyomott billentyűk lekérdezése
document.addEventListener('keydown', e => {
    billentyűk[e.key] = true;
})

document.addEventListener('keyup', e => {
    billentyűk[e.key] = false;
})

/* === SEGÉDFÜGGVÉNYEK === */

function újKaktusz() {
    /*  - a kaktuszok nem lehetnek túl sűrűn: két kaktusz között legalább 3 üres hely legyen,
        - maximum 2 kaktusz lehet egymás mellett, hogy át tudjuk ugrani  */
    
}

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