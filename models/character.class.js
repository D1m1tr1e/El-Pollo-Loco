class Character extends MoveableObject {
    world;
    x = 120;
    y = 180;
    speed = 5;
    height = 300;
    width = 150;
    speedY = 0;
    pepeIsDead = false;
    acceleratiodn = 2;
    endPositionPepe = false;
    startIdleTimer = 0;
    offset = {
        top: 275, // y-achse   das ist der Abstand von bottom -> bildet die Höhe des Chars
        bottom: 15, // y-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        left: 135, // x-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        right: -120 // x-Achse das ist der Abstand von left -> bildet die Breite vom Char
    }
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
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
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    WALKING_SOUND = new Audio('audio/forest_footsteps.mp3');
    JUMP_SOUND = new Audio('audio/jump.mp3');
    SNORING_SOUND = new Audio('audio/snoring.mp3');
    HURT_SOUND = new Audio('audio/hurt.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animateCharacter();
    }

    animateCharacter() {
        setInterval(() => {
            this.WALKING_SOUND.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.WALKING_SOUND.play();
                if (this.x == this.world.level.level_end_x) {
                    this.endPositionPepe = true;
                }
            }

            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
                this.mirrorImage = true;
                this.WALKING_SOUND.play();
            }

            if (!this.isAboveGround() && this.world.keyboard.UP || !this.isAboveGround() && this.world.keyboard.SPACE) {
                this.jump();
                this.JUMP_SOUND.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.animationDead();
            } else if (this.isHurt()) {
                this.animationHurting();
            } else if (this.isAboveGround()) {
                this.animationJumping();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animationMoving();
            } else {
                this.isIdle();
            }
        }, 90);
    }

    animationDead() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.pepeIsDead = true;
        this.gameOver();
    }

    animationHurting() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_HURTING);
        this.HURT_SOUND.play();
    }

    animationJumping() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_JUMPING);
    }

    animationMoving() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_WALKING);
    }

    isIdle() {
        let right = this.world.keyboard.RIGHT;
        let left = this.world.keyboard.LEFT;
        let up = this.world.keyboard.UP && this.world.keyboard.SPACE;
        let d = this.world.keyboard.D;
        this.startIdleTimer += 250;

        if (!this.right && !this.left && !this.up && !this.d && this.startIdleTimer <= 7000) {
            this.playAnimation(this.IMAGES_IDLE);
            this.SNORING_SOUND.pause();

        }
        if (!this.right && !this.left && !this.up && !this.d && this.startIdleTimer >= 7000) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.SNORING_SOUND.play();
        }
    }

    gameOver() {
        if (this.pepeIsDead) {
            this.world.game_paused = true;
            document.getElementById('game-over-screen').classList.remove('d-none');
        }
    }
}
