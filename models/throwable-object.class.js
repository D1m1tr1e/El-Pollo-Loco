class ThrowableObject extends MoveableObject {


    /* IMAGES_BOTTLE_ROTATE = [
         'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
         'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
         'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
         'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
     ];*/

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 30);
    }
}
