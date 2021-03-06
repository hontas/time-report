Meteor.methods({
    "activity.createUpdate": function (id, activity) {
        verifyUserAccess(this.userId, undefined, ["admin", "manager"]);

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
        verifyUserAccess(this.userId, undefined, ["admin", "manager"]);

        if (Activities.findOne(id)) {
            // TODO remove all references from projects
            return Activities.remove(id);
        } else {
            throw new Meteor.Error(404, "Activity does not exist");
        }
    }
});