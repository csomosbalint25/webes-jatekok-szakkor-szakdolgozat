/* Szeptember 29. Szent Mihály napja. A hagyomány szerint ezen a napon hajtják be a legelőről az állatokat haza, a téli szálláshelyre. Időjárásjósló napnak is tartották, mert ha Mihály itt találja a fecskéket, akkor kellemes meleg ősz várható. A pásztorok az állatok viselkedéséből jósoltak az időjárásra. 
Ebben a feladatban 3 juhot kell beterelni a téli szálláshelyre. Akkor sikeres a terelés, ha mindhárom juh a ház előtt van (ütköznek vele). Ebben a pillanatban álljon meg mindegyik állat.  ÖNÁLLÓ FELADAT: Amíg a juhok a ház felé tartanak, addig repüljön be egy fecske a jobb oldalról (a játéktéren kívülről)! A fecskét külön objektumként hozd létre, és egy fecske képe jelenjen meg a juhok méretével megegyező méretben! 
KAPCSOLAT A SCRATCH FEJLESZTŐI KÖRNYEZETTEL:
szereplő és annak értékei            =           objektum
érinted ezt ...                      =           ütközés */

/* Canvas elérése */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
const M = 40; // juhok mérete

/*Kép*/
let juhkép = new Image();
juhkép.src = 'juh.png';

/*Változók (objektumok)*/
let juh1 = {    // az 1. juh adatai
    x: M,
    y: M * 8 + M / 2,
    szélesség: M,
    magasság: M,
}

let juh2 = {    // az 2. juh adatai
    x: M * 2,
    y: M * 8 + M / 2,
    szélesség: M,
    magasság: M,
}

let juh3 = {    // az 3. juh adatai
    x: M * 3,
    y: M * 8 + M / 2,
    szélesség: M,
    magasság: M,
}

let ház = {    // a ház adatai
    x: 300,
    y: canvas.height - M * 3,
    szélesség: M * 3,
    magasság: M * 2.5,
}

/* === IDŐALAPÚ ANIMÁCIÓS CIKLUS === */

let előzőIdő = performance.now();
function következő() {
    let aktuálisIdő = performance.now();
    let dt = (aktuálisIdő - előzőIdő) / 1000; // az előző képkocka óta eltelt idő mp-ben
    előzőIdő = aktuálisIdő;
    frissítés(dt);
    rajzolás();
    // ha van olyan, amelyik még nincs a ház előtt, akkor mehet tovább az animáció
    if(!ütköznek(juh1,ház) || !ütköznek(juh2,ház) || !ütköznek(juh3,ház)) {
        requestAnimationFrame(következő);
    }
}

következő(); // az animáció elindítása

function rajzolás() {
    // háttér
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // talaj
    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height - M, canvas.width, M);

    // ház alapja
    ctx.fillStyle = 'beige';
    ctx.fillRect(ház.x, ház.y, ház.szélesség, ház.magasság);

    // háztető
    ctx.beginPath();
    ctx.moveTo(300, canvas.height - M * 3);
    ctx.lineTo(300 + M * 1.5, canvas.height - M * 3 * 2);
    ctx.lineTo(300 + M * 3, canvas.height - M * 3);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = 'brown';
    ctx.fill();

    // ház ajtaja
    ctx.fillStyle = 'brown';
    ctx.fillRect(360, canvas.height - M * 2, M, M * 1.5);

    // juh1
    ctx.drawImage(juhkép, juh1.x, juh1.y, juh1.szélesség, juh1.magasság);

    // juh2
    ctx.drawImage(juhkép, juh2.x, juh2.y, juh2.szélesség, juh2.magasság);

    // juh3
    ctx.drawImage(juhkép, juh3.x, juh3.y, juh3.szélesség, juh3.magasság);
}

function frissítés(dt) {
    //juh1.x += 20 * dt;
    juh2.x += 22 * dt;
    juh3.x += 21 * dt;
}

/* === ESEMÉNYEK === */

document.addEventListener('keydown', e => {
    if (e.key == "ArrowRight") {
        console.log(e.key);
        juh1.x += 1;
    }
})

/* === SEGÉDFÜGGVÉNYEK === */

// ütközés
function ütköznek(téglalap1, téglalap2) {
    return ! (
        téglalap2.x + téglalap2.szélesség <= téglalap1.x ||
        téglalap2.y + téglalap2.magasság <= téglalap1.y ||
        téglalap2.x >= téglalap1.x + téglalap1.szélesség ||
        téglalap2.y >= téglalap1.y + téglalap1.magasság
    )
}