const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/


/*Változók*/
// játékos

// emoji
let emoji = {
    
}

// gomb
let gomb = {
    x: canvas.width / 2 - 50,
    y: 470,
    szélesség: 100,
    magasság: 40
}

let játék = true;
let rekord = 0;
let pont = 0;
let elteltIdő = 0;

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

következő()

function rajzolás() {
    // háttér
    if(játék){
        
    } else {
        // Átmenet előállítása
        const átmenet=ctx.createLinearGradient(0, 0, 240, 533);
        átmenet.addColorStop(0, "darkOrchid");
        átmenet.addColorStop(1, "deepPink");

        // Téglalap kitöltése az átmenettel
        ctx.fillStyle = átmenet;
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    // játékos
    if(játék) {
        
    }

    // ÚJRA gomb
    if(!játék) {
        
    }

    // újra szöveg
    
    
    // rekord
    ctx.font = '10px Arial';
    if(játék){
        ctx.fillStyle = '#8F692A';
    } else {
        ctx.fillStyle = 'lightgray';
    }
    ctx.fillText('REKORD: ' + rekord, 170, 20);

    // pont
    

    // emoji
    
}

function frissítés(dt) {
    //gyorsabb mozgás
    

    // emoji mozgása
    

    // ütközés
    

    // játék vége
    
}

/* === ESEMÉNYEK === */

// játékos mozgatása egérrel
document.addEventListener('mousemove', function(e) {
    
})

// újrakezdés
document.addEventListener('click', function(e) {
    
})


/* === SEGÉDFÜGGVÉNYEK === */

// ütközés
function ütköznek(téglalap1, téglalap2) {
    return ! (
        téglalap2.x + téglalap2.szélesség <= téglalap1.x ||
        téglalap2.y + téglalap2.magasság <= téglalap1.y ||
        téglalap2.x >= téglalap1.x + téglalap1.szélesség ||
        téglalap2.y - (téglalap2.magasság / 2) >= téglalap1.y + téglalap1.magasság
    )
}

// véletlen egész
function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// játék újrakezdése
function kezdés() {
    
}