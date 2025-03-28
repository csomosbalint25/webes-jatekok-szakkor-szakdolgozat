/*Canvas elérése*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* Konstansok */

/* Változók */
let célx = 3 * 25
let újhely_cél_x = 0
let játékosx = 3 * 25
let ellenségx = 3 * 25
let ellenségy = 0
let pont = -1;
let újhely_ellenség_y = 0;
let újhely_ellenség_x = 0;
let f = 2;  // ellenség függőleges elmozdulása

/* === ANIMÁCIÓS CIKLUS === */

function következő() {
    frissítés()
    rajzolás()
    requestAnimationFrame(következő)
}

következő()

function rajzolás() {
    // háttér

    // cél kör kirajzolása
    ctx.beginPath();
    ctx.arc(célx, canvas.height / 2, 7, 0, 2 * Math.PI);
    ctx.fillStyle = '#e9b000';
    ctx.fill();

    // játékos kör kirajzolása
    ctx.beginPath();
    ctx.arc(játékosx, canvas.height / 2, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#eb6e80';
    ctx.fill();

    // ellenség kör kirajzolása
    ctx.beginPath();
    ctx.arc(ellenségx, ellenségy, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#262228';
    ctx.fill();

    // pont
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(pont, 10, 30);
}

function frissítés() {
    // ellenség elhelyezése
    
    // ellenség mozgatása

    // cél áthelyezése
    
    // vége
    
}

/* === ESEMÉNYEK === */



/* === SEGÉDFÜGGVÉNYEK === */

// véletlen egész
function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}