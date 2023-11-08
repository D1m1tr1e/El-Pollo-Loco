class Chicken extends MoveableObject {
    speed = 0.15 + Math.random() * 0.5;
    x = 500 + Math.random() * 1800;
    y = 390;
    height = 70;
    width = 90;
    chickenKilled = false;
    killAnimationStarted = false;
    walkinInterval;

    /**
    * An object representing the offset in a coordinate system.
    * @typedef {Object} Offset
    * @property {number} top - The distance from the bottom, forming the height of the character.
    * @property {number} bottom - The y-axis point in the coordinate system (Canvas orientation).
    * @property {number} left - The x-axis point in the coordinate system (Canvas orientation).
    * @property {number} right - The distance from the left, forming the width of the character.
    */
    offset = {
        top: 10,
        bottom: 50,
        left: 100, //90
        right: -50 //-60
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animateChicken();
    }

    /**
     * Animates the chicken's movement and walking animation.
     */
    animateChicken() {
        this.walkinInterval = setInterval(() => {
           // this.moveLeft();
          //  this.x -= this.speed;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setInterval(() => {
            if (this.chickenKilled) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                clearInterval(this.walkinInterval);
            }
        }, 100);
    }

}