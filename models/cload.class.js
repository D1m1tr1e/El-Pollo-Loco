class Cloud extends MoveableObject {
    x = Math.random() * 2900;
    y = 0;
    height = 300;
    width = 400;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.animateClouds()
    }

    animateClouds(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);
    }
}





