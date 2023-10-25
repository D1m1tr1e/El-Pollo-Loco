class MoveableObject extends DrawableObject {
    speed = 0.15;
    mirrorImage = false;
    lifeEnergy = 100;
    lastHit = 0;
    acceleration = 2;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /* isColliding(mObj) {
         return this.x + this.width > mObj.x &&
             this.y + this.height > mObj.y &&
             this.x < mObj.x &&
             this.y < mObj.y + mObj.height;
     }*/

    //character.isColliding(chicken);
    isColliding(mObj) {
        return this.x + this.width - this.offset.right > mObj.x + mObj.offset.left &&
            this.y + this.height - this.offset.bottom > mObj.y + mObj.offset.top &&
            this.x + this.offset.bottom < mObj.x + mObj.width - mObj.offset.right &&
            this.y < mObj.y + mObj.height;
    }
    /* //character.isColliding(chicken);
     isColliding(mObj) {
         return this.x + this.width - this.offset.right > mObj.x + mObj.offset.left &&
             this.y + this.height - this.offset.bottom > mObj.y + mObj.offset.top &&
             this.x + this.offset.bottom < mObj.x + mObj.width - mObj.offset.right &&
             this.y + this.offset.top < mObj.y + mObj.height - mObj.offset.bottom;
     }*/

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
        return this.lifeEnergy <= 0;
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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30); //1000 / 30
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return this.y < 370;
        } else {
            return this.y < 170;
        }
    }
}
