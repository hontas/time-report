Meteor.publish("userList", function () {
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
        return Meteor.users.find({}, {
            roles: 1,
            emails: 1,
            profile: 1,
            username: 1
        });
    } else {
        this.stop();
    }
});

Meteor.publish("roles", function () {
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
        return Meteor.roles.find()
    } else {
        this.stop();
    }
});

Meteor.publish("clients", function () {
    if (this.userId) {
        return Clients.find();
    } else {
        this.stop();
    }
});

Meteor.publish("projects", function () {
    if (this.userId) {
        return Projects.find();
    } else {
        this.stop();
    }
});

Meteor.publish("activities", function () {
    if (this.userId) {
        return Activities.find();
    } else {
        this.stop();
    }
});