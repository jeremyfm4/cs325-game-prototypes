"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    }
    
    var bouncy;
    
    function create() {
        game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(70, 100, 'player');
        this.player.body.gravity.y = 600;
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        var level = [
        'xxxxxxxxxxxxxxxxxxxxxx',
        '!         !          x',
        '!                 o  x',
        '!         o          x',
        '!                    x',
        '!     o   !    x     x',
        'xxxxxxxxxxxxxxxx!!!!!x',
        ];
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
            var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
            this.walls.add(wall);
            wall.body.immovable = true; 
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
            var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
            this.coins.add(coin);
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
            var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
            this.enemies.add(enemy);
        }
    }
}
}

function update() {
    if (this.cursor.left.isDown) 
        this.player.body.velocity.x = -200;
    else if (this.cursor.right.isDown) 
        this.player.body.velocity.x = 200;
    else 
       this.player.body.velocity.x = 0;
   if (this.cursor.up.isDown && this.player.body.touching.down) 
    this.player.body.velocity.y = -250;
    // Make the player and the walls collide
    game.physics.arcade.collide(this.player, this.walls);

// Call the 'takeCoin' function when the player takes a coin
game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

// Call the 'restart' function when the player touches the enemy
game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
}
// Function to kill a coin
takeCoin: function(player, coin) {
    coin.kill();
},

// Function to restart the game
restart: function() {
    game.state.start('main');
}
};
