


var mongo = require("mongodb");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


var mongoserver = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db("stepupv3", mongoserver);
var mongoserver2 = new Server('localhost', 27017, {auto_reconnect: true}),
    dbBlogs = new Db("chikul13blogs", mongoserver2);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'stepup' database");
        db.collection('events', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'stepup' collection doesn't exist");

            }
        });
    }
});

dbBlogs.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'chikul13blogs' database");
        db.collection('blogs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'chikul13blogs' collection doesn't exist");

            }
        });
    }
});

exports.db = db;
exports.dbBlogs = dbBlogs;
