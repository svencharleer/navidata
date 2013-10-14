function nwButton(name, template, buttonEvent, alreadyInDocument, _innerHTML, _order)
{
	var name = name;
	var states = [];
	var animations = [];
    this.order = _order;
	var eventHandler =  
	{
		timer: null,
		onHit: function(point, obj)
		{
			if(this.timer == null)
			{
				obj.animatable.switchToAnimation(1);
				this.timer = setTimeout(function()
						{
							buttonEvent(obj);
							obj.animatable.idle();
						},

						10);
				return;
			}
		},
		onLetGo: function(obj)
		{
			obj.animatable.idle();
			clearTimeout(this.timer);
			this.timer = null;
		},
		onMove: function(point, obj)
		{

		}
	};
	var layer = 2;
	var innerHTML = "";
	if(template != null)
		innerHTML = $("#" + template).html();
    else
    if(innerHTML != null)
        innerHTML = _innerHTML;
	NObject.call(this, name, layer, null, null, "", innerHTML, eventHandler, animations, states,[], alreadyInDocument);
	this.element.style.display = "";
}

nwButton.prototype = Object.create(NObject.prototype);