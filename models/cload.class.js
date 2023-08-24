class Cload extends MoveableObject {

    x = Math.random() * 500;
    y = 0;
    height = 300;
    width = 400;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.animateCloads()
    }

    animateCloads() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}





