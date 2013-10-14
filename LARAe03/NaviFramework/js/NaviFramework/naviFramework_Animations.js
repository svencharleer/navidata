/*
	animation objects
	- trigger: method to call to trigger the animation
	- animationLoop: current animation loop (set to null if not animating)
	- other methods: animation loops
*/

function animation_Base(caller)
{
	this.animationTime = null;
	this.animationState = -1;
	this.animate = null;
	this.caller = caller;
	this.trigger = function()
	{
						switch(this.animationState)
						{
							case -1:
								this.animate = this.defaultAnimation;
								this.animationState = 0;
								break;
							case 0:
								this.animate = null;
	    						this.animationTime = null;
	    						this.animationState = -1;
	    						if(caller.afterAnimation != null)
	    							caller.afterAnimation();
	    						break;
							default:
						}
	}

    this.defaultAnimation = null; //css animation class
}

function animation_Fade(startValue, endValue, caller)
{
	animation_Base.call(this, caller);
	this.startValue = startValue;
	this.endValue = endValue;
	
	

	this.defaultAnimation = function(event, obj)
	{
    					//total seconds for animation
    					var totalSeconds = .2;
    					if(this.animationTime == null)
    						this.animationTime = 0;

    					if(this.animationTime < totalSeconds)
    					{
    						this.animationTime = this.animationTime + event.delta;
	    					var t = this.animationTime / totalSeconds;
	    					if(t < 1)
	    					{
	    						//obj.visible = true;
	    						obj.opacity = (1.0 - t) * this.startValue + t * this.endValue;
	    					}
	    				}
	    				else 
	    				{
	    					//obj.visible = true;
    						obj.opacity = endValue;
	    					
	    					
	    					this.trigger();
	    				}
	}
}




function animation_TweenPosition(startPosition, endPosition, totalTime, caller) 
{
	animation_Base.call(this, caller);
	this.startPosition = startPosition;
	this.endPosition = endPosition;
	this.totalTime = totalTime;
	

    this.defaultAnimation = function(event, obj) 
    {
    					
    					if(this.animationTime == null)
    						this.animationTime = 0;

    					if(this.animationTime < totalTime)
    					{
    						this.animationTime = this.animationTime + event.delta;
	    					var t = this.animationTime / totalTime;
	    					if(t < 1.0)
	    					{
	    						
	    						obj.bounds.x = ((1.0 - t) * startPosition.x + t * endPosition.x);
	    						obj.bounds.y = ((1.0 - t) * startPosition.y + t * endPosition.y);
	    					}	
	    				}
	    				else
	    				{	    					
	    					obj.bounds.x = endPosition.x;
	    					obj.bounds.y = endPosition.y;

	    					this.trigger();
	    				}	
    }
};




animation_Fade.prototype = Object.create(animation_Base.prototype);
animation_TweenPosition.prototype = Object.create(animation_Base.prototype);