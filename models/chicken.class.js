class Chicken extends MoveableObject {
    speed = 0.15 + Math.random() * 0.5;
    x = 300 + Math.random() * 1800;
    y = 390;
    height = 70;
    width = 90;
    chickenKilled = false;
    killAnimationStarted = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    KILL_CHICKEN_SOUND = new Audio('audio/kill_enemy.mp3')

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animateChicken();
    }

    animateChicken() {
        const walkinInterval = setInterval(() => {
            this.moveLeft();
            this.x -= this.speed;
        }, 1000 / 60);

        setInterval(() => {
            // walk animation
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setInterval(() => {
            if (this.chickenKilled) {
                console.log('chicken ist tot');
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                this.stopPlayKillingSound();
                clearInterval(walkinInterval);
            }
        }, 100);
    }

    stopPlayKillingSound() {
        if (!this.killAnimationStarted) {
            this.KILL_CHICKEN_SOUND.play();
            this.killAnimationStarted = true;
        }
    }
}