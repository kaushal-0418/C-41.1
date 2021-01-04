function roadMarking() {
    this.w = 40;
    this.h = 60;

    this.x = floor(width/2 - this.w/2);
    this.y = 10;

    this.show = function() {
        strokeWeight(3);
        fill(295, 147, 78);
        rect(this.x, this.y, this.w, this.h);
    }

    this.update = function() {
        this.y += playerSpeed;
    }

    this.offscreen = function() {
        return (this.y > height);
    }
}
