class MoveableObject {
    speed = 0.15;
    img;
    imageCache = [];
    mirrorImage = false;
    lifeEnergy = 100;
    pepeIsDead = false;

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

    //character.isColliding(chicken);
    isColliding(mObj) {
        return this.x + this.width > mObj.x &&
            this.y + this.height > mObj.y &&
            this.x < mObj.x &&
            this.y < mObj.y + mObj.height;
    }

    hit() {
        this.lifeEnergy -= 5;
        if (this.lifeEnergy <= 0) {
            this.lifeEnergy = 0;
            this.isDead();
        }
    }

    isDead(){
        if (this.lifeEnergy == 0) {
            this.pepeIsDead = true;
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

    hurtAnimation() {
        let i = this.currentImage % this.IMAGES_HURTING.length;
        let path = this.IMAGES_HURTING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    deadAnimation(){
        let i = this.currentImage % this.IMAGES_DEAD.length;
        let path = this.IMAGES_DEAD[i];
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