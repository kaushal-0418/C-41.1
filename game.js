var im_car_yellow;
var im_car_blue;
var im_boom;
var im_heart;
var font;
var playerSpeed = 7;
var opponents = [];
var roadMarkings = [];
var score = 0;
var lives = 5;

function preload() {
    im_car_green = loadImage('assets/Car_Green.png');
    im_car_red = loadImage('assets/Car_Red.png');
    im_boom = loadImage('assets/boom.png');
    im_heart = loadImage('assets/heart.png');
   
}

function setup() {
    createCanvas(600, 600);

    roadMarkings.push(new roadMarking());
    opponents.push(new Opponent());
    player = new Player();
}

function draw() {
    background(44, 44, 44);

    if (frameCount % 25 === 0) {
        roadMarkings.push(new roadMarking());
    }

    // Show road markings
    for (var i = roadMarkings.length - 1; i >= 0; i--) {
        roadMarkings[i].show();
        roadMarkings[i].update();

        // Remove road markings once the are off the screen
        if (roadMarkings[i].offscreen()) {
            roadMarkings.splice(i, 1);
        }
    }

    // New opponents appear after certain number of frames
    if (frameCount % 180 === 10) {
        opponents.push(new Opponent());
    }

    // Show opponents
    for (var i = opponents.length - 1; i >= 0; i--) {
        opponents[i].show();
        opponents[i].update();

        if (opponents[i].overtakenBy(player) && opponents[i].isOvertakenBy === false) {
            score += 5;
            opponents[i].isOvertakenBy = true;
        }

        // If opponents collide with the player, they get destroyed
        if (opponents[i].hits(player)) {
            opponents[i].boom();
            opponents.splice(i, 1);

            // Penalty for collision is -10, and you loose one life
            score = (score >= 10) ? (score - 10) : 0;
            lives--;
        }
        // Remove opponents once the are off the screen
        else if (opponents[i].offscreen()) {
            opponents.splice(i, 1);
        }
    }

    // Show the player
    player.show();

    // Game controls
    if (keyIsDown(LEFT_ARROW)) {
        player.turnLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.turnRight();
    }

    // Show player stats
    textSize(40);
    textAlign(LEFT);
    fill(255);
    text('Score: ' + score, 30, 60);

    for (var i = 0; i < lives; i++) {
        image(im_heart, 60 + (i * 100), height - 90);
    }

    if (score == 50) {
        noLoop();
        textSize(60);
        // textFont(font);
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        text('You Won', width / 6, height / 6);

    }

    // Check if game is over
    if (lives === 0) {
        noLoop();

        textSize(60);
        // textFont(font);
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        text('GAME OVER', width / 8, height / 8);
    }
}