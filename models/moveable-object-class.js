class MoveableObject {

    img;
    
    loadImage(path) {
        this.img = new Image(); // analog this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Move right');
    }

    moveLeft() { }
}