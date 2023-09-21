class Level {
    enemies;
    clouds;
    landscape;
    bottles;
    coins;
    level_end_x = 2100;

    constructor(enemies, clouds, landscape, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.landscape = landscape;
        this.bottles = bottles;
        this.coins = coins;
    }

}