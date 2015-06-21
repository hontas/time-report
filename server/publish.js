Meteor.publish("userList", function () {
    var fields = {
        roles: 1,
        emails: 1,
        profile: 1,
        username: 1
    };

    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
        return Meteor.users.find({}, fields);
    }

    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, fields);
    }

    this.stop();
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