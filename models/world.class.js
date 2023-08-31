class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()];
    cloads = [
        new Cload(),
        new Cload()];
    landscape = [
        new Landscape('img/5_background/layers/air.png', 0, 0, 480, 720),
        new Landscape('img/5_background/layers/3_third_layer/1.png', 0, 160, 300, 720),
        new Landscape('img/5_background/layers/2_second_layer/1.png', 0, 160, 300, 720),
        new Landscape('img/5_background/layers/1_first_layer/2.png', 0, 190, 300, 720)
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
        this.enemies.world = this;
    }


    draw() {
        //resetet/löscht mein Cnavas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.landscape.forEach(land => { //zeichnet mir die Landschaft ein
            this.addToMap(land)
        });

        this.addToMap(this.character);  //zeichnet mir meinen Character rein

        this.enemies.forEach(enemy => { // zeichnet mir meine Gegener rein
            this.addToMap(enemy);
        });

        this.cloads.forEach(cload => { //zeichnet mir die Wolken ein
            this.addToMap(cload);
        });

        //Draw() wid immer weider aufgerufen
        //Hier wird eine self Variable definiert weil im späteren Code this nicht als this erkannt werden kann
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    //Zeichnet mir alle bewegten Elemente in die Welt ein
    addToMap(mObj) {
        if (mObj.mirrorImage) {
            this.ctx.save();
            this.ctx.translate(mObj.width, 0);
            this.ctx.scale(-1, 1);
            mObj.x = mObj.x * -1;
        }
        this.ctx.drawImage(mObj.img, mObj.x, mObj.y, mObj.width, mObj.height);
        if (mObj.mirrorImage) {
            mObj.x = mObj.x * -1;
            this.ctx.restore();
        }
    }
}