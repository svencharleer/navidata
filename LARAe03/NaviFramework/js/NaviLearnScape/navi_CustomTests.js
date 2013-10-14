

function customEvent_MouseDown(event, obj)
{
	obj.animatable.idle();
};




function RotatingTile(name, layer, position, size, style, events)
{
	Tile.call(this, name, layer, position, size, style, events);
	this.animatable = new NCAnimatable(this,["rotatingtile"]);
	this.animatable.switchToAnimation(0);
}

RotatingTile.prototype = Object.create(Tile.prototype);

var tile1 = new Tile("tile1", 2, {x: 400, y:200}, {width:50, height:50}, "square", {mouseDownEvent: genericTouchEvents.dragging_mouseDown, mouseDragEvent: genericTouchEvents.dragging_mouseDrag, mouseUpEvent: genericTouchEvents.dragging_mouseUp,fingerEvent: genericTouchEvents.fingerEvent})

var tile2 = new RotatingTile("tile2", 2, {x: 200, y:200}, {width:50, height:50}, "square", {mouseDownEvent: customEvent_MouseDown, fingerEvent: customEvent_MouseDown})



