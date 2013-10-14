function Background(name, position, size, layer, filename)
{
	this.name = name;
	this.x = position.x;
	this.y = position.y;
	this.width = size.w;
	this.height = size.h;
	this.renderable = new NCRImage(layer, {}, filename);
	this.touchable  = null;
	this.animatable = null;
}




