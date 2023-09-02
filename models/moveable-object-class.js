class MoveableObject {
    speed = 0.15;
    img;
    imageCache = [];
    mirrorImage = false; 

    loadImage(path) {
        this.img = new Image(); // analog this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let moveActionImg = new Image();
            moveActionImg.src = path;
            this.imageCache[path] = moveActionImg;
        });
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    walkAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}