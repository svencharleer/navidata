var nwTimeSlider =
{
    absolute_x: 30,
    length:600,
    slider_length:600,
    position_left:0,
    position_right:200
};

//minDate maxDate
function filtering()
{
    var totalDays = 1+Math.floor((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    var daysLeft = (naviTimeSliderLeft.sliderOffset * totalDays);
    var daysRight = (naviTimeSliderRight.sliderOffset * totalDays);
//    console.log(daysLeft + " " + daysRight);
    variableMinDate = new Date(minDate.valueOf() + (naviTimeSliderLeft.sliderOffset * totalDays) * 86400000);
    variableMaxDate = new Date(minDate.valueOf() + (naviTimeSliderRight.sliderOffset * totalDays) * 86400000);
    /*if(variableMaxDate < maxDate.valueOf())
    {
        dayThingTest++;
    }*/
    filterData(true, variableMinDate, variableMaxDate);
    updateBadgeStudentGraph();
    updateGraph();

}


function nwTimeSliderLeft()
{
    var name = "nwTimeSliderLeft" ;
    var states = [];
    var animations = [];
    this.sliderOffset = 0;
    this.setSlider = function(point)
    {
        var min = nwTimeSlider.absolute_x;
        var max = naviTimeSliderRight.getPosition().x-this.getSize().width;
        //obj.setTouchAnchor(point);
        var x = point.x > min ? point.x :min;
        x = point.x < max ? x : max;


        this.setPosition({x:x, y: this.getPosition().y});
        this.sliderOffset = (x-nwTimeSlider.absolute_x)/(nwTimeSlider.slider_length);
    }
    var eventHandler =
    {
        onHit: function(point, obj)
        {
            obj.setSlider(point);
        },
        onLetGo: function(obj)
        {
        },
        onMove: function(point, obj)
        {
            obj.setSlider(point);
            filtering();

        }
    };
    var layer = 2;

    NObject.call(this, name, layer, null, null, "", "", eventHandler, animations, states,[], true);
    this.element.style.display = "";
}

function nwTimeSliderRight()
{
    var name = "nwTimeSliderRight" ;
    var states = [];
    var animations = [];
    this.sliderOffset = 1;

    this.setSlider = function(point)
    {
        var max = nwTimeSlider.absolute_x+nwTimeSlider.slider_length;
        var min = naviTimeSliderLeft.getPosition().x+this.getSize().width;
        //obj.setTouchAnchor(point);
        var x = point.x > min ? point.x :min;
        x = point.x < max ? x : max;


        this.setPosition({x:x, y: this.getPosition().y});

        this.sliderOffset = (x-nwTimeSlider.absolute_x)/(nwTimeSlider.slider_length);
    }
    var eventHandler =
    {
        onHit: function(point, obj)
        {
              obj.setSlider(point);
        },
        onLetGo: function(obj)
        {
        },
        onMove: function(point, obj)
        {
            obj.setSlider(point);
            filtering();

        }
    };
    var layer = 2;

    NObject.call(this, name, layer, null, null, "", "", eventHandler, animations, states,[], true);
    this.element.style.display = "";
}

function nwTimeSliderPlay()
{
    var name = "nwTimeSliderPlay" ;
    var states = [];
    var animations = [];

    this.playMethod = function(){
        filtering() ;
        //reset if we reach bounds
        if(naviTimeSliderRight.sliderOffset >=1)
            naviTimeSliderPlay.playing = null;


        //move sliders
        naviTimeSliderLeft.setSlider({x:naviTimeSliderLeft.getPosition().x+1,y:naviTimeSliderLeft.getPosition().y});
        naviTimeSliderRight.setSlider({x:naviTimeSliderRight.getPosition().x+1,y:naviTimeSliderRight.getPosition().y});


        setTimeout(function(){if(naviTimeSliderPlay.playing != null)naviTimeSliderPlay.playing();},200);
    };

    this.playing = null;

    var eventHandler =
    {
        onHit: function(point, obj)
        {
            if(obj.playing == null)
            {
                obj.playing = obj.playMethod;
                obj.playing();
            }
            else
            {
                obj.playing = null;
            }

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

nwTimeSliderLeft.prototype = Object.create(NObject.prototype);
nwTimeSliderRight.prototype = Object.create(NObject.prototype);