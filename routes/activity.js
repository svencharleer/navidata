var db = require('../dbConnection.js').db;

function getActivity(res, _query) {
    var map = function () {
        day = Date.UTC(new Date(this.timestamp).getFullYear(), new Date(this.timestamp).getMonth(), new Date(this.timestamp).getDate());

        emit({day: day}, {count: 1});
    }

    var reduce = function (key, values) {
        var count = 0;

        values.forEach(function (v) {
            count += v['count'];
        });

        return {count: count};
    }
    var options = {out: {inline: 1}, query: _query};//, sort:{"starttime":1}};

    db.collection('events', function (err, collection) {
        collection.mapReduce(map, reduce, options,
            function (err, items) {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.write(JSON.stringify(items));
                res.end();

            });
    });
}
exports.list = function(req, res){
    getActivity(res, {verb: { $ne: 'awarded'}});
};

exports.listForUser = function(req, res){
    var _user = JSON.parse(req.params.user);
    getActivity(res, {verb: { $ne: 'awarded'}, username:{$in:_user}});
};

exports.listForVerb = function(req, res){
    var _verb = req.params.verb;
    getActivity(res, {verb: _verb});
};

exports.listForVerbAndUser = function(req, res){
    var _verb = req.params.verb;
    var _user = JSON.parse(req.params.user);
    getActivity(res, {verb: _verb, username: {$in:_user}});
};


exports.date = function(req, res){
    var verb = req.params.verb;
    var starttime = new Date(parseInt(req.params.date)).toISOString();
    var nextday = new Date(parseInt(req.params.date)+3600000*24).toISOString();
    var query = verb != null ? {'starttime': {$gte:starttime, $lte: nextday}, 'verb': verb} : {'starttime': {$gte:starttime, $lte: nextday}} ;

    console.log('Retrieving event: ' + starttime);
    db.collection('events', function(err, collection) {
        collection.find(query).toArray(function(err, items) {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.write(JSON.stringify(items));
            res.end();
        });
    });
};


exports.flatList = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find( {verb: { $ne: 'awarded'}}).toArray(function(err, items) {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.write(JSON.stringify(items));
            res.end();
        });
    });
}

