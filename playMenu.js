
function displayPlayMenu(){

  var cursorColor = false;
  var fade = new alphaFade(gameArea.context);
  fade.minAlpha = 0.3;
  fade.startFade(10);

  var singlePlayButton = new menuItem('SINGLE PLAYER','button');
  singlePlayButton.clicked = function(){
    fade.pause();

  }
  var localMultButton = new menuItem('LOCAL MULTIPLAYER','button');
  localMultButton.clicked = function(){
    fade.pause();

    displayLocalMult();
  }
  var backButton = new menuItem('BACK', 'back button');
  backButton.clicked = function(){
    fade.pause();
    currentGameState = mainMenuState;
  }

  var playMenu = new menu(gameArea.context,'M O D E',[singlePlayButton,localMultButton,backButton]);




  playMenuState.update = function(ctx){
    playMenu.update(fade.alpha);

    ctx.globalAlpha = 0;
    ctx.globalAlpha = fade.alpha;
    drawCursor(ctx,'white',gameArea.mouseX,gameArea.mouseY,20);
  }

  currentGameState = playMenuState;

}
