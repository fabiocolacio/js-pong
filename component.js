
function component(x,y,color,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.getBounds = function(){
    return new bounds(this.x,this.y,this.width,this.height);
  }
  this.update = function(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}
