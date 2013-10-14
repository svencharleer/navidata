function nwMenuItem(name, buttonEvent)
{
	this.name = name;
	var states = [];
	var animations = ["","pulsate"];
	nwButton.call(this, name, null, buttonEvent, true)
	this.animatable = new NCAnimatable(this, ["","pulsate"]);
	this.element.style.display = "";
}

nwMenuItem.prototype = Object.create(nwButton.prototype);

