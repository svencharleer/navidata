var db = require('../dbConnection.js').db;




exports.list = function(req, res){
    db.collection('events', function(err, collection) {
        collection.find({'verb': 'awarded'}).toArray(function(err, items) {
            var badges = {};
            console.log(items.length);
            for(var i = 0; i < items.length; i++)
            {
                var item = items[i];
                var badge = {};

                if(badges[item.badge_image] == null)
                {
                    badges[item.badge_image] = {};
                    badge.awardedTo = {};
                }
                else
                    badge = badges[item.badge_image];

                if(badge.awardedTo[item.username] == null)
                    badge.awardedTo[item.username] = [];

                badge.awardedTo[item.username].push(item.event_id);


                badges[item.badge_image] = badge;

            }

            res.send(badges);
        });
    });
};



