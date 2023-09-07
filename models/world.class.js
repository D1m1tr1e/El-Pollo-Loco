class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    landscape = level1.landscape;
    bottles = level1.bottles;
    coins = level1.coins;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.enemies.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            //console.log('colliding');
            this.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log('Collision with Character', enemy);
                }
            })
        }, 1000);
    }

    draw() {
        //resetet/löscht mein Cnavas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.landscape.forEach(land => { //zeichnet mir die Landschaft ein
            this.addToMap(land)
        });

        this.addToMap(this.character);  //zeichnet mir meinen Character rein

        this.enemies.forEach(enemy => { // zeichnet mir meine Gegener rein
            this.addToMap(enemy);
        });

        this.clouds.forEach(cloud => { //zeichnet mir die Wolken ein
            this.addToMap(cloud);
        });

        this.bottles.forEach(bottle => {
            this.addToMap(bottle);
        });

        this.coins.forEach(coin => {
            this.addToMap(coin);
        });

        this.ctx.translate(-this.camera_x, 0);

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
            this.flipImage(mObj);
        }

        mObj.draw(this.ctx);
        mObj.drawFrame(this.ctx);

        if (mObj.mirrorImage) {
            this.flipImageBack(mObj);
        }
    }

    flipImage(mObj) {
        this.ctx.save();
        this.ctx.translate(mObj.width, 0);
        this.ctx.scale(-1, 1);
        mObj.x = mObj.x * -1;
    }

    flipImageBack(mObj) {
        mObj.x = mObj.x * -1;
        this.ctx.restore();
    }

}