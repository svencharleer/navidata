function nwCompareButtonItem(name, buttonEvent)
{
	this.name = name;
	var states = [];
	var animations = ["","pulsate"];
	nwButton.call(this, name, null, buttonEvent, true)
	this.animatable = new NCAnimatable(this, ["","pulsate"]);
	this.element.style.display = "";
}

nwMenuItem.prototype = Object.create(nwButton.prototype);

var GRAPH_NOCOMPARE = 0;
var GRAPH_COMPARE = 1;

var compareGroupStatus =   GRAPH_NOCOMPARE;

function eventButtonCompare1()
{
    if(compareGroupStatus == GRAPH_COMPARE)
    {
        compareGroupStatus = GRAPH_NOCOMPARE;
        $("#nwCompareButton").css("background-color","#00daec");
        $("#nwCompareButton2").css("background-color","#410000");
    }

}

function eventButtonCompare2()
{
    if(compareGroupStatus == GRAPH_NOCOMPARE)
    {
        compareGroupStatus = GRAPH_COMPARE;
        $("#nwCompareButton2").css("background-color","#ff877f");
        $("#nwCompareButton").css("background-color","#003749");
    }

}
