/* Ez a négyzetrácsalapú játék az előzőhöz hasonló, ily módon gyakorlás, de komplexebb a játék logikája:
a kulcsokat a megfelelő sorrendben kell felvenni ahhoz, hogy ki tudjuk nyitni a kincses ládikát.
Ha ez sikerül, akkor nyerünk, azonban ha szellemmel ütközünk, veszítünk. */



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

const képek = {
    mágus: new Image(),
    fal: new Image(),
    kulcs_arany: new Image(),
    kulcs_ezüst: new Image(),
    kulcs_bronz: new Image(),
    ládika_zárt: new Image(),
    ládika_nyitott: new Image(),
    szellem: new Image()
}

képek.mágus.src = 'mágus.png';
képek.fal.src = 'fal.png';
képek.kulcs_arany.src = 'kulcs_arany.png';
képek.kulcs_ezüst.src = 'kulcs_ezüst.png';
képek.kulcs_bronz.src = 'kulcs_bronz.png';
képek.ládika_zárt.src = 'ládika_zárt.png';
képek.ládika_nyitott.src = 'ládika_nyitott.png';
képek.szellem.src = 'szellem.png'

/*Változók*/
let mágus = {
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

let arany = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,
}

let ezüst = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,
}

let bronz = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,
}

let ládika = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,
}

let falak = [];
let szellemek = [];
let billentyűk = [];

let mozog = false;
let arany_begyűjtve = false;
let ezüst_begyűjtve = false;
let bronz_begyűjtve = false;
let győzelem = false;
let vereség = false;

for (let y = 0; y < pálya.length; y++) {
    for (let x = 0; x < pálya[y].length; x++) {
        switch (pálya[y][x]) {
            case "F":
                falak.push({ x: x, y: y, szélesség: M, magasság: M })
                break;
            case "M":
                mágus.x = x;
                mágus.y = y;
                mágus.kezdx = x;
                mágus.kezdy = y;
                mágus.végx = x;
                mágus.végy = y;
                break;
            case "A":
                arany.x = x;
                arany.y = y;
                break;
            case "E":
                ezüst.x = x;
                ezüst.y = y;
                break;
            case "B":
                bronz.x = x;
                bronz.y = y;
                break;
            case "C":
                ládika.x = x;
                ládika.y = y;
                break;
            case "S":
                szellemek.push({x: x, y: y, szélesség: M, magasság: M, hi: 1})
                break;
        }
    }    
}

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
    // háttér
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // falak
    falak.forEach(fal => {
        ctx.drawImage(képek.fal, fal.x * M, fal.y * M, fal.szélesség, fal.magasság);
    });

    //kulcsok
    if(!arany_begyűjtve){
        ctx.drawImage(képek.kulcs_arany, arany.x * M, arany.y * M, arany.szélesség, arany.magasság);
    } else {
        ctx.drawImage(képek.kulcs_arany, 0 * M, 0 * M, arany.szélesség, arany.magasság);
    }
    if(!ezüst_begyűjtve){
        ctx.drawImage(képek.kulcs_ezüst, ezüst.x * M, ezüst.y * M, ezüst.szélesség, ezüst.magasság);
    } else {
        ctx.drawImage(képek.kulcs_ezüst, 1 * M, 0 * M, ezüst.szélesség, ezüst.magasság);
    }
    if(!bronz_begyűjtve){
        ctx.drawImage(képek.kulcs_bronz, bronz.x * M, bronz.y * M, bronz.szélesség, bronz.magasság);
    } else {
        ctx.drawImage(képek.kulcs_bronz, 2 * M, 0 * M, bronz.szélesség, bronz.magasság);
    }

    //ládika
    if(!győzelem && !vereség){
        ctx.drawImage(képek.ládika_zárt, ládika.x * M, ládika.y * M, ládika.szélesség, ládika.magasság);
    }

    // mágus
    if(!győzelem && !vereség){
        ctx.drawImage(képek.mágus, mágus.x * M, mágus.y * M, mágus.szélesség, mágus.magasság);
    } else if (győzelem) {
        ctx.drawImage(képek.mágus, 230, 250, mágus.szélesség * 3, mágus.magasság * 3);
    }

    // szellemek
    if(!győzelem && !vereség){
        szellemek.forEach(szellem => {
            ctx.drawImage(képek.szellem, szellem.x * M, szellem.y * M, szellem.szélesség, szellem.magasság);
        });
    } else if (vereség) {
        ctx.drawImage(képek.szellem, 230, 250, M * 3, M * 3);
    }

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
    let időKül = aktuálisIdő - mágus.kezdi;     // minden képernyőfrissítésnél kiszámolja, mennyi idő telt el a robot elindulása óta ms-ban
    if(időKül < mágus.hi) {             // ha ez az időkülönbség kisebb, mint a haladás időtartama, akkor
        let arány = időKül / mágus.hi;  // ez alapján újraszámolunk egy arányt (0 és 1 közötti érték)
        mágus.x = mágus.kezdx + (mágus.végx - mágus.kezdx) * arány;  // az aránnyal frissítjük a robot helyzetét
        mágus.y = mágus.kezdy + (mágus.végy - mágus.kezdy) * arány;
    } else {    // különben ha a robot indulása óta eltelt idő ms-ban nagyobb vagy egyenlő, mint az ő haladási ideje (vagyis amennyi ms alatt oda kell érnie a célba), akkor tegyük őt a célhelyre
        mágus.x = mágus.végx;
        mágus.y = mágus.végy;
        mozog = false;
    }

    // kulcsok félvétele
    if(!mozog && pálya[mágus.y][mágus.x] == "A"){
        arany_begyűjtve = true;
    }
    if(!mozog && pálya[mágus.y][mágus.x] == "E" && arany_begyűjtve){
        ezüst_begyűjtve = true;
    }
    if(!mozog && pálya[mágus.y][mágus.x] == "B" && arany_begyűjtve && ezüst_begyűjtve){
        bronz_begyűjtve = true;
    }

    // ládika kinyitása
    if(!mozog && pálya[mágus.y][mágus.x] == "C" && arany_begyűjtve && ezüst_begyűjtve && bronz_begyűjtve){
        győzelem = true;
    }

    // szellemek mozgása
    szellemek.forEach(szellem => {
        if(szellemek.indexOf(szellem) % 2 == 1) {
            szellem.y += szellem.hi * dt * 2;
        } else {
            szellem.x += szellem.hi * dt;
        }
        falak.forEach(fal => {
            if(ütköznek(szellem, fal)) {
                szellem.hi *= -1;
            }
        });
    });

    // játék vége
    szellemek.forEach(szellem => {
        if(ütköznek(szellem, mágus)) {
            vereség = true;
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

function mozgasIranyban(x, y) {
    const ujX = mágus.x + x;
    const ujY = mágus.y + y;

    // Ellenőrzés: a célpont a pálya határain belül van-e, és léphet-e oda
    if (ujY >= 0 && ujY < pálya.length && ujX >= 0 && ujX < pálya[0].length && [" ", "M", "S", "A", "E", "B", "C"].includes(pálya[ujY][ujX])) {
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