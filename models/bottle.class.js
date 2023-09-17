class Bottle extends MoveableObject {
    x = 350 + Math.random() * 1800;
    y = 390;
    height = 80;
    width = 80;

    constructor(imagePath, keyboard) {
        super().loadImage(imagePath);
    }
}