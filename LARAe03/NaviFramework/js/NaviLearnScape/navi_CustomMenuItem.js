


function MenuItem(name, text, position, events) 
{
	var states = ["fadingOut","fadingIn"];
	var animations = [];
	NObject.call(this, name, 2, position, {width:30, height:30}, "square transit", "div", text, events, animations, states,[]);
	


	this.showText = function()
	{
		this.state.switchToState(1);
	}
	this.hideText = function()
	{
		this.state.switchToState(0);
	}
	
	//required callback method if animatable
	this.afterAnimation = null;
	this.afterTransition = null;
}

MenuItem.prototype = Object.create(NObject.prototype);


