class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    ctx;

    constructor(canvas) {
        this.ctx = ctx = canvas.getContext('2d');
        this.draw();
        this.showEnemeies();
    }

    draw() {
        this.ctx.drawImage(
            this.character.img,
            this.character.x,
            this.character.y,
            this.character.width,
            this.character.height);
    }
}