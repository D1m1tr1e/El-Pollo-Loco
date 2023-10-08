class Boss extends MoveableObject {
    x = 2400
    y = 20;
    height = 470;
    width = 300;
    speed = 1;
    currentImage = 0;
    world;
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
    BOSS_FIGHT_SOUND = new Audio('audio/boss_musik.mp3');

    constructor() {
        super().loadImage(this.IMAGES_BOSS_ALERT[0]);
        this.loadImages(this.IMAGES_BOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALKIG);
        this.loadImages(this.IMAGES_BOSS_HURTING);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.animateBoss();
    }

    animateBoss() {
        const angryBossInterval = setInterval(() => {
            // walk animation
            this.playAnimation(this.IMAGES_BOSS_ALERT);
        }, 300);

        const moveBossInterval = setInterval(() => {
            if (this.world.character.endPositionPepe) {
                this.BOSS_FIGHT_SOUND.play();
                this.moveLeft();
                this.playAnimation(this.IMAGES_BOSS_WALKIG);
            }
        }, 75);

        setInterval(() => {
            if (this.isDead()) {
                console.log('Boss wurde besiegt');
                clearInterval(moveBossInterval);
                clearInterval(angryBossInterval);
                this.BOSS_FIGHT_SOUND.pause();
                this.playAnimation(this.IMAGES_BOSS_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_BOSS_HURTING);
                console.log('boss wurde verletzt')
            }
        }, 1000 / 5);
    }


}


