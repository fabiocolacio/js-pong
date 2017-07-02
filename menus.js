function fontType(font,lineWidth,fontSize){
  this.font = font;
  this.lineWidth = lineWidth;
  this.fontSize = fontSize;
}

function menuItem(title,type,options){
    this.title = title;
    this.type = type;
    this.bounds = false;
    this.options = options;
    this.clicked = function(){

    }
}

function menu(ctx,headerText,menuItems){
  this.ctx = ctx;
  this.headerText = headerText;
  this.menuItems = menuItems;
  this.menuBoxBounds = new bounds(20,80,280,390);
  this.timesDrawn = 0;


  this.update = function(alpha){
    //draws headerText
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.font = headerFont.font;
    ctx.lineWidth = headerFont.lineWidth;
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'top';
    var headerX = 160;
    var headerY = 30
    ctx.globalAlpha = 1;
    ctx.strokeText(this.headerText,headerX,headerY);

    //ctx.strokeRect(20,80,280,390);

    ctx.beginPath();
    ctx.moveTo(0,65);
    ctx.lineTo(320,65);
    ctx.stroke();
    ctx.closePath();

    ctx.font = menuItemFont.font;
    ctx.lineWidth = menuItemFont.lineWidth;

    for(var i = 0 ; i < menuItems.length ; i++){
      //loops through each item in menuItems array and draws the title on left
      if(menuItems[i].type === 'button'){
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'middle';

        if(i>0){
          var z = i+1;
          var w = 20;
        }else{
          var w = 0;
          var z = 1;
        }

        var x = this.menuBoxBounds.innerX;
        var y = this.menuBoxBounds.y - 30 + ((z)*(menuItemFont.fontSize+20));

        var txtWidth = ctx.measureText(menuItems[i].title).width;
        var txtHeight = menuItemFont.fontSize;
        menuItems[i].bounds = new bounds(x-(txtWidth/2),y-(txtHeight/2),txtWidth,txtHeight);
        if(menuItems[i].bounds.contains(gameArea.mouseX,gameArea.mouseY)){
          ctx.globalAlpha = 0;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = 'cyan';
          ctx.strokeStyle = 'cyan';
          if(gameArea.mouseDown && this.timesDrawn > 5){
            menuItems[i].clicked();
          }
        }else{
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'white';
        }

        ctx.strokeText(menuItems[i].title,x,y,this.menuBoxBounds.width);//160 90

      }

      if(menuItems[(menuItems.length-1)].type === 'back button'){
        var o = menuItems.length-1;

        ctx.textAlign = 'center';
        ctx.textBaseLine = 'middle';

        var x = this.menuBoxBounds.innerX;
        var y = this.menuBoxBounds.bottom - 30;

        var txtWidth = ctx.measureText(menuItems[i].title).width;
        var txtHeight = menuItemFont.fontSize;
        menuItems[o].bounds = new bounds(x-(txtWidth/2),y-(txtHeight/2),txtWidth,txtHeight);
        if(menuItems[o].bounds.contains(gameArea.mouseX,gameArea.mouseY)){
          ctx.globalAlpha = 0;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = 'cyan';
          ctx.strokeStyle = 'cyan';
          if(gameArea.mouseDown && this.timesDrawn > 5){
            menuItems[i].clicked();
          }
        }else{
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'white';
        }

        ctx.strokeText(menuItems[o].title,x,y,this.menuBoxBounds.width);
      }

      //then draws the type specific item on right

    }
    this.timesDrawn++;
  }
}

var menuItemFont = new fontType('30px arial',1,30);
var headerFont = new fontType('italic bold 35px arial',1,35);
var jumboFont = new fontType('italic bold 70px arial',5,70);
