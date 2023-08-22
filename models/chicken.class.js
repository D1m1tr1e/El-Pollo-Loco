class Chicken extends MoveableObject {

    x = 300 + Math.random() * 500;
    y = 340;
    height = 100;
    width = 110;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png')

    }
}