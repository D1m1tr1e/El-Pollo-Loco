class MoveableObject {
    x = 120;
    y = 40;
    img;

    height = 300;
    width = 150;

    loadImage(path) {
        this.img = new Image(); // analog this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Move right');
    }

    moveLeft() { }
}