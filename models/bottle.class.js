class Bottle extends MoveableObject {
    x = 200 + Math.random() * 1800;
    y = 390;
    height = 80;
    width = 80;
 
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
   
    }
}