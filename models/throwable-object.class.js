class ThrowableObject extends MoveableObject {


    /* IMAGES_BOTTLE_ROTATE = [
         'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
         'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
         'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
         'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
     ];*/

    constructor() {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = 120;
        this.y = 200;
        // this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        //this.animateBottle();
    }

    animateBottle() {
        if (this.world.keyboard.D) {
            console.log('ich werfe eine falsche');
        }
    }
}
