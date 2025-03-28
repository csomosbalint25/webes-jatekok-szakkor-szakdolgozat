/* Ez a feladat egy alapjátékból és egy továbbfejlesztésből áll. A alapjátékban az oldal betöltésekor
egy kör jelenik meg a canvas-en véletlen helyen, véletlen méretben és véletlen színben. Ez az egyszerű program
bevezeti a későbbi játékok alapstruktúráját és keretét (html, canvas, script, context), megismerteti a
tanulókat a canvas-re történő rajzolás alapjaival (kör rajzolása, kitöltése, körvonala), és bevezeti a függvény
írását és meghívását a véletlen egész számot generáló függvényen keresztül.

A továbbfejlesztésben, melyben egy szülinapi meghívót lehet majd kidíszíteni, előtérbe kerül a szövegek
canvas-re írása, a változók használata és a kattintás mint indítóesemény.

KAPCSOLAT A SCRATCH FEJLESZTŐI KÖRNYEZETTEL:
játéktér                                = canvas
kör rajzolása tollal, apró lépésekben   = .beginPath(), .arc(), .lineWidth, .strokeStyle, .stroke()
zárt alakzat kitöltése                  = .fillStyle(), .fill() 
blokkjaim                               = függvény */



/* ===== ALAPJÁTÉK ===== */

/*Canvas elérése*/
const canvas = document.querySelector('#vaszon');
const ctx = canvas.getContext('2d');

/*Kör megrajzolása*/
ctx.beginPath();
ctx.arc(véletlenEgész(50,550), véletlenEgész(50, 350), véletlenEgész(10, 50), 0, 2 * Math.PI);

/*Kör körvonala*/
ctx.lineWidth = 1;
ctx.strokeStyle = 'black';
ctx.stroke();

/*Kör kitöltése*/
ctx.fillStyle = 'rgb(' + véletlenEgész(0, 255) + ', ' + véletlenEgész(0, 255) + ', ' + véletlenEgész(0, 255) + ')';
ctx.fill();

function véletlenEgész(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



/* ===== TOVÁBBFEJLESZTÉS ===== */

ctx.font = '70px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Meghívó', 160, 120);

ctx.font = '30px Arial';
ctx.fillText('Sok szeretettel meghívlak a', 110, 230);

ctx.font = '30px Arial';
ctx.fillText('🎉SZÜLETÉSNAPI BULIMRA🎉', 70, 280);

document.addEventListener('click', function(e) {
    x = e.offsetX;
    y = e.offsetY;

    /*Kör megrajzolása*/
    ctx.beginPath();
    ctx.arc(x, y, véletlenEgész(10, 50), 0, 2 * Math.PI);

    /*Kör körvonala*/
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    /*Kör kitöltése*/
    ctx.fillStyle = 'rgb(' + véletlenEgész(0, 255) + ', ' + véletlenEgész(0, 255) + ', ' + véletlenEgész(0, 255) + ')';
    ctx.fill();
})