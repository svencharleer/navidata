var db = require('../dbConnection.js').db;




exports.list = function(req, res){
    db.collection('events', function(err, collection) {
        collection.find({'verb': 'awarded'},{sort: {'badge_image':-1}}).toArray(function(err, items){
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
                    badge.awardedToFlat = [];
                }
                else
                    badge = badges[item.badge_image];

                if(badge.awardedTo[item.username] == null)
                    badge.awardedTo[item.username] = [];

                badge.awardedTo[item.username].push({student: item.username, event: item.event_id, timestamp: item.starttime});
                badge.awardedToFlat.push({student: item.username, event: item.event_id, timestamp: new Date(item.timestamp).valueOf()});
                if(badge.eventIds == null) badge.eventIds = [];
                badge.eventIds.push(item.event_id);
                badge.description = item.badge_description;
                badge.connotation = item.badge_connotation;
                badge.name = item.object;
                badge.id = item.badge_image.replace(/\/|\./g, "_");
                badge.image = item.badge_image.replace("/img", "http://localhost:3000/images");

                badges[item.badge_image] = badge;

            }
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.write(JSON.stringify(badges));
            res.end();
        });
    });
};



