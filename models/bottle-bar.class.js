class BottleBar extends DrawableObject {
    x = 30;
    y = 90;
    height = 50;
    width = 190;
    percentage = 100;
    bottleAmount = 0;

    IMAGES_BOTTLE_BAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    COLLECT_BOTTLE = new Audio('audio/collect_bottle.mp3');

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // index 0....5
        let path = this.IMAGES_BOTTLE_BAR[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    collectBottle(){
        this.bottleAmount += 20;
        if (this.bottleAmount > 100) {
            this.bottleAmount = 100;
        }
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
