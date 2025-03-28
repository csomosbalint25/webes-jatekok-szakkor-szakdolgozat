/* Ennek a játéknak a típusa és logikája jelentősen eltér a korábbi játékoktól, ugyanis ez egy
négyzetrácsalapú játék, ahol a szereplővel csak a négy irány valamelyikébe tudunk lépni, ha ott nincs víz.
A cél, hogy kijuttassuk a robotot a vízre épült palló-labirintusból.
Új ismeretként jelenik meg a számlálós ciklus, a több esetet tartalmazó elágazás.

KAPCSOLAT A SCRATCH FEJLESZTŐI KÖRNYEZETTEL:
háttér          = pálya eltárolása szövegek tömbjeként */



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Pálya tárolása*/
let pálya = [
    "VVVVVVV V",
    "V       V",
    "V VV VV V",
    "VVV     V",
    "V   V V V",
    "V VV  V V",
    "VRV   V V",
    "VVVVVVVVV"
];

/*Konstansok*/
const M = 40; // mezőméret

let robotkép = new Image();
robotkép.src = 'robot.png';

/*Változók*/
// robot
let robot = {
    x: 0,
    y: 0,
    szélesség: M,
    magasság: M,    
    hi: 300,    // haladás időtartama szomszédos mezőre (mértékegység: ms)
    kezdx: 0,   // haladás kezdő x pozíciója (mező)
    kezdy: 0,   // haladás kezdő y pozíciója (mező)
    kezdi: 0,   // haladás kezdő időpontja (ms)
    végx: 0,    // haladás végső x pozíciója (mező)
    végy: 0     // haladás végső y pozíciója (mező)
}

// egyéb változók
let vizek = [];
let billentyűk = [];

let mozog = false;
let vesztettél = false;
let nyertél = false;


// a pálya tömb bejárása sorfolytonosan
for (let y = 0; y < pálya.length; y++) {
    for (let x = 0; x < pálya[y].length; x++) {
        switch (pálya[y][x]) {
            case "V":
                vizek.push({ x: x, y: y, szélesség: M, magasság: M })
                break;
            case "R":
                robot.x = x;
                robot.y = y;
                robot.kezdx = x;
                robot.kezdy = y;
                robot.végx = x;
                robot.végy = y;
                break;
        }
    }    
}


/* === ANIMÁCIÓS CIKLUS === */

//let idő = performance.now();

következő(); // az animáció elindítása

function következő() {
    idő = performance.now();
    frissítés(idő); // állapottér frissítése
    rajzolás(); // képkocka újrarajzolása
    if(!vesztettél && !nyertél) {
        requestAnimationFrame(következő);
    }
}

function rajzolás() {
    // háttér
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // vizek
    ctx.fillStyle = 'lightblue';
    vizek.forEach(víz => {
        ctx.fillRect(víz.x * M, víz.y * M, víz.szélesség, víz.magasság);
    });

    // robot
    ctx.drawImage(robotkép, robot.x * M, robot.y * M, robot.szélesség, robot.magasság);
    
    // nyertes szöveg
    if(nyertél) {
        ctx.font = '80px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Nyertél', 50, 170);
    }

    // vízbe esés
    if(vesztettél) {
        ctx.font = '40px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('🌊Vízbe estél🌊', 30, 170);
    }
    
    // idő
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('⌛: ' + Math.floor(idő / 1000), 10, 30);
}

function frissítés(dt) {
    // Billentyűk figyelése
    if (!mozog) {
        if (billentyűk['ArrowDown']) {
            mozgasIranyban(0, -1);
        }
        if (billentyűk['ArrowUp']) {
            mozgasIranyban(0, 1);
        }
        if (billentyűk['ArrowLeft']) {
            mozgasIranyban(1, 0);
        }
        if (billentyűk['ArrowRight']) {
            mozgasIranyban(-1, 0);
        }
    }

    // robot csúsztatása
    let időKül = idő - robot.kezdi;     // minden képernyőfrissítésnél kiszámolja, mennyi idő telt el a robot elindulása óta ms-ban
    if(időKül < robot.hi) {             // ha ez az időkülönbség kisebb, mint a haladás időtartama, akkor
        let arány = időKül / robot.hi;  // ez alapján újraszámolunk egy arányt (0 és 1 közötti érték)
        robot.x = robot.kezdx + (robot.végx - robot.kezdx) * arány;  // az aránnyal frissítjük a robot helyzetét
        robot.y = robot.kezdy + (robot.végy - robot.kezdy) * arány;
    } else {    // különben ha a robot indulása óta eltelt idő ms-ban nagyobb vagy egyenlő, mint az ő haladási ideje (vagyis amennyi ms alatt oda kell érnie a célba), akkor tegyük őt a célhelyre
        robot.x = robot.végx;
        robot.y = robot.végy;
        mozog = false;
    }

    // célba érés
    if(robot.x == 7 && robot.y == 0) {
        nyertél = true;
    }
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
    const ujX = robot.x + x;
    const ujY = robot.y + y;

    // Ellenőrzés: a célpont a pálya határain belül van-e, és üres helyre lép-e
    if (ujY >= 0 && ujY < pálya.length && ujX >= 0 && ujX < pálya[0].length && pálya[ujY][ujX] == " " || pálya[ujY][ujX] == "R") {
        robot.végx = ujX;
        robot.végy = ujY;
        robot.kezdi = performance.now(); // Mozgás kezdési időpontja
        robot.kezdx = robot.x;          // Jelenlegi pozíció mentése
        robot.kezdy = robot.y;
        mozog = true;
    } else {
        vesztettél = true;
    }
}