var db = require('../dbConnection.js').db;

var res = {}

function tweetBadge(badge, collection)
{     //if(badge.description.contains('5'))
      collection.find({'starttime':
        {$gte: (badge.periodstart),
          $lte: (badge.periodend)},
          'verb': 'tweeted',
          'username': badge.username
      }).limit(5).toArray(function(err, items)
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

                tweetBadge(item, collection);


            });
        });
    });
};



