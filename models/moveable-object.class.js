class MoveableObject extends DrawableObject {
    speed = 0.15;
    mirrorImage = false;
    lifeEnergy = 100;
    lastHit = 0;
    acceleration = 2;
    offset = 50;

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
        } else {
            this.lastHit = new Date().getTime();// Zeitpunkt an dem Pepe verletzt wurde
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Zeitdifferenz die vergangen ist in ms von Jetzt bis zum letzten Schlag von PEPE 
        timePassed = timePassed / 1000; // Time difference in sek.
        return timePassed < 1;
    }

    isDead() {
        return this.lifeEnergy == 0;
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

    deadAnimation() {
        let i = this.currentImage % this.IMAGES_DEAD.length;
        let path = this.IMAGES_DEAD[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    throwBottleAnimation() {
        let i = this.currentImage % this.IMAGES_BOTTLE_ROTATE.length;
        let path = this.IMAGES_BOTTLE_ROTATE[i];
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
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return this.y < 600;
        } else {
            return this.y < 170;
        }
    }
}
