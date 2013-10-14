function Badge(name, layer, position, size, cssClass, events, filename)
{
	var states = [];
	var animations = [];
	
	NObject.call(this, name, layer, position, size, cssClass, "img", "", events, animations, states,[]);
	this.element.setAttribute("src", filename);
}

Badge.prototype = Object.create(NObject.prototype);

