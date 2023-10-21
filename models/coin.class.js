class Coin extends MoveableObject {

    IMAGES_GLOSSY_COINS =
    [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    currentImage = 0;
    offset = {
        top: 20, // y-achse   das ist der Abstand von bottom -> bildet die Höhe des Chars
        bottom: 10, // y-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        left: 150, // x-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        right: -130 // x-Achse das ist der Abstand von left -> bildet die Breite vom Char
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

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GLOSSY_COINS);
        }, 1000/3);
    }

}
