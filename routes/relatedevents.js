var db = require('../dbConnection.js').db;



function tweetBadge(badge, collection, callback)
{
    var limit = 0;
    var desc = badge.object.toString();
    //use description
    //also, where is the actual tweet in the tweet object?
    /*if(desc.indexOf('5') != -1)
        limit = 5;
    else if(desc.indexOf('10') != -1)
        limit = 10;
    else
        limit = 15*/
    collection.find({'starttime':
        {$gte: (badge.periodstart),
          $lte: (badge.periodend)},
          'verb': 'tweeted',
          'username': badge.username
      })/*.limit(limit)*/.sort({'starttime':1}).toArray(function(err, items)
      {
          callback(items);
      });
}


function commentBadge(badge, collection, callback)
{
    var limit = 0;
    var desc = badge.object.toString();
    //use description
    //also, where is the actual tweet in the tweet object?
    /*if(desc.indexOf('Bronze') != -1)
        limit = 5;
    else if(desc.indexOf('Silver') != -1)
        limit = 10;
    else
        limit = 15*/
    collection.find({'starttime':
    {$gte: (badge.periodstart),
        $lte: (badge.periodend)},
        'verb': 'commented',
        'username': badge.username
    })/*.limit(limit)*/.sort({'starttime':1}).toArray(function(err, items)
        {
            callback(items);
        });
}


exports.list = function(req, _res){
    res = _res;
    db.collection('events', function(err, collection) {
        var eventid = parseInt(req.params.eventid);
        db.collection('events', function(err, collection) {
            collection.findOne({'event_id': eventid}, function(err, item) {
                if(item.object.indexOf('tweet'))
                    tweetBadge(item, collection, function(items){res.send(items);});
                else if(item.object.indexOf('Commenter'))
                    commentBadge(item, collection, function(items){res.send(items);});

            });
        });
    });
};


function getRelatedActivity(res, items) {
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
    var options = {out: {inline: 1}, query: {event_id: {$in:items}}};//, sort:{"starttime":1}};

    db.collection('events', function (err, collection) {
        collection.mapReduce(map, reduce, options,
            function (err, items) {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.write(JSON.stringify(items));
                res.end();

            });
    });
}


exports.listActivity = function(req, _res){
    res = _res;
    db.collection('events', function(err, collection) {
        var eventid = parseInt(req.params.eventid);
        db.collection('events', function(err, collection) {
            collection.findOne({'event_id': eventid}, function(err, item) {
                if(item.object.indexOf('tweet'))
                    tweetBadge(item, collection, function(items)
                        {
                            var ids = [];
                            for(var i = 0; i < items.length; i++)
                                 ids.push(items[i].event_id);
                            getRelatedActivity(res,ids);
                        });
                else if(item.object.indexOf('Commenter'))
                    commentBadge(item, collection, function(items)
                        {
                            var ids = [];
                            for(var i = 0; i < items.length; i++)
                                ids.push(items[i].event_id);
                            getRelatedActivity(res,ids);
                        });

            });
        });
    });
};
