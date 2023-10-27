class Character extends MoveableObject {
    world;
    x = 120;
    y = 180;
    height = 300;
    width = 150;
    speed = 5;
    speedY = 0;
    pepeIsDead = false;
    acceleratiodn = 2;
    endPositionPepe = false;
    moveCharIntervall;
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
    BACKGROUD_MUSIC = new Audio('audio/backgroudmusic.mp3');
    GAME_LOST_SOUND = new Audio('audio/game_lost.mp3');

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
        this.BACKGROUD_MUSIC.play();
        this.BACKGROUD_MUSIC.loop = true;
    }

    animateCharacter() {
        this.moveCharIntervall = setInterval(() => {
            this.WALKING_SOUND.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.handleMovingRight();
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.handleMovingLeft();
            }
            if (!this.isAboveGround() && this.world.keyboard.UP || !this.isAboveGround() && this.world.keyboard.SPACE) {
                this.handleJumping();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.handleAnimationDead();
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

    handleMovingRight() {
        this.moveRight();
        this.WALKING_SOUND.play();
        if (this.x == this.world.level.level_end_x) {
            this.endPositionPepe = true;
            this.BACKGROUD_MUSIC.volume = 0;
        }
    }

    handleMovingLeft() {
        this.moveLeft();
        this.mirrorImage = true;
        this.WALKING_SOUND.play();
    }

    handleJumping() {
        this.jump();
        this.JUMP_SOUND.play();
    }

    handleAnimationDead() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.GAME_LOST_SOUND.play();
        this.pepeIsDead = true;
        this.world.boss.stopAnimateBoss();
        clearInterval(this.moveCharIntervall);
        this.y += 50;
        setTimeout(() => {
            this.gameOver();

        }, 3000);
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

    gameOver() {
        if (this.pepeIsDead) {
            this.world.game_paused = true;
            document.getElementById('game-over-screen').classList.remove('d-none');
            this.world.boss.stopPlayingSounds();
        }
    }

    isIdle(right, left, up, d) {
        this.cehckKeyControlAvtivities();
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

    cehckKeyControlAvtivities() {
        this.right = this.world.keyboard.RIGHT;
        this.left = this.world.keyboard.LEFT;
        this.up = this.world.keyboard.UP && this.world.keyboard.SPACE;
        this.d = this.world.keyboard.D;
    }

    muteSound() {
        this.BACKGROUD_MUSIC.muted = true;
        this.WALKING_SOUND.muted = true;
        this.JUMP_SOUND.muted = true;
        this.SNORING_SOUND.muted = true;
        this.HURT_SOUND.muted = true;
        this.GAME_LOST_SOUND.muted = true;
    }

    unmuteSound() {
        this.BACKGROUD_MUSIC.muted = false;
        this.WALKING_SOUND.muted = false;
        this.JUMP_SOUND.muted = false;
        this.SNORING_SOUND.muted = false;
        this.HURT_SOUND.muted = false;
        this.GAME_LOST_SOUND.muted = false;
    }

}
