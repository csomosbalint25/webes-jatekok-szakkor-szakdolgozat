/* Korábbi ismereteink összefoglalására ezt a Doodle Jumphoz hasonló Halloween Jump nevű játékot fogjuk elkészíteni 2 héten keresztül. Minél magasabbra jutunk, annál nagyobb valószínűséggel találkozunk mozgó platformokkal és denevérekkel megtartva ezek kialakulásának véletlenszerűségét. */



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* === ÁLLAPOTTÉR === */

/*Konstansok*/
const JÁTÉKOSSZÉLESSÉG = 30;
const JÁTÉKOSMAGASSÁG = 30;
const JÁTÉKOSGYORSULÁS = 450;
const PLATFORMSZÉLESSÉG = 50;
const PLATFORMMAGASSÁG = 10;
const PLATFORMTÁV = 40;
const TÁRGYSZÉLESSÉG = 20;
const TÁRGYMAGASSÁG = 20;

/*Változók*/

let képek = {
    háttér: new Image(),
    játékos: new Image(),
    cukor1: new Image(),
    cukor2: new Image(),
    denevér: new Image(),
    sir: new Image(),
    platform: new Image(),
    kosár: new Image(),
}

képek.háttér.src = 'háttér.png';
képek.játékos.src = 'játékos.png';
képek.cukor1.src = 'cukor1.png';
képek.cukor2.src = 'cukor2.png';
képek.denevér.src = 'denevér.png';
képek.sir.src = 'sir.png';
képek.platform.src = 'platform.png';
képek.kosár.src = 'kosár.png';

let játékos = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 200,
    szélesség: JÁTÉKOSSZÉLESSÉG,
    magasság: JÁTÉKOSMAGASSÁG,
    vy: 0,
    ay: JÁTÉKOSGYORSULÁS
}

let gomb = {
    x: canvas.width / 2 - 50,
    y: 420,
    szélesség: 100,
    magasság: 40
}

let pont = 0;
let cukordb = 0;
let mozgásval = 1;
let vége = false;
let összesen = 0;
let rekord = 0;

let billentyűk = [];
let platformok = [];
let tárgyak = [];

function pályagenerálás() {
    platformok = [];
    tárgyak = [];
    platformok.push({x: canvas.width / 2 - PLATFORMSZÉLESSÉG / 2, y: canvas.height - PLATFORMMAGASSÁG * 6, szélesség: PLATFORMSZÉLESSÉG, magasság: PLATFORMMAGASSÁG});
    újPlatform();
    újPlatform();
    újPlatform();
    újPlatform();
    újPlatform();
    újPlatform();
    újPlatform();
    újTárgy();
    újTárgy();
    újTárgy();
    újTárgy();
}

pályagenerálás();

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

következő();

function rajzolás() {
    if(!vége) {
        // háttér
        ctx.fillStyle = "#E53E3E";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(képek.háttér, -30, 40, canvas.height, canvas.height);

        ctx.beginPath();
        ctx.arc(canvas.width / 2 - 50, canvas.height + 140, 200, 0, 2 * Math.PI);
        ctx.fillStyle = '#012D4E';
        ctx.fill();
    

        //platformok
        platformok.forEach(platform => {
            ctx.drawImage(képek.platform, platform.x, platform.y, platform.szélesség, platform.magasság);
        });

        // tárgyak
        tárgyak.forEach(tárgy => {
            if(tárgy.jelmez == 'denevér') {
                ctx.drawImage(képek.denevér, tárgy.x, tárgy.y, tárgy.szélesség, tárgy.magasság);
            } else if (tárgy.jelmez == 'cukor1') {
                ctx.drawImage(képek.cukor1, tárgy.x, tárgy.y, tárgy.szélesség, tárgy.magasság);
            } else if (tárgy.jelmez == 'cukor2') {
                ctx.drawImage(képek.cukor2, tárgy.x, tárgy.y, tárgy.szélesség, tárgy.magasság);
            }
        });
    }

    // vége kép és felirat
    if(vége){
        összesen = pont + cukordb;
        // háttér átmenet előállítása
        const átmenet=ctx.createLinearGradient(0, 0, 240, 533);
        átmenet.addColorStop(0, "black");
        átmenet.addColorStop(1, "#463B83");
        // téglalap kitöltése az átmenettel
        ctx.fillStyle = átmenet;
        ctx.fillRect(0,0, canvas.width, canvas.height);
        // 1. kép kirajzolása
        let kép1x = 150;
        let kép1y = 500;
        let kép1w = 350;
        let kép1h = 350;
        let szög = -Math.PI / 12;
        ctx.save();
        ctx.translate(kép1x, kép1y);
        ctx.rotate(szög);
        ctx.drawImage(képek.sir, 10, 10, -kép1w/2, -kép1h/2);
        ctx.restore();
        // lábléc
        ctx.fillStyle = "#012D4E";
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
        // 2. kép kirajzolása
        ctx.drawImage(képek.kosár, 80, 515, -150/2, -150/2);
        // 3. kép kirajzolása
        ctx.drawImage(képek.denevér, 140, 40, 100, 100);

        ctx.font = '50px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Próbáld', 35, 150);
        ctx.fillText('újra', 80, 200);

        ctx.font = '40px Arial';
        ctx.fillStyle = '#FF8257';
        ctx.fillText(összesen, canvas.width / 2 - (összesen >= 10 ? 20 : 10), 270);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#FF8257';
        ctx.fillText('LEGJOBB', 80, 330);
        ctx.fillText(rekord, canvas.width / 2 - 10, 360);

        ctx.fillStyle = 'white';
        ctx.fillRect(gomb.x, gomb.y, gomb.szélesség, gomb.magasság);

        /* // lekerekített gombot vonalként tudunk kirajzolni
        ctx.beginPath(); // vonalat fogunk rajzolni
        ctx.lineWidth = gomb.magasság; // vonal vastagsága
        ctx.strokeStyle = "white"; // vonal színe
        ctx.lineCap = "round"; // vonalvég stílusa (butt/round/square)
        ctx.moveTo(gomb.x, gomb.y); // kezdőpont meghatározása
        ctx.lineTo(gomb.x + gomb.szélesség, gomb.y); // végpont meghatározása
        ctx.stroke(); // vonal megrajzolása */

        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('ÚJRA', gomb.x + gomb.szélesség / 9, gomb.y + gomb.magasság - gomb.magasság / 7);
    }

    // fejléc
    ctx.fillStyle = "#B22222";
    ctx.fillRect(0, 0, canvas.width, 30);

    // pontok
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('🍬: ' + cukordb, 10, 20);
    ctx.fillText('🪙: ' + pont, 180, 20);

    // játékos
    ctx.drawImage(képek.játékos, játékos.x, játékos.y, játékos.szélesség, játékos.magasság);
}

function frissítés(dt) {
    elteltIdő = Math.round(Math.round(performance.now()) / 1000);
    
    // Emlékeztető fizikából: v' = v + a * dt; illetve ds = v' * dt.
    játékos.vy = játékos.vy + játékos.ay * dt;
    játékos.y = játékos.y + játékos.vy * dt;

    // FÜGGŐLEGES mozgás
    platformok.forEach(platform => {
        if(ütköznek(játékos, platform) && játékos.vy > 0 && !vége) {
            játékos.vy = -300;
        }
    });

    // VÍZSZINTES mozgás
    if(!vége) {
        if(billentyűk['ArrowRight']) {
            if(játékos.x < canvas.width) {
                játékos.x += játékos.ay / 2 * dt;
            } else {
                játékos.x = 0 - játékos.szélesség;
            }
        }
        if(billentyűk['ArrowLeft']) {
            if(játékos.x > 0 - játékos.szélesség) {
                játékos.x -= játékos.ay / 2 * dt;
            } else {
                játékos.x = canvas.width;
            }
        }
    }

    // új platformok létrehozása
    if(platformok.length < 8) {
        újabbPlatform();
    }

    // felfelé haladás
    if(játékos.y <= 150 && játékos.vy < 0) {
        játékos.y = 150;
        platformok.forEach(platform => {
            platform.y -= játékos.vy * dt;
        });
    }

    // platformok törlése
    platformok.forEach(platform => {
        if(platform.y >= canvas.height) {
            platformok.splice(0, 1);
            pont += 1;
        }
    });

    // mozgó platformok
    platformok.forEach(platform => {
        if(platform.mozog) {
            if(platform.irány == 1) {
                platform.x += 20 * dt;
                if(platform.x > canvas.width) {
                    platform.x = 0 - platform.szélesség;
                }
            } else {
                platform.x += -20 * dt;
                if(platform.x + platform.szélesség < 0) {
                    platform.x = canvas.width;
                }
            }
        }
    });
    if(pont > 0 && pont % 50 == 0) {
        mozgásval += 1;
        pont += 1;
    }

    //===============================

    // új tárgyak létrehozása
    if(tárgyak.length < 4) {
        újabbTárgy();
    }

    // felfelé haladás
    if(játékos.y <= 150 && játékos.vy < 0) {
        játékos.y = 150;
        tárgyak.forEach(tárgy => {
            tárgy.y -= játékos.vy * dt;
        });
    }

    // tárgyak törlése
    tárgyak.forEach(tárgy => {
        if(tárgy.y >= canvas.height) {
            tárgyak.splice(0, 1);
        }
    });

    // mozgó tárgyak
    tárgyak.forEach(tárgy => {
        if(tárgy.mozog) {
            if(tárgy.irány == 1) {
                tárgy.x += 20 * dt;
                if(tárgy.x > canvas.width) {
                    tárgy.x = 0 - tárgy.szélesség;
                }
            } else {
                tárgy.x += -20 * dt;
                if(tárgy.x + tárgy.szélesség < 0) {
                    tárgy.x = canvas.width;
                }
            }
        }
    });
    
    // cukorgyűjtés
    tárgyak.forEach(tárgy => {
        if(ütköznek(játékos, tárgy) && (tárgy.jelmez === 'cukor1' || tárgy.jelmez === 'cukor2')) {
            cukordb += 1;
            tárgyak.splice(tárgyak.indexOf(tárgy), 1);
        }
    });

    // játék vége
    tárgyak.forEach(tárgy => {
        if(ütköznek(játékos, tárgy) && tárgy.jelmez === 'denevér') {
            vége = true;
        }
    });
    if(játékos.y >= canvas.height) {
        vége = true;
    }
}


/* === ESEMÉNYEK === */

// lenyomott billentyűk eltárolása
document.addEventListener('keydown', e => {
    billentyűk[e.key] = true;
})

document.addEventListener('keyup', e => {
    billentyűk[e.key] = false;
})

// újrakezdés kattintása
document.addEventListener('click', function(e) {
    if(e.offsetX > gomb.x && e.offsetX < (gomb.x + gomb.szélesség) && e.offsetY > gomb.y && e.offsetY < (gomb.y + gomb.magasság)){
        kezdés();
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

// véletlen egész
function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// új platform
function újPlatform() {
    let újx = véletlenEgész(0, 244 - PLATFORMSZÉLESSÉG);
    let újy = véletlenEgész(0, PLATFORMTÁV) + (7 - platformok.length) * 60;
    /*while(platformok.filter(e => (újy > e.y - PLATFORMTÁV && újy < e.y + PLATFORMMAGASSÁG + PLATFORMTÁV) || (újy + PLATFORMMAGASSÁG > e.y - PLATFORMTÁV && újy + PLATFORMMAGASSÁG < e.y + PLATFORMMAGASSÁG + PLATFORMTÁV)).length > 0) {
        újy = véletlenEgész(0, canvas.height - PLATFORMMAGASSÁG * 6);
    }*/
    platformok.push({x: újx, y: újy, szélesség: PLATFORMSZÉLESSÉG, magasság: PLATFORMMAGASSÁG});
}

function újabbPlatform() {
    let újx = véletlenEgész(0, 244 - PLATFORMSZÉLESSÉG);
    let újy = véletlenEgész(0 - PLATFORMTÁV / 2, 0 - PLATFORMMAGASSÁG);
    if(véletlenEgész(0, 10) < mozgásval) {
        platformok.push({x: újx, y: újy, szélesség: PLATFORMSZÉLESSÉG, magasság: PLATFORMMAGASSÁG, mozog: true, irány: véletlenEgész(0, 1)});
    } else {
        platformok.push({x: újx, y: újy, szélesség: PLATFORMSZÉLESSÉG, magasság: PLATFORMMAGASSÁG, mozog: false, irány: véletlenEgész(0, 1)});
    }
}

// új tárgy
function újTárgy() {
    let újx = véletlenEgész(0, 244 - JÁTÉKOSSZÉLESSÉG);
    let újy = véletlenEgész(0, PLATFORMTÁV) + (4 - tárgyak.length) * 90;
    tárgyak.push({x: újx, y: újy, szélesség: TÁRGYSZÉLESSÉG, magasság: TÁRGYMAGASSÁG, mozog: false, irány: véletlenEgész(0, 1), jelmez: 'cukor1'});
}

function újabbTárgy() {
    let újx = véletlenEgész(0, 244 - JÁTÉKOSSZÉLESSÉG);
    let újy = véletlenEgész(0 - PLATFORMTÁV / 2, 0 - PLATFORMMAGASSÁG);
    if(véletlenEgész(0, 10) < mozgásval) {
        if(véletlenEgész(0, 10) < 2) {
            tárgyak.push({x: újx, y: újy, szélesség: TÁRGYSZÉLESSÉG, magasság: TÁRGYMAGASSÁG, mozog: true, irány: véletlenEgész(0, 1), jelmez: 'denevér'});
        } else if(véletlenEgész(0, 10) < 4) {
            tárgyak.push({x: újx, y: újy, szélesség: TÁRGYSZÉLESSÉG, magasság: TÁRGYMAGASSÁG, mozog: false, irány: véletlenEgész(0, 1), jelmez: 'cukor1'});
        } else if(véletlenEgész(0, 10) < 6) {
            tárgyak.push({x: újx, y: újy, szélesség: TÁRGYSZÉLESSÉG, magasság: TÁRGYMAGASSÁG, mozog: false, irány: véletlenEgész(0, 1), jelmez: 'cukor2'});
        }
    }
}

// játék újrakezdése
function kezdés() {
    vége = false;
    játékos.x = canvas.width / 2 - 15;
    játékos.y = canvas.height - 200;
    játékos.vy = 0;
    pont = 0;
    cukordb = 0;
    mozgásval = 1;
    if(összesen > rekord) {
        rekord = összesen;
    }
    összesen = 0;
    pályagenerálás();
}