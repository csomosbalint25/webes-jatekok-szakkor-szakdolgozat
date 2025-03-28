const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Pálya tárolása*/
let pálya = [
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    "F    MF       FF    F S      F",
    "F F FFFFFFFFF FF FFFFFF FFF FF",
    "F  S  FS            F   F    F",
    "FFF FFF FFFFFFFFFFF FFFFFF F F",
    "F    EF       FF  F F   E  F F",
    "F FFF F FFFFFFFFF   FFFFF FFFF",
    "F   F    F F FFFFFFS         F",
    "F  S  F    F        FFF FFF FF",
    "FFF FFFFFF FF FF FFFFFFFFFFFFF",
    "FFF FFFFFF FF FF FFFFFFFFFFFFF",
    "F   FFF       FF  F   F      F",
    "F F F FFFFFFF FFF F FFFFF FFFF",
    "F       F    SFF      F  S   F",
    "FFF F F FFF FFFFFFFFF F FF FFF",
    "F  FFE SF F F FFF F  S S    FF",
    "F F F F F F F FFF FFF F F F FF",
    "F    S  F             F F F EF",
    "FFF F FFF FFF FFF FFFFF FFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
  ]

/*Konstansok*/
const M = 40; // mezőméret

const képek = {
    pacman: new Image(),
    szellemaktiv: new Image(),
    szelleminaktiv: new Image(),
    érme: new Image(),
    extraérme: new Image(),
    falkép: new Image()
}

képek.pacman.src = 'pacman.png';
képek.szellemaktiv.src = 'szellemaktiv.png';
képek.szelleminaktiv.src = 'szelleminaktiv.png';
képek.érme.src = 'érme.png';
képek.extraérme.src = 'extraérme.png';
képek.falkép.src = 'fal.png';

/*Változók*/
let pacman = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,    
    hi: 300, //haladás időtartama szomszédos mezőre (mértékegység: ms)
    kezdx: 0, //haladás kezdő x pozíciója (mező)
    kezdy: 0, //haladás kezdő y pozíciója (mező)
    kezdi: 0, //haladás kezdő időpontja (ms)
    végx: 0, //haladás végső x pozíciója (mező)
    végy: 0 //haladás végső y pozíciója (mező)
}

let falak = [];
let szellemek = [];
let billentyűk = [];
let érmék = [];
let extrák = [];

let mozog = false;
let győzelem = false;
let vereség = false;

// pályabeállítás


/* === ANIMÁCIÓS CIKLUS === */

let előzőIdő = performance.now();

következő(); // az animáció elindítása

function következő() {
    aktuálisIdő = performance.now();
    let dt = (aktuálisIdő - előzőIdő) / 1000;
    előzőIdő = aktuálisIdő;
    frissítés(dt); // állapottér frissítése
    rajzolás(); // képkocka újrarajzolása
    if(!vereség && !győzelem) {
        requestAnimationFrame(következő);
    }
}

function rajzolás() {
    // hány csempe van vízszintesen és függőlegesen
    

    // negyed kezdetének kiszámolása
    

    // háttér
    

    // elmentjük a jelenlegi állapotot
    

    // canvas eltolása
    

    // falak
    

    // érmék
    

    // extra érmék kirajzolása
    

    // pacman
    

    // szellemek
    

    // sáv
    

    // eredeti állapotot visszaállítása
    

    // nyertes szöveg
    if(győzelem) {
        ctx.font = '80px Courier New';
        ctx.fillStyle = 'white';
        ctx.fillText('Nyertél', 130, 200);
        ctx.fillText('Nyertél', 780, 200);
        ctx.fillText('Nyertél', 130, 600);
        ctx.fillText('Nyertél', 780, 600);
    }
    // vesztes szöveg
    if(vereség) {
        ctx.font = '80px Courier New';
        ctx.fillStyle = 'white';
        ctx.fillText('Vesztettél', 70, 200);
        ctx.fillText('Vesztettél', 740, 200);
        ctx.fillText('Vesztettél', 70, 600);
        ctx.fillText('Vesztettél', 740, 600);
    }
}

function frissítés(dt) {
    // Billentyűk figyelése
    

    // pacman irányítása    
    

    // szellemek mozgása
    

    // érme begyűjtése
    

    // visszaszámlálás
    

    // vereség
    

    // győzelem
    
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
    const ujX = pacman.x + x;
    const ujY = pacman.y + y;

    // Ellenőrzés: a célpont a pálya határain belül van-e, és léphet-e oda
    if (ujY >= 0 && ujY < pálya.length && ujX >= 0 && ujX < pálya[0].length && [" ", "M", "S", "A", "E", "B", "C"].includes(pálya[ujY][ujX])) {
        pacman.végx = ujX;
        pacman.végy = ujY;
        pacman.kezdi = performance.now(); // Mozgás kezdési időpontja
        pacman.kezdx = pacman.x;          // Jelenlegi pozíció mentése
        pacman.kezdy = pacman.y;
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