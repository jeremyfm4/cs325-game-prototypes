"use strict";

GameStates.makeGame = function( game, shared ) {
    
    var gameBackground
    var rat;
    var cats;
    var lady;
    var poison;
    var cat;
    var bullets;
    var nextFireRat = 0;
    var nextFireLady = 0;
    var ladyHP;
    var ladyDeath;
    var catDeath;
    var ladyHit;
    var ratDeath;
    var gameMusic;
    
    return {
        create: function () {
            //add game background
            gameBackground = game.add.sprite(0, 0, 'background');
            
            //add game audio
            gameMusic = game.add.audio('gameMusic');
            gameMusic.play();
            ratDeath = game.add.audio('ratDeath');
            ladyHit = game.add.audio('ladyHit');
            ladyDeath = game.add.audio('ladyDeath');
            catDeath = game.add.audio('catDeath');
            
            //create bullets group with physics enabled for poison projectile
            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(100, 'poison');
            bullets.setAll('checkWorldBounds', true);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('anchor.y', 0.5);
            
            //create bullets group with physics enabled for cat projectile
            cats = game.add.group();
            cats.enableBody = true;
            cats.createMultiple(100, 'cat');
            cats.physicsBodyType = Phaser.Physics.ARCADE;
            cats.setAll('checkWorldBounds', true);
            cats.setAll('outOfBoundsKill', true);
            cats.setAll('anchor.y', 0.5);
            cats.setAll('anchor.x', 0);
            
            //create rat with physics enabled for player to control
            rat = game.add.sprite(100, game.world.centerY, 'rat');
            rat.anchor.setTo(0.5, 0.5);
            game.physics.enable(rat);
            
            //create lady with physics enabled and moves up and down the screen
            ladyHP = 5;
            lady = game.add.sprite(700, 100, 'lady');
            lady.anchor.setTo(0.5, 0.5);
            game.physics.enable(lady);
            game.add.tween(lady).to({y:500}, 2000, 'Linear', true, 0, false, true);
        },
    
        update: function () {
            //rotate rat to face mouse pointer and fire projectile on mouse click
            rat.rotation = game.physics.arcade.angleToPointer(rat);
            if (game.input.activePointer.isDown) {
                this.shootPoison();
            }
            
            //lady throws cat projectiles while alive
            if(ladyHP > 0) {
                if(game.time.now > nextFireLady) {
                    this.shootCat();
                }
            }
            
            //collision code referenced from Udemy course
            //collision detection for the bullets, the rat, and the lady
            game.physics.arcade.overlap(cats, bullets, this.hitCat);
            game.physics.arcade.overlap(lady, bullets, this.hitLady);
            game.physics.arcade.overlap(rat, cats, this.hitRat);
            
        },
        //shoot projectile function referenced from Udemy course
        //creates new bullet projectile that faces and travels towards the mouse pointer
        shootPoison: function() {
            if(game.time.now > nextFireRat) {
                nextFireRat = game.time.now + 500;
                poison = bullets.getFirstDead();
                poison.reset(rat.x, rat.y)
                
                game.physics.arcade.moveToPointer(poison, 500);
                poison.rotation = game.physics.arcade.angleToPointer(poison);
            }
        },
        //creates new cat projectile that travels towards the rat
        shootCat: function() {
            nextFireLady = game.time.now + 750;
            cat = cats.getFirstDead();
            cat.reset(lady.x, lady.y)
            
            game.physics.arcade.moveToObject(cat, rat, 333);
        },
        //on-hit function referenced from Udemy course
        //kills cat and bullet on collision
        hitCat: function(cat, poison) {
            poison.kill();
            cat.kill();
            catDeath.play();
        },
        //reduces lady hp by 1 on collision. kills the lady and swaps to win state if the lady's hp reaches 0
        hitLady: function(lady, poison) {
            poison.kill();
            ladyHP --;
            if(ladyHP == 0) {
                lady.kill();
                ladyDeath.play();
                gameMusic.stop();
                game.state.start('Win');
            }
            else {
                ladyHit.play();
            }
        },
        //kills cat projectile and rat on collision, and swaps to lose state
        hitRat: function(cat, rat) {
            cat.kill();
            rat.kill();
            ratDeath.play();
            gameMusic.stop();
            game.state.start('Lose');
        }
        
    };
};
