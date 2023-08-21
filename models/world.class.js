class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
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

        //zeichnet mir meinen Character rein
        this.ctx.drawImage(
            this.character.img, this.character.x,
            this.character.y, this.character.width, this.character.height);

        // zeichnet mir meine Gegener rein
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            this.ctx.drawImage(
                enemy.img, enemy.x,
                enemy.y, enemy.width, enemy.height)
        }

        //Draw() wid immer weider aufgerufen
        //Hier wird eine self Variable definiert weil im späteren Code this nicht als this erkannt werden kann
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}