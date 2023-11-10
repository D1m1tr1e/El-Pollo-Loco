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

    /**
    * An object representing the offset in a coordinate system.
    * @typedef {Object} Offset
    * @property {number} top - The distance from the bottom, forming the height of the character.
    * @property {number} bottom - The y-axis point in the coordinate system (Canvas orientation).
    * @property {number} left - The x-axis point in the coordinate system (Canvas orientation).
    * @property {number} right - The distance from the left, forming the width of the character.
    */
    offset = {
        top: 275, // 275
        bottom: 15, // 15
        left: 80, // 80
        right: 20  // -30 
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
    BACKGROUD_MUSIC = new Audio('audio/backgroundmusic.mp3');
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
        this.BACKGROUD_MUSIC.volume = 0.3;
    }

    /**
     * Starts the character animation.
     */
    animateCharacter() {
        this.moveCharIntervall = setInterval(() => {
            this.movingCharacter();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimationsOfCharacter();
        }, 90);
    }

    /**
     * Moves the character based on user input and game conditions.
     */
    movingCharacter() {
        this.WALKING_SOUND.pause();
        if (this.canMoveRight()) {
            this.handleMovingRight();
        }
        if (this.canMoveLeft()) {
            this.handleMovingLeft();
        }
        if (this.canJump()) {
            this.handleJumping();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} - Indicates whether the character can move to the right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} - Indicates whether the character can move to the left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 100;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} - Indicates whether the character can jump.
     */
    canJump() {
        return !this.isAboveGround() && this.world.keyboard.UP || !this.isAboveGround() && this.world.keyboard.SPACE;
    }

    /**
     * Plays different animations of the character based on game conditions.
     */
    playAnimationsOfCharacter() {
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
    }

    /**
     * Handles the character's movement to the right.
     */
    handleMovingRight() {
        this.moveRight();
        this.WALKING_SOUND.play();
        if (this.x == this.world.level.level_end_x) {
            this.endPositionPepe = true;
            this.BACKGROUD_MUSIC.volume = 0;
        }
    }

    /**
     * Handles the character's movement to the left.
     */
    handleMovingLeft() {
        this.moveLeft();
        this.mirrorImage = true;
        this.WALKING_SOUND.play();
    }

    /**
     * Handles the character's jumping action.
     */
    handleJumping() {
        this.jump();
        this.JUMP_SOUND.play();
        this.y = 182;
    }

    /**
     * Handles the animation when the character is dead.
     */
    handleAnimationDead() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.BACKGROUD_MUSIC.pause();
        this.world.boss.BOSS_FIGHT_SOUND.pause();
        this.GAME_LOST_SOUND.play();
        this.pepeIsDead = true;
        this.world.boss.stopAnimateBoss();
        clearInterval(this.moveCharIntervall);
        this.y += 50;
        setTimeout(() => {
            this.gameOver();
        }, 3000);
    }

    /**
     * Handles the animation when the character is hurting.
     */
    animationHurting() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_HURTING);
        this.HURT_SOUND.play();
    }

    /**
     * Handles the animation when the character is jumping.
     */
    animationJumping() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * Handles the animation when the character is moving.
     */
    animationMoving() {
        this.startIdleTimer = 0;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Handles the game over state when the character is dead.
     */
    gameOver() {
        if (this.pepeIsDead) {
            this.world.game_paused = true;
            document.getElementById('game-over-screen').classList.remove('d-none');
            this.world.stopPlayingSounds();
        }
    }

    /**
     * Checks if the character is idle and performs appropriate actions.
     * @param {boolean} right - Indicates if the right key is pressed.
     * @param {boolean} left - Indicates if the left key is pressed.
     * @param {boolean} up - Indicates if the up key is pressed.
     * @param {boolean} d - Indicates if the d key is pressed.
     */
    isIdle(right, left, up, d) {
        this.cehckKeyControlAvtivities();
        this.startIdleTimer += 250;

        if (this.anyButtonPressed() && this.startIdleTimer <= 10000) {
            this.playAnimation(this.IMAGES_IDLE);
            this.SNORING_SOUND.pause();

        }
        if (this.anyButtonPressed() && this.startIdleTimer >= 10000) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.SNORING_SOUND.play();
        }
    }

    /**
     * Checks if any button is currently pressed.
     * @returns {boolean} - Indicates if any button is pressed.
     */
    anyButtonPressed() {
        return !this.right && !this.left && !this.up && !this.d;
    }

    /**
     * Checks the key control activities for the character.
     */
    cehckKeyControlAvtivities() {
        this.right = this.world.keyboard.RIGHT;
        this.left = this.world.keyboard.LEFT;
        this.up = this.world.keyboard.UP && this.world.keyboard.SPACE;
        this.d = this.world.keyboard.D;
    }

    /**
     * Mutes all the sounds associated with the character.
     */
    muteSound() {
        this.BACKGROUD_MUSIC.muted = true;
        this.WALKING_SOUND.muted = true;
        this.JUMP_SOUND.muted = true;
        this.SNORING_SOUND.muted = true;
        this.HURT_SOUND.muted = true;
        this.GAME_LOST_SOUND.muted = true;
    }

    /**
     * Unmutes all the sounds associated with the character.
     */
    unmuteSound() {
        this.BACKGROUD_MUSIC.muted = false;
        this.WALKING_SOUND.muted = false;
        this.JUMP_SOUND.muted = false;
        this.SNORING_SOUND.muted = false;
        this.HURT_SOUND.muted = false;
        this.GAME_LOST_SOUND.muted = false;
    }
}
