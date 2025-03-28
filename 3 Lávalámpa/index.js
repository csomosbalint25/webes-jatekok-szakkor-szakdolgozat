/* ÖNÁLLÓ FELADAT 1: Készíts el még egy lávabuborékot egy újabb méretben, sebességgel és pozícióval.
   ÖNÁLLÓ FELADAT 2: Dekoráld ki a lámpa alsó és felső részét. */

/* Canvas elérése */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

let y1 = 420;
let y2 = 250;
let sebesség1 = -1;
let sebesség2 = 2;

/* === ANIMÁCIÓS CIKLUS === */

function következő() {
    frissítés();
    rajzolás();
    requestAnimationFrame(következő);
}

következő(); // az animáció elindítása

function rajzolás() {
    /* HÁTTÉR */
    ctx.fillStyle = 'rgb(124, 23, 85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* FIX LÁVA */
        // alsó láva
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height + 50, canvas.width, 0, 2 * Math.PI);

    ctx.fillStyle = 'rgb(250, 39, 81)';
    ctx.fill();

        // felső láva
    ctx.beginPath();
    ctx.arc(canvas.width / 2, -100, canvas.width, 0, 2 * Math.PI);

    ctx.fillStyle = 'rgb(250, 39, 81)';
    ctx.fill();

    /* MOZGÓ LÁVA */
        // mozgó láva 1
        ctx.beginPath();
        ctx.arc(60, y1, 50, 0, 2 * Math.PI);
    
        ctx.fillStyle = 'rgb(250, 39, 81)';
        ctx.fill();
    
            // mozgó láva 2
        ctx.beginPath();
        ctx.arc(150, y2, 20, 0, 2 * Math.PI);
    
        ctx.fillStyle = 'rgb(250, 39, 81)';
        ctx.fill();

    /* LÁMPA */
        // lámpa teteje
    ctx.fillStyle = 'rgb(30, 72, 87)';
    ctx.fillRect(0, 0, canvas.width, canvas.height / 12);

        // lámpa alja
    ctx.fillStyle = 'rgb(30, 72, 87)';
    ctx.fillRect(0, canvas.height - canvas.height / 5, canvas.width, canvas.height / 5);
}

function frissítés() {
    y1 += sebesség1;
    if(y1 <= 0) {
        sebesség1 *= -1;
    }
    if(y1 >= canvas.height) {
        sebesség1 *= -1;
    }
    
    y2 += sebesség2;
    if(y2 <= 0) {
        sebesség2 *= -1;
    }
    if(y2 >= canvas.height) {
        sebesség2 *= -1;
    }
}