"use strict";

GameStates.makeLose = function( game, shared ) {
    return {
        create: function () {
            //add lose background
            var loseBackground = game.add.sprite(0, 0, 'loseBackground');
        },
        
        update: function () {
            //press mouse button to return to main menu
            if (game.input.activePointer.isDown) {
                game.state.start('MainMenu');
            }
        }
    };
};