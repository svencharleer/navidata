var db = require('../dbConnection.js').db;

exports.list = function(req, res){


    var map = function() {
        day = Date.UTC(new Date(this.starttime).getFullYear(), new Date(this.starttime).getMonth(), new Date(this.starttime).getDate());

        emit({day: day}, {count: 1});
    }

    var reduce = function(key, values) {
        var count = 0;

        values.forEach(function(v) {
            count += v['count'];
        });

        return {count: count};
    }
    var options = {out:{inline:1}};//, sort:{"starttime":1}};

    db.collection('events', function(err, collection) {
        collection.mapReduce(map, reduce ,options,
            function(err, items) {
                res.send(items);
            });
    });
};


exports.date = function(req, res){
    var starttime = req.params.starttime();
    console.log('Retrieving event: ' + starttime);
    db.collection('events', function(err, collection) {
        collection.find({'starttime': starttime}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

