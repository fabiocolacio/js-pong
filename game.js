//var socket = io('http://localhost:3000');

var currentGameState = false;

var ESC = 27, LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40, SPACE = 32, ENTER = 13, W = 87, S = 83, A = 65, D = 68;

var gameArea = {
  canvas: document.getElementById('gameArea'),
  start: function(){
    //updateGameCanvasSize();
    this.canvas.width = 320;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    this.interval = setInterval(updateGameArea, 20);
    this.context.fillStyle = 'black';
    this.mouseX = false;
    this.mouseY = false;
    this.mouseDown = false;
    this.keys = [];
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    //window.addEventListener('resize',updateGameCanvasSize);
    window.addEventListener('keydown',function(e){
      gameArea.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup',function(e){
      gameArea.keys[e.keyCode] = false;
    });
    window.addEventListener('mousemove',function(e){
      gameArea.mouseX = getMousePos(e).x;
      gameArea.mouseY = getMousePos(e).y;
    });
    window.addEventListener('mousedown', function(e){
      gameArea.mouseDown = true;
    });
    window.addEventListener('mouseup', function(e){
      gameArea.mouseDown = false;
    });
  },
  clear: function(){
    this.context.globalAlpha = 1;
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context.fillStyle = 'black';
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
  }
}

function getMousePos(e) {
    var rect = gameArea.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

/*
function updateGameCanvasSize(){
  if((this.w=window.innerWidth-30)>(this.h=window.innerHeight-30)){
      gameArea.canvas.height = this.h;
      gameArea.canvas.width = (this.h*3)/4;
    }else{
      gameArea.canvas.width = this.w
      gameArea.canvas.height = (this.w*4)/3;
    }
}
*/

function updateGameArea(){
  gameArea.clear();
  if(currentGameState){
    currentGameState.update(gameArea.context);
  }
}

function getRandomIntInclusive(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

gameArea.start();
