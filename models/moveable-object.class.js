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

    /**
     * Checks if the current object is colliding with another object.
     * @param {object} mObj - The other object to check collision with.
     * @returns {boolean} - Returns true if collision is detected, otherwise false.
     */
    isColliding(mObj) {
        return this.x + this.width - this.offset.right > mObj.x + mObj.offset.left &&
            this.y + this.height - this.offset.bottom > mObj.y + mObj.offset.top &&
            this.x + this.offset.bottom < mObj.x + mObj.width - mObj.offset.right &&
            this.y < mObj.y + mObj.height;
    }

    /**
     * Reduces the life energy of the object and updates the last hit time.
     */
    hit() {
        this.lifeEnergy -= 2;
        if (this.lifeEnergy <= 0) {
            this.lifeEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt based on the last hit time.
     * @returns {boolean} - Whether the object is hurt or not.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead based on its life energy.
     * @returns {boolean} - Whether the object is dead or not.
     */
    isDead() {
        return this.lifeEnergy <= 0;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.mirrorImage = false;
    }

    /**
     * Initiates a jump speed for the object.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Plays the animation of the object.
     * @param {Array} images - The array of images to be played as animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Whether the object is above the ground or not.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 370;
        } else {
            return this.y < 170;
        }
    }
}
