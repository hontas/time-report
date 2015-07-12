var Future = Npm.require('fibers/future');

Meteor.methods({
    "test.helpers.clearDB": function () {
        var future = new Future();
        var db = Meteor.users.find()._mongo.db;
        var removedCollections = 0;

        console.log("Removing collections");

        db.collections(function (err, collections) {
            var appCollection = _.reject(collections, function (coll) {
                var name = coll.collectionName;
                return name === "system.indexes" || name.indexOf("velocity") === 0;
            });

            appCollection.forEach(function (collection) {
                collection.remove(function (error) {
                    if (error) {
                        console.error("Failed to remove collection %s", collection.collectionName);
                        future.return("Failed to remove collection", error);
                    }

                    removedCollections++;
                    console.log("Removed collection %s", collection.collectionName);

                    if (removedCollections === appCollection.length) {
                        console.log("Finished removing collections");
                        future.return("Removed all collections");
                    }
                });
            });
        });

        return future.wait();
    },

    "test.helpers.loadFixtures": function () {
        console.log("Loading fixtures");

        console.log("before", Meteor.users.find().fetch());

        Accounts.createUser({
            username: "test",
            password: "test",
            enail: "test@example.com",
            profile: {}
        });


        console.log("after", Meteor.users.find().fetch());

    }
});