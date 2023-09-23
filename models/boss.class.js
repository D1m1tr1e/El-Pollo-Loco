class Boss extends MoveableObject {
    x = 2400
    y = 20;
    height = 470;
    width = 300;
    speed = 1;
    currentImage = 0;
    bossStartMoving = false;
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

    BOSS_FIGHT_SOUND = new Audio('audio/boss_musik.mp3');

    constructor() {
        super().loadImage(this.IMAGES_BOSS_ALERT[0]);
        this.loadImages(this.IMAGES_BOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALKIG);
        this.animateBoss();

    }

    animateBoss() {
        setInterval(() => {
            // walk animation
            this.playAnimation(this.IMAGES_BOSS_ALERT);
        }, 300);

        setInterval(() => {
                if (this.world.character.endPositionPepe) {
                    this.BOSS_FIGHT_SOUND.play();
                    this.moveLeft();
                    this.playAnimation(this.IMAGES_BOSS_WALKIG);
                }
               
                //console.log(this.world.character.x)
               // console.log('Endposition erreicht', this.bossStartMoving)
        }, 75);
    }

    bossStatsToMove() {
        console.log(this.world.character.x);
        if (this.world.character.x == 200 && ! this.bossStartMoving) {
           // console.log('Endposition erreicht', this.bossStartMoving)
            this.bossStartMoving = false;

        }
    }


}


