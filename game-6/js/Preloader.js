"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/title.png');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            game.load.audio('gameMusic', ['assets/Recall of the Shadows.mp3'])
            
            game.load.image('winBackground', 'assets/winBackground.png')
            game.load.image('startButton', 'assets/start.png')
            
            game.load.image('angel', 'assets/angel.png');
            game.load.image('angelCanon', 'assets/angelCanon.png');
            game.load.image('angelDog', 'assets/angelDog.png');
            game.load.image('angelHead', 'assets/angelHead.png');
            game.load.image('bulletBeam', 'assets/bulletBeam.png');
            game.load.image('bulletGun', 'assets/bulletGun.png');
            game.load.image('key', 'assets/key.png');
            game.load.image('player', 'assets/player.png');
            game.load.image('playerBarrier', 'assets/playerBarrier.png');
            game.load.image('health', 'assets/health.png');
            game.load.image('energy', 'assets/energy.png');
            
            game.load.image('tile', 'assets/tile.png');
            game.load.image('tileCracked', 'assets/tileCracked.png');
            game.load.image('tileCracked2', 'assets/tileCracked2.png');
            game.load.image('tileDoor', 'assets/tileDoor.png');
            game.load.image('tileFinish', 'assets/tileFinish.png');
            game.load.image('tileLava', 'assets/tileLava.png');
            game.load.image('tileVertical', 'assets/tileVertical.png');
            game.load.image('tileStart', 'assets/tileStart.png');
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
