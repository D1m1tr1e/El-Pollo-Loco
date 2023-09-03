class Bottle extends MoveableObject {
    x = 200 + Math.random() * 1800;
    y = 390;
    height = 80;
    width = 80;
 
    constructor(imagePath) {
        super().loadImage(imagePath);
   
    }
}