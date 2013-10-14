function NOScene(name, layer, offset)
{
	this.name = name;
	this.x = offset.x;
	this.y = offset.y;
	this.group = new NCGroup(layer, []);
	this.status = "not loaded"; // "loaded" "entering" "exiting"
	this.init = function()
	{
		fw.pushScene(this);
		this.status = "entering";
		this.entering();
		// load everything that is needed
	};
	this.exit = function()
	{
		this.status = "exiting";
		this.exiting();
	}
	this.update = function()
	{
		// every frame we check if there's any action that needs to be performed
	}
	this.animate = function()
	{
		// custom animtations for entire scene
	};
	this.entering = function()
	{
		//a scene will maybe animate into place
		fw.addObjectsToCanvas([this]);
		this.status = "loaded";
	}
	this.exiting = function()
	{
		// a scene might animate out of screen
		
		fw.removeObjectsFromCanvas([this]);
		this.status = "not loaded";
	}
}