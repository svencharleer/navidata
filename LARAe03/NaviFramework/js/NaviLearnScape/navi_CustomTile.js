function Tile(name, layer, position, size, cssClass, events)
{
	var states = [];
	var animations = [];//["rotatingtile"];
	
	NObject.call(this, name, layer, position, size, "square", "div", "Tile", events, animations, states,[]);
	this.animatable.switchToAnimation(0);
}

Tile.prototype = Object.create(NObject.prototype);


