/* Ez a feladat gyakoroltatja az előző feladatban megszerzett ismereteket, miközben a hangsúlyt
a vonalak rajzolására és a koordinátarendszerre helyezi. A Scratch-csel ellentétben itt nem tudunk irányt
beállítani, hanem pontosan meg kell határozni, hogy mely koordinátapontokra kell meghúzni a vonalakat.
Ehhez a legtöbb tanuló által már jól ismert pontösszekötős rajzkiegészítést fogjuk használni.
A rajz alapját a canvas háttérképeként fogjuk betölteni, így a tanulók megtanulják, hogyan lehet képeket
betölteni, ami fontos lesz minden későbbi játékhoz, ahol a szereplőket így fogjuk megjeleníteni. Fontos eleme
ennek a feladatnak, hogy két vásznat használunk egyazon weboldalon, ezért két kontextust kell kezelnünk (ctx1 és ctx2).
Azt is megnézzük, hogyan lehet törölni a rajzokat.

Ha marad még idő, gyakorlásképpen ki lehet színezni a halat és ki lehet írni a kép címét.

KAPCSOLAT A SCRATCH FEJLESZTŐI KÖRNYEZETTEL:
[0,0] középen           = [0,0] bal felső sarokban
töröld a rajzokat       = .clearRect()
.beginPath()            = tollat tedd le
.moveTo(x, y)           = ugorj ide: x, y */


/*Canvas elérése*/
const canvas1 = document.querySelector('#vaszon1');
const ctx1 = canvas1.getContext('2d');

const canvas2 = document.querySelector('#vaszon2');
const ctx2 = canvas2.getContext('2d');

/*Képek betöltése*/
const giliszta = new Image();
giliszta.src = 'worm.png';
giliszta.onload = function() {
    ctx1.drawImage(giliszta, 0, 0, 313, 407);
};

const hal = new Image();
hal.src = 'fish.png';
hal.onload = function() {
    ctx2.drawImage(hal, 0, 0, 469, 350);
};

/*Egérmutató pozíciójának kiírása*/
let x = 0;
let y = 0;
function következő() {
    ctx1.clearRect(0, 0, 140, 60);
    ctx1.font = '20px Arial';
    ctx1.fillStyle = 'black';
    ctx1.fillText('(' + x + ',' + y + ')', 10, 50);
    requestAnimationFrame(következő);
}
következő();

/*Vonalak megrajzolása*/
ctx1.beginPath();
ctx1.moveTo(72, 147);
ctx1.lineTo(3, 236);
ctx1.lineTo(8, 298);
ctx1.lineTo(51, 368);
ctx1.lineTo(118, 403);
ctx1.lineTo(224, 376);
ctx1.lineTo(272, 309);
ctx1.lineTo(251, 222);
ctx1.lineTo(237, 178);

ctx2.beginPath();
ctx2.moveTo(3, 183);
ctx2.lineTo(16, 138);
ctx2.lineTo(45, 105);
ctx2.lineTo(84, 84);
ctx2.lineTo(128, 69);
ctx2.lineTo(172, 63);
ctx2.lineTo(217, 69);
ctx2.lineTo(261, 90);
ctx2.lineTo(294, 115);
ctx2.lineTo(326, 147);
ctx2.lineTo(339, 88);
ctx2.lineTo(367, 52);
ctx2.lineTo(409, 34);
ctx2.lineTo(453, 33);
ctx2.lineTo(465, 75);
ctx2.lineTo(458, 122);
ctx2.lineTo(430, 158);
ctx2.lineTo(391, 184);
ctx2.lineTo(430, 206);
ctx2.lineTo(458, 243);
ctx2.lineTo(462, 287);
ctx2.lineTo(451, 332);
ctx2.lineTo(409, 330);
ctx2.lineTo(367, 311);
ctx2.lineTo(339, 275);
ctx2.lineTo(327, 216);
ctx2.lineTo(294, 250);
ctx2.lineTo(256, 277);
ctx2.lineTo(217, 294);
ctx2.lineTo(172, 300);
ctx2.lineTo(126, 294);
ctx2.lineTo(80, 279);
ctx2.lineTo(44, 258);
ctx2.lineTo(14, 225);
ctx2.lineTo(3, 183);

/*Megrajzolt alakzat körvonalának definiálása*/
ctx1.lineWidth = 1;
ctx1.strokeStyle = 'black';
ctx1.stroke();

ctx2.lineWidth = 1;
ctx2.strokeStyle = 'black';
ctx2.stroke();

/*Első vászon törlése*/
//ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

/*Alakzat kitöltése*/
ctx2.fillStyle = 'turquoise';
ctx2.fill();

/*Szöveg kiírása*/
ctx1.font = '30px Arial';
ctx1.fillStyle = 'black';
ctx1.fillText('Giliszta', 10, 100);

ctx2.font = '30px Arial';
ctx2.fillStyle = 'black';
ctx2.fillText('Hal', 10, 50);

/*Hal díszítése*/
/*1. kör*/
ctx2.beginPath();
ctx2.arc(234, 130, 20, 0, 2 * Math.PI);
ctx2.fillStyle = 'salmon';
ctx2.fill();
/*2. kör*/
ctx2.beginPath();
ctx2.arc(271, 193, 20, 0, 2 * Math.PI);
ctx2.fillStyle = 'salmon';
ctx2.fill();
/*3. kör*/
ctx2.arc(213, 243, 20, 0, 2 * Math.PI);
ctx2.fillStyle = 'salmon';
ctx2.fill();


/*Egérmutató X és Y koordinátájának lekérdezése és eltárolása*/
document.addEventListener('mousemove', function(e) {
    x = e.offsetX;
    y = e.offsetY;
})