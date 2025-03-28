/* Ezen a szakköri alkalmon a
jól ismert Chrome Dino Game játékot fogjuk elkészíteni (https://chromewebstore.google.com/detail/chrome-dino-game-offline/neocimmfcfbaakogchpijngkimaigcgj).
Új ismeretként jelenik meg a konstans, a tömb és műveletei, a logikai érték, az időalapú animációs ciklus,
a tömbbejárás, elágazás vezérlési szerkezet (egymásba ágyazva is), billentyűlenyomás mint indítóesemény,
a téglalaprajzolás és a téglalapok ütközése.

KAPCSOLAT A SCRATCH FEJLESZTŐI KÖRNYEZETTEL:
időzítő                             = performance.now()
szereplő                            = képpel kitöltött téglalap
készíts másolatot: magadról         = új téglalap hozzáfűzése a tömb végéhez */



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
let dínó = {
    x: M,
    y: M * 6,
    szélesség: M,
    magasság: M,
    vy: 0,
    ay: 400
}

// egyéb változók
let kaktuszok = [];
let billentyűk = [];
let kaktuszsebesség = 100;
let hossz = 16;
let ugrásmagasság = 300;
let ugrik = false;
let vége = false;
let pont = 0;

kaktuszok.push({x: 0, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
// nem eshetünk rögtön kaktuszba, ezért a játék kezdetén 10 db 0 típusú elemekkel kell feltölteni a tömböt - ciklussal is megvalósítható
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});
kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: 0});

/* === ANIMÁCIÓS CIKLUS === */

let előzőIdő = performance.now()
function következő() {
    let aktuálisIdő = performance.now()
    let dt = (aktuálisIdő - előzőIdő) / 1000 // az előző képkocka óta eltelt idő mp-ben
    előzőIdő = aktuálisIdő
    frissítés(dt)
    rajzolás()
    if(!vége) {
        requestAnimationFrame(következő)
    }
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
    kaktuszok.forEach(kaktusz => {
        if(kaktusz.t == 1) {
            ctx.drawImage(kaktuszkép, kaktusz.x, kaktusz.y, kaktusz.szélesség, kaktusz.magasság);
        } /*else {
            ctx.fillRect(kaktusz.x, kaktusz.y, kaktusz.szélesség, kaktusz.magasság);
        }*/
    });

    // dínó
    ctx.drawImage(dínókép, dínó.x, dínó.y, dínó.szélesség, dínó.magasság);

    // felirat
    ctx.font = '15px Courier New';
    ctx.fillStyle = 'black';
    ctx.fillText(pont, 0, 15);
}

function frissítés(dt) {
    // dínó irányítása
    if(dínó.y + dínó.magasság <= canvas.height - M) {
        // Emlékeztető fizikából: v' = v + a * dt; illetve ds = v' * dt.
        dínó.vy = dínó.vy + dínó.ay * dt;
        dínó.y = dínó.y + dínó.vy * dt;
    } else {
        ugrik = false;
    }

    // ugrás
    if(billentyűk[' ']) {
        if(!ugrik) {
            ugrik = true;
            dínó.y = canvas.height - M - dínó.magasság;
            dínó.vy = -ugrásmagasság;
        }
    }

    // új kaktusz
    if(kaktuszok.length < hossz) {
        újKaktusz();
    }

    // kaktuszok mozgása és törlése
    kaktuszok.forEach(kaktusz => {
        kaktusz.x -= kaktuszsebesség * dt;
        if(kaktusz.x <= 0 - kaktusz.szélesség) {
            if(kaktusz.x <= 0 - kaktusz.szélesség && kaktusz.t == 1) {
                kaktuszsebesség += 2;
                dínó.ay += 10;
                ugrásmagasság += 2;
            }
            kaktuszok.splice(0, 1);
            pont += 1;
        }
    });

    // játék vége
    kaktuszok.forEach(kaktusz => {
        if(ütköznek(kaktusz, dínó) && kaktusz.t == 1) {
            vége = true;
        }
    });
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
    let típus = 0;
    if(kaktuszok[kaktuszok.length - 2].t == 0 && kaktuszok[kaktuszok.length - 3].t == 0) {
        típus = véletlenEgész(0, 1);
    }
    kaktuszok.push({x: kaktuszok[kaktuszok.length - 1].x + M, y: canvas.height - M * 2, szélesség: M / 2, magasság: M, t: típus});
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