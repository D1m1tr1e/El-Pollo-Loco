class Bottle extends MoveableObject {
    x = 350 + Math.random() * 1800;
    y = 390;
    height = 80;
    width = 80;

    /**
    * An object representing the offset in a coordinate system.
    * @typedef {Object} Offset
    * @property {number} top - The distance from the bottom, forming the height of the character.
    * @property {number} bottom - The y-axis point in the coordinate system (Canvas orientation).
    * @property {number} left - The x-axis point in the coordinate system (Canvas orientation).
    * @property {number} right - The distance from the left, forming the width of the character.
    */
    offset = {
        top: 20, 
        bottom: 10, 
        left: 10, 
        right: 0 
    }

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}