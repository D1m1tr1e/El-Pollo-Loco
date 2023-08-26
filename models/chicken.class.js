class Chicken extends MoveableObject {

    x = 300 + Math.random() * 500;
    y = 390;
    height = 70;
    width = 90;
    IMAGES_WALKING_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];

    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png')
        this.loadImages(this.IMAGES_WALKING_CHICKEN);

        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING_CHICKEN.length;
            let path = this.IMAGES_WALKING_CHICKEN[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.x -= 0.15;
        }, 100 / 60);
    }

}