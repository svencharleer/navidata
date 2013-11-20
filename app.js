
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , events = require('./routes/events')
    , users = require('./routes/users')
    , blogs = require('./routes/blogs')
    , comments = require('./routes/comments')
    , relatedevents = require('./routes/relatedevents')
    , activity = require('./routes/activity')
    , badges = require('./routes/badges')
  , http = require('http')
    , db = require('./dbConnection')
  , path = require('path');
var static = require('node-static');

var app = express();
var context = '/larae3';

// all environments
app.set('port', process.env.PORT || 3013);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get(path.join(context,'/'), routes.index);
app.get(path.join(context,'/events'), events.list);
app.get(path.join(context,'/events/username/:username'), events.username);
app.get(path.join(context,'/events/username/:username/:verb'), events.username_verb);
app.get(path.join(context,'/events/verb/:verb'), events.verb);
app.get(path.join(context,'/users'), users.list);
app.get(path.join(context,'/relatedevents/:eventid'), relatedevents.list);
app.get(path.join(context,'/relatedevents/activity/:verb/:eventid'), relatedevents.listActivity);
app.get(path.join(context,'/badges'), badges.list);
app.get(path.join(context,'/flatActivity'), activity.flatList);
app.get(path.join(context,'/activity'), activity.list);
app.get(path.join(context,'/activity/total/:user'), activity.listForUser);
app.get(path.join(context,'/activity/:verb'), activity.listForVerb);
app.get(path.join(context,'/activity/:verb/:user'), activity.listForVerbAndUser);
app.get(path.join(context,'/activitybydate/:date/:verb'), activity.date);
app.get(path.join(context,'/activitybydate/:date'), activity.date);
app.get(path.join(context,'/blogposts'), blogs.list);
app.get(path.join(context,'/blogposts/:url'), blogs.blogpost);

app.get(path.join(context,'/comments'), comments.list);
app.get(path.join(context,'/comments/:url'), comments.comment);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//create static file server where we'll add LARAe03 interface
var file = new static.Server('./LARAe03');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(4013);