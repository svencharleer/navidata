//MAIN LOGIC ... LOOP?

var badgeContainer;
var studentContainer;
var naviLogo;
var naviOverlay;
var naviActivityByDayGraph;
var naviBadgeStudentGraph;
var naviTimeSliderLeft, naviTimeSliderRight, naviTimeSliderPlay;

var nwCompareButton1, nwCompareButton2;
var naviBadgeGraphs;


function length(point)
{
	return Math.sqrt(point.x * point.x + point.y * point.y);
}
function dot(point1, point2)
{
	return point1.x * point2.x + point1.y * point2.y;
}
			
var rad2deg = (180/3.14159265);
function calculateRotation(position)
{
	//imagine origin in middle of screen, that's the vector we're creating
	//move position vector by half the screen up left so it's origin we're comparing is up left
	var transPos = {x:position.x - fw.view.width/2.0, y:position.y - 2.0*fw.view.height/3.0 };
	var xVector = {x:1, y:0};
	var div = length(transPos) * length(xVector);
	returnValue =  Math.acos(dot(xVector,transPos) / div) * rad2deg - 90;
	if(transPos.y < 0) returnValue = -returnValue + 180;
	console.log("rotation result is " + returnValue);
	return returnValue;
}



function loadMenu(){
	naviLogo = new nwNaviLogo();
	naviOverlay = new nwNaviOverlay();
    naviActivityByDayGraph = new nwNaviActivityByDayGraph();
    naviBadgeStudentGraph = new nwBadgeStudentGraph();

    naviTimeSliderLeft = new nwTimeSliderLeft();
    naviTimeSliderRight = new nwTimeSliderRight();
    naviTimeSliderPlay = new nwTimeSliderPlay();

	fw.addObjectToDocument(naviLogo);
	fw.addObjectToDocument(naviOverlay);
    fw.addObjectToDocument(naviActivityByDayGraph)    ;
    fw.addObjectToDocument(naviBadgeStudentGraph)    ;
    fw.addObjectToDocument(naviTimeSliderLeft)    ;
    fw.addObjectToDocument(naviTimeSliderRight)    ;
    fw.addObjectToDocument(naviTimeSliderPlay)    ;
	//load objects
	//var objects = [new nwMenu(null,null)];//{x:2*fw.view.width/5, y:7.3*fw.view.height/8}, {width:fw.view.width/5, height:fw.view.height/8})];
	//fw.addObjectsToDocument(objects);
	nwMenuItem_Events.badgeTouched();
	nwMenuItem_Events.studentTouched();



    nwCompareButton1 = new nwCompareButtonItem("nwCompareButton", eventButtonCompare1);
    nwCompareButton2 = new nwCompareButtonItem("nwCompareButton2", eventButtonCompare2);


    fw.addObjectToDocument(nwCompareButton1);
    fw.addObjectToDocument(nwCompareButton2);

    naviBadgeGraphs = new nwBadgeGraphs();
    fw.addObjectToDocument(naviBadgeGraphs);




}

function getStudentsInPlayField()
{
	var returnValues = [];
	if(studentContainer == null || studentContainer.students == null)
		return returnValues;
	for(var i = 0; i < studentContainer.students.length; i++)
	{
		if(studentContainer.students[i].activated)
			returnValues.push(studentContainer.students[i].studentName);
	}
	return returnValues;

}

function getStudentObjectsInPlayField()
{
	var returnValues = [];
	if(studentContainer == null || studentContainer.students == null)
		return returnValues;
	for(var i = 0; i < studentContainer.students.length; i++)
	{
		if(studentContainer.students[i].activated)
			returnValues.push(studentContainer.students[i]);
	}
	return returnValues;

}

function getBadgeObjectsInPlayField()
{
	var returnValues = [];
	if(badgeContainer == null || badgeContainer.badges == null)
		return returnValues;
	for(var i = 0; i < badgeContainer.badges.length; i++)
	{
		if(badgeContainer.badges[i].activated)
			returnValues.push(badgeContainer.badges[i]);
	}
	return returnValues;

}




var badgesLoaded = false;
var studentsLoaded = false;
var loadingDone = function(badges, students)
{
    if(badges) badgesLoaded = true;
    if(students) studentsLoaded = true;
    if(badgesLoaded && studentsLoaded)
    {
        addBadgeGraph("");
        $.getJSON('http://ariadne.cs.kuleuven.be/larae3/flatActivity', updateGraph, "json");
    }
}

