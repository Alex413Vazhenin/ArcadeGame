// Variables for enemies
var Enemy = function(x, y, ms, sprite) {
    // x and y coordinates
    this.x = x;
    this.y = y;

    // ms - movement speed
    this.ms = ms;

    // Generic enemy model
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.ms * dt;


    // Function for respawning off screen enemies
    if (this.x > 505) { // Canvas width is 505 in engine.js
        this.x = -100
        this.ms = Math.floor((Math.random() * 200) + 150) // Speed of the enemies with Math.random()
    }
    // Player collision check
    if (player.x < this.x + 60 &&
        player.x + 40 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) { // Player reset at starting position
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, ms, sprite) {
    this.x = 200;
    this.y = 380;
    this.ms = ms;
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.update = function() {
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

// Position reset when player reaches water (finish line)
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            this.x -= this.ms + 50;
            break;
        case 'right':
            this.x += this.ms + 50;
            break;
        case 'up':
            this.y -= this.ms + 30;
            break;
        case 'down':
            this.y += this.ms + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);

// Position of the enemies with Math.random()
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, Math.floor((Math.random() * 200) + 150));
    allEnemies.push(enemy);
    });

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
