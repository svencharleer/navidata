function nwNaviLogo()
{
	var name = "nwNaviLogo";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
			document.getElementsByTagName("html")[0].webkitRequestFullScreen();
			naviOverlay.element.style.display = "block";
		},
		onLetGo: function(obj)
		{
		},
		onMove: function(point, obj)
		{

		}
	};
	var layer = 2;
	
	NObject.call(this, name, layer, null, null, "", "", eventHandler, animations, states,[], true);
	this.element.style.display = "";
}

nwNaviLogo.prototype = Object.create(NObject.prototype);
