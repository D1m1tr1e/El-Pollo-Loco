let canvas;
let world;
let ctx;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function hiddenStartScreen(){
    document.getElementById('first-screen').classList.add('d-none');
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