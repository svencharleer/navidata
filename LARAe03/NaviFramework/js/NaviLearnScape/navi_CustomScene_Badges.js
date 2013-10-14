function BadgeScene() 
{
	var events = [];
	var states = [];
	var animations = [];
	this.group = [];
	
	this.addObject = function(object)
	{
		this.group.push(object);
		this.element.appendChild(object.element);
	}

	//required callback method if animatable
	this.afterAnimation = null;
	this.afterTransition = null;
	this.loadingDone = function()
	{
		for(var i = 0; i < this.group.length; i++)
		{
			this.group[i].setPosition({x: (i % 10) * 50, y : (i / 10) * 60});
		}
	}

	this.callBack = function(json)
	{	
		
		
		for(var i = 0; i < json.length; i++)
		{

			document.getElementById("BadgeScene").naviData.addObject(new Badge(json[i].GUID, 2, null, {width:50,height:50}, "transit", events, json[i].imageUrl));
		};
		setTimeout(function(){document.getElementById("BadgeScene").naviData.loadingDone();},1000);
		

	};
	

	NObject.call(this, "BadgeScene", 2, {x:300, y:0}, null, "square transit", "div", "", events, animations, states, this.group);
	//init
	{	console.log("loading badges")
		$.getJSON('http://localhost:8888/REST/getBadges?callback=', this.callBack, "json");
	}
}

MenuItem.prototype = Object.create(NObject.prototype);



