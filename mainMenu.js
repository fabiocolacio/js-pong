
function displayMainMenu(){

  mainMenuState.update = function(ctx){
    displayTitle(ctx);
    displayMenu(ctx);
  }
  currentGameState = mainMenuState;

  var menuItemX = gameArea.canvas.width/2;
  var menuItemY = (gameArea.canvas.height*3/4)-50;
  function displayMenu(ctx){
    ctx.strokeStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0;
    ctx.globalAlpha = alpha;
    var fontSize = 40;
    ctx.font = fontSize+'px arial';
    ctx.lineWidth = 2;

    var playText = 'P L A Y';
    var textWidth = ctx.measureText(playText).width;
    var playTextBounds = new bounds(menuItemX-(textWidth/2),menuItemY-(fontSize/2),textWidth,fontSize);
    if(playTextBounds.contains(gameArea.mouseX,gameArea.mouseY)){
      minAlpha = 0.5;
      ctx.strokeStyle = 'cyan';
      if(gameArea.mouseDown){
        clearInterval(alphainterval);
        displayPlayMenu();
      }
    }else{
      minAlpha = 0;
    }
    ctx.strokeText(playText,menuItemX,menuItemY);

    drawCursor(ctx,'white',gameArea.mouseX,gameArea.mouseY,20);
    //ctx.strokeText('O P T I O N S',menuItemX,menuItemY + fontSize + 30);

    /*
    ctx.globalAlpha = alpha;
    if(numCycles >= 1){
      ctx.globalAlpha = 1;
    }
    drawOptionsIcon(ctx,'white',gameArea.canvas.width-50,gameArea.canvas.height-50,30,30);
    */
  }

  var titleX = gameArea.canvas.width/2;
  var titleY = gameArea.canvas.height/2;
  var titleYMax = gameArea.canvas.height/4;
  var gameTitle = 'P O N G';
  function displayTitle(ctx){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "italic bold 70px arial";
    if(titleY > titleYMax){
      titleY -= 2;
    }
    ctx.globalAlpha = alpha;
    if(numCycles >= 1){
      ctx.globalAlpha = 1;
    }
    ctx.strokeText(gameTitle,titleX,titleY);
  }

  var alpha = 0;
  var minAlpha = 0;
  var maxAlpha = 1;
  var increasing = true;
  var numCycles = 0;
  var alphainterval = setInterval(titleOpacityFade,10);
  function titleOpacityFade(){
    if(alpha >= maxAlpha){
      numCycles += 1;
      increasing = false;
    }else if (alpha <= minAlpha) {
      increasing = true;
    }

    if(increasing){
      alpha += 0.01;
    }else{
      alpha -= 0.01;
    }
    console.log('firstFade');
  }

}

displayMainMenu();
