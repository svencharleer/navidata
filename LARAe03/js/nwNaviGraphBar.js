function nwNaviGraphBar(graphID, barID, _value)
{
	var name = barID ;
    var graph = graphID;
    var value = new Date(_value);
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
            var verb = "";
            switch(graphID)
            {
                case "nwTweetGraph":
                    verb = "tweeted";
                    break;
                case "nwBlogPostGraph":
                    verb = "posted";
                    break;
                case "nwBlogCommentGraph"   :
                    verb = "commented";
                    break;
                case "nwActivityGraph" :
                    verb = "";
                    break;
            }
            $("#nwNaviDetailedActivityView").empty();
            var dateForURL = "";
            if(verb != "")
                dateForURL = 'http://degas.cs.kuleuven.be:3013/activitybydate/' + value.getTime() + "/" + verb;
            else
                dateForURL = 'http://degas.cs.kuleuven.be:3013/activitybydate/' + value.getTime();

            $.getJSON(dateForURL, barClick_callback, "json");
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

nwNaviGraphBar.prototype = Object.create(NObject.prototype);


function graphBarHit(id, date)
{
    var verb = "";
    switch(id)
    {
        case "nwTweetGraph":
            verb = "tweeted";
            break;
        case "nwBlogPostGraph":
            verb = "posted";
            break;
        case "nwBlogCommentGraph"   :
            verb = "commented";
            break;
        case "nwActivityGraph" :
            verb = "";
            break;
        case "nwBadgeActivityGraph" :
            verb = "awarded";
            break;
    }
    $("#nwNaviDetailedActivityView").empty();
    $("#nwNaviDetailedActivityView").text("Loading...");
    var dateForURL = "";
    if(verb != "")
        dateForURL = 'http://degas.cs.kuleuven.be:3013/activitybydate/' + date + "/" + verb;
    else
        dateForURL = 'http://degas.cs.kuleuven.be:3013/activitybydate/' + date;

    $.getJSON(dateForURL, barClick_callback, "json");

}

//nwNaviDetailedActivityView
var link = [];
var bkData = {};
function barClick_callback(data)
{     $("#nwNaviDetailedActivityView").empty();
     bkData = data;
    for(var i = 0; i < data.length; i++)
    {

        var html = "";
        switch(data[i].verb)
        {
            case "tweeted":
                html = "<div class='activityEntry' student='"+data[i].username+"'><div class='activityType'>tweet</div><div class='activityUser'>" + studentNames[data[i].username] + "</div><div class='activityTime'>"+ new Date(data[i].starttime).getDate() + "/" + (new Date(data[i].starttime).getMonth()+1) +"</div></div>";
                link[i] = "https://twitter.com/" +data[i].username + "/status/" + data[i].object;
                break;
            case "posted":
                html = "<div class='activityEntry' student='"+data[i].username+"'><div class='activityType'>blog post</div><div class='activityUser'>" + studentNames[data[i].username] + "</div><div class='activityTime'>"+ new Date(data[i].starttime).getDate() + "/" + (new Date(data[i].starttime).getMonth()+1) +"</div></div>";
                link[i] = data[i].object;
                break;
            case "commented"   :
                html = "<div class='activityEntry' student='"+data[i].username+"'><div class='activityType'>blog comment</div><div class='activityUser'>" + studentNames[data[i].username] + "</div><div class='activityTime'>"+ new Date(data[i].starttime).getDate() + "/" + (new Date(data[i].starttime).getMonth()+1) +"</div></div>";
                link[i] = data[i].object;
                break;
            case "awarded" :
                html = "<div class='activityEntry' student='"+data[i].username+"'><div class='activityType'>badge</div><div class='activityUser'>" + studentNames[data[i].username] + "</div><div class='activityTime'>"+ new Date(data[i].starttime).getDate() + "/" + (new Date(data[i].starttime).getMonth()+1) +"</div></div>";
                link[i] = data[i].object;
                break;
            default:

                continue;
                break;
        }
        var iframeButton = new nwButton(
            "detailedActivity" + i,
            null,
            function(obj)
            {
                /*$.get(link,
                    function(data)
                    {
                        //$("#nwNaviDetailedActivityIFRAME").attr("src", "http://google.com");
                        //$("#nwNaviDetailedActivityView").load(link + " .tweet-text");
                        $("#nwNaviDetailedActivityViewExternal").load(link + " #content");

                    })   */
                if(bkData[obj.order].verb == "posted")
                {
                    var linkJSON = encodeURIComponent(link[obj.order]);
                    $.getJSON("http://degas.cs.kuleuven.be:3013/blogposts/" + linkJSON, blogpost_callback, "json");
                    console.log(linkJSON);
                }
                if(bkData[obj.order].verb == "commented")
                {
                    var linkJSON = encodeURIComponent(link[obj.order]);
                    $.getJSON("http://degas.cs.kuleuven.be:3013/comments/" + linkJSON, blogpost_callback, "json");
                    console.log(linkJSON);
                }
                if(bkData[obj.order].verb == "tweeted")
                {
                    var tmp = link[obj.order] + " .tweet-text";
                    $("#nwNaviDetailedActivityViewExternal").load(tmp);
                }
                if(bkData[obj.order].verb == "awarded")
                {
                    $("#nwNaviDetailedActivityViewExternal").html(
                        "<img src='."+ bkData[obj.order].badge_image +"'/><h2>"
                            + bkData[obj.order].object +"</h2><p>"
                        +  bkData[obj.order].badge_description + "</p><p>This badge was awarded to <strong>"
                        +  studentNames[bkData[obj.order].username]
                        + "</strong> on <strong>"
                        + new Date(bkData[obj.order].starttime).getDate() + "/" + (new Date(bkData[obj.order].starttime).getMonth()+1)
                        + "</strong>"

                    );



                }
            },
            false,html,i);

        fw.addObjectToDocument(iframeButton);
        //should make that an object, and use hte methods i made
        $("#nwNaviDetailedActivityView").append(iframeButton.element);
        $("#nwNaviDetailedActivityViewExternal").text("Click an activity to see its content");

    }
    updateActivityWithSelectedUsers();
}

function blogpost_callback(data)
{   if(data != null)
    {

        var rep = data.originalrequest.replace(/""/g, '\'');
        $("#nwNaviDetailedActivityViewExternal").html("<h2>" + data.username + " " + new Date(data.starttime).getDate() + "/" + (new Date(data.starttime).getMonth()+1) + "</h2>" +  rep);
    }
    else
    $("#nwNaviDetailedActivityViewExternal").text("none");
}
