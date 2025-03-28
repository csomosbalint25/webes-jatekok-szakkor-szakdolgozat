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
let halhatatlan = false;
let visszaszámlálás = 0;

for (let y = 0; y < pálya.length; y++) {
    for (let x = 0; x < pálya[y].length; x++) {
        switch (pálya[y][x]) {
            case "F":
                falak.push({ x: x, y: y, szélesség: M, magasság: M })
                break;
            case " ":
                érmék.push({ x: x, y: y, szélesség: M, magasság: M })
                break;
            case "E":
                extrák.push({ x: x, y: y, szélesség: M, magasság: M })
                break;
            case "M":
                pacman.x = x;
                pacman.y = y;
                pacman.kezdx = x;
                pacman.kezdy = y;
                pacman.végx = x;
                pacman.végy = y;
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
    // hány csempe van vízszintesen és függőlegesen
    const csempeszámX = canvas.width / M;
    const csempeszámY = canvas.height / M;

    // negyed kezdetének kiszámolása
    let negyedKezdX = Math.floor(pacman.x / csempeszámX) * csempeszámX;
    let negyedKezdY = Math.floor(pacman.y / csempeszámY) * csempeszámY;

    // háttér
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // elmentjük a jelenlegi állapotot
    ctx.save();

    // canvas eltolása
    ctx.translate(-negyedKezdX * M, -negyedKezdY * M);

    // falak
    falak.forEach(fal => {
        ctx.drawImage(képek.falkép, fal.x * M, fal.y * M, fal.szélesség, fal.magasság)
    });

    // érmék
    érmék.forEach(érme => {
        ctx.drawImage(képek.érme, érme.x * M, érme.y * M, érme.szélesség, érme.magasság);
    });

    // extra érmék kirajzolása
    extrák.forEach(extra => {
        ctx.drawImage(képek.extraérme, extra.x * M, extra.y * M, extra.szélesség, extra.magasság);
    });

    // pacman
    if(!győzelem && !vereség){
        ctx.drawImage(képek.pacman, pacman.x * M, pacman.y * M, pacman.szélesség, pacman.magasság);
    } else if (győzelem) {
        ctx.drawImage(képek.pacman, 230, 250, pacman.szélesség * 3, pacman.magasság * 3);
        ctx.drawImage(képek.pacman, 830, 250, pacman.szélesség * 3, pacman.magasság * 3);
        ctx.drawImage(képek.pacman, 230, 650, pacman.szélesség * 3, pacman.magasság * 3);
        ctx.drawImage(képek.pacman, 830, 650, pacman.szélesség * 3, pacman.magasság * 3);
    }

    // szellemek
    if(!győzelem && !vereség && !halhatatlan){
        szellemek.forEach(szellem => {
            ctx.drawImage(képek.szellemaktiv, szellem.x * M, szellem.y * M, szellem.szélesség, szellem.magasság);
        });
    } else if (!győzelem && !vereség && halhatatlan) {
        szellemek.forEach(szellem => {
            ctx.drawImage(képek.szelleminaktiv, szellem.x * M, szellem.y * M, szellem.szélesség, szellem.magasság);
        });
    } else if (vereség) {
        ctx.drawImage(képek.szellemaktiv, 230, 250, M * 3, M * 3);
        ctx.drawImage(képek.szellemaktiv, 830, 250, M * 3, M * 3);
        ctx.drawImage(képek.szellemaktiv, 230, 650, M * 3, M * 3);
        ctx.drawImage(képek.szellemaktiv, 830, 650, M * 3, M * 3);
    }

    // sáv
    if (halhatatlan) {
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, visszaszámlálás * 10, 20);
        ctx.fillRect(10, 10 * M + 10, visszaszámlálás * 10, 20);
        ctx.fillRect(15 * M + 10, 10, visszaszámlálás * 10, 20);
        ctx.fillRect(15 * M + 10, 10 * M + 10, visszaszámlálás * 10, 20);
    }

    // eredeti állapotot visszaállítása
    ctx.restore();

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

    // pacman irányítása    
    let időKül = aktuálisIdő - pacman.kezdi;
    if(időKül < pacman.hi) {
        let arány = időKül / pacman.hi;
        pacman.x = pacman.kezdx + (pacman.végx - pacman.kezdx) * arány;
        pacman.y = pacman.kezdy + (pacman.végy - pacman.kezdy) * arány;
    } else {
        pacman.x = pacman.végx;
        pacman.y = pacman.végy;
        mozog = false;
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
                //console.log("ütköznek");
                szellem.hi *= -1;
            }
        });
    });

    // érme begyűjtése
    érmék.forEach(érme => {
        if(ütköznek(érme, pacman)) {
            érmék.splice(érmék.indexOf(érme), 1);
        }
    });
    
    extrák.forEach(extra => {
        if(ütköznek(extra, pacman)) {
            extrák.splice(extrák.indexOf(extra), 1);
            halhatatlan = true;
            visszaszámlálás = 10;
        }
    });

    // visszaszámlálás
    if (halhatatlan) {
        visszaszámlálás -= dt;
        console.log(visszaszámlálás);
    }
    if (visszaszámlálás <= 0) {
        halhatatlan = false;
    }

    // vereség
    szellemek.forEach(szellem => {
        if(ütköznek(szellem, pacman) && !halhatatlan) {
            vereség = true;
        }
    });

    // győzelem
    if(érmék.length == 0 && extrák.length == 0) {
        győzelem = true;
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