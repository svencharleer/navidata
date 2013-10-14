function nwBadgeGraphs()
{
	var name = "nwBadgeGraphs";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
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

function initSingleBadgeGraphs()
{
    dataCache["nwBadgeGraphs"]["DATA"].forEach(function(d){
        initSingleBadgeGraph(d.key);
    });
}

function loadSingleBadgeGraphs()
{

    dataCache["nwBadgeGraphs"]["DATA"].forEach(function(d){
        //d.key is badge_image
        var set1 = 0, set2 = 0;
        if(dataCache["nwBadgeGraphs"]["DATA_USERS"][d.key] != null)
            set1 = dataCache["nwBadgeGraphs"]["DATA_USERS"][d.key].count;
        if(dataCache["nwBadgeGraphs"]["DATA_USERS2"][d.key] != null)
            set2 = dataCache["nwBadgeGraphs"]["DATA_USERS2"][d.key].count;

        addSingleBadgeGraph(d.key, d.value.count,set1,set2);

    });

}

var bg_svgW = 250;//1200;
var bg_svgH = 40;
var bg_graphBarPadding = 1;
var bg_graphPaddingX = 0;
var bg_graphPaddingY = 0;


function initSingleBadgeGraph(title)
{
    var w = bg_svgW;
    var h = bg_svgH;
    var divGlobal =  d3.select("#nwBadgeGraphs")
        .append("div")
        .attr("id","singleBadgeGraph"+title)
        .attr("class", "singleBadgeGraph");
    divGlobal
        .append("img")
        .attr("src", badgesById[title].image);
    var div = divGlobal.append("div")
        .attr("id", "singleBadgeGraphDetails"+title )
        .attr("class","singleBadgeGraphDetails");


    var svg = div
        .append("svg")
        .attr("id","badgeGraph" +title )
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!



    var mainBars = svg.append("g").attr("id","bg_mainbars"+title);
    mainBars.append("text")
        .attr("x",0)
        .attr("y",10)
        .attr("fill","white")
        .text("T");
    var set1Bars = svg.append("g").attr("id","bg_set1bars"+title);
    set1Bars.append("text")
        .attr("x",0)
        .attr("y",22)
        .attr("fill","white")
        .text("S1");
    var set2Bars = svg.append("g").attr("id","bg_set2bars"+title);
    set2Bars.append("text")
        .attr("x",0)
        .attr("y",34)
        .attr("fill","white")
        .text("S2");


    div
        .append("h2")
        .text( badgesById[title].name);
    div
        .append("p")
        .text(badgesById[title].description);
}

function addSingleBadgeGraph(title, total, set1, set2) {

    var svg = d3.select("#nwBadgeGraphs");
    var mainBars = svg.select("#bg_mainbars"+title);
    var set1Bars = svg.select("#bg_set1bars"+title);
    var set2Bars = svg.select("#bg_set2bars"+title);



    // var rects = mainBars.selectAll("rect");
    var dataTotal = [];
    var dataSet1 = [];
    var dataSet2 = [];
    for(var i = 0;i < total;i++)
        dataTotal.push(1);
    for(var i = 0;i < set1;i++)
        dataSet1.push(1);
    for(var i = 0;i < set2;i++)
        dataSet2.push(1);

    var bars = [{bar:mainBars, name:"bg_mainbars", color:"#008293",y:0, data:dataTotal},
                {bar:set1Bars, name:"bg_set1bars", color:"#00daec",y:12, data:dataSet1},
                {bar:set2Bars, name:"bg_set2bars", color:"#ff877f",y:24, data:dataSet2}];

    bars.forEach(function(d){
        d.bar.selectAll("rect").remove();
        d.bar.selectAll("rect").data(d.data).enter().append("rect")
            .attr("id",  "bg_mainbars" + title + "_" + i)
            .attr("y",  d.y+2)

            .attr("x", function(d,i){return 15+ i*2;}) // map the user name onto the correct X value

            .attr("width", 1)
            .attr("height", 10)

            .attr("fill", d.color);




    });

    var divDetails = d3.select("#singleBadgeGraphDetails"+title);
    divDetails[0][0].addEventListener('mousedown', function(event){

        event.currentTarget.setAttribute("class","singleBadgeGraphDetails scroller");
    });
    divDetails[0][0].addEventListener('webkitAnimationEnd', function(event){

        event.currentTarget.setAttribute("class","singleBadgeGraphDetails");
    });










}



nwBadgeGraphs.prototype = Object.create(NObject.prototype);








