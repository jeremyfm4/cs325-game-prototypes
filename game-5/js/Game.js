"use strict";

GameStates.makeGame = function( game, shared ) {
    
    var gameMusic;
    var arrowKey;
    var keyCount = 0;
    var keyText;
    var playerHealth = 3;
    var energy = 100;
    var nextFireAngel1 = 0;
    var nextFireAngel2 = 0;
    var recharge = 0;
    var bullet1;
    var bullet2;
    var beam;
    var energyText;
    
    var angel1;
    var angel2;
    var angelCanon;
    var angelDog;
    var bullets;
    var beams;
    var key;
    var door;
    var player;
    var barrierStatus = false;
    
    var tileGroup;
    var tileLavaGroup;
    var tileFinish;
    
    return {
        create: function () {
            //increase boundary of game
            game.world.setBounds(0, 0, 3500, 1500);
            
            //sets random color as background
            game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
            
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
            tileGroup.create(975, 1350, 'tile');
            tileGroup.create(1300, 1350, 'tile');
            tileGroup.create(1450, 1350, 'tile');
            tileGroup.create(1600, 1350, 'tile');
            tileGroup.create(2100, 1350, 'tile');
            tileGroup.create(2250, 1350, 'tile');
            tileGroup.create(2400, 1350, 'tile');
            tileGroup.create(2925, 1350, 'tile');
            tileGroup.create(3075, 1350, 'tile');
            tileGroup.create(2250, 1050, 'tile');
            tileGroup.create(1450, 1200, 'tile');
            tileGroup.create(1150, 1050, 'tile');
            tileGroup.create(850, 900, 'tile');
            tileGroup.create(550, 750, 'tile');
            tileGroup.setAll('body.immovable', true);
            
            //create and set lava tile group
            tileLavaGroup = game.add.group();
            tileLavaGroup.enableBody = true;
            tileLavaGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileLavaGroup.create(350, 1310, 'tileLava');
            tileLavaGroup.create(2660, 1320, 'tileLava');
            tileLavaGroup.setAll('body.immovable', true);
            
            //create and set finish tile, door, and key
            tileFinish = game.add.sprite(3075, 1200, 'tileFinish');
            game.physics.enable(tileFinish);
            
            door = game.add.sprite(2250, 1200, 'tileDoor');
            game.physics.enable(door);
            door.body.immovable = true;
            
            key = game.add.sprite(550, 625, 'key');
            game.physics.enable(key);
            
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
            
            //creates text from key count and energy and makes it follow the camera
            keyText = game.add.text(25, 25, "Keys: " + keyCount);
            keyText.fixedToCamera = true;
            
            energyText = game.add.text(150, 25, "Energy: " + energy);
            energyText.fixedToCamera = true;
            
            //binds arrow key inputs
            arrowKey = game.input.keyboard.createCursorKeys();
        },
    
        update: function () {
            //collision detection
            game.physics.arcade.collide(angelDog, tileGroup);
            game.physics.arcade.collide(player, angelDog, this.touch);
            game.physics.arcade.collide(player, tileGroup);
            game.physics.arcade.collide(player, tileLavaGroup, this.touch);
            game.physics.arcade.collide(player, tileFinish, this.finish);
            game.physics.arcade.collide(player, key, this.collectKey);
            game.physics.arcade.collide(player, door, this.openDoor);
            game.physics.arcade.collide(player, bullets, this.touchBullet);
            game.physics.arcade.collide(player, beams, this.touch);
            
            //player dies if hp reaches 0 or touches the bottom boundary
            if(playerHealth == 0 || player.body.onFloor()) {
                playerHealth = 3;
                energy = 100;
                keyCount = 0;
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
            
            //hold the down arrow key to emit a barrier
            if(arrowKey.down.isDown && energy > 0) {
                player.loadTexture('playerBarrier');
                barrierStatus = true;
                energy--;
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
        
        //player dies upon touching certain things
        touch: function() {
            playerHealth = 0;
        },
        
        
        //player can shield themself against angel bullets if barrier is up
        touchBullet: function(player, bullets) {
            if(barrierStatus == true) {
                bullets.kill();
            }
            else {
                playerHealth = 0;
            }
        },
        
        //resets game values and brings the player to the victory screen
        finish: function() {
            playerHealth = 3;
            energy = 100;
            keyCount = 0;
            gameMusic.stop();
            game.state.start('Win');
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
