class Coin extends MoveableObject{

    constructor(imagePath, x, y, height, width){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}