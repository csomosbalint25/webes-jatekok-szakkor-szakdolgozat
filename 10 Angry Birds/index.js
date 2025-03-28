const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
// [1.] Hozd létre az M konstanst, értéke legyen 40.
const M = 40;

/*Képek*/
// [2.] Importáld be a képeket a következő változókba: háttér, madárkép, kalitkakép, kalitkaképzárva.
// háttér
let háttér = new Image();
háttér.src = 'háttér.jpg';

// madár
let madárkép = new Image();
madárkép.src = 'madár.png';

// kalitka
let kalitkakép = new Image();
kalitkakép.src = 'kalitka.png';

// kalitka zárva
let kalitkaképzárva = new Image();
kalitkaképzárva.src = 'kalitka-zárva.png';

/*Változók*/
// [5.] Hozd létre a madár objektumot. A madár x pozíciója legyen M, y pozíciója legyen M * 9, szélessége és magassága az M 1.5-ed része, függőleges sebessége (vy), vízszintes sebessége (vx), és függőleges gyorsulása (ay) pedig 0.
// madár objektum
let madár = {
    x: M,
    y: M * 9,
    szélesség: M / 1.5,
    magasság: M / 1.5,
    vy: 0,
    vx: 0,
    ay: 0
}

// [7.] Hozd létre a kalitka objektumot, melynek x pozíciója legyen véletlen 300 és 560 között, y pozíciója legyen az M 8.5-szöröse, szélessége és magassága legyen M.
// kalitka objektum
let kalitka = {
    x: véletlenEgész(300, 560),
    y: M * 8.5,
    szélesség: M,
    magasság: M
}

// egyéb változók
let billentyűk = [];
let x = 0;
let y = 0;
let találat = false;
let pont = 0;


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
    // [3.] Rajzold ki a hátteret a játéktér teljes méretében.
    // háttér
    ctx.drawImage(háttér, 0, 0, canvas.width, canvas.height);

    // [4.] Rajzold ki a talajt zöld színnel. A talaj magassága M, szélessége a játéktér szélességével egyezik meg.
    // talaj
    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height - M, canvas.width, M);

    // [6.] Rajzold ki a madarat.
    // [16.] Módosítsd a madár kirajzolását úgy, hogy csak akkor rajzold ki, ha éppen nincs találat.
    // madár
    if(!találat) {
        ctx.drawImage(madárkép, madár.x, madár.y, madár.szélesség, madár.magasság);
    }

    // [8.] Rajzold ki a kalitkát.
    // [15.] Ha nincs találat, akkor a kalitkaképet, különben a kalitkaképzárva képet rajzoljuk ki.
    // kalitka
    if(!találat) {
        ctx.drawImage(kalitkakép, kalitka.x, kalitka.y, kalitka.szélesség, kalitka.magasság);
    } else {
        ctx.drawImage(kalitkaképzárva, kalitka.x, kalitka.y, kalitka.szélesség, kalitka.magasság);
    }

    // [10.] Írd ki az egér pozícióját a játéktér bal felső sarkába zárójelek közé, vesszővel elválasztva, 15 px-es fekete Courier New betűtípussal.
    // felirat
    ctx.font = '15px Courier New';
    ctx.fillStyle = 'black';
    ctx.fillText('(' + x + ',' + y + ')', 0, 15);

    // [11.] Hozd létre a pont változót az "egyéb változók" között 0 kezdőértékkel, majd írd ki ezt a mintán látható formában az egérpozíció alá.
    ctx.fillText('Pont: ' + pont, 0, 30);

    // [17.] Ha a madár jóval a játéktér alatt van (vagyis az x pozíciója nagyobb vagy egyenlő mint pl. 700 px), akkor állítsuk vissza a játékot a kezdeti állapotra. A madár minden tulajdonságát állítsuk vissza az eredetire, a kalitkát tegyük egy újabb véletlen helyre. Ha volt találat, akkor növeljük egyel a pontot, de ha nem volt találat, akkor nullázzuk le azt. A találat nevű változót állítsuk vissza hamisra. Jöhet az újabb lövés!
    // újrakezdés és pontszámítás
    if(madár.y >= 700) {
        madár.x = M;
        madár.y = M * 9;
        madár.vy = 0;
        madár.vx = 0;
        madár.ay = 0;
        kalitka.x = véletlenEgész(300, 560);
        if(találat) {
            pont += 1;
        }
        if(!találat) {
            pont = 0;
        }
        találat = false;
    }
}

function frissítés(dt) {
    // [13.] Mozgassuk a madarat az imént beállított értékek alapján. A függőleges mozgás gravitációs mozgás, a vízszintes mozgás egyenletes. Emlékeztető fizikából: v' = v + a * dt; illetve ds = v' * dt.
    // madár reptetése
    madár.vy = madár.vy + madár.ay * dt;
    madár.y = madár.y + madár.vy * dt;
    madár.x = madár.x + madár.vx * dt;

    // [14.] Ha a madár és a kalitka ütközik, akkor a találat nevű változó (melyet hozzunk létre az "egyéb változók" között hamis értékkel) legyen igaz.
    // találat
    if(ütköznek(madár, kalitka)) {
        találat = true;
    }

    // [12.] Hozd létre a billentyűk nevű tömböt az egyéb változóknál. Az egérmutató függőleges elhelyezésével lehet beállítani, hogy a madár milyen magasra repüljön. Ezért a Szóköz gomb lenyomásakor állítsuk a madár függőleges sebességét (vy) a játéktér magasságának és az egérmutató y koordinátájának a különbségének a -1-szeresére. A madár függőleges gyorsulása (ay) legyen 400. Az egérmutató x pozíciójával lehet beállítani, hogy milyen erősen lőjük ki a madarat, ezért a madár vízszintes sebessége legyen az egérmutató x pozíciója.
    // madár kilövése
    if(billentyűk[' ']) {
        madár.vy = -(400-y);
        madár.ay = 400;
        madár.vx = x;
    }
}

/* === ESEMÉNYEK === */

// [9.] Hozd létre az x és y változókat az "egyéb változók" között 0 értékkel. Ezek fogják tárolni az egérmutató vízszintes és függőleges koordinátáit. Kérdezd le és tárold el ezt a két adatot az alábbi függvényben.
/*Egérmutató X és Y koordinátájának lekérdezése és eltárolása*/
document.addEventListener('mousemove', function(e) {
    x = e.offsetX;
    y = e.offsetY;
})

// lenyomott billentyűk lekérdezése
document.addEventListener('keydown', e => {
    billentyűk[e.key] = true;
})

document.addEventListener('keyup', e => {
    billentyűk[e.key] = false;
})

/* === SEGÉDFÜGGVÉNYEK === */

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