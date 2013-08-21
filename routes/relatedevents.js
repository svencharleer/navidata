var db = require('../dbConnection.js').db;

var res = {}

function tweetBadge(badge, collection)
{
    var limit = 0;
    var desc = badge.object.toString();
    //use description
    //also, where is the actual tweet in the tweet object?
    if(desc.indexOf('5') != -1)
        limit = 5;
    else if(desc.indexOf('10') != -1)
        limit = 10;
    else
        limit = 15
    collection.find({'starttime':
        {$gte: (badge.periodstart),
          $lte: (badge.periodend)},
          'verb': 'tweeted',
          'username': badge.username
      }).limit(limit).sort({'starttime':1}).toArray(function(err, items)
      {
          res.send(items);
      });
}


function commentBadge(badge, collection)
{
    var limit = 0;
    var desc = badge.object.toString();
    //use description
    //also, where is the actual tweet in the tweet object?
    if(desc.indexOf('Bronze') != -1)
        limit = 5;
    else if(desc.indexOf('Silver') != -1)
        limit = 10;
    else
        limit = 15
    collection.find({'starttime':
    {$gte: (badge.periodstart),
        $lte: (badge.periodend)},
        'verb': 'commented',
        'username': badge.username
    }).limit(limit).sort({'starttime':1}).toArray(function(err, items)
        {
            res.send(items);
        });
}


exports.list = function(req, _res){
    res = _res;
    db.collection('events', function(err, collection) {
        var eventid = parseInt(req.params.eventid);
        db.collection('events', function(err, collection) {
            collection.findOne({'event_id': eventid}, function(err, item) {
                if(item.object.indexOf('tweet'))
                    tweetBadge(item, collection);
                else if(item.object.indexOf('Commenter'))
                    commentBadge(item, collection);

            });
        });
    });
};



