

function displayLocalMult(){

  var fade = new alphaFade(gameArea.context);
  fade.minAlpha = 0.3;
  fade.startFade(10);

  var globalAcceleration = 10;

  var topPlayerScore = 0;
  var botPlayerScore = 0;

  var ballRadius = 8;
  var ballDiameter = 2*ballRadius;
  var defaultBallX = 160-ballRadius;
  var defaultBallY = 240-ballRadius;
  var ball = new component(defaultBallX,defaultBallY,'white',ballDiameter,ballDiameter);

  var gameIsPaused = false;
  var justPaused = false;
  var resumeButton = new menuItem('Resume','button');
  resumeButton.clicked = function(){
    gameIsPaused = false;
  }
  var mainMenuButton = new menuItem('Main Menu','button');
  mainMenuButton.clicked = function(){
    displayPlayMenu();
  }
  var pauseMenu = new menu(gameArea.context,'P A U S E D',[resumeButton,mainMenuButton]);

  if(getRandomIntInclusive(0,1)==1){
    var ballAccelerationX = -globalAcceleration;
  }else{
    ballAccelerationX = globalAcceleration;
  }
  var ballAccelerationY = globalAcceleration;

  ball.reset = function(direction){
    ball.x = defaultBallX;
    ball.y = defaultBallY;
    if(direction == 'up'){
      ballAccelerationY = -globalAcceleration;
    }else{
      ballAccelerationY = globalAcceleration;
    }
  }

  var paddleWidth = 80;
  var paddleHeight = 10;
  var paddleMargin = 15;
  var paddleDefaultX = 160-(paddleWidth/2);

  var topPaddle = new component(paddleDefaultX,paddleMargin,'white',paddleWidth,paddleHeight);
  topPaddle.acceleration = 0;

  var botPaddle = new component(paddleDefaultX,480-paddleMargin-paddleHeight,'white',paddleWidth,paddleHeight);
  botPaddle.acceleration = 0;

  currentGameState = localMultState;
  localMultState.update = function(ctx){

    if(gameArea.keys && gameArea.keys[ESC] && !justPaused){
      gameIsPaused = !gameIsPaused;
      justPaused = true;
    }else if(gameArea.keys && !gameArea.keys[ESC] && justPaused){
      justPaused = false;
    }

    drawBG(ctx);
    drawScore(ctx);

    drawPaddles(ctx);
    drawBall(ctx);

    if(gameIsPaused){
      ctx.globalAlpha = .5;
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0,320,480);
      ctx.setLineDash([]);
      pauseMenu.update(fade.alpha);
      ctx.globalAlpha = 0;
      ctx.globalAlpha = fade.alpha;
      drawCursor(ctx,'white',gameArea.mouseX,gameArea.mouseY,20);
    }

  }

  function drawPaddles(ctx){

    if(!gameIsPaused){
      if(gameArea.keys){
        if(gameArea.keys[A] && gameArea.keys[D]){
          topPaddle.acceleration = 0;
        }else if(gameArea.keys[A] && topPaddle.getBounds().left > 0){
          topPaddle.acceleration = -globalAcceleration;
        }else if(gameArea.keys[D] && topPaddle.getBounds().right < 320){
          topPaddle.acceleration = globalAcceleration;
        }else{
          topPaddle.acceleration = 0;
        }

        if(gameArea.keys[LEFT] && gameArea.keys[RIGHT]){
          botPaddle.acceleration = 0;
        }else if(gameArea.keys[LEFT] && botPaddle.getBounds().left > 0){
          botPaddle.acceleration = -globalAcceleration;
        }else if(gameArea.keys[RIGHT] && botPaddle.getBounds().right < 320){
          botPaddle.acceleration = globalAcceleration;
        }else{
          botPaddle.acceleration = 0;
        }
      }

      botPaddle.x+=botPaddle.acceleration;
      topPaddle.x+=topPaddle.acceleration;
    }


    topPaddle.update(ctx);
    botPaddle.update(ctx);
  }

  function drawBall(ctx){
    if(!gameIsPaused){
      var ballBounds = ball.getBounds();
      var topPaddleBounds = topPaddle.getBounds();
      var botPaddleBounds = botPaddle.getBounds();

      if(ballBounds.right>=320 || ballBounds.left<=0){
        ballAccelerationX = -ballAccelerationX;
      }

      if(topPaddleBounds.contains(ballBounds.left,ballBounds.top)||
        topPaddleBounds.contains(ballBounds.right,ballBounds.top)||
        botPaddleBounds.contains(ballBounds.left,ballBounds.bottom)||
        botPaddleBounds.contains(ballBounds.right,ballBounds.bottom)){
          ballAccelerationY = -ballAccelerationY;
        }

      if(ballBounds.top<=0){
        botPlayerScore++;
        if(botPlayerScore>=10){
          fade.pause();
          displayGameEndScreen('bot');
        }
        if(getRandomIntInclusive(0,1)==1){
          ballAccelerationX = -globalAcceleration;
        }else{
          ballAccelerationX = globalAcceleration;
        }
        ball.reset('down');
      }else if(ballBounds.bottom>=480){
        topPlayerScore++;
        if(topPlayerScore>=10){
          fade.pause();
          displayGameEndScreen('top');
        }
        if(getRandomIntInclusive(0,1)==1){
          ballAccelerationX = -globalAcceleration;
        }else{
          ballAccelerationX = globalAcceleration;
        }
        ball.reset('up');
      }

      ball.x += ballAccelerationX;
      ball.y += ballAccelerationY;
    }

    ball.update(ctx);
  }

  function drawScore(ctx){
    var marginSide = 15;
    var marginLine = 30;
    ctx.fillStyle = 'white';
    ctx.font = menuItemFont.font;
    ctx.textAlign = 'left';
    ctx.fillText(topPlayerScore,marginSide,240-marginLine);
    ctx.textAlign = 'right';
    ctx.fillText(botPlayerScore,320-marginSide,240+marginLine);
  }

  function drawBG(ctx){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.setLineDash([30,20]);
    ctx.beginPath();
    ctx.moveTo(0,240);
    ctx.lineTo(380,240);
    ctx.stroke();
    ctx.closePath();
  }

}
