function NObject(name,  layer, position, size, cssClass, innerHTML, events, animations, states, objects, objectExists, subObjectsAlreadyContained) 
{
	//HTML NODE
	this.element = null;

	this.group = [];
	
	this.doNotDeletedocumentElement = objectExists;


	this.getName = function()
	{
		return name;
	}

	//POSITION
	var _x, _y;
	this.setPosition = function(point, centered)
	{
		if(point != null)
		{
			if(centered == true)
			{
				var size = this.getSize();
				point.x = point.x - size.width/2;
				point.y = point.y - size.height/2;
			}
			else
			{
				point.x = point.x - this.touchAnchor.x;
				point.y = point.y - this.touchAnchor.y;
			}
			this.element.style.left = point.x + 'px';
	    	this.element.style.top = point.y + 'px';
	    	this.element.style.position = 'fixed';
	    	_x = point.x;
	    	_y = point.y;
		}
		else
		{
			this.element.style.left = "";
			this.element.style.top = "";
			this.element.style.position = "";
			_x = 0;
			_y = 0;
		}
	}
	this.touchAnchor = {x:0, y:0};
	//when we touch to move, we want the touch point to be the anchorpoint
	this.setTouchAnchor = function(point)
	{
		var position = this.getPosition();
		this.touchAnchor = {x: point.x - position.x, y: point.y - position.y};
	}
	this.getPosition = function()
	{
		var jelement = $("#"+this.element.id);
        return {x:this.element.getBoundingClientRect().left, y: this.element.getBoundingClientRect().top};
		//return {x:jelement.offset().left, y:jelement.offset().top};
	}
	//SIZE
	var _width, _height;
	this.setSize = function(size)
	{
		this.element.style.width = size.width + 'px';
    	this.element.style.height = size.height + 'px';
    	_width = size.width;
    	_height = size.height;
	}
	this.getSize = function()
	{
		var jelement = $("#"+this.element.id);
        return {width:this.element.getBoundingClientRect().width, height: this.element.getBoundingClientRect().height};
        //    return {width:jelement.outerWidth(), height:jelement.outerHeight()};


	}
	this.layer = layer;
	
	//TELLS ENGINE SOMETHING CHANGED
	this.updateMe = false;

	//INIT
	{
		if(!objectExists)
		{
			this.element = document.createElement("div");
		    this.element.innerHTML = innerHTML;
		    //this.element = this.element.firstChild;
		    this.element.id = name;
		    this.element.className = this.element.className + " " + cssClass;
	    }
	    else
	    {
	    	this.element = document.getElementById(name);
	    }
	    if(size != null)
	    	this.setSize(size);
	    
	    if(position != null)
	    {
	    	this.setPosition(position);
	    	
	    }
	    this.element.naviData = this;
	}

	this.removeChildren = function(objects)
	{
		if(objects == null)
	    {
	        fw.removeObjectsFromDocument(this.group);
	        this.group = [];
	    }
	    else
	    {
	    	var newGroup = [];
	    	for(var i = 0; i < this.group.length; i++)
		    {
		    	var found = false;
		    	for(var j = 0; j < objects.length; j++)
		    	{
		    		if(objects[j].element.id == this.group[i].element.id)
		    		{
		    			found = true;
		    			this.group[i] = null;
		    			break;
		    		}
		    		
		    	}
		    	if(!found)
		    		newGroup.push(this.group[i]);
		    }

		    fw.removeObjectsFromDocument(objects);
		    this.group = newGroup;
	    }
	}
	this.addChildren = function(objects, appendToHTML)
	{
		
	    if(objects != null)
	    {
	        for(var i = 0; i < objects.length; i++)
	        {
	        	this.group.push(objects[i]);
	            if(appendToHTML)
	            	this.element.appendChild(objects[i].element);
	        }
	    }
	}

	//COMPONENTS
	//this.afterAnimation = null;
	//this.afterTransition = null;
	if(events != null)
		this.touchable = new NCTouchable(this, events);
	this.animatable = new NCAnimatable(this, animations);
	this.state = new NCState(this, states);

	//ACTIVATE object
	this.activate = function()
	{
		if(this.state != null)
			this.state.switchToState(0);
		if(this.animatable != null)
			this.animatable.switchToAnimation(0);
	}
      
	

	
}






