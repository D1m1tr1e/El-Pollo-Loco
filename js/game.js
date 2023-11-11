let canvas;
let world;
let ctx;
let keyboard = new Keyboard();
let isFullscreenModus = false;
let gameIsStarted = false;

/**
 * Initializes the game.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideIngameButtons();
    mobileBtnTouchEvents();
}

/**
 * Starts the game.
 */
function startGame() {
    gameIsStarted = true;
    hideStartScreen();
    initLevel();
    init();
}

/**
 * Hides the start screen UI elements.
 */
function hideStartScreen() {
    document.getElementById('first-screen').classList.add('d-none');
    document.getElementById('game-info').classList.add('d-none');
    document.getElementById('game-setting').classList.add('d-none');
    document.getElementById('fullscreen-button-start-screen').classList.add('d-none');
}

/**
 * Hides in-game buttons.
 */
function hideIngameButtons() {
    if (gameIsStarted) {
        document.getElementById('ingame-fullscreen').classList.remove('d-none');
        document.getElementById('ingame-unmute').classList.remove('d-none');
        document.getElementById('ingame-settings').classList.remove('d-none');
        // document.getElementById('joystick-mobile').classList.remove('d-none');
    }
}

/**
 * Restarts the game.
 */
function restartGame() {
    window.location.reload();
}

/**
 * Opens the game's information section.
 */
function openInfo() {
    document.getElementById('description').classList.remove('d-none');
    document.getElementById('settings').classList.add('d-none');
}

/**
 * Opens the game's settings section.
 */
function openSettings() {
    document.getElementById('settings').classList.remove('d-none');
    document.getElementById('description').classList.add('d-none');
}

/**
 * Closes the window.
 */
function closeWindow() {
    document.getElementById('description').classList.add('d-none');
    document.getElementById('settings').classList.add('d-none');
}

/**
 * Unmutes the game's sound.
 */
function unmuteSound() {
    updateSoundCotrolsUnmute();
    world.character.unmuteSound();
    world.boss.unmuteSound();
    world.unmuteSound();
}

/**
 * Mutes the game's sound.
 */
function muteSound() {
    updateSoundCotrolsMute();
    world.character.muteSound();
    world.boss.muteSound();
    world.muteSound();
}

/**
 * Updates the sound controls to mute.
 */
function updateSoundCotrolsMute() {
    document.getElementById('ingame-mute').classList.remove('d-none');
    document.getElementById('ingame-unmute').classList.add('d-none');
}

/**
 * Updates the sound controls to unmute.
 */
function updateSoundCotrolsUnmute() {
    document.getElementById('ingame-mute').classList.add('d-none');
    document.getElementById('ingame-unmute').classList.remove('d-none');
}

/**
 * Opens the fullscreen mode.
 */
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

/**
 * Sets the fullscreen mode on the element.
 */
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

/**
 * Removes the fullscreen mode from the element.
 */
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

/**
 * Enters the fullscreen mode for the specified element.
 * @param {HTMLElement} element The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits the fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Listens for keydown events.
 * @param {Event} e The event object.
 */
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

/**
 * Listens for keydown events.
 * @param {Event} e The event object.
 */
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

/**
 * Adds touch events for mobile buttons.
 */
function mobileBtnTouchEvents() {
    document.getElementById('mobile-btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobile-btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('mobile-btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobile-btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('mobile-btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('mobile-btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('mobile-btn-attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('mobile-btn-attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

