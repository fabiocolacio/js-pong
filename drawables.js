
function drawOptionsIcon(ctx,color,x,y,width,height){
  ctx.stokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1;

  ctx.fillRect(x,y,width/4,height/5);
  ctx.fillRect(x+(width/2),y,width*3/4,height/5);

  ctx.fillRect(x,y+(height*2/5),width/4,height/5);
  ctx.fillRect(x+(width/2),y+(height*2/5),width*3/4,height/5);

  ctx.fillRect(x,y+(height*4/5),width/4,height/5);
  ctx.fillRect(x+(width/2),y+(height*4/5),width*3/4,height/5);

}

function drawCursor(ctx,color,x,y,r){
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2,true);
  ctx.closePath();
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(x,y,r/4,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
}
