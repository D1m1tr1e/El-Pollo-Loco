class Boss extends MoveableObject {
    x = 2400
    y = 20;
    height = 470;
    width = 300;
    speed = 1;
    currentImage = 0;
    bossIsDead = false;
    bossHitted = false;
    moveBossInterval;
    alertInterval;
    attackInterval;
    attack = false;
    gameWonSoundPlayed = false;
    world;
    offset = {
        top: 430, // y-achse   das ist der Abstand von bottom -> bildet die Höhe des Chars
        bottom: 10, // y-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        left: 150, // x-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        right: 130// x-Achse das ist der Abstand von left -> bildet die Breite vom Char
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

    animateBoss() {
        this.alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOSS_ALERT);
        }, 300);

        this.moveBossInterval = setInterval(() => {
            if (this.world.character.endPositionPepe) {
                this.handleBossActivation();
            }
        }, 75);

        setInterval(() => {
            if (this.isDead()) {
                this.handleBossDeath();
            } else if (this.isHurt()) {
                this.handleBossHurting();
            }
        }, 6000 / 30);
        this.bossAttack();
    }

    handleBossActivation() {
        if (!this.bossHitted) {
            this.BOSS_FIGHT_SOUND.play();
            this.moveLeft();
            this.playAnimation(this.IMAGES_BOSS_WALKIG);
        }
    }

    handleBossDeath() {
        this.bossIsDead = true;
        this.BOSS_FIGHT_SOUND.pause();
        this.playAnimation(this.IMAGES_BOSS_DEAD);
        this.y += 30;
        this.GAME_WON_SOUND.play();
        setTimeout(() => {
            this.gameWon();
        }, 3000);
        clearInterval(this.moveBossInterval);
    }

    handleBossHurting() {
        this.playAnimation(this.IMAGES_BOSS_HURTING);
        console.log(this.lifeEnergy);
        this.bossHitted = true;
        this.HIT_BOSS_SOUND.play();
        this.HIT_BOSS_SOUND.playbackRate = 3;
    }

    bossAttack() {
        this.attackInterval = setInterval(() => {
            if ((this.world.character.x + 120) > this.x) {
                this.attack = true;
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
                this.ATTACK_SOUND.play();
            } else {
                this.bossHitted = false;
            }
        }, 1000 / 30);
    }

    gameWon() {
        if (this.bossIsDead) {
            this.world.game_paused = true;
            document.getElementById('game-won-screen').classList.remove('d-none');
            this.stopPlayingSounds();
        }
    }

    stopPlayingSounds() {
        this.BOSS_FIGHT_SOUND.volume = 0;
        this.ATTACK_SOUND.volume = 0;
        this.HIT_BOSS_SOUND.volume = 0;
        this.GAME_WON_SOUND.volume = 0;
        this.world.character.GAME_LOST_SOUND.volume = 0;
        this.world.character.BACKGROUD_MUSIC.volume = 0;
        this.world.character.WALKING_SOUND.volume = 0;
        this.world.character.JUMP_SOUND.volume = 0;
        this.world.character.SNORING_SOUND.volume = 0;
        this.world.character.HURT_SOUND.volume = 0;
    }

    muteSound() {
        this.BOSS_FIGHT_SOUND.muted = true;
        this.ATTACK_SOUND.muted = true;
        this.HIT_BOSS_SOUND.muted = true;
        this.GAME_WON_SOUND.muted = true;
    }

    unmuteSound() {
        this.BOSS_FIGHT_SOUND.muted = false;
        this.ATTACK_SOUND.muted = false;
        this.HIT_BOSS_SOUND.muted = false;
        this.GAME_WON_SOUND.muted = false;
    }

    stopAnimateBoss() {
        clearInterval(this.alertInterval);
        clearInterval(this.moveBossInterval);
        clearInterval(this.hurtInterval);
        clearInterval(this.attackInterval);
        // Hier weitere clearInterval-Aufrufe für andere Intervalle, falls vorhanden
    }
}




