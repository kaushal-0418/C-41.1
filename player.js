function Player() {
    this.w = 80;
    this.h = 144;

    this.x = floor(width/6 - this.w/6);
    this.y = floor((3 * height/8) - this.h/4);

    this.show = function() {
        image(im_car_red, this.x, this.y);
    }

    this.turnLeft = function() {
        this.x -= 5;
        this.x = constrain(this.x, 0, width-this.w);
    }

    this.turnRight = function() {
        this.x += 5;
        this.x = constrain(this.x, 0, width-this.w);
    }
}
