class BottleBar extends DrawableObject {
    x = 30;
    y = 90;
    height = 50;
    width = 190;

    IMAGES_COIN_BAR = [
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
    }
}
