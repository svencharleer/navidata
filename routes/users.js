var db = require('../dbConnection.js').db;

exports.list = function(req, res){
    db.collection('events', function(err, collection) {
        collection.find({'verb': 'awarded'}).batchSize(10).toArray(function(err, items) {
            var users = {};
            console.log(err);
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
                var id = item.badge_image.replace(/\/|\./g, "_");
                if(user.awards[id] == null)
                    user.awards[id] = [];

                user.awards[id].push(item.event_id);
                user.username = item.username;


                users[item.username] = user;

            }
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.write(JSON.stringify(users));
            res.end();
        });
    });
};



