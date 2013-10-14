var studentsGeneral = [];
var studentNames = {};

var studentsLoaded_callBack = function(json)
{	
	console.log("STUDENTS REQUEST: DONE");
	
	var objects = [];
    for(var i = 0; i < Object.keys(json).length; i++)
    {
        var user = json[Object.keys(json)[i]];
		objects.push(new nwStudent(user.username.replace(/[^A-Za-z0-9]+/g, ''), null, null, user.username, user));
        studentNames[user.username] = user.fullname;
        studentsGeneral.push(user);
	};
	if(studentContainer == null)
		studentContainer = new nwStudentContainer();
	else
		studentContainer.resetStudents();
	studentContainer.setStudents(objects);


	fw.addObjectsToDocument([studentContainer]);
	setTimeout(function(){loadingDone(false,true);},1000);
};


var updateStudentColors = function(removeConnections)
{
	var badges = getBadgeObjectsInPlayField();
	return updateStudentColorsForBadges(badges,removeConnections);
}
var updateStudentColorsForBadges = function(badges,removeConnections)
{
	if(studentContainer == null || studentContainer.students == null)
		return null;
	for(var i = 0; i < studentContainer.students.length;i++)
	{
        var student = studentContainer.students[i];
        for(var j = 0; j < badges.length;j++)
        {

            var badgesFound = false;
            if(student.studentData.awards[badges[j].id] != null)
            {
                /*if(removeConnections)
                {
                    $("#"+student.element.id).removeClass("selectedObject");
                    //$("#"+badges[j].element.id).removeClass("selectedObject");
                    //fw.removeConnection(badges[j], student);
                }
                else if(student.activated)
                {
                    $("#"+student.element.id).addClass("selectedObject");
                    //$("#"+badges[j].element.id).addClass("selectedObject");
                    //fw.drawConnection(badges[j], student);
                }*/
                badgesFound = true;

            }
        }

		if(!badgesFound)
			$("#" + student.element.id).removeClass("highlightedStudent" + compareGroupStatus);
		else
			$("#" + student.element.id).addClass("highlightedStudent" + compareGroupStatus);
	}
};


function nwStudentContainer()
{
	var name = "nwStudentContainer";
	var states = [];
	var animations = [];
	var events = null;
	var layer = 2;
	this.students = [];
	this.type = "container";

	this.setStudents = function(_students)
	{
        this.students = _students;
        var groups = {};
        for(var i = 0; i < _students.length; i++)
        {
            if(groups[_students[i].studentData.group] == null)
                groups[_students[i].studentData.group] = [];
            groups[_students[i].studentData.group].push(_students[i]);
        }
        for(var i = 0; i < Object.keys(groups).length;i++)
        {
            var key = Object.keys(groups)[i];
            if(key == "undefined")
                continue;
            //add divider
            var element = document.createElement("div");
            element.className = "nwGroupDivider";
            element.innerHTML = key;
            groups[key].forEach(function(d){
                element.appendChild(d.element);

            })

            this.element.appendChild(element);

            this.addChildren.call(this, groups[key], false);
        }


		/*var element = document.createElement("div");
        this.element.id = name;
        this.element.className = this.element.className + " " + cssClass;

        this.element.appendChild("<div class="student_group">)
		*/

	}

	this.resetStudents = function()
	{
		this.removeChildren.call(this, this.students);
		this.students = [];
	}

	//positioning, depending on different containers/platforms...
	
	this.thereAreXContainer = function(numberOfContainers)
	{
		if(numberOfContainers == 1)
		{
			$("#"+ this.element.id).removeClass("container_2x1");
			$("#"+ this.element.id).addClass("container_1x1");
		}
		else
		{
			$("#"+ this.element.id).removeClass("container_1x1");
			$("#"+ this.element.id).addClass("container_2x1");
		}
	}
	
	

	NObject.call(this, name, layer, null, null, "", "", events, animations, states, [], true);
	
	this.element.style.display = "";
	this.element.style.visibility = "";


	this.delete = function()
	{
		this.resetStudents();
		this.element.style.display = "none";
	}

}



nwStudentContainer.prototype = Object.create(NObject.prototype);

