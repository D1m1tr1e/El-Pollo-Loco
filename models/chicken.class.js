class Chicken extends MoveableObject {

    x = 300 + Math.random() * 500;
    y = 390;
    height = 70;
    width = 90;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png')

    }
}