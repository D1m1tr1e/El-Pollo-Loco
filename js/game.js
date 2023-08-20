let canvas;
let world;
let ctx;



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('my Charerter is', world.character);
    
}