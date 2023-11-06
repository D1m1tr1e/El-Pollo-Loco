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

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the bottle bar.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // index 0....5
        let path = this.IMAGES_BOTTLE_BAR[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    /**
     * Simulates collecting a bottle, increasing the bottle amount.
     */
    collectBottle(){
        this.bottleAmount += 20;
        if (this.bottleAmount > 100) {
            this.bottleAmount = 100;
        }
    }

    /**
     * Resolves the corresponding percentage index based on the current percentage value.
     * @returns {number} The index corresponding to the percentage.
     */
    resolvePercentage() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 75) {
            return 4;
        } else if (this.percentage > 55) {
            return 3;
        } else if (this.percentage > 35) {
            return 2;
        } else if (this.percentage > 15) {
            return 1;
        } else {
            return 0;
        }
    }

}
