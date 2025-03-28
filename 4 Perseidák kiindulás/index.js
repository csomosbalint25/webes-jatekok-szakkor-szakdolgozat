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
    
        // csillag

        /* LOMBOK */
}

function frissítés() {
    holdX += holdsebesség;
    // hold visszahelyezése a képernyő bal széléhez, amikor az teljesen elhagyta a vásznat a jobb oldalon
    
    // műhold vízszintes és függőleges mozgatása
    
    // műhold visszahelyezése a vászon jobb alsó sarkába
    
    // csillag mozgatása vízszintesen és függőlegesen

    // csillag visszahelyezése a kezdőpozícióba, új véletlen függőleges sebesség generálása
    if(csillagX >= canvas.width * 3) {
        csillagX = 0;
        csillagY = canvas.height / 2;
        csillagsebességY = véletlenSzám(-2, 2);
    }
}


function véletlenSzám(min, max) {
    return Math.random() * (max - min + 1) + min;
}