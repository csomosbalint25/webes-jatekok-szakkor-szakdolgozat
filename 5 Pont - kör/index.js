/*Canvas elérése*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* Konstansok */
const háttérkép = new Image();
háttérkép.src = 'háttér.png';

let helyek = [];

helyek.push({x: 170, y: 130});
helyek.push({x: 230, y: 130});
helyek.push({x: 270, y: 170});
helyek.push({x: 270, y: 230});
helyek.push({x: 230, y: 270});
helyek.push({x: 170, y: 270});
helyek.push({x: 130, y: 230});
helyek.push({x: 130, y: 170});

/*console.log(helyek[0]);
console.log(helyek[2]);
console.log(helyek[7]);

console.log(helyek[7].x);
console.log(helyek[7].y);*/



/* Változók */

let játékos = {
    x: helyek[0].x,
    y: helyek[0].y,
    szélesség: 10,
    magasság: 10
}

let cél = {
    x: helyek[0].x,
    y: helyek[0].y,
    szélesség: 5,
    magasság: 5
}

let ellenség = {
    x: 200,
    y: 200,
    szélesség: 15,
    magasság: 15
}

let újhely = 0;
let akt = 0;
let pont = -1;
let újhely_ellenség = 0;
let v = 0;  // vízszintes elmozdulás
let f = 0;  // függőleges elmozdulás
let vége = false;

/*let nyerőszámok = [5, 12, 46, 28, 30];
console.log(nyerőszámok);
nyerőszámok[2] = 12;
console.log(nyerőszámok);
console.log(nyerőszámok[0]);*/

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
    ctx.fillStyle = '#008f95';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(háttérkép, 0, 0, canvas.width, canvas.height);

    // cél kör kirajzolása
    ctx.beginPath();
    ctx.arc(cél.x, cél.y, cél.szélesség, 0, 2 * Math.PI);
    ctx.fillStyle = '#e9b000';
    ctx.fill();

    // játékos kör kirajzolása
    ctx.beginPath();
    ctx.arc(játékos.x, játékos.y, játékos.szélesség, 0, 2 * Math.PI);
    ctx.fillStyle = '#eb6e80';
    ctx.fill();

    // ellenség kör kirajzolása
    ctx.beginPath();
    ctx.arc(ellenség.x, ellenség.y, ellenség.szélesség, 0, 2 * Math.PI);
    ctx.fillStyle = '#262228';
    ctx.fill();

    // pont
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(pont, 10, 30);
}

function frissítés() {
    if (ütköznek(játékos, cél)) {
        pont += 1;
        újhely = véletlenEgész(0, 7);
        if (újhely == 0) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 1) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 2) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 3) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 4) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 5) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 6) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
        if (újhely == 7) {
            cél.x = helyek[újhely].x;
            cél.y = helyek[újhely].y;
        }
    }
    
    if (ellenség.x == 200 && ellenség.y == 200) {
        újhely_ellenség = véletlenEgész(0, 7);
        if (újhely_ellenség == 0) {
            ellenség.x = canvas.width / 4;
            ellenség.y = 0;
        }
        if (újhely_ellenség == 1) {
            ellenség.x = canvas.width / 4 * 3;
            ellenség.y = 0;
        }
        if (újhely_ellenség == 2) {
            ellenség.x = canvas.width;
            ellenség.y = canvas.height / 4;
        }
        if (újhely_ellenség == 3) {
            ellenség.x = canvas.width;
            ellenség.y = canvas.height / 4 * 3;
        }
        if (újhely_ellenség == 4) {
            ellenség.x = canvas.width / 4 * 3;
            ellenség.y = canvas.height;
        }
        if (újhely_ellenség == 5) {
            ellenség.x = canvas.width / 4;
            ellenség.y = canvas.height;
        }
        if (újhely_ellenség == 6) {
            ellenség.x = 0;
            ellenség.y = canvas.height / 4 * 3;
        }
        if (újhely_ellenség == 7) {
            ellenség.x = 0;
            ellenség.y = canvas.height / 4;
        }
        
        v = (ellenség.x - 200) / 100 * -1; // így biztosan lesz olyan pillanat, amikor a (200,200) ponton van
        f = (ellenség.y - 200) / 100 * -1;
    }
    
    ellenség.x += v;
    ellenség.y += f;

    if (ütköznek(játékos, ellenség)) {
        vége = true;
    }
}



/* === ESEMÉNYEK === */

document.addEventListener('click', function(e) {
    if (akt < 7) {
        akt += 1;
    } else {
        akt = 0;
    }
    
    játékos.x = helyek[akt].x;
    játékos.y = helyek[akt].y;
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

/* Hozz létre egy gyorsabb ellenséget!
   Állítsd be a kedvenc színeidet! */