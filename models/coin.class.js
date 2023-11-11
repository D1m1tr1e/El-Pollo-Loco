class Coin extends MoveableObject {

    IMAGES_GLOSSY_COINS =
    [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    currentImage = 0;

    /**
    * An object representing the offset in a coordinate system.
    * @typedef {Object} Offset
    * @property {number} top - The distance from the bottom, forming the height of the character.
    * @property {number} bottom - The y-axis point in the coordinate system (Canvas orientation).
    * @property {number} left - The x-axis point in the coordinate system (Canvas orientation).
    * @property {number} right - The distance from the left, forming the width of the character.
    */
    offset = {
        top: 20, 
        bottom: 10, 
        left: 100,  //140
        right: -120 //-130
    }
    
    constructor(imagePath, x, y, height, width) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_GLOSSY_COINS);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.animateCoins();
    }

    /**
     * Animates the coins by playing the animation.
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GLOSSY_COINS);
        }, 1000/3);
    }

}
