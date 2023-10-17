class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof ThrowableObject || this instanceof Boss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            //
            ctx.rect(this.offset.left + this.x,
                this.offset.bottom + this.y,
                this.offset.right,
                this.offset.top);
            ctx.stroke();
        }
    }


}
