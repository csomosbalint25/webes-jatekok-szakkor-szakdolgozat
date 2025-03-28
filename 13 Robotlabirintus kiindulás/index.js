const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Pálya tárolása*/


/*Konstansok*/
// mezőméret

let robotkép = new Image();
robotkép.src = 'robot.png';

/*Változók*/
// robot


// egyéb változók

let vesztettél = false;
let nyertél = false;



/* === ANIMÁCIÓS CIKLUS === */


következő(); // az animáció elindítása

function következő() {
    idő = performance.now();
    frissítés(idő); // állapottér frissítése
    rajzolás(); // képkocka újrarajzolása
    requestAnimationFrame(következő);
}

function rajzolás() {
    // háttér
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // vizek
    

    // robot
    
    
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
    ctx.fillText('⌛: ...', 10, 30);
}

function frissítés(dt) {
    // Billentyűk figyelése
    

    // robot csúsztatása
    

    // célba érés
    
}

/* === ESEMÉNYEK === */

// lenyomott billentyűk eltárolása
document.addEventListener('keydown', e => {
    billentyűk[e.key] = true;
})

document.addEventListener('keyup', e => {
    billentyűk[e.key] = false;
})