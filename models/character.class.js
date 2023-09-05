class Character extends MoveableObject {
    world;
    currentImage = 0;
    x = 120;
    y = 30;
    speed = 5;
    height = 300;
    width = 150;
    speedY = 0;
    acceleration = 2;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    WALKING_SOUND = new Audio('audio/forest_footsteps.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animateCharacter();
    }


    animateCharacter() {
        setInterval(() => {
            this.WALKING_SOUND.pause();

            if (this.world.keyboard.RIGHT && this.x < 2100) {
                this.moveRight();
                this.WALKING_SOUND.play();
            }

            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
                this.mirrorImage = true;
                this.WALKING_SOUND.play();
            }

            if (!this.isAboveGround() && this.world.keyboard.UP || !this.isAboveGround() && this.world.keyboard.SPACE) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.jumpAnimation(this.IMAGES_JUMPING);

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // walk animation
                    this.walkAnimation(this.IMAGES_WALKING);
                }
            }
        }, 70);
    }



}