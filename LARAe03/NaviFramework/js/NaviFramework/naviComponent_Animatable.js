function NCAnimatable(owner, animations)
{
	this.owner = owner;
	this.activeAnimation = [];
	this.animations = animations; //css classes

 	//add our trigger to animation end trigger of html object
    if(this.owner.afterAnimation != null)
    {
        this.owner.element.addEventListener('webkitAnimationEnd', function(){
            console.log("Animation ended");
            this.naviData.afterAnimation();
        });
    }

	this.switchToAnimation = function(animationID)
	{
		if(this.animations != null && this.animations.length >= animationID)
		{
			var el = $("#" + this.owner.element.id);
			if(this.activeAnimation != null && el.hasClass(this.activeAnimation))
                    el.removeClass(this.activeAnimation);
			this.activeAnimation = this.animations[animationID];
			el.addClass(this.activeAnimation);
		}
	};
	this.idle = function()
	{
		var el = $("#" + this.owner.element.id);
			if(this.activeAnimation != null && el.hasClass(this.activeAnimation))
                    el.removeClass(this.activeAnimation);

	};
	
}



