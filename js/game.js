let canvas;
let world;
let ctx;
let keyboard = new Keyboard();
let isFullscreenModus = false;
let gameIsStarted = false;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('first-screen').classList.add('d-none');
    gameIsStarted = true;
    console.log('game gestarted', gameIsStarted)
    initLevel();
    init();
}

function restartGame() {
    window.location.reload();
}

function openInfo() {
    document.getElementById('description').classList.remove('d-none');
}

function closeWindow() {
    document.getElementById('description').classList.add('d-none');
}

function unmuteSound() {
    updateSoundCotrolsUnmute();
    world.character.unmuteSound();
    world.boss.unmuteSound();
    world.unmuteSound();
}

function muteSound() {
    updateSoundCotrolsMute();
    world.character.muteSound();
    world.boss.muteSound();
    world.muteSound();
}

function updateSoundCotrolsMute() {
    document.getElementById('mute').classList.remove('d-none');
    document.getElementById('unmute').classList.add('d-none');
    document.getElementById('ingame-mute').classList.remove('d-none');
    document.getElementById('ingame-unmute').classList.add('d-none');
}

function updateSoundCotrolsUnmute() {
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('unmute').classList.remove('d-none');
    document.getElementById('ingame-mute').classList.add('d-none');
    document.getElementById('ingame-unmute').classList.remove('d-none');
}

function openFullscreen() {
    let fullscreen = document.getElementById('main');
    if (isFullscreenModus) {
        exitFullscreen();
        removeFullscreenModusOnElement();
        isFullscreenModus = false;
    } else {
        setFullscreenModusOnElement();
        enterFullscreen(fullscreen);
        isFullscreenModus = true;
    }
}

function setFullscreenModusOnElement() {
    document.getElementById('main').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen-lvl');
    document.getElementById('first-screen').classList.add('fullscreen');
    document.getElementById('start-display').classList.add('fullscreen');
    document.getElementById('game-won-screen').classList.add('fullscreen');
    document.getElementById('gameover-img').classList.add('fullscreen');
    document.getElementById('game-over-screen').classList.add('fullscreen');
    document.getElementById('game-lost-img').classList.add('fullscreen');
}

function removeFullscreenModusOnElement() {
    document.getElementById('main').classList.remove('fullscreen');
    document.getElementById('canvas').classList.remove('fullscreen-lvl');
    document.getElementById('first-screen').classList.remove('fullscreen');
    document.getElementById('start-display').classList.remove('fullscreen');
    document.getElementById('game-won-screen').classList.remove('fullscreen');
    document.getElementById('gameover-img').classList.remove('fullscreen');
    document.getElementById('game-over-screen').classList.remove('fullscreen');
    document.getElementById('game-lost-img').classList.remove('fullscreen');
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