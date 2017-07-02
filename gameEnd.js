
function displayGameEndScreen(player){
  currentGameState = gameEndState;

  var fade = new alphaFade(gameArea.context);
  fade.minAlpha = 0.3;
  fade.startFade(10);

  if(player == 'top'){
    var winner = 'TOP';
  }else if(player == 'bot'){
    var winner = 'BOTTOM';
  }
  var winningPlayer = new menuItem(winner + ' PLAYER WON', 'button');
  var backButton = new menuItem('MAIN MENU', 'back button');
  backButton.clicked = function(){
    fade.pause();
    displayPlayMenu();
  }
  var endMenu = new menu(gameArea.context, 'GAME OVER',[winningPlayer,backButton]);

  gameEndState.update = function(ctx){
    ctx.setLineDash([]);
    endMenu.update(fade.alpha);
    ctx.globalAlpha = 0;
    ctx.globalAlpha = fade.alpha;
    drawCursor(ctx,'white',gameArea.mouseX,gameArea.mouseY,20);
  }
}
