"use strict";

GameStates.makeGame2 = function( game, shared ) {
    
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
    var angelCanon1;
    var angelCanon2;
    var angelCanon3;
    var angelCanon4;
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
    var tileVertical;
    var tileFinish;
    return {
        create: function () {
            //increase boundary of game
            game.world.setBounds(0, 0, 3500, 1500);
            
            //sets background color
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
            beams.createMultiple(400, 'bulletBeam');
            beams.physicsBodyType = Phaser.Physics.ARCADE;
            beams.setAll('checkWorldBounds', true);
            beams.setAll('outOfBoundsKill', true);
            beams.setAll('anchor.y', 0.5);
            beams.setAll('anchor.x', 0.5);
            
            //create and set base tile group
            tileGroup = game.add.group();
            tileGroup.enableBody = true;
            tileGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileGroup.create(0, 200, 'tile');
            tileGroup.create(150, 200, 'tile');
            tileGroup.create(300, 200, 'tile');
            tileGroup.create(600, 200, 'tile');
            tileGroup.create(900, 200, 'tile');
            
            tileGroup.create(1950, 350, 'tile');
            tileGroup.create(2250, 350, 'tile');
            
            tileGroup.create(2400, 275, 'tile');
            tileGroup.create(2550, 275, 'tile');
            tileGroup.create(2700, 275, 'tile');
            tileGroup.create(2850, 275, 'tile');
            tileGroup.create(3000, 275, 'tile');
            tileGroup.create(3150, 275, 'tile');
            tileGroup.create(3300, 275, 'tile');
            tileGroup.create(3350, 275, 'tile');
            
            tileGroup.create(2250, 500, 'tile');
            tileGroup.create(2250, 650, 'tile');
            tileGroup.create(2250, 800, 'tile');
            
            tileGroup.create(2250, 1200, 'tile');
            tileGroup.create(2400, 1200, 'tile');
            tileGroup.create(2550, 1200, 'tile');
            tileGroup.create(2700, 1200, 'tile');
            tileGroup.create(2850, 1200, 'tile');
            tileGroup.create(3000, 1200, 'tile');
            tileGroup.create(3150, 1200, 'tile');
            tileGroup.create(3300, 1200, 'tile');
            tileGroup.create(3350, 1200, 'tile');
            
            tileGroup.create(2700, 1050, 'tile');
            tileGroup.create(3300, 1050, 'tile');
            tileGroup.create(3350, 1050, 'tile');
            
            tileGroup.create(3000, 900, 'tile');
            
            tileGroup.create(2550, 750, 'tile');
            tileGroup.create(2700, 750, 'tile');
            tileGroup.create(2850, 750, 'tile');
            
            tileGroup.create(2100, 1275, 'tile');
            tileGroup.create(1950, 1200, 'tile');
            tileGroup.create(1800, 1350, 'tile');
            tileGroup.create(1650, 1350, 'tile');
            tileGroup.create(1650, 1050, 'tile');
            tileGroup.create(1500, 900, 'tile');
            tileGroup.create(1200, 900, 'tile');
            tileGroup.create(900, 900, 'tile');
            tileGroup.create(600, 900, 'tile');
            tileGroup.create(300, 900, 'tile');
            
            tileGroup.create(300, 1350, 'tile');
            tileGroup.create(150, 1200, 'tile');
            tileGroup.create(0, 1050, 'tile');
            
            tileGroup.create(2550, 0, 'tile');
            tileGroup.setAll('body.immovable', true);
            
            //create and set lava tile group
            tileLavaGroup = game.add.group();
            tileLavaGroup.enableBody = true;
            tileLavaGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileLavaGroup.create(450, 275, 'tileLava');
            tileLavaGroup.create(750, 275, 'tileLava');
            
            tileLavaGroup.create(1050, 425, 'tileLava');
            tileLavaGroup.create(1200, 425, 'tileLava');
            tileLavaGroup.create(1350, 425, 'tileLava');
            tileLavaGroup.create(1500, 425, 'tileLava');
            tileLavaGroup.create(1650, 425, 'tileLava');
            tileLavaGroup.create(1800, 425, 'tileLava');
            
            tileLavaGroup.create(450, 1425, 'tileLava');
            tileLavaGroup.create(600, 1425, 'tileLava');
            tileLavaGroup.create(750, 1425, 'tileLava');
            tileLavaGroup.create(900, 1425, 'tileLava');
            tileLavaGroup.create(1050, 1425, 'tileLava');
            tileLavaGroup.create(1200, 1425, 'tileLava');
            tileLavaGroup.create(1350, 1425, 'tileLava');
            tileLavaGroup.create(1500, 1425, 'tileLava');
            tileLavaGroup.setAll('body.immovable', true);
            
            
            
            //create and set cracked tile group
            tileCrackedGroup = game.add.group();
            tileCrackedGroup.enableBody = true;
            tileCrackedGroup.physicsBodyType = Phaser.Physics.ARCADE;
            tileCrackedGroup.create(1050, 350, 'tileCracked');
            tileCrackedGroup.create(1200, 350, 'tileCracked');
            tileCrackedGroup.create(1350, 350, 'tileCracked');
            tileCrackedGroup.create(1500, 350, 'tileCracked');
            tileCrackedGroup.create(1650, 350, 'tileCracked');
            tileCrackedGroup.create(1800, 350, 'tileCracked');
            
            tileCrackedGroup.create(2400, 750, 'tileCracked');
            
            tileCrackedGroup.create(450, 1350, 'tileCracked');
            tileCrackedGroup.create(600, 1350, 'tileCracked');
            tileCrackedGroup.create(750, 1350, 'tileCracked');
            tileCrackedGroup.create(900, 1350, 'tileCracked');
            tileCrackedGroup.create(1050, 1350, 'tileCracked');
            tileCrackedGroup.create(1200, 1350, 'tileCracked');
            tileCrackedGroup.create(1350, 1350, 'tileCracked');
            tileCrackedGroup.create(1500, 1350, 'tileCracked');
            tileCrackedGroup.setAll('body.immovable', true);
            tileCrackedGroup.setAll('health', 50);
            
            
            //create and set door group
            doorGroup = game.add.group();
            doorGroup.enableBody = true;
            doorGroup.physicsBodyType = Phaser.Physics.ARCADE;
            doorGroup.create(2400, 125, 'tileDoor');
            doorGroup.create(2550, 125, 'tileDoor');
            doorGroup.setAll('body.immovable', true);
            
            //create and set key group
            keyGroup = game.add.group();
            keyGroup.enableBody = true;
            keyGroup.physicsBodyType = Phaser.Physics.ARCADE;
            keyGroup.create(2400, 625, 'key');
            keyGroup.create(0, 925, 'key');
            
            //create and set vertical movement tile
            tileVertical = game.add.sprite(2105, 351, 'tileVertical');
            game.physics.enable(tileVertical);
            tileVertical.body.velocity.y = 200;
            tileVertical.immovable = true;
            
            //create and set finish tile
            tileFinish = game.add.sprite(3300, 125, 'tileFinish');
            game.physics.enable(tileFinish);
            
            //create player with physics enabled for player to control
            player = game.add.sprite(0,  50, 'player');
            game.camera.follow(player);
            player.anchor.setTo(0.5, 0.5);
            game.physics.enable(player);
            player.body.gravity.y = 500;
            player.body.collideWorldBounds = true;
            
            //create and set basic angel enemies
            angel1 = game.add.sprite(930, 240, 'angel');
            angel2 = game.add.sprite(30, 1215, 'angel');
            
            angelCanon1 = game.add.sprite(465, 0, 'angelCanon');
            angelCanon2 = game.add.sprite(765, 0, 'angelCanon');
            angelCanon3 = game.add.sprite(1365, 0, 'angelCanon');
            angelCanon4 = game.add.sprite(2715, 450, 'angelCanon');
            
            angelDog = game.add.sprite(3000, 215, 'angelDog');
            angelDog.anchor.setTo(.5, 1);
            game.physics.enable(angelDog);
            angelDog.body.gravity.y = 500;
            angelDog.body.velocity.x = 100;
            
            angelHead = game.add.sprite(0, 500, 'angelHead');
            angelHead.anchor.setTo(.5, .5);
            game.physics.enable(angelHead);
            
            
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
            game.physics.arcade.collide(player, angelHead, this.touch);
            game.physics.arcade.collide(player, tileGroup);
            game.physics.arcade.collide(player, tileLavaGroup, this.touch);
            game.physics.arcade.collide(player, tileCrackedGroup, this.breakTile);
            game.physics.arcade.collide(player, tileVertical, this.moveTile);
            game.physics.arcade.collide(player, tileFinish, this.finish);
            game.physics.arcade.collide(player, keyGroup, this.collectKey);
            game.physics.arcade.collide(player, doorGroup, this.openDoor);
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
            
            //timer for cannon beams
            if(recharge < 50) {
                this.shootBeam1();
                this.shootBeam2();
                this.shootBeam3();
                this.shootBeam4();
            }
            
            if(recharge < 250) {
                recharge++;
                
            }
            
            if(recharge >= 250) {
                recharge = 0;
            }
            
            //makes the angel dog patrol left and right
            if(angelDog.body.touching.down) {
                if(angelDog.x <= 2700) {
                    angelDog.scale.setTo(1, 1);
                    angelDog.body.velocity.x = 100;
                }
                
                else if(angelDog.x >= 3210) {
                    angelDog.scale.setTo(-1, 1);
                    angelDog.body.velocity.x = -100;
                }
            }
            
            //makes tileVertical move up and down
            if(tileVertical.y <= 350) {
                tileVertical.body.velocity.y = 200;
            }
            
            else if(tileVertical.y >= 1100) {
                tileVertical.body.velocity.y = -200;
            }
            
            //makes headAngel follow player
            game.physics.arcade.moveToObject(angelHead, player, 50);
            if(angelHead.body.velocity.x >= 0) {
                angelHead.scale.setTo(1, 1);
            }
            
            else {
                angelHead.scale.setTo(-1, 1);
            }
                
        },
        
        //helps keep velocity of tileVertical consistent
        moveTile: function() {
            player.body.velocity.x = 0;
            tileVertical.body.velocity.x = 0;
            if(tileVertical.body.velocity.y > 0) {
                tileVertical.body.velocity.y = 200;
            }
            
            else if(tileVertical.body.velocity.y < 0) {
                tileVertical.body.velocity.y = -200;
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
            nextFireAngel1 = game.time.now + 3000;
            bullet1 = bullets.getFirstDead();
            bullet1.reset(angel1.x + 120, angel1.y + 60);
            bullet1.body.velocity.x = 400;
        },
        
        shootBullet2: function() {
            nextFireAngel2 = game.time.now + 5000;
            bullet2 = bullets.getFirstDead();
            bullet2.reset(angel2.x + 120, angel2.y + 60);
            bullet2.body.velocity.x = 250;
        },
        
        //fires cannon beam projectile
        shootBeam1: function() {
            beam = beams.getFirstDead();
            beam.reset(angelCanon1.x + 60, angelCanon1.y + 120);
            beam.body.velocity.y = 250;
        },
        
        shootBeam2: function() {
            beam = beams.getFirstDead();
            beam.reset(angelCanon2.x + 60, angelCanon2.y + 120);
            beam.body.velocity.y = 250;
        },
        
        shootBeam3: function() {
            beam = beams.getFirstDead();
            beam.reset(angelCanon3.x + 60, angelCanon3.y + 120);
            beam.body.velocity.y = 250;
        },
        
        shootBeam4: function() {
            beam = beams.getFirstDead();
            beam.reset(angelCanon4.x + 60, angelCanon4.y + 120);
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
