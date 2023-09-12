const level1 = new Level(
    [
        new Chicken(),
       // new Chicken(),
       // new Chicken(),
       // new Chicken(),
       // new Chicken(),
       // new Chicken(),
       // new Chicken(),
       // new Chicken(),
        new Boss(),
        
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],
    [
        new Landscape('img/5_background/layers/air.png', 0, 0, 480, 720),
        new Landscape('img/5_background/layers/air.png', 719, 0, 480, 720),
        new Landscape('img/5_background/layers/air.png', 719 * 2, 0, 480, 720),
        new Landscape('img/5_background/layers/air.png', 719 * 3, 0, 480, 720),

        new Landscape('img/5_background/layers/3_third_layer/1.png', 0, 160, 300, 720),
        new Landscape('img/5_background/layers/3_third_layer/2.png', 719, 160, 300, 720),
        new Landscape('img/5_background/layers/3_third_layer/1.png', 719 * 2, 160, 300, 720),
        new Landscape('img/5_background/layers/3_third_layer/2.png', 719 * 3, 160, 300, 720),

        new Landscape('img/5_background/layers/2_second_layer/1.png', 0, 160, 300, 720),
        new Landscape('img/5_background/layers/2_second_layer/2.png', 719, 160, 300, 720),
        new Landscape('img/5_background/layers/2_second_layer/1.png', 719 * 2, 160, 300, 720),
        new Landscape('img/5_background/layers/2_second_layer/2.png', 719 * 3, 160, 300, 720),

        new Landscape('img/5_background/layers/1_first_layer/1.png', 0, 190, 300, 720),
        new Landscape('img/5_background/layers/1_first_layer/2.png', 719, 190, 300, 720),
        new Landscape('img/5_background/layers/1_first_layer/1.png', 719 * 2, 190, 300, 720),
        new Landscape('img/5_background/layers/1_first_layer/2.png', 719 * 3, 190, 300, 720),
    ],
    [
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
    ],
    [
        new Coin('img/8_coin/coin_1.png', 2000, 280 ,170, 170),
        new Coin('img/8_coin/coin_1.png', 550, 200, 170, 170),
        new Coin('img/8_coin/coin_1.png', 1000, 280, 170, 170),
        new Coin('img/8_coin/coin_1.png', 550, 120, 170, 170),
    ]
)