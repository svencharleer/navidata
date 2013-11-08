var nwMenuItem_Events =
{ 
	badgeTouched: function()
	{
		if(badgeContainer != null)
		{
			//remove badge container
			badgeContainer.delete();
			fw.removeObjectFromDocument(badgeContainer);
			badgeContainer = null;
		}
		else
		{
		    console.log("BADGES REQUEST: LOADING");
			$.getJSON('http://degas.cs.kuleuven.be:3013/badges', badgesLoaded_callBack, "json");

		}
	},

	studentTouched: function()
	{
		if(studentContainer != null)
		{
			//remove badge container
			studentContainer.delete();
			fw.removeObjectFromDocument(studentContainer);
			studentContainer = null;
		}
		else
		{
		    console.log("STUDENT REQUEST: LOADING");
			$.getJSON('http://degas.cs.kuleuven.be:3014/users', studentsLoaded_callBack, "json");
            /*
            $.ajax({   url: 'http://localhost:3000/users',

                dataType: 'json',

                success: studentsLoaded_callBack});   */
		}
	}
};


function nwMenu(position, size)
{
	var name = "nwMenu";
	var states = [];
	var animations = [];
	var events = null;
	var layer = 2;
	var subObjects = [new nwMenuItem("nwMenuItem_Badge", nwMenuItem_Events.badgeTouched), new nwMenuItem("nwMenuItem_Person", nwMenuItem_Events.studentTouched)];

	NObject.call(this, name, layer, position, size, "", "", events, animations, states, subObjects, true, true);
	this.addChildren.call(this, subObjects);
	this.element.style.display = "";
}

nwMenu.prototype = Object.create(NObject.prototype);

