let canvas;
let world;
let ctx;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('first-screen').classList.add('d-none');
    initLevel();
    init();
}

function restartGame() {
    window.location.reload();
}

function openFullscreen() {
    console.log('button funtkioniert');
    let fullscreen = document.getElementById('main');
    document.getElementById('main').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen-lvl');
    document.getElementById('first-screen').classList.add('fullscreen');
    document.getElementById('start-display').classList.add('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    } if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    } if (e.code == 'ArrowUp') {
        keyboard.UP = true;
    } if (e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    } if (e.code == 'Space') {
        keyboard.SPACE = true;
    } if (e.code == 'KeyD') {
        keyboard.D = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    } if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    } if (e.code == 'ArrowUp') {
        keyboard.UP = false;
    } if (e.code == 'ArrowDown') {
        keyboard.DOWN = false;
    } if (e.code == 'Space') {
        keyboard.SPACE = false;
    } if (e.code == 'KeyD') {
        keyboard.D = false;
    }
});