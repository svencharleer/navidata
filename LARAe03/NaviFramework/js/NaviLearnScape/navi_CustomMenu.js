function Menu(name, position, menuItems)
{
	var states = ["menuHidden", "menuShown"];
	var animations = [];
	var events = [];
	this.group = [
		new Tile("menuBackground",2,{x:0,y:-10},{width:200,height:fw.view.height+20},"square",{}),
		new Tile("menuRedBar",2,{x:200, y:-10},{width:40, height:fw.view.height+20},"square",
			{
				fingerEvent: function(event, obj)
					{
						obj.element.parentElement.naviData.showHideMenu();
					}
			})
		];

	
	

	var firstMenuItemIndex = this.group.length; //need this to iterate over menuitems
	var length = menuItems.length;

	
	for(var i = 0; i < length; i++)
	{
		this.group.push(new MenuItem(menuItems[i].name, menuItems[i].text, {x:15,y:(50+i*50)}, menuItems[i].events));
	}


	this.afterTransition = function()
					{
						if(this.state.activeState == "menuHidden")
							for(var i = firstMenuItemIndex; i < this.group.length;i++)
								this.group[i].hideText();
						else if(this.state.activeState == "menuShown")
							for(var i = firstMenuItemIndex; i < this.group.length;i++)
								this.group[i].showText();
						
						
					},
	//methods
	this.showHideMenu = function()
					{
						if(this.state.activeState == "menuHidden")
						{
							this.state.switchToState(1);
							//this.state = "becoming_visible";
						}
						else if(this.state.activeState == "menuShown")
						{
							this.state.switchToState(0);
							//this.state = "becoming_hidden";
						}
						
					}

	NObject.call(this, name, 2, null, null, "square transit", "div", "", events, animations, states, this.group);

}


