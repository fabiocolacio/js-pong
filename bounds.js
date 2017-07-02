function coords(x,y){
  this.x = x;
  this.y = y;
}

function bounds(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.innerX = x + (width/2);
  this.innerY = y + (height/2);
  this.top = y;
  this.left = x;
  this.right = x+width;
  this.bottom = y+height;
  this.contains = function(x,y){
    if(x >= this.left && x <= this.right && y <= this.bottom && y >= this.top){
      return true;
    }else{
      return false;
    }
  }
}
