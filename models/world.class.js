class World {
    character = new Character();
    statusbar = new Statusbar();
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
            this.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.lifeEnergy);
                    console.log(this.character.lifeEnergy)
                }
            })
        }, 200);
    }

    draw() {
        //resetet/löscht mein Cnavas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.landscape.forEach(land => { 
            this.addToMap(land)
        });

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);


        // ------  SPACE FOR FIXED OBJECTS ------
        this.addToMap(this.statusbar);
        this.ctx.translate(this.camera_x, 0);
        // ------  SPACE FOR FIXED OBJECTS END------


        this.enemies.forEach(enemy => { 
            this.addToMap(enemy);
        });

        this.clouds.forEach(cloud => { 
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