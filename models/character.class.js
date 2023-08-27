class Character extends MoveableObject {
    
x = 20;
y = 170;
height = 300;
width = 150;

IMAGES_WALKING_CHARACTER = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'];

currentImage = 0;

constructor(){
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
    this.loadImages(this.IMAGES_WALKING_CHARACTER);
    this.animateCharacter();
}

animateCharacter() {
    setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING_CHARACTER.length;
        let path = this.IMAGES_WALKING_CHARACTER[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 70);
}

jump() { }
}