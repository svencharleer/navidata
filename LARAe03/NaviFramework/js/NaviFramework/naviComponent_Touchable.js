function NCTouchable(owner,eventHandler)
{
	this.owner = owner;
	this.eventHandler = eventHandler;

	this.fingerEvent = function(point, obj, action)
	{
		if(this.eventHandler == null) return;
		if(action=="hit" && this.eventHandler.onHit != null)
		{
			this.eventHandler.onHit(point, obj);
		}
		if(action=="letgo" && this.eventHandler.onLetGo != null)
		{
			this.eventHandler.onLetGo(obj);
		}
		if(action=="move" && this.eventHandler.onMove != null)
		{
			this.eventHandler.onMove(point,obj);
		}
	}
}

