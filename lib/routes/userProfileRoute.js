Router.route("profile", {
    name: "user.profile",
    template: "userProfile",
    data: function () {
        return Meteor.users.findOne(Meteor.userId());
    },
    waitOn: function () {
        return [Meteor.subscribe("userList"), Meteor.subscribe("activities")];
    }
});