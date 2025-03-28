/* Ez az program a korábbi három projektben szerzett ismereteket gyakoroltatja: rajzolás és játékkészítés. Emellett behozza a tömböt, mint új adatszerkezetet. */


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
let kosár = {
    x: 0,
    y: M * 11,
    szélesség: M,
    magasság: M,
    sebesség: 350
}

/* let lottoszamok = [5, 12, 7, 40, 32];
let van_e = false;
lottoszamok.forEach(szam => {
    if (szam == 7) {
        van_e = true
    }
});
if (van_e) {
    console.log('Van 7-es.');
}

console.log(lottoszamok);

let vegyes = ['Anna', 'Aladár', true, 0, 12.7543, false, [0, 1, 2, 3, 4]]
console.log(vegyes);

console.log(vegyes[1]);
console.log(vegyes[2]);

let adatok = ['Alfréd', true, 1.23456789, [9, 8, 7, 6]]
console.log(adatok);
console.log(adatok[3]);

let szereplok = [
    {x: 10, y: 10, szélesség: 40, magasság: 40},
    {x: 20, y: 10, szélesség: 40, magasság: 40},
    {x: 30, y: 10, szélesség: 40, magasság: 40}
]
console.log(szereplok); */

// egyéb változók
let almák = []; // az éppen hulló almákat tároló tömb
let billentyűk = []; // az éppen lenyomva tartott billentyűket taroló tömb
let almasebesség = 50; // almák sebessége
let almagyakoriság = 100; // hány px legyen két alma között, mennyivel utána jöjjön a következő
let vége = false; // vége van-e a játéknak
let db = 0; // begyűjtött almák száma

// új alma függvény meghívása
újAlma();
//console.log(almák);

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
    almák.forEach(alma => {
        if(alma.típus == 'romlott') {
            ctx.drawImage(romlottalmakép, alma.x, alma.y, alma.szélesség, alma.magasság);
        } else {
            ctx.drawImage(almakép, alma.x, alma.y, alma.szélesség, alma.magasság);
        }
    });

    // kosár
    ctx.drawImage(kosárkép, kosár.x, kosár.y, kosár.szélesség, kosár.magasság);

    // begyűjtött almák számának kiírása
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(db, 10, 30)
}

function frissítés(dt) {
    // kosár irányítása
    if(billentyűk['ArrowRight']) {
        if(kosár.x < canvas.width - kosár.szélesség) {
            kosár.x += kosár.sebesség * dt;
        }
    }
    if(billentyűk['ArrowLeft']) {
        if(kosár.x > 0) {
            kosár.x -= kosár.sebesség * dt;
        }
    }

    // új alma
    if(almák[almák.length - 1].y >= almagyakoriság && !vége) {
        újAlma();
    }

    // almák mozgása és törlése
    if (!vége) {
        almák.forEach(alma => {
            alma.y += almasebesség * dt;
            if(ütköznek(alma, kosár)) {
                if(alma.típus == 'romlott') {
                    vége = true;
                } else {
                    almák.splice(0, 1);
                    db += 1;
                    if(almagyakoriság > 50) {
                        almagyakoriság -= 5;
                    }
                }
            }
            if(alma.típus == 'romlott' && alma.y + alma.magasság >= canvas.height) {
                almák.splice(0, 1);
            }
        });
    }
    console.log(almagyakoriság);

    // játék vége
    almák.forEach(alma => {
        if(alma.y > canvas.height && alma.típus == 'egészséges') {
            vége = true;
        }
    });
}

/* === ESEMÉNYEK === */

// lenyomott billentyűk eltárolása
document.addEventListener('keydown', e => {
    billentyűk[e.key] = true;
})

document.addEventListener('keyup', e => {
    billentyűk[e.key] = false;
})

/* === SEGÉDFÜGGVÉNYEK === */

// új alma függvény
function újAlma() {
    let vizszinteshely = véletlenEgész(0, canvas.width - M / 2);
    let almatípus = 0;
    if(véletlenEgész(0, 10) < 3) {
        almatípus = 'romlott';
    } else {
        almatípus = 'egészséges';
    }
    almák.push({x: vizszinteshely, y: 0, szélesség: M / 2, magasság: M / 2, típus: almatípus});
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