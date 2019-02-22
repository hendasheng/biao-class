let img;
let title;
let container;

let imgA, imgB, imgC, imgD;

let yA = -100;
let yC = document.body.clientHeight + 100;
let yD = document.body.clientHeight + 100;


function preload() {
    imgA = loadImage("./img/01.png");
    imgB = loadImage("./img/02.png");
    imgC = loadImage("./img/03.png");
    imgD = loadImage("./img/logo-font.png");
}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // console.log(yA, yC, yD);
    container = select('#container');
}

function draw() {
    background(255);
    logo();
}

function mouseWheel(event) {
    moveA();
    moveC();
    moveD();
}

function moveA() {
    yA += event.delta;
    // console.log(yA);
    if (yA > 389)099234
        yA = 389;
    if (yA < -100)
        yA = -100;
}

function moveC() {
    yC -= event.delta;
    // console.log(yC);
    if (yC < 522)
        yC = 522;
    if (yC > document.body.clientHeight + 100)
        yC = document.body.clientHeight + 100;
}

function moveD() {
    yD -= event.delta;
    if (yD < 320)
        yD = 320;
    if (yD > document.body.clientHeight + 300)
        yD = document.body.clientHeight + 300;
}

function logo() {
    imageMode(CENTER);
    image(imgA, window.innerWidth / 2, yA);
    image(imgB, window.innerWidth / 2, window.innerHeight / 2 - 200);
    image(imgC, window.innerWidth / 2, yC);
    image(imgD, window.innerWidth / 2, yD + 400);
}