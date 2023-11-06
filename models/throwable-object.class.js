class ThrowableObject extends MoveableObject {
    speedY = 20;
    speed = 0.15;
    world;
    positionX = 12;
    deletable = false;
    bottleHitsBoss = false;
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
        this.animateBottle();
    }

    /**
     * Throws the object and applies gravity to it.
     */
    throw() {
        this.applyGravity();
        setInterval(() => {
            this.x += this.positionX;
        }, 30);
    }

    /**
     * Animates the throwable bottle.
     */
    animateBottle() {
        setInterval(() => {
            if (this.y >= 370 || this.bottleHitsBoss) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                this.positionX = 0;
                this.deletable = true;
                this.speedY = 0;
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
            }
        }, 50);
    }
}
