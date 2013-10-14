var badgesGeneral = [];
var badgesFiltered = [];
var badgesById = {};
var badgesLoaded_callBack = function(json)
{	
	console.log("BADGES REQUEST: DONE");
	if(badgeContainer != null)
		badgeContainer.removeBadges();
	var objects = [];
	var iteration = -1;
	for(var i = 0; i < Object.keys(json).length; i++)
	{
		//iteration = json[i].biweek;
        var badge = json[Object.keys(json)[i]];
		objects.push(new nwBadgeIcon(badge.id, null, null, badge.image, badge));
        badgesGeneral.push(badge);
        badgesById[badge.id] = badge;
	};
    badgesFiltered = JSON.parse(JSON.stringify(badgesGeneral)); //deep copy
    filterData(false);
	if(badgeContainer == null)
		badgeContainer = new nwBadgeContainer({x:fw.view.width/3.4, y:fw.view.height/3}, null);
	badgeContainer.addBadges(objects, "Badges");
	fw.addObjectsToDocument([badgeContainer]);
	updateBadgeColors();
    setTimeout(function(){loadingDone(true, false);},1000);
};

var updateBadgeColors = function(removeConnections)
{
	var students = getStudentObjectsInPlayField();
	return updateBadgeColorsForStudent(students,removeConnections);
};

var updateBadgeColorsForStudent = function(students,removeConnections)
{
	if(badgeContainer == null || badgeContainer.badges == null)
		return null;
	for(var i = 0; i < badgeContainer.badges.length;i++)
	{
		var studentsFound = false;
        for(var j = 0; j< students.length; j++)
        {
            if( badgeContainer.badges[i].badgeData.awardedTo[students[j].studentName] != null)
            {
                studentsFound = true;
                /*if(removeConnections)
                {
                    //fw.removeConnection(badgeContainer.badges[i], students[j]);
                    //$("#"+students[j].element.id).removeClass("selectedObject");
                    $("#"+badgeContainer.badges[i].element.id).removeClass("selectedObject");
                }
                else if(badgeContainer.badges[i].activated)
                {
                    //$("#"+students[j].element.id).addClass("selectedObject");
                    $("#"+badgeContainer.badges[i].element.id).addClass("selectedObject");
                    //fw.drawConnection(badgeContainer.badges[i], students[j]);
                } */
            }
        }

		if(!studentsFound)
            $("#"+badgeContainer.badges[i].element.id).removeClass("selectedObject" + compareGroupStatus);
		else
            $("#"+badgeContainer.badges[i].element.id).addClass("selectedObject" + compareGroupStatus);
	}
}

/*var	nwBadge_Arrow_Events =
{ 
	nwBadge_Arrow_Page: 0,
	buttons: [],
	Back_Touched: function(point, obj)
	{
		
		nwBadge_Arrow_Events.nwBadge_Arrow_Page--;
		if(nwBadge_Arrow_Events.nwBadge_Arrow_Page == 0) nwBadge_Arrow_Events.buttons[0].element.style.visibility = "hidden";
		nwBadge_Arrow_Events.buttons[1].element.style.visibility = "";
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:3000/badges', badgesLoaded_callBack, "json");
	},
	Forward_Touched: function(point, obj)
	{
		nwBadge_Arrow_Events.nwBadge_Arrow_Page++;
		if(nwBadge_Arrow_Events.nwBadge_Arrow_Page == 6) nwBadge_Arrow_Events.buttons[1].element.style.visibility = "hidden";
		nwBadge_Arrow_Events.buttons[0].element.style.visibility = "";
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:3000/badges', badgesLoaded_callBack, "json");
	},
};*/

function nwBadgeContainer()
{
	var name = "nwBadgeContainer";
	var states = [];
	var animations = [];
	var events = null;
	var layer = 2;
	this.badges = [];
	this.type = "container";
	
	//positioning, depending on different containers/platforms...
	
	this.thereAreXContainer = function(numberOfContainers)
	{
		/*if(numberOfContainers == 1)
		{
			$("#"+ this.element.id).removeClass("container_2x1");
			$("#"+ this.element.id).addClass("container_1x1");
		}
		else
		{
			$("#"+ this.element.id).removeClass("container_1x1");
			$("#"+ this.element.id).addClass("container_2x1");
		}         */
	}
	
	NObject.call(this, name, layer, null, null, "", "", events, animations, states, this.badges, true);
	this.addBadges = function(_badges, title)
	{
		//this.titleElement.innerHTML = title;
		for(var i = 0; i < _badges.length;i++)
			this.badges.push(_badges[i]);
		this.addChildren.call(this, _badges, true);	
	}
	this.removeBadges = function()
	{
		$("[id$=_ph]").remove();
		this.removeChildren.call(this, this.badges);
		this.badges.length = 0; //does this really work?
	}
	//this.element.style.display = "";
	
	//this.element.style.visibility = "";
	this.titleElement = document.getElementById("nwBadgeContainer_Title");



	
	//var nwBadgeArrowLeft = new nwButton("nwBadgeContainer_ArrowLeft" , null, nwBadge_Arrow_Events.Back_Touched, true );
	//nwBadge_Arrow_Events.buttons.push(nwBadgeArrowLeft);
	//var nwBadgeArrowRight = new nwButton("nwBadgeContainer_ArrowRight" , null, nwBadge_Arrow_Events.Forward_Touched, true );
	//nwBadge_Arrow_Events.buttons.push(nwBadgeArrowRight);
	//this.addChildren.call(this, [nwBadgeArrowLeft, nwBadgeArrowRight]);
	//REMEMBER WE HAVE TO DELETE THESE AT SOME POINT
	//ALSO MAYBE WE WANNA PUT THEM ALL IN THE GROUP POOL --> K WE DID THAT BUT I THINK THEY STAY IN MEMORY IN THE LAYER OF THE FRAMEWORK

	//nwBadgeArrowLeft.element.style.visibility = "hidden";

	this.delete = function()
	{
		this.removeBadges();
		//delete nwBadgeArrowLeft;
		//delete nwBadgeArrowRight; //we gotta make destructors per object, take into account to delete doc element or not
		this.element.style.display = "none";
	}

}



nwBadgeContainer.prototype = Object.create(NObject.prototype);

