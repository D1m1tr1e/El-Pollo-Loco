class MoveableObject {
    speed = 0.15;
    img;
    imageCache = [];
    mirrorImage = false;

    loadImage(path) {
        this.img = new Image(); // analog this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let moveActionImg = new Image();
            moveActionImg.src = path;
            this.imageCache[path] = moveActionImg;
        });
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
        this.mirrorImage = false;
    }

    jump() {
        this.speedY = 30;
    }

    walkAnimation() {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jumpAnimation() {
        let i = this.currentImage % this.IMAGES_JUMPING.length;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    isAboveGround() {
        return this.y < 170;
    }

}