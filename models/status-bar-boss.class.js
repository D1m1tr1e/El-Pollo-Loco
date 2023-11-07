class StatusbarBoss extends DrawableObject {
    x = 500;
    y = 0;
    height = 50;
    width = 190;
    percentage = 100;
    IMAGES_HEALTH_STATUS_BOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.IMAGES_HEALTH_STATUS_BOSS);
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the status bar.
     * @param {number} percentage - The percentage value to be set.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // index 0....3
        let path = this.IMAGES_HEALTH_STATUS_BOSS[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the percentage value to determine the appropriate image index.
     * @returns {number} - The resolved index based on the percentage value.
     */
    resolvePercentage() {
        if (this.percentage == 100) {
            return 3;
        } else if (this.percentage > 60) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
