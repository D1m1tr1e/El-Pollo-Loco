class Boss extends MoveableObject {
    x = 2400
    y = 20;
    height = 470;
    width = 300;
    speed = 12;
    currentImage = 0;
    bossIsDead = false;
    bossHitted = false;
    alertInterval;
    attackInterval;
    attack = false;
    gameWonSoundPlayed = false;
    world;

    /**
    * An object representing the offset in a coordinate system.
    * @typedef {Object} Offset
    * @property {number} top - The distance from the bottom, forming the height of the character.
    * @property {number} bottom - The y-axis point in the coordinate system (Canvas orientation).
    * @property {number} left - The x-axis point in the coordinate system (Canvas orientation).
    * @property {number} right - The distance from the left, forming the width of the character.
    */
    offset = {
        top: 430, 
        bottom: 10, 
        left: 150,
        right: 130
    }
    IMAGES_BOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_BOSS_WALKIG = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_BOSS_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_BOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_BOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    BOSS_FIGHT_SOUND = new Audio('audio/boss_musik.mp3');
    ATTACK_SOUND = new Audio('audio/chicken-attack_sound.mp3');
    HIT_BOSS_SOUND = new Audio('audio/hit_boss.mp3');
    GAME_WON_SOUND = new Audio('audio/game_won.mp3');


    constructor() {
        super().loadImage(this.IMAGES_BOSS_ALERT[0]);
        this.loadImages(this.IMAGES_BOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALKIG);
        this.loadImages(this.IMAGES_BOSS_HURTING);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.animateBoss();
    }

    /**
    * Animates the boss with intervals.
    */
    animateBoss() {
        this.mainInterval = setInterval(() => {
            if (this.characterOnEndposition()) {
                this.handleBossActivation();
            }
            if (this.isDead()) {
                this.handleBossDeath();
            } else if (this.isHurt()) {
                this.handleBossHurting();
            }
            if (this.bossOnAttackPosition()) {
                this.attack = true;
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
                this.ATTACK_SOUND.play();
            } else {
                this.bossHitted = false;
            }
        }, 100);

        this.alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOSS_ALERT);
        }, 300);
    }


    /**
    * Checks if the character is on the end position.
    * @returns {boolean} Indicates if the character is on the end position.
    */
    characterOnEndposition() {
        return this.world.character.endPositionPepe;
    }

    /**
    * Handles the boss activation when not hit.
    */
    handleBossActivation() {
        if (!this.bossHitted) {
            this.BOSS_FIGHT_SOUND.play();
            clearInterval(this.alertInterval);
            this.moveLeft();
            this.playAnimation(this.IMAGES_BOSS_WALKIG);
        }
    }

    /**
    * Handles the boss's death.
    */
    handleBossDeath() {
        this.bossIsDead = true;
        this.playAnimation(this.IMAGES_BOSS_DEAD);
        this.y += 30;
        this.speed = 0;
        this.BOSS_FIGHT_SOUND.pause();
        this.GAME_WON_SOUND.play();
        setTimeout(() => {
            this.gameWon();
        }, 3000);
    }

    /**
    * Handles the boss when it's hurting.
    */
    handleBossHurting() {
        this.playAnimation(this.IMAGES_BOSS_HURTING);
        this.bossHitted = true;
        this.HIT_BOSS_SOUND.play();
        this.HIT_BOSS_SOUND.playbackRate = 3;
    }

    /**
    * Initiates the boss attack.
    */
    bossAttack() {
        this.attackInterval = setInterval(() => {
            if (this.bossOnAttackPosition()) {
                this.attack = true;
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
                this.ATTACK_SOUND.play();
            } else {
                this.bossHitted = false;
            }
        }, 100);
    }

    /**
    * Checks if the boss is in an attack position.
    * @returns {boolean} Indicates if the boss is in an attack position.
    */
    bossOnAttackPosition() {
        return (this.world.character.x + 120) > this.x;
    }

    /**
    * Handles the game state when the boss is dead.
    */
    gameWon() {
        if (this.bossIsDead) {
            this.world.game_paused = true;
            document.getElementById('game-won-screen').classList.remove('d-none');
            this.world.stopPlayingSounds();
        }
    }

    /**
    * Mutes all boss-related sounds.
    */
    muteSound() {
        this.BOSS_FIGHT_SOUND.muted = true;
        this.ATTACK_SOUND.muted = true;
        this.HIT_BOSS_SOUND.muted = true;
        this.GAME_WON_SOUND.muted = true;
    }

    /**
    * Unmutes all boss-related sounds.
    */
    unmuteSound() {
        this.BOSS_FIGHT_SOUND.muted = false;
        this.ATTACK_SOUND.muted = false;
        this.HIT_BOSS_SOUND.muted = false;
        this.GAME_WON_SOUND.muted = false;
    }

    /**
    * Stops the boss animation intervals.
    */
    stopAnimateBoss() {
        clearInterval(this.mainInterval);
        clearInterval(this.alertInterval);
        clearInterval(this.attackInterval);
    }
}




