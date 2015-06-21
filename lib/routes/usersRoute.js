function getItems() {
    return function () {
        return {
            items: Meteor.users.find()
        };
    };
}

var userDefaults = {
    template: "user",
    waitOn: function () {
        return [Meteor.subscribe('userList'), Meteor.subscribe('roles')];
    },
    yieldRegions: {
        "usersList": { to: "aside", data: getItems() }
    }
};

Router.route("users", _.defaults({
    template: "empty",
    action: function () {
        this.redirect("user.new");
    }
}, userDefaults));

Router.route("users/new", _.defaults({
    name: "user.new"
}, userDefaults));

Router.route("users/:_id", _.defaults({
    name: "user",
    data: function () {
        return Meteor.users.findOne(this.params._id);
    }
}, userDefaults));