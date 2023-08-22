class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    cloads = [
        new Cload(),
        new Cload(),
    ];

    landscape =[
        new Landscape(),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        //resetet/löscht mein Cnavas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);  //zeichnet mir meinen Character rein

        this.enemies.forEach(enemy => { // zeichnet mir meine Gegener rein
            this.addToMap(enemy);
        });

       this.cloads.forEach(cload => { //zeichnet mir die Wolken ein
        this.addToMap(cload);
       });

       this.landscape.forEach(land => { //zeichnet mir die Landschaft ein
        this.addToMap(land)
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
        this.ctx.drawImage(mObj.img, mObj.x, mObj.y, mObj.width, mObj.height);
    }
}