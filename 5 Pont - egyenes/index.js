/*Canvas elérése*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* Konstansok */
const háttérkép = new Image();
háttérkép.src = 'háttér.png';

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
let vége = false;

/* === ANIMÁCIÓS CIKLUS === */

function következő() {
    frissítés()
    rajzolás()
    if (!vége) {
        requestAnimationFrame(következő)
    }
}

következő()

function rajzolás() {
    // háttér
    ctx.drawImage(háttérkép, 0, 0, canvas.width, canvas.height);

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
    if (ellenségy == 200) {
        újhely_ellenség_y = véletlenEgész(0, 1)
        if(újhely_ellenség_y == 0) {
            ellenségy = 0;
        } else {
            ellenségy = canvas.height;
        }
        újhely_ellenség_x = véletlenEgész(1, 6)
        if(újhely_ellenség_x == 1) {
            ellenségx = 3 * 25;
        } else if (újhely_ellenség_x == 2) {
            ellenségx = 5 * 25;
        } else if (újhely_ellenség_x == 3) {
            ellenségx = 7 * 25;
        } else if (újhely_ellenség_x == 4) {
            ellenségx = 9 * 25;
        } else if (újhely_ellenség_x == 5) {
            ellenségx = 11 * 25;
        } else if (újhely_ellenség_x == 6) {
            ellenségx = 13 * 25;
        }
    }
    // ellenség mozgatása
    if(ellenségy < canvas.height / 2) {
        ellenségy += f;
    }
    if(ellenségy > canvas.height / 2) {
        ellenségy -= f;
    }

    // cél áthelyezése
    if (célx == játékosx) {
        újhely_cél_x = véletlenEgész(1, 6)
        if(újhely_cél_x == 1) {
            célx = 3 * 25;
        } else if (újhely_cél_x == 2) {
            célx = 5 * 25;
        } else if (újhely_cél_x == 3) {
            célx = 7 * 25;
        } else if (újhely_cél_x == 4) {
            célx = 9 * 25;
        } else if (újhely_cél_x == 5) {
            célx = 11 * 25;
        } else if (újhely_cél_x == 6) {
            célx = 13 * 25;
        }
        pont += 1
    }
    
    // vége
    if (játékosx == ellenségx && ellenségy >= canvas.height / 2 - 20 && ellenségy <= canvas.height / 2 + 20) {
        vége = true
    }
}

/* === ESEMÉNYEK === */

document.addEventListener('click', function(e) {
    if (játékosx < 325) {
        játékosx += 50;
        
    } else {
        játékosx = 75;
    }
})

/* === SEGÉDFÜGGVÉNYEK === */

// véletlen egész
function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/* Hozz létre egy gyorsabb ellenséget!
   Állítsd be a kedvenc színeidet! */