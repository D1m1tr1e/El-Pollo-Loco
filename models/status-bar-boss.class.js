class StatusbarBoss extends DrawableObject {
    x = 500;
    y = 0;
    height = 50;
    width = 190;
    percentage = 100;
    IMAGES_HEALTH_STATUS_BOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', //--> Index 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png', //--> Index 1
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png', //--> Index 2
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png' //--> Index 3
    ];

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.IMAGES_HEALTH_STATUS_BOSS);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // index 0....3
        let path = this.IMAGES_HEALTH_STATUS_BOSS[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

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
