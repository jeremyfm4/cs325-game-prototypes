"use strict";

GameStates.makeGame = function( game, shared ) {
    
    var gameMusic;
    var arrowKey;
    var keyCount = 0;
    var keyText;
    var playerHealth = 3;
    var energy = 100;
    var invulnTimer = 0;
    var nextFireAngel1 = 0;
    var nextFireAngel2 = 0;
    var recharge = 0;
    var bullet1;
    var bullet2;
    var beam;
    var healthText;
    var energyText;
    var healthbar;
    var healthbarOutline;
    var energybar;
    var energybarOutline;
    var returnToMain;
    
    var angel1;
    var angel2;
    var angelCanon;
    var angelDog;
    var angelHead;
    var bullets;
    var beams;
    var player;
    var barrierStatus = false;
    
    var doorGroup;
    var keyGroup;
    var tileGroup;
    var tileLavaGroup;
    var tileCrackedGroup;
    var tileFinish;
    
    //resets game values and return player to main menu
    function returnFunc() {
        playerHealth = 3;
        energy = 100;
        keyCount = 0;
        invulnTimer = 0;
        gameMusic.stop();
        game.state.start('MainMenu');
    }
    
    return {
        create: function () {
            //increase boundary of game
            game.world.setBounds(0, 0, 3500, 1500);
            
            //sets random color as background
            game.stage.backgroundColor = 0xc5dbd9
            
            //add game audio
            gameMusic = game.add.audio('gameMusic');
            gameMusic.play();
            
            
            //create bullets group with physics enabled for angel bullets
            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(100, 'bulletGun');
            bullets.setAll('checkWorldBounds', true);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('anchor.y', 0.5);
            bullets.setAll('anchor.x', 0.5);
            
            //create bullets group with physics enabled for cannnon beam
            beams = game.add.group();
            beams.enableBody = true;
            beams.createMultiple(100, 'bulletBeam');
            beams.physicsBodyType = Phaser.Physics.ARCADE;
            beams.setAll('checkWorldBounds', true);
            beams.setAll('outOfBoundsKill', true);
            beams.setAll('anchor.y', 0.5);
            beams.setAll('anchor.x', 0.5);
            
            //create and set base tile group
            tileGroup = game.add.group();
            tileGroup.enableBody = true;
            tileGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileGroup.create(100, 1350, 'tile');
            tileGroup.create(600, 1350, 'tile');
            tileGroup.create(750, 1350, 'tile');
            tileGroup.create(900, 1350, 'tile');
            tileGroup.create(1050, 1350, 'tile');
            tileGroup.create(1150, 1350, 'tile');
            
            tileGroup.create(1600, 1350, 'tile');
            tileGroup.create(2100, 1350, 'tile');
            tileGroup.create(2250, 1350, 'tile');
            tileGroup.create(2400, 1350, 'tile');
            tileGroup.create(2550, 1350, 'tile');
            tileGroup.create(2700, 1350, 'tile');
            tileGroup.create(2700, 1200, 'tile');
            
            tileGroup.create(2250, 1050, 'tile');
            tileGroup.create(2400, 1050, 'tile');
            tileGroup.create(2550, 1050, 'tile');
            tileGroup.create(2700, 1050, 'tile');
            tileGroup.create(3350, 1050, 'tile');
            
            tileGroup.create(3350, 900, 'tile');
            tileGroup.create(3350, 750, 'tile');
            tileGroup.create(2900, 600, 'tile');
            tileGroup.create(2900, 450, 'tile');
            tileGroup.create(2900, 150, 'tile');
            tileGroup.create(3350, 300, 'tile');
            tileGroup.create(3350, 150, 'tile');
            
            tileGroup.create(2100, 750, 'tile');
            tileGroup.create(1500, 750, 'tile');
            
            tileGroup.create(1450, 1350, 'tile');
            tileGroup.create(1150, 1200, 'tile');
            tileGroup.create(1150, 1050, 'tile');
            tileGroup.create(850, 900, 'tile');
            tileGroup.create(550, 750, 'tile');
            tileGroup.setAll('body.immovable', true);
            
            //create and set lava tile group
            tileLavaGroup = game.add.group();
            tileLavaGroup.enableBody = true;
            tileLavaGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileLavaGroup.create(350, 1310, 'tileLava');
            
            tileLavaGroup.create(2850, 1125, 'tileLava');
            tileLavaGroup.create(3000, 1125, 'tileLava');
            tileLavaGroup.create(3150, 1125, 'tileLava');
            tileLavaGroup.create(3300, 1125, 'tileLava');
            
            tileLavaGroup.create(3350, 600, 'tileLava');
            tileLavaGroup.create(3350, 450, 'tileLava');
            tileLavaGroup.create(2900, 300, 'tileLava');
            tileLavaGroup.setAll('body.immovable', true);
            
            //create and set cracked tile group
            tileCrackedGroup = game.add.group();
            tileCrackedGroup.enableBody = true;
            tileCrackedGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileCrackedGroup.create(2100, 600, 'tileCracked');
            tileCrackedGroup.create(1800, 600, 'tileCracked');
            tileCrackedGroup.create(1500, 600, 'tileCracked');
            
            tileCrackedGroup.create(2850, 1050, 'tileCracked');
            tileCrackedGroup.create(3000, 1050, 'tileCracked');
            tileCrackedGroup.create(3150, 1050, 'tileCracked');
            tileCrackedGroup.create(3300, 1050, 'tileCracked');
            
            tileCrackedGroup.create(2900, 0, 'tileCracked');
            tileCrackedGroup.setAll('body.immovable', true);
            tileCrackedGroup.setAll('health', 50);
            
            //create and set door group
            doorGroup = game.add.group();
            doorGroup.enableBody = true;
            doorGroup.physicsBodyType = Phaser.Physics.ARCADE;
            doorGroup.create(2250, 1200, 'tileDoor');
            doorGroup.create(2400, 1200, 'tileDoor');
            doorGroup.setAll('body.immovable', true);
            
            //create and set key group
            keyGroup = game.add.group();
            keyGroup.enableBody = true;
            keyGroup.physicsBodyType = Phaser.Physics.ARCADE;
            keyGroup.create(550, 625, 'key');
            keyGroup.create(3350, 25, 'key');
            
            //create and set finish tile
            tileFinish = game.add.sprite(2550, 1200, 'tileFinish');
            game.physics.enable(tileFinish);
            
            //create player with physics enabled for player to control
            player = game.add.sprite(100,  1250, 'player');
            game.camera.follow(player);
            player.anchor.setTo(0.5, 0.5);
            game.physics.enable(player);
            player.body.gravity.y = 500;
            player.body.collideWorldBounds = true;
            
            //create and set basic angel enemies
            angel1 = game.add.sprite(400, 800, 'angel');
            angel2 = game.add.sprite(550, 1050, 'angel');
            
            angelCanon = game.add.sprite(1850, 800, 'angelCanon');
            
            angelDog = game.add.sprite(650, 1250, 'angelDog');
            angelDog.anchor.setTo(.5, 1);
            game.physics.enable(angelDog);
            angelDog.body.gravity.y = 500;
            
            angelHead = game.add.sprite(0, 800, 'angelHead');
            angelHead.anchor.setTo(.5, .5);
            game.physics.enable(angelHead);
            
            //creates key text, health bar, and energy bar
            keyText = game.add.text(350, 25, "Keys: " + keyCount);
            keyText.fixedToCamera = true;
            
            energybarOutline = game.add.sprite(500, 25, 'healthOutline');
            energybar = game.add.sprite(500, 25, 'energy');
            energybarOutline.fixedToCamera = true;
            energybar.fixedToCamera = true;
            energyText = game.add.text(505, 25, "Energy: " + energy, {fill: "#ffffff"});
            energyText.fixedToCamera = true;
            
            healthbarOutline = game.add.sprite(100, 25, 'healthOutline');
            healthbar = game.add.sprite(100, 25, 'health');
            healthbarOutline.fixedToCamera = true;
            healthbar.fixedToCamera = true;
            healthText = game.add.text(105, 25, "Health: " + playerHealth, {fill: "#ffffff"});
            healthText.fixedToCamera = true;
            
            //creates button to return to main menu
            returnToMain = game.add.button(725, 0, 'return', returnFunc);
            returnToMain.fixedToCamera = true;
            
            //binds arrow key inputs
            arrowKey = game.input.keyboard.createCursorKeys();
        },
    
        update: function () {
            //collision detection
            game.physics.arcade.collide(angelDog, tileGroup);
            game.physics.arcade.collide(player, angelDog, this.touch);
            game.physics.arcade.collide(player, angelHead, this.touch);
            game.physics.arcade.collide(player, tileGroup);
            game.physics.arcade.collide(player, tileLavaGroup, this.touch);
            game.physics.arcade.collide(player, tileCrackedGroup, this.breakTile);
            game.physics.arcade.collide(player, tileFinish, this.finish);
            game.physics.arcade.collide(player, keyGroup, this.collectKey);
            game.physics.arcade.collide(player, doorGroup, this.openDoor);
            game.physics.arcade.collide(player, bullets, this.touchBullet);
            game.physics.arcade.collide(player, beams, this.touchBeam);
            
            //player dies if hp reaches 0 or touches the bottom boundary
            if(playerHealth == 0 || player.body.onFloor()) {
                playerHealth = 3;
                energy = 100;
                keyCount = 0;
                invulnTimer = 0;
                gameMusic.stop();
                this.game.state.restart();
            }
            
            //right movement
            if(arrowKey.right.isDown) {
                player.body.velocity.x = 200;
            }
            
            //left movement
            else if(arrowKey.left.isDown) {
                player.body.velocity.x = -200;
            }
            
            else {
                player.body.velocity.x = 0;
            }
            
            //jump if touching the ground
            if(arrowKey.up.isDown && player.body.touching.down) {
                player.body.velocity.y = -400;
            }
            
            //allows the player to jump when colliding with walls
            if(arrowKey.up.isDown && !player.body.touching.down) {
                if(arrowKey.right.isDown && player.body.touching.right) {
                    player.body.velocity.x = -400
                    player.body.velocity.y = -400
                }
                else if(arrowKey.left.isDown && player.body.touching.left) {
                    player.body.velocity.x = 400
                    player.body.velocity.y = -400
                }
            }
            
            //hold the down arrow key to emit a barrier
            if(arrowKey.down.isDown && energy > 0) {
                player.loadTexture('playerBarrier');
                barrierStatus = true;
                energy--;
                energybar.scale.x = energy / 100;
                energyText.setText("Energy: " + energy);
            }
            else {
                player.loadTexture('player');
                barrierStatus = false;
            }
            
            //timers for angel bullets
            if(game.time.now > nextFireAngel1) {
                    this.shootBullet1();
            }
            
            if(game.time.now > nextFireAngel2) {
                    this.shootBullet2();
            }
            
            //timer for cannon beam
            if(recharge < 50) {
                this.shootBeam();
            }
            
            if(recharge < 250) {
                recharge++;
                
            }
            
            if(recharge >= 250) {
                recharge = 0;
            }
            
            //makes the angel dog patrol left and right
            if(angelDog.body.touching.down) {
                if(angelDog.x <= 650) {
                    angelDog.scale.setTo(1, 1);
                    angelDog.body.velocity.x = 100;
                }
                else if(angelDog.x >= 1050) {
                    angelDog.scale.setTo(-1, 1);
                    angelDog.body.velocity.x = -100;
                }
            }
            
            //makes headAngel follow player
            game.physics.arcade.moveToObject(angelHead, player, 75);
            if(angelHead.body.velocity.x >= 0) {
                angelHead.scale.setTo(1, 1);
            }
            else {
                angelHead.scale.setTo(-1, 1);
            }
        },
        
        //lowers tileCracked hp when touching player
        //changes sprite when hp reaches 25, and breaks when hp reaches 0
        breakTile: function(player, crackedTile) {
            if(crackedTile.health <= 25) {
                crackedTile.loadTexture('tileCracked2');
            }
            if(crackedTile.health <= 0) {
                crackedTile.kill();
            }
            else{
                crackedTile.health--;
            }
        },
        
        //angels fire bullets at set intervals
        shootBullet1: function() {
            nextFireAngel1 = game.time.now + 2750;
            bullet1 = bullets.getFirstDead();
            bullet1.reset(angel1.x + 120, angel1.y + 60);
            bullet1.body.velocity.x = 500;
        },
        
        shootBullet2: function() {
            nextFireAngel2 = game.time.now + 2500;
            bullet2 = bullets.getFirstDead();
            bullet2.reset(angel2.x + 120, angel2.y + 60);
            bullet2.body.velocity.x = 500;
        },
        
        //fires cannon beam projectile
        shootBeam: function() {
            beam = beams.getFirstDead();
            beam.reset(angelCanon.x + 60, angelCanon.y + 120);
            beam.body.velocity.y = 250;
        },
        
        //player takes damage upon touching certain things
        //player has 3 seconds of invulnerability after taking damage
        touch: function() {
            if(game.time.now > invulnTimer) {
                invulnTimer = game.time.now + 3000;
                playerHealth--;
                healthbar.scale.x = playerHealth / 3;
                healthText.setText("Health: " + playerHealth);
                player.body.velocity.y = -300;
            }
        },
        
        touchBeam: function(player, beam) {
            beam.kill();
            if(game.time.now > invulnTimer) {
                invulnTimer = game.time.now + 3000;
                playerHealth--;
                healthbar.scale.x = playerHealth / 3;
                healthText.setText("Health: " + playerHealth);
                player.body.velocity.y = -300;
            }
        },
        
        
        //player can shield themself against angel bullets if barrier is up
        //player has 3 seconds of invulnerability after taking damage
        touchBullet: function(player, bullets) {
            if(barrierStatus == true) {
                bullets.kill();
            }
            else {
                bullets.kill();
                if(game.time.now > invulnTimer) {
                    invulnTimer = game.time.now + 3000;
                    playerHealth--;
                    healthbar.scale.x = playerHealth / 3;
                    healthText.setText("Health: " + playerHealth);
                    player.body.velocity.y = -300;
                }
            }
        },
        
        //resets game values and brings the player to stage 2
        finish: function() {
            playerHealth = 3;
            energy = 100;
            keyCount = 0;
            invulnTimer = 0;
            gameMusic.stop();
            game.state.start('Game2');
        },
        
        //touch a key to collect it and remove it from the level
        collectKey: function(player, key) {
            key.kill();
            keyCount++;
            keyText.setText("Keys: " + keyCount);
        },
        
        //door is destroyed if touched by a player with a key
        openDoor: function(player, door) {
            if(keyCount > 0) {
                door.kill();
                keyCount--;
                keyText.setText("Keys: " + keyCount);
            }
        }
    };
};
