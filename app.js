
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , events = require('./routes/events')
    , users = require('./routes/users')
    , relatedevents = require('./routes/relatedevents')
    , activity = require('./routes/activity')
    , badges = require('./routes/badges')
  , http = require('http')
    , db = require('./dbConnection')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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

app.get('/', routes.index);
app.get('/events', events.list);
app.get('/events/username/:username', events.username);
app.get('/events/username/:username/:verb', events.username_verb);
app.get('/events/verb/:verb', events.verb);
app.get('/users', users.list);
app.get('/relatedevents/:eventid', relatedevents.list);
app.get('/badges', badges.list);
app.get('/activity', activity.list);
app.get('/activity/:date', activity.date);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
