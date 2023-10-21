class Bottle extends MoveableObject {
    x = 350 + Math.random() * 1800;
    y = 390;
    height = 80;
    width = 80;
    offset = {
        top: 20, // y-achse   das ist der Abstand von bottom -> bildet die Höhe des Chars
        bottom: 10, // y-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        left: 100, // x-Achse Punkt im Koordinatensystem (Cavas Ausrichtung) 
        right: -80// x-Achse das ist der Abstand von left -> bildet die Breite vom Char
    }

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}