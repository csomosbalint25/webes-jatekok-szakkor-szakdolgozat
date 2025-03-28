/* Canvas elérése */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
// juhok mérete

/*Kép*/


/*Változók (objektumok)*/
// az 1. juh adatai


// az 2. juh adatai


// az 3. juh adatai


// a ház adatai


/* === IDŐALAPÚ ANIMÁCIÓS CIKLUS === */


function következő() {
    frissítés();
    rajzolás();
    requestAnimationFrame(következő);
}

következő(); // az animáció elindítása

function rajzolás() {
    // háttér
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // talaj
    

    // ház alapja
    

    // háztető
    

    // ház ajtaja
    

    // juh1
    

    // juh2
    

    // juh3
    
}

function frissítés() {
    
}

/* === ESEMÉNYEK === */



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