Router.route("profile", {
    name: "user.profile",
    template: "userProfile",
    action: function () {
        this.render();
    },
    data: function () {
        return Meteor.users.findOne(Meteor.userId());
    },
    waitOn: function () {
        Meteor.subscribe("activities");
        return Meteor.subscribe("userList");
    }
});