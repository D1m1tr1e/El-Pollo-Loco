let canvas;
let world;
let ctx;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('my Charerter is', world.character);
    
}

window.addEventListener('keydown', (e) => {
    console.log(keyboard);
    console.log('lese mir den Code raus', e.code)
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true; 
    } if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }if (e.code == 'ArrowUp') {
        keyboard.UP = true;
    }if (e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }if (e.code == 'Space') {
        keyboard.SPACE = true;
    }
});