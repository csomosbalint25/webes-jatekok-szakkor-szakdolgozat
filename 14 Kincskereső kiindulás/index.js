const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Pálya tárolása*/
let pálya = [
    "FFFFFFFFFFFFFFF",
    "F  MFCS     FSF",
    "F FFFFFFF FFF F",
    "F   FS  F FFB F",
    "FFF   F   FFF F",
    "FE SF FFF  F  F",
    "F F F  AF    FF",
    "F F F F F FF  F",
    "F     FS      F",
    "FFFFFFFFFFFFFFF"
]

/*Konstansok*/
const M = 40; // mezőméret

// képek


/*Változók*/
// mágus
let mágus = {
    
}
// kulcsok és ládikák
let arany = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,
}


// egyéb változók
let falak = [];
let szellemek = [];
let billentyűk = [];

let mozog = false;
let győzelem = false;
let vereség = false;

// pálya bejárása, pályabeállítás


/* === ANIMÁCIÓS CIKLUS === */

let előzőIdő = performance.now();

következő(); // az animáció elindítása

function következő() {
    aktuálisIdő = performance.now();
    let dt = (aktuálisIdő - előzőIdő) / 1000;
    előzőIdő = aktuálisIdő;
    frissítés(dt); // állapottér frissítése
    rajzolás(); // képkocka újrarajzolása
    requestAnimationFrame(következő);
}

function rajzolás() {
    // háttér
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // falak
    

    //kulcsok
    

    //ládika
    

    // mágus
    

    // szellemek
    

    // nyertes szöveg
    if(győzelem) {
        ctx.font = '80px Times New Roman';
        ctx.fillStyle = 'white';
        ctx.fillText('Nyertél', 180, 200);
    }

    // vesztes szöveg
    if(vereség) {
        ctx.font = '80px Times New Roman';
        ctx.fillStyle = 'white';
        ctx.fillText('Vesztettél', 140, 200);
    }
}

function frissítés(dt) {
    // Billentyűk figyelése
    if (!mozog) {
        if (billentyűk['ArrowDown']) {
            mozgasIranyban(0, 1);
        }
        if (billentyűk['ArrowUp']) {
            mozgasIranyban(0, -1);
        }
        if (billentyűk['ArrowLeft']) {
            mozgasIranyban(-1, 0);
        }
        if (billentyűk['ArrowRight']) {
            mozgasIranyban(1, 0);
        }
    }

    // mágus csúsztatása
    

    // kulcsok félvétele
    

    // ládika kinyitása
    

    // szellemek mozgása
    

    // játék vége
    
}

/* === ESEMÉNYEK === */

// lenyomott billentyűk eltárolása
document.addEventListener('keydown', e => {
    billentyűk[e.key] = true;
})

document.addEventListener('keyup', e => {
    billentyűk[e.key] = false;
})

function mozgasIranyban(x, y) {
    const ujX = mágus.x + x;
    const ujY = mágus.y + y;

    // Ellenőrzés: a célpont a pálya határain belül van-e, és léphet-e oda
    if (pass) {
        mágus.végx = ujX;
        mágus.végy = ujY;
        mágus.kezdi = performance.now(); // Mozgás kezdési időpontja
        mágus.kezdx = mágus.x;          // Jelenlegi pozíció mentése
        mágus.kezdy = mágus.y;
        mozog = true;
    }
}

function ütköznek(téglalap1, téglalap2) {
    return !(
        téglalap2.x * M + téglalap2.szélesség <= téglalap1.x * M ||
        téglalap2.y * M + téglalap2.magasság <= téglalap1.y * M ||
        téglalap2.x * M >= téglalap1.x * M + téglalap1.szélesség ||
        téglalap2.y * M >= téglalap1.y * M + téglalap1.magasság
    )
}