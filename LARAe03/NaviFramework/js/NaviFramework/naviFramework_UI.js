var fw;
var drawFingers = false;
function PaperCanvas(paper)
{
    var canvas;
    var animations = [];
    var paper = paper;
    this.drawCircle = function(name,point)
    {
        with(paper)
        {
            var circle;
            var children = project.activeLayer.children;
            if(children[name] == null)
            {
                circle = new Path.Circle(new Point(point.x, point.y),20);
                circle.name = name;
                circle.style = {
                //fillColor: "#99FF99",
                strokeColor: '#99FF99',
                strokeWidth: 4};
                //circle.flatten(10);
                //circle.removeSegment(0);
                //circle.simplify();
                circle.opacity =0.5;
                //animate this
                circle.customAnimation = function(obj) 
                {
                    obj.strokeColor.hue += 1;
                    //obj.rotate(3);
                    return true;
                };
                animations.push(circle);
            }
            else
            {
                
                circle = children[name];
                circle.position = new Point(point.x, point.y);
            }

            

            
            
        }
    }
    this.drawLine = function(name, point1, point2)
    {
        with(paper)
        {
            var children = project.activeLayer.children;
            if(children[name] == null)
            {
                var myPath = new Path();
                myPath.name = name;
                myPath.strokeColor = 'white';
                myPath.add(new Point(point1.x, point1.y));
                myPath.add(new Point(point2.x, point2.y));
                myPath.style = {
                    
                    strokeColor: '#FF8100',
                    strokeWidth: 2};
            }
            else
            {
                var myPath = children[name];
                myPath.segments[0].point = new Point(point1.x, point1.y);
                myPath.segments[1].point = new Point(point2.x, point2.y)
            }
            var invert = 1;
            if(point1.x > point2.x) invert = -1;
            myPath.segments[0].handleIn = new Point(-250 * invert, 0);
            myPath.segments[0].handleOut = new Point(250 * invert, 0);
            myPath.segments[1].handleIn = new Point(-250 * invert, 0);
            myPath.segments[1].handleOut = new Point(250 * invert, 0);

            paper.view.draw();
        }
    }
    this.removePath = function(name)
    {
        with(paper)
        {
            var children = project.activeLayer.children;
            if(children[name] != null)
            {
                //end the animations. let the anim frame handler know it's done animating
                if(children[name].customAnimation != null)
                {
                    children[name].customAnimation = function(obj){return false};
                }
                children[name].remove();
            }
            paper.view.draw();
        }
    }

    this.position = function(position)
    {
        canvas.style.left = position.x;
        canvas.style.top = position.y;
    }
    this.size = function(_size)
    {
        canvas.width = _size.w;
        canvas.height = _size.h;
        with(paper)
        {
            paper.view.setViewSize(canvas.width,canvas.height);
        }
    }

     this.onFrame =function(event) {
        // the number of times the frame event was fired:
        //console.log(event.count);

        // The total amount of time passed since
        // the first frame event in seconds:
        //console.log(event.time);

        // The time passed in seconds since the last frame event:
        //console.log(event.delta);
        var animation = animations.pop();
        var continueAnimations = [];
        while(animation != null)
        {
            var continueAnimation = animation.customAnimation(animation);
            if(continueAnimation) continueAnimations.push(animation);
            animation = animations.pop();
        }
        animations = continueAnimations;
        paper.view.draw();
    }

    this.init = function(name, position, size)
    {
        var element = document.createElement("canvas");
        element.id = name;
        //element.className = "transit";
        element.width = size.w;
        element.height = size.h;
        element.style.position = 'absolute';
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
        element.style.WebkitTransform = 'translateZ(0)';
        element.style.MozTransform = 'translateZ(0)';
        element.style.OTransform = 'translateZ(0)';
        element.style.msTransform = 'translateZ(0)';
        element.style.transform = 'translateZ(0)';
        element.style.zIndex = '0';
        document.body.appendChild(element);
        canvas = element;
        paper = paper.setup(canvas);
        with(paper)
        {
            this.tool = tool;
            this.view = view;
            this.layers = [new Layer()];
//            tool.onMouseDown = this.onMouseDown;
//            tool.onMouseUp = this.onMouseUp;
//            tool.onMouseDrag = this.onMouseDrag;
            view.onFrame = this.onFrame;
        }
        return this;
    }
    this.reset = function()
    {
        var object = objects.pop();
        while(object != null)
        {
            var child = document.getElementById(canvas.id);
            document.body.removeChild(child);
            object.remove();
            object = objects.pop();
            //test
        }
    }

  
}


TouchTest = function(point, objects)
{
    var touchedObjects = [];
    var keys = Object.keys(objects);
    for(var i = 0; i < keys.length; i++)
    {
        var object = objects[keys[i]];
        if(object != null && object.touchable)
        {
            var position = object.getPosition();
            if(keys[i] == "Blog_Posts0") console.log("mouse x y " + point.x + " " + point.y + "bar x y" + position.x + " " + position.y);

            var size = object.getSize();
            if(point.x > position.x 
                && point.y > position.y 
                && point.x < position.x + size.width 
                && point.y < position.y + size.height)
            {
                console.log("Object " + object.element.id + " hit");
                
                touchedObjects.push(object);
            }
        }
    }
    return touchedObjects;
}

function DocumentLayer()
{
    this.objects = {};
}

function naviFramework_UI()
{
    this.layers = [];
    this.scenes = [];
    this.containers = {};
    this.view = {width: $(window).width(), height: $(window).height()};
    var sfxCanvas;

    this.windowResize = function(event)
    {
        this.view = {width: $(window).width(), height: $(window).height()};
        //sfxCanvas.size({w:$(window).width(),h:$(window).height()})
    }

    this.init = function()
    {
        this.layers = [new DocumentLayer(), new DocumentLayer(), new DocumentLayer(), new DocumentLayer()];
        this.paper = paper;
        //sfxCanvas = new PaperCanvas(this.paper);
        //sfxCanvas.init("sfxLayer", {x:0, y:0}, {w:this.view.width, h:this.view.height});
    }
    
    
    //------------
    // EVENTS
    //------------

    this.onMouseDown = function(hitPoint, identifier)
    {
        this.onFingerHits(hitPoint, identifier);
    }

    this.onMouseDrag = function(hitPoint, identifier)
    {
       this.onFingerMoved(hitPoint, identifier);
    }

    this.onMouseUp = function(hitPoint)
    {
       this.onFingerLetGo(hitPoint);
    }

    this.fingerToObjects = {};
    this.fingerToCursors = {};
    this.onFingerHits = function(hitPoint, identifier)
    {
        identifier = "finger" + identifier;
        //console.log("finger " + identifier + " landed");
        if(this.fingerToCursors[identifier] != null)
            return; // we're already handling this finger
        //draw indicators of where we touch (interesting when testing on mbp)
        //(could also be useful to make touch pretty :P particles?)
        if(drawFingers)
        {
            //sfxCanvas.drawCircle(identifier, hitPoint);
            this.fingerToCursors[identifier] = identifier;
        }
        var hitResults = TouchTest(hitPoint,fw.layers[2].objects);
        this.fingerToObjects[identifier] = [];
        while(hitResults.length > 0)
        {
            var hitResult = hitResults.pop();
            if(hitResult != null)
            {
                
                if(hitResult.touchable.fingerEvent != null)
                {
                    this.fingerToObjects[identifier].push(hitResult);
                    hitResult.touchable.fingerEvent(hitPoint, hitResult, "hit");
                }
            }
        } 
    }
    this.onFingerLetGo = function(identifier)
    {   
        identifier = "finger" + identifier;
        if(drawFingers && this.fingerToCursors[identifier] != null)
        {   
            
            //hm we have to find a way to get rid of this
            //sfxCanvas.removePath(identifier);
            this.fingerToCursors[identifier] = null;
        }
        if(this.fingerToObjects[identifier] != null)
        {

            var hitResult = this.fingerToObjects[identifier].pop();
            while(hitResult != null)
            {
                if(hitResult.touchable.fingerEvent != null)
                {
                    hitResult.touchable.fingerEvent(null, hitResult, "letgo");
                }
                hitResult = this.fingerToObjects[identifier].pop();
            }
        }
        this.fingerToObjects[identifier] = null;
        //console.log("finger " + identifier + " was let go");
    }

    this.onFingerMoved = function(hitPoint, identifier) 
    {   
        identifier = "finger" + identifier;
        //draw indicators of where we touch (interesting when testing on mbp)
        //(could also be useful to make touch pretty :P particles?)
        if(drawFingers && this.fingerToCursors[identifier] != null)
        {
            //sfxCanvas.drawCircle(identifier, hitPoint);
        }
        else
        {
            //console.log("FINGER " + identifier + " moved but was not found");
        }
        if(this.fingerToObjects[identifier] != null)
        {
            for(var i = 0; i < this.fingerToObjects[identifier].length; i++)
            {
                var hitResult = this.fingerToObjects[identifier][i];
                if(hitResult.touchable.fingerEvent != null)
                {
                    //console.log(hitPoint.x + " " + hitPoint.y +" " +hitResult.element.id);
                    hitResult.touchable.fingerEvent(hitPoint, hitResult, "move");
                }
            }
        }   
    }


    this.handleFrameItem = function(event, item)
    {
        //check children first
        /*if(item.hasChildren())
        {
            var children = item.children;
            for(var i=0;i < children.length; i++)
            {
                this.handleFrameItem(event, children[i]);
            }
        }*/
        //think this might become physics loop
    }


    this.onFrame = function(event)
    {
        //take care of animations
        /*var children = fw.layers[2].objects;
        for(var i=0;i < children.length; i++)
        {
            fw.handleFrameItem(event, children[i]);
        }*/
        if(fw.scenes != null && fw.scenes.length > 0)
        {
            fw.scenes[fw.scenes.length-1].update.call(fw.scenes[fw.scenes.length-1]);
        }

        //have to move this out of here but will do for now
        if(TouchLoop.idleSince < new Date(Date.now() - 320000))
        {
            naviOverlay.element.style.display = "block";
        }

    }


 

    //------------
    // DRAW FUNCTIONS
    //------------
    //create an overlay canvas for sfx?
    this.getCenterOfObject = function(objectX)
    {
        var size = objectX.getSize();
        var position = objectX.getPosition();
        var center = {x: position.x + size.width/2, y: position.y + size.height/2};
        return center;
    }

    this.drawConnection = function(object1, object2)
    {
        var linkName = object1.getName() + "_" + object2.getName();
        
        //sfxCanvas.drawLine(linkName, this.getCenterOfObject(object1), this.getCenterOfObject(object2));
    }
    this.removeConnection = function(object1, object2)
    {
        var linkName = object1.getName() + "_" + object2.getName();
        //sfxCanvas.removePath(linkName);
    }

   

    this.pushScene = function(scene)
    {
        this.scenes.push(scene);
    }


    this.arrangeContainers = function()
    {
        var keys = Object.keys(this.containers);
        var l = keys.length;
        for(var i=0; i < l; i++)
        {
            this.containers[keys[i]].thereAreXContainer(l);
        }
    }

    this.addObjectToDocument = function(object)
    {
        //add all objects to their layer. currently only used for touch
        this.layers[object.layer].objects[object.element.id] = object;
        //if a container, add to the container list. needed for using screen estate
        if(object.type == "container")
        {
            this.containers[object.element.id] = object;
            this.arrangeContainers();
        }
        object.activate();
        if(object.group != null)
        {
            for(var i=0; i < object.group.length; i++)
            {
                this.addObjectToDocument(object.group[i]);
            }
        }
    }

    this.addObjectsToDocument = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            //document.body.appendChild(objects[i].element);
            this.addObjectToDocument(objects[i]);
            
        }

    }

    this.removeObjectFromDocument = function(object)
    {
        if(!object.doNotDeletedocumentElement)
            $("#" +object.element.id).remove();
        if(this.containers[object.element.id] != null)
        {
            delete this.containers[object.element.id];
            this.arrangeContainers();
        }
        delete this.layers[object.layer].objects[object.element.id];
        delete object;
    }

    this.removeObjectsFromDocument = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            this.removeObjectFromDocument(objects[i]);
        }
    }

 

}

//touch handler
var TouchLoop =
{
    idleSince: Date.now(),
    timer:0,
    updateStarted: false,
    updateLetGoStarted: false,
    updateMovedStarted:false,
    touches: [],
    touchesLetGo: [],
    touchesMoved: [],

    update: function() {
        if (TouchLoop.updateStarted) return;
        TouchLoop.updateStarted = true;
        var i, len = TouchLoop.touches.length;
        for (i=0; i<len; i++) {
            fw.onFingerHits({x:TouchLoop.touches[i].pageX, y:TouchLoop.touches[i].pageY}, TouchLoop.touches[i].identifier);
        }
        TouchLoop.updateMoved();
        TouchLoop.updateLetGo();
        TouchLoop.touches = [];
        TouchLoop.updateStarted = false;
        fw.onFrame();

    },

    updateMoved: function() {
        if(TouchLoop.updateMovedStarted) return;
        TouchLoop.updateMovedStarted = true;
        var finger = TouchLoop.touchesMoved.pop();
        while(finger != null)
        {

                fw.onFingerMoved({x:finger.pageX, y:finger.pageY}, finger.identifier);
                finger = TouchLoop.touchesMoved.pop();
        }
        TouchLoop.updateMovedStarted = false;
    },

    updateLetGo: function() {
        if(TouchLoop.updateLetGoStarted) return;
        TouchLoop.updateLetGoStarted = true;
        var finger = TouchLoop.touchesLetGo.shift();
        while(finger != null)
        {
                fw.onFingerLetGo(finger.identifier);
                finger = TouchLoop.touchesLetGo.shift();
        }
        TouchLoop.updateLetGoStarted = false;
    },

    init: function() {
        this.timer = setInterval(this.update, 30);

        document.addEventListener('touchend', function() {
            TouchLoop.touchesLetGo = TouchLoop.touchesLetGo.concat(event.changedTouches); 
            TouchLoop.idleSince = Date.now();  
            
        });
        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
            TouchLoop.touchesMoved = TouchLoop.touchesMoved.concat(event.changedTouches);
            TouchLoop.idleSince = Date.now();  

        });
        document.addEventListener('touchstart', function(event) {
            //console.log('start');
            TouchLoop.touches = event.targetTouches;
            TouchLoop.idleSince = Date.now();  
            
         });
        document.addEventListener('mousedown', function(event) {
            //console.log('mouse touchy');
            fw.onMouseDown({x:event.pageX, y:event.pageY}, "mouse");
            TouchLoop.idleSince = Date.now();  
         });
        document.addEventListener('mousemove', function(event) {
            fw.onMouseDrag({x:event.pageX, y:event.pageY}, "mouse");
            TouchLoop.idleSince = Date.now();  
         });
        document.addEventListener('mouseup', function(event) {
            fw.onMouseUp("mouse");
            TouchLoop.idleSince = Date.now();  

        
     });
    }
};

fw = new naviFramework_UI();
document.addEventListener('webkitfullscreenchange', function(event) {
            fw.windowResize(event);});
window.onresize = fw.windowResize;