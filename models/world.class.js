class World {
    character = new Character();
    statusbar = new Statusbar();
    statusbarBoss = new StatusbarBoss();
    stausIconBoss = new StatusIconBoss();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    boss = new Boss();
    throwableObject = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    game_paused = false;

    COLLECT_COIN = new Audio('audio/collect_coin.mp3');
    COLLECT_BOTTLE = new Audio('audio/collect_bottle.mp3');
    KILL_CHICKEN_SOUND = new Audio('audio/kill_enemy.mp3');

    constructor(canvas, keyboard) {
        this.ctx = ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.boss.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 70);
    }

    checkCollisions() {
        this.collisionChicken();
        this.collisionCoin();
        this.collisionBottle();
        this.collisionBoss();
        this.hitBossWithBottle();
    }

    collisionChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.chickenKilled = true;
                this.character.jump();
                this.KILL_CHICKEN_SOUND.play();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                }, 500);
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.lifeEnergy);
            }
        });
    }

    collisionBoss() {
        if (this.character.isColliding(this.boss)) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.lifeEnergy);
        }
    }

    collisionCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.COLLECT_COIN.play();
                this.coinbar.collectCoin();
                this.level.coins.splice(index, 1);
                this.coinbar.setPercentage(this.coinbar.coinAmount);
            }
        });
    }

    hitBossWithBottle() { //collision of the thrown bottle with the boss
        this.throwableObject.forEach((bottle, index) => {
            if (this.boss.isColliding(bottle)) {
                bottle.bottleHitsBoss = true;
                this.boss.hit();
                this.statusbarBoss.setPercentage(this.boss.lifeEnergy);
                this.boss.lifeEnergy -= 15;
                this.deleteThrownBottle();
            }
        });
    }

    collisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                console.log(this.character.isColliding(bottle));
                this.COLLECT_BOTTLE.play();
                this.bottlebar.collectBottle();
                this.level.bottles.splice(index, 1);
                this.bottlebar.setPercentage(this.bottlebar.bottleAmount);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottlebar.bottleAmount > 0) {
            this.character.startIdleTimer = 0;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y);
            this.throwableObject.push(bottle);
            this.bottlebar.bottleAmount -= 20;
            this.bottlebar.setPercentage(this.bottlebar.bottleAmount);
        }
        this.deleteThrownBottle();
    }

    deleteThrownBottle() {
        this.throwableObject.forEach((bottle, index) => {
            if (bottle.deletable) {
                setTimeout(() => {
                    this.throwableObject.splice(index, 1);
                }, 500);
                if (bottle.bottleHitsBoss) {
                    setTimeout(() => {
                        this.throwableObject.splice(index, 1);
                    }, 0);
                }
            }
        });
    }

    muteSound() {
        this.COLLECT_COIN.muted = true;
        this.COLLECT_BOTTLE.muted = true;
        this.KILL_CHICKEN_SOUND.muted = true;
    }

    unmuteSound(){
        this.COLLECT_COIN.muted = false;
        this.COLLECT_BOTTLE.muted = false;
        this.KILL_CHICKEN_SOUND.muted = false;
    }

    draw() {
        if (this.game_paused == false) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.level.landscape.forEach(land => {
                this.addToMap(land)
            });
            this.level.clouds.forEach(cloud => {
                this.addToMap(cloud);
            });
            this.addToMap(this.character);
            this.ctx.translate(-this.camera_x, 0);
            // ------  SPACE FOR FIXED OBJECTS ------
            this.addToMap(this.statusbar);
            this.addToMap(this.coinbar);
            this.addToMap(this.bottlebar);
            this.addToMap(this.statusbarBoss);
            this.addToMap(this.stausIconBoss);
            this.ctx.translate(this.camera_x, 0);
            // ------  SPACE FOR FIXED OBJECTS END------
            this.addToMap(this.boss);
            this.level.enemies.forEach(enemy => {
                this.addToMap(enemy);
            });
            this.throwableObject.forEach(thObj => {
                this.addToMap(thObj)
            });
            this.level.bottles.forEach(bottle => {
                this.addToMap(bottle);
            });
            this.level.coins.forEach(coin => {
                this.addToMap(coin);
            });
            this.ctx.translate(-this.camera_x, 0);

            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
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