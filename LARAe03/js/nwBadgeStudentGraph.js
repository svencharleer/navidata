function nwBadgeStudentGraph()
{
	var name = "nwBadgeStudentGraph";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
            //find the svg

            //find the rect


			//document.getElementsByTagName("html")[0].webkitRequestFullScreen();
			//naviOverlay.element.style.display = "block";
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

var bsg_svgW = 1000;//1200;
var bsg_svgH = 900;
var bsg_graphBarPadding = 1;
var bsg_graphPaddingX = 100;
var bsg_graphPaddingY = 200;


function addBadgeGraph(title) {

    var nrOfStudents = studentsGeneral.length;
    var nrOfBadges = badgesFiltered.length;

    var studentToGraphPositionMap = {};
    for(var i = 0; i < nrOfStudents;i++)
    {
        studentToGraphPositionMap[studentsGeneral[i].username] = i;
    }


    var w = bsg_svgW;
    var h = bsg_svgH;
    var svg = d3.select("#nwBadgeStudentGraph")
        .append("svg")
        .attr("id","circlechart" )
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!
    var barPadding = bsg_graphBarPadding;
    var paddingX = bsg_graphPaddingX;
    var paddingY = bsg_graphPaddingY;
    var yScale = d3.scale.linear()
        .domain([0, nrOfBadges-1])
        .range([paddingX+10, h-paddingX]);

    var xMax = nrOfStudents;
    var xScale = d3.scale.linear()
        .domain([0, nrOfStudents-1])

    .range([paddingY+10, w - paddingY ]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(badgesGeneral.length)
        .tickFormat(function(d,i) {
            return badgesFiltered[d].name; })

        .orient("left")
        ;


    var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(studentsGeneral.length)
        .orient("top")

        .tickFormat(function(d,i) {

            return studentNames[studentsGeneral[d].username]; });


    svg.append("g")
        .attr("class", "CircleGraphAxis")
        .attr("transform", "translate(0," + ( paddingX -5)+ ")")

        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "10px")
        .attr("transform", function(d) {
            return "rotate(45)"
        })

    ;
    svg.append("g")
        .attr("class", "CircleGraphAxis")
        .attr("transform", "translate(" + (paddingY - 5) + ",0)")

        .call(yAxis)
        ;


    for(var i = 0; i < nrOfBadges;i++)
    {

        var dataset = badgesFiltered[i].awardedToFlat;
        var chartName = badgesFiltered[i].id;
        var colors = {"positive":"#92ffa1", "negative":"#ff9292", "neutral":"#92e2ff"};
        var color = colors[badgesFiltered[i].connotation];
        var mainBars = svg.append("g").attr("id","bsg_mainCircles"+chartName);
        mainBars.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "mainBar")
            .attr("id", function(d,i) { return "circlechart" + chartName + d + i;})
            .attr("cy", yScale(i))

            .attr("cx", function(d,i) {
                return xScale(studentToGraphPositionMap[d.key]);}) // map the user name onto the correct X value

            .attr("r",
            function(d,j) {

                return d.value;})

            .attr("fill", "#008293");
    }



    svg.append("text")
        .attr("class", "ActivityGraphTitle")
        .attr("x", 35)
        .attr("y", 20)
        //.attr("x", -h/2)
        //.attr("y", 20)
        //.attr("text-anchor", "middle")
        //.attr("transform", "rotate(-90)")
        .attr("fill","yellow")
        .text(title);


   // setTimeout(function(){filtering();},5000);
}


function updateBadgeStudentGraph()
{
    var nrOfStudents = studentsGeneral.length;
    var nrOfBadges = badgesGeneral.length;

    var studentToGraphPositionMap = {};
    for(var i = 0; i < nrOfStudents;i++)
    {
        var isSelectedInGroup1 = graph_selectedUsers[0].indexOf(studentsGeneral[i].username) != -1 ? true:false;
        var isSelectedInGroup2 = graph_selectedUsers[1].indexOf(studentsGeneral[i].username) != -1 ? true:false;

        studentToGraphPositionMap[studentsGeneral[i].username] = {index:i, selected1:isSelectedInGroup1, selected2:isSelectedInGroup2};
    }


    var w = bsg_svgW;
    var h = bsg_svgH;
    var svg = d3.select("#circlechart");


    var paddingX = bsg_graphPaddingX;
    var paddingY = bsg_graphPaddingY;
    var yScale = d3.scale.linear()
        .domain([0, nrOfBadges-1])
        .range([paddingX+10, h-paddingX]);

    var xScale = d3.scale.linear()
        .domain([0, nrOfStudents-1])

        .range([paddingY+10, w - paddingY ]);



    for(var i = 0; i < nrOfBadges;i++)
    {

        var dataset = badgesFiltered[i].awardedToFlat;
        var chartName = badgesFiltered[i].id;
        var colors = {"positive":"#92ffa1", "negative":"#ff9292", "neutral":"#92e2ff"};
        //var color = colors[badgesFiltered[i].connotation];
        var mainBars = svg.select("#bsg_mainCircles"+chartName);

        var p = mainBars.selectAll("circle")
            .data(dataset)

            .attr("cy", yScale(i))

            .attr("cx", function(d,i) {
                return xScale(studentToGraphPositionMap[d.key].index);}) // map the user name onto the correct X value

            .attr("r", function(d,j) {
                return d.value;})

            .attr("fill",  function(d){
                if(studentToGraphPositionMap[d.key].selected1) return "#00daec";
                if(studentToGraphPositionMap[d.key].selected2) return "#ff877f";
                if(graph_selectedUsers[0].length == 0 && graph_selectedUsers[1].length == 0)
                    return "#008293";
                else
                    return "#004959";//"#004959";


            });

        p
            .enter()
            .append("circle")
            .attr("class", "mainBar")
            .attr("id", function(d,i) { return "circlechart" + chartName + d + i;})
            .attr("cy", yScale(i))

            .attr("cx", function(d,i) {
                return xScale(studentToGraphPositionMap[d.key].index);}) // map the user name onto the correct X value

            .attr("r",
            function(d,j) {

                return d.value;})

            .attr("fill",  function(d){
                if(studentToGraphPositionMap[d.key].selected1) return "#00daec";
                if(studentToGraphPositionMap[d.key].selected2) return "#ff877f";
                if(graph_selectedUsers[0].length == 0 && graph_selectedUsers[1].length == 0)
                    return "#008293";
                else
                    return "#004959";//"#004959";


            });




        p.exit().remove();

    }




}


nwBadgeStudentGraph.prototype = Object.create(NObject.prototype);








//badgesFiltered
function filterData(filter, from, till)
{
    badgesFiltered = [];
    badgesGeneral.forEach(
        function(d)
        {
            /*var lessAwards = {};
            for(var i = 0; i < Object.keys(d.awardedTo).length;i++)
            {
                  lessAwards[Object.keys(d.awardedTo)[i]] = d.awardedTo[Object.keys(d.awardedTo)[i]].slice(0, 2);
            }*/

            var awards = crossfilter(d.awardedToFlat);
            var awardsByDateDimension = awards.dimension(function(f) {
                return f.timestamp;
            });

            var _minDate = minDate;
            var _maxDate = maxDate;
            if(filter)
            {
                _minDate = from;
                _maxDate = till;
            }



            var awardsByStudentsFilteredByDateArray = awardsByDateDimension.filter([_minDate.valueOf(), _maxDate.valueOf()]).top(Infinity);
            //console.log(_minDate + " " + _maxDate);
            var dateRange = crossfilter(awardsByStudentsFilteredByDateArray);
            var dateRangeWithStudentDimension = dateRange.dimension(function(f) { return f.student});


            var awardsPerStudents =  dateRangeWithStudentDimension.group().reduceCount();


            var da = JSON.parse(JSON.stringify(d)); //deep copy
            da.awardedToFlat = awardsPerStudents.top(Infinity);
            badgesFiltered.push(da);
        }
    )

    //var test = [{id:1, name: "test"}, {id:2, name: "test2"},{id:3, name: "test3"}];
    //var t = crossfilter(test);
    //var sorted = t.dimension

    //

}