class Character extends MoveableObject {
    world;
    currentImage = 0;
    x = 120;
    y = 170;
    speed = 5;
    height = 300;
    width = 150;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    WALKING_SOUND = new Audio ('audio/forest_footsteps.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animateCharacter();
    }

    animateCharacter() {

        setInterval(() => {
            this.WALKING_SOUND.pause();

            if (this.world.keyboard.RIGHT && this.x < 2100) {
                this.x += this.speed;
                this.mirrorImage = false;
                this.WALKING_SOUND.play();

            } if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.speed;
                this.mirrorImage = true;
                this.WALKING_SOUND.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                this.walkAnimation(this.IMAGES_WALKING);
            }
        }, 70);
    }

    jump() { }
}