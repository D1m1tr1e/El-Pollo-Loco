class MoveableObject {

    img;
    imageCache = [];

    loadImage(path) {
        this.img = new Image(); // analog this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let moveActionImg = new Image();
            moveActionImg.src = path;
            this.imageCache[path] = moveActionImg;
        });
    }
}