class Boss extends MoveableObject {
    x = 2400
    y = 20;
    height = 470;
    width = 270;
    currentImage = 0;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    BOSS_FIGHT_SOUND = new Audio('audio/boss_musik.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animateBoss();
    }

    animateBoss() {
        if (this.x <= 2000) {
            console.log('character hat den boss erreicht',this.x)
      
        setInterval(() => {
            // walk animation
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);
    }
}
}