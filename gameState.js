function gameState(title){
  this.title = title;
  this.update = function(ctx){}
  this.clicked = function(e){}
}

var mainMenuState = new gameState('main menu');
var playMenuState = new gameState('play menu');
var localMultState = new gameState('local multiplayer');
var gameEndState = new gameState('game end');
