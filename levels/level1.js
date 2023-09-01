const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Cload(),
        new Cload()
    ],
    [
        new Landscape('img/5_background/layers/air.png', 0, 0, 480, 720),
        new Landscape('img/5_background/layers/air.png', 719, 0, 480, 720),
        new Landscape('img/5_background/layers/air.png', 719*2, 0, 480, 720),

        new Landscape('img/5_background/layers/3_third_layer/1.png', 0, 160, 300, 720),
        new Landscape('img/5_background/layers/3_third_layer/2.png', 719, 160, 300, 720),
        new Landscape('img/5_background/layers/3_third_layer/1.png', 719*2, 160, 300, 720),

        new Landscape('img/5_background/layers/2_second_layer/1.png', 0, 160, 300, 720),
        new Landscape('img/5_background/layers/2_second_layer/2.png', 719, 160, 300, 720),
        new Landscape('img/5_background/layers/2_second_layer/1.png', 719*2, 160, 300, 720),

        new Landscape('img/5_background/layers/1_first_layer/1.png', 0, 190, 300, 720),
        new Landscape('img/5_background/layers/1_first_layer/2.png', 719, 190, 300, 720),
        new Landscape('img/5_background/layers/1_first_layer/1.png', 719*2, 190, 300, 720),
    ],

)