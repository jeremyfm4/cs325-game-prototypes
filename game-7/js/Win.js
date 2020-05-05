"use strict";

GameStates.makeWin = function( game, shared ) {
    return {
        create: function () {
            //add win background
            var winBackground = game.add.sprite(0, 0, 'winBackground');
        },
        
        update: function () {
            //press mouse button to return to main menu
            if (game.input.activePointer.isDown) {
                game.state.start('MainMenu');
            }
        }
    };
};