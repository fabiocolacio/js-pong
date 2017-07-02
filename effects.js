
function alphaFade(ctx){
  this.alpha = ctx.globalAlpha;
  this.ms;
  this.interval;

  this.maxAlpha = 1;
  this.minAlpha = 0;
  this.increasing = true;
  this.numCycles = 0;

  this.startFade = function(ms){
    //this.interval = setInterval(this.changeAlpha,ms);
    this.interval = setInterval(
     (function(self) {         //Self-executing func which takes 'this' as self
         return function() {   //Return a function in the context of 'self'
             self.changeAlpha(); //Thing you wanted to run as non-window 'this'
         }
     })(this),
       ms     //normal interval, 'this' scope not impacted here.
   );
    this.ms = ms;
  }
  this.pause = function(){
    clearInterval(this.interval);
  }
  this.play = function(){
      this.startFade(alphaFade.ms);
  }

  this.changeAlpha = function(){

    if(this.alpha > this.maxAlpha){
      this.numCycles += 1;
      this.increasing = false;
    }else if (this.alpha < this.minAlpha) {
      this.increasing = true;
    }

    if(this.increasing){
      this.alpha += 0.01;
    }else{
      this.alpha -= 0.01;
    }

    console.log('fadeObj')

  }

}
