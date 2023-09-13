class CoinBar extends DrawableObject {
    x = 30;
    y = 45;
    height = 50;
    width = 190;
    percentage = 100;
    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];


    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.loadImages(this.IMAGES_COIN_BAR);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // index 0....5
        let path = this.IMAGES_COIN_BAR[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    resolvePercentage() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
