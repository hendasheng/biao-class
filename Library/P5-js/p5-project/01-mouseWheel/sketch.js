let img;
let title;

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
}

function draw() {
    background(255);
    logo();
}

function mouseWheel(event) {
    // console.log(event);
    moveA();
    moveC();
    moveD();
}

function moveA() {
    yA += event.delta;
    // console.log(yA);
    if (yA > 372)
        yA = 372;
    if (yA < -100)
        yA = -100;
}

function moveC() {
    yC -= event.delta;
    // console.log(yC);
    if (yC < 569)
        yC = 569;
    if (yC > document.body.clientHeight + 100)
        yC = document.body.clientHeight + 100;
}

function moveD() {
    yD -= event.delta;
    if (yD < 410)
        yD = 410;
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