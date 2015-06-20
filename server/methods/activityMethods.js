function verifyLoggedIn(userId) {
    if (!userId) {
        console.log("Not logged in");
        throw new Meteor.Error(403, "Access denied");
    }
}

Meteor.methods({
    "activity.createUpdate": function (id, activity) {
        verifyLoggedIn(this.userId);

        var now = new Date();
        activity.updatedAt = now;

        if (id) {
            Activities.update(id, { $set: activity });
        } else {
            if (Activities.findOne({ name: activity.name })) {
                throw new Meteor.Error(409, "Activity already exist");
            } else {
                activity.createAt = now;
                return Activities.insert(activity);
            }
        }
    },

    "activity.delete": function (id) {
        verifyLoggedIn(this.userId);

        if (Activities.findOne(id)) {
            // TODO remove all references from projects
            return Activities.remove(id);
        } else {
            throw new Meteor.Error(404, "Activity does not exist");
        }
    }
});