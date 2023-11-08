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
    canThrow = true;

    COLLECT_COIN = new Audio('audio/collect_coin.mp3');
    COLLECT_BOTTLE = new Audio('audio/collect_bottle.mp3');
    KILL_CHICKEN_SOUND = new Audio('audio/kill_enemy.mp3');
    THROW_SOUND = new Audio('audio/throw.mp3');
    SPLASH_SOUND = new Audio('audio/splash.mp3');

    constructor(canvas, keyboard) {
        this.ctx = ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets up the game world.
     */
    setWorld() {
        this.character.world = this;
        this.boss.world = this;
    }

    /**
     * Runs collision and throw animation at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 60);
    }

    /**
     * Checks for collisions between game objects.
     */
    checkCollisions() {
        this.collisionChicken();
        this.collisionCoin();
        this.collisionBottle();
        this.collisionBoss();
        this.hitBossWithBottle();
    }

    /**
     * Checks for collisions between chciken and character.
     */
    collisionChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.chickenKilled = true;
                this.character.jump();
                this.KILL_CHICKEN_SOUND.play();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                }, 200);
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.lifeEnergy);
            }
        });
    }

    /**
     * Checks for collisions between boss and character.
     */
    collisionBoss() {
        if (this.character.isColliding(this.boss)) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.lifeEnergy);
        }
    }

    /**
     * Checks for collisions between coins and character.
     */
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

    /**
     * Checks for collisions between boss and thrown bottle.
     */
    hitBossWithBottle() {
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

    /**
     * Checks for collisions between bottle and character for collecting action.
     */
    collisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.COLLECT_BOTTLE.play();
                this.bottlebar.collectBottle();
                this.level.bottles.splice(index, 1);
                this.bottlebar.setPercentage(this.bottlebar.bottleAmount);
            }
        });
    }

    /**
     * Checks if the player is attempting to throw objects and handles the throwing process.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottlebar.bottleAmount > 0 && this.canThrow) {
            this.THROW_SOUND.play();
            this.character.startIdleTimer = 0;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y);
            this.throwableObject.push(bottle);
            this.bottlebar.bottleAmount -= 20;
            this.bottlebar.setPercentage(this.bottlebar.bottleAmount);

            this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 2000);
        }
        this.deleteThrownBottle();
    }

    /**
     * Deletes the thrown bottle from the list of throwable objects based on specific conditions.
     */
    deleteThrownBottle() {
        this.throwableObject.forEach((bottle, index) => {
            if (bottle.deletable) {
                this.SPLASH_SOUND.play()
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

    /**
     * Stops the playback of all sounds in the game.
     */
    stopPlayingSounds() {
        this.boss.BOSS_FIGHT_SOUND.volume = 0;
        this.boss.ATTACK_SOUND.volume = 0;
        this.boss.HIT_BOSS_SOUND.volume = 0;
        this.boss.GAME_WON_SOUND.volume = 0;
        this.character.GAME_LOST_SOUND.volume = 0;
        this.character.BACKGROUD_MUSIC.volume = 0;
        this.character.WALKING_SOUND.volume = 0;
        this.character.JUMP_SOUND.volume = 0;
        this.character.SNORING_SOUND.volume = 0;
        this.character.HURT_SOUND.volume = 0;
        this.COLLECT_COIN.volume = 0;
        this.COLLECT_BOTTLE.volume = 0;
        this.KILL_CHICKEN_SOUND.volume = 0;
        this.THROW_SOUND.volume = 0;
        this.SPLASH_SOUND.volume = 0;
    }

    /**
     * Mutes the sound effects in the game.
     */
    muteSound() {
        this.COLLECT_COIN.muted = true;
        this.COLLECT_BOTTLE.muted = true;
        this.KILL_CHICKEN_SOUND.muted = true;
        this.SPLASH_SOUND.muted = true;
        this.THROW_SOUND.muted = true;
    }

    /**
     * Unmutes the sound effects in the game.
     */
    unmuteSound() {
        this.COLLECT_COIN.muted = false;
        this.COLLECT_BOTTLE.muted = false;
        this.KILL_CHICKEN_SOUND.muted = false;
        this.SPLASH_SOUND.muted = false;
        this.THROW_SOUND.muted = false;
    }

    /**
     * Renders the game elements on the canvas.
     */
    draw() {
        if (this.game_paused == false) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.drawBackground();
            this.drawCharacter();
            this.ctx.translate(-this.camera_x, 0);
            this.drawFixedElements();
            this.drawBossAndEnemies();
            this.drawThrownObjects();
            this.ctx.translate(-this.camera_x, 0);

            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    /**
     * Draws the background elements of the game.
     */
    drawBackground() {
        this.level.landscape.forEach(land => {
            this.addToMap(land)
        });
        this.level.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });
    }

    /**
     * Draws the character in the game.
     */
    drawCharacter() {
        this.addToMap(this.character);
    }

    /**
     * Draws the fixed elements in the game.
     */
    drawFixedElements() {
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.statusbarBoss);
        this.addToMap(this.stausIconBoss);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws the boss and enemies in the game.
     */
    drawBossAndEnemies() {
        this.addToMap(this.boss);
        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
    }

    /**
     * Draws the thrown objects in the game.
     */
    drawThrownObjects() {
        this.throwableObject.forEach(thObj => {
            this.addToMap(thObj)
        });
        this.level.bottles.forEach(bottle => {
            this.addToMap(bottle);
        });
        this.level.coins.forEach(coin => {
            this.addToMap(coin);
        });
    }

    /**
     * Adds the specified object to the map.
     * @param {any} mObj - The object to be added to the map.
     */
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

    /**
     * Flips the image of the specified object.
     * @param {any} mObj - The object whose image should be flipped.
     */
    flipImage(mObj) {
        this.ctx.save();
        this.ctx.translate(mObj.width, 0);
        this.ctx.scale(-1, 1);
        mObj.x = mObj.x * -1;
    }

    /**
     * Reverts the flipped image of the specified object.
     * @param {any} mObj - The object whose flipped image should be reverted.
     */
    flipImageBack(mObj) {
        mObj.x = mObj.x * -1;
        this.ctx.restore();
    }
}