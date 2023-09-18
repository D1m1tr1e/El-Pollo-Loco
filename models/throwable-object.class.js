class ThrowableObject extends MoveableObject {


    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    THROW_SOUND = new Audio('audio/throw.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
        this.animationStarted = false;
        this.animateBottle();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 12;
        }, 30);
    }

    animateBottle() {
        setInterval(() => {
            // code for sound control to avoid endless sound
            if (!this.animationStarted) {
                this.THROW_SOUND.play();
                this.animationStarted = true;
            }
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        }, 50);
    }

}
