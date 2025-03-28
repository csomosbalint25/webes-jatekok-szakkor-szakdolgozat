/* Canvas elérése */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

let holdX = 100;

let műholdX = canvas.width;
let műholdY = canvas.height;

let csillagX = 0;
let csillagY = canvas.height / 2;

let holdsebesség = 0.5;

let műholdsebesség = -2;

let csillagsebességX = 10;
let csillagsebességY = 0;

/* === ANIMÁCIÓS CIKLUS === */

function következő() {
    frissítés();
    rajzolás();
    requestAnimationFrame(következő);
}

következő(); // az animáció elindítása

function rajzolás() {
    /* HÁTTÉR */
        ctx.fillStyle = '#062f4f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* MOZGÓ TESTEK */
        // hold
        ctx.beginPath();
        ctx.arc(holdX, 55, 50, 0, 2 * Math.PI);
    
        ctx.fillStyle = 'lightyellow';
        ctx.fill();
    
        // műhold
        ctx.beginPath();
        ctx.arc(műholdX, műholdY, 3, 0, 2 * Math.PI);
    
        ctx.fillStyle = 'white';
        ctx.fill();
    
        // csillag
        ctx.beginPath();
        ctx.arc(csillagX, csillagY, 10, 0, 2 * Math.PI);
    
        ctx.fillStyle = 'yellow';
        ctx.fill();

    /* LOMBOK */
        // felső lomb
        ctx.beginPath();
        ctx.arc(0, 0, 150, 0, 2 * Math.PI);

        ctx.fillStyle = 'darkgreen';
        ctx.fill();

        // alsó lomb
        ctx.beginPath();
        ctx.arc(canvas.width, canvas.height, 100, 0, 2 * Math.PI);

        ctx.fillStyle = 'darkgreen';
        ctx.fill();
}

function frissítés() {
    holdX += holdsebesség;
    if(holdX >= canvas.width + 50) {
        holdX = -50;
    }
    
    műholdY += műholdsebesség;
    műholdX += műholdsebesség;
    if(műholdY <= 0) {
        műholdY = canvas.height;
        műholdX = canvas.width;
    }
    
    csillagX += csillagsebességX;
    csillagY += csillagsebességY;
    if(csillagX >= canvas.width * 3) {
        csillagX = 0;
        csillagY = canvas.height / 2;
        csillagsebességY = véletlenSzám(-2, 2);
    }
}


function véletlenSzám(min, max) {
    return Math.random() * (max - min + 1) + min;
}