var db = require('../dbConnection.js').db;

exports.list = function(req, res){
    db.collection('events', function(err, collection) {
        collection.distinct('username', function(err, items) {
            res.send(items);
        });
    });
};



