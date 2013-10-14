//---------------------------------------------------------
//Classes

function Throb(animationObject){
	this.time = animationObject.time;
	this.beginColor = animationObject.begin.color;
	this.endColor = animationObject.end.color;
	this.fluid = animationObject.fluid;

	this.frameRate = 10;
	this.threshold = 5;
	this.numbFrames = this.time/this.frameRate;
	this.isFinished = false;
}

Throb.prototype.start = function(pixelBuffer){
	
	this.currentFrame = 0;
	this.currentColor = this.startColor;

	//the values each color should increment by so that they each arrive
	//at the target color at the same time
	this.rIncrementVal = (Math.abs(this.startColor.r) - Math.abs(this.endColor.r)) / this.numbFrames;
	this.gIncrementVal = (Math.abs(this.startColor.g) - Math.abs(this.endColor.g)) / this.numbFrames;
	this.bIncrementVal = (Math.abs(this.startColor.b) - Math.abs(this.endColor.b)) / this.numbFrames;

	this.intervalID = setInterval(function(){
		if(this.currentFrame < this.numbFrames){
			this._tick(pixelBuffer);
			this.currentFrame++;
		}
		else{
			//stop the interval
			clearInterval(this.intervalID);
			this.isFinished = true;
		}	
	}, this.frameRate);
}

Throb.prototype.isFinished = function(){
	return this.isFinished ? true : false;
}

//return false if animation is over, true otherwise
Throb.prototype._tick = function(pixelBuffer){
	var pixels = pixelBuffer;
	var color = this._increment(this.currentColor);
	pixels.fillRGB(color.r, color.g, color.b);
	this.currentColor = color;
	pixels.update();
}

Throb.prototype._increment = function(color){
	var newColor = {};
	newColor.r = this._getIncrementedColor(this.rIncrementVal, color.r, this.endColor.r);
	newColor.g = this._getIncrementedColor(this.gIncrementVal, color.g, this.endColor.g);
	newColor.b = this._getIncrementedColor(this.bIncrementVal, color.b, this.endColor.b);
	return newColor;
}

Throb.prototype._getIncrementedColor = function(incrementVal, colorVal, targetColorVal){
	//color value is less than target color value
	if(colorVal < targetColorVal &&
	   !this._targetReached(this.threshold, colorVal, targetColorVal)){
		 colorVal += incrementVal; 
		 
	} 
	//color value is greater than target color value
	else if(colorVal > targetColorVal &&
			!this._targetReached(this.threshold, colorVal, targetColorVal)){
	   	 colorVal -= incrementVal;
	} 
	return colorVal;
}

Throb.prototype._targetReached = function(threshold, currentColor, targetColor){
	return (Math.abs(currentColor.r) - (targetColor.r) < threshold) ? true : false;
}

module.exports = Throb;

//do the active animation and then go to dormant
