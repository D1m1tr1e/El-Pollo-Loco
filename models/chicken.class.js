class Chicken extends MoveableObject {
    speed = 0.15 + Math.random() * 0.5;
    x = 300 + Math.random() * 1800;
    y = 390;
    height = 70;
    width = 90;
    chickenKilled = false;
    killAnimationStarted = false;
    offset = {
        top: 10, // y-achse   das ist der Abstand von bottom -> bildet die Höhe des Chars
        bottom: 50, // y-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        left: 90, // x-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        right: -60// x-Achse das ist der Abstand von left -> bildet die Breite vom Char
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
        //this.animateChicken();
    }

    animateChicken() {
        const walkinInterval = setInterval(() => {
            this.moveLeft();
            this.x -= this.speed;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setInterval(() => {
            if (this.chickenKilled) {
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