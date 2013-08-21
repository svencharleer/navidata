var db = require('../dbConnection.js').db;

exports.list = function(req, res){
    db.collection('events', function(err, collection) {
        collection.find({'verb': 'awarded'}).toArray(function(err, items) {
            var users = {};
            console.log(items.length);
            for(var i = 0; i < items.length; i++)
            {
                var item = items[i];
                var user = {};

                if(users[item.username] == null)
                {
                    users[item.username] = {};
                    user.awards = {};
                }
                else
                    user = users[item.username];

                if(user.awards[item.badge_image] == null)
                    user.awards[item.badge_image] = [];

                user.awards[item.badge_image].push(item.event_id);


                users[item.username] = user;

            }

            res.send(users);
        });
    });
};



