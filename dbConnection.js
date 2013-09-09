


var mongo = require("mongodb");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


var mongoserver = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db("stepupv3", mongoserver);

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

exports.db = db;

