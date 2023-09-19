class Coin extends MoveableObject {

    IMAGES_GLOSSY_COINS =
    [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    currentImage = 0;
     
    constructor(imagePath, x, y, height, width) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_GLOSSY_COINS);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GLOSSY_COINS);
        }, 1000/3);
    }

}
