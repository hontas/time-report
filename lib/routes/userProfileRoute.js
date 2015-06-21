Router.route("profile", {
    name: "user.profile",
    template: "userProfile",
    layoutTemplate: "noSidebar",
    data: function () {
        return Meteor.users.findOne(Meteor.userId());
    },
    waitOn: function () {
        return [Meteor.subscribe("userList"), Meteor.subscribe("activities")];
    }
});