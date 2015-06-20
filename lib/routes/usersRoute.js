function getItemsFor(key) {
    return function () {
        return {
            items: Meteor[key].find()
        };
    };
}

Router.route("users", {
    action: function () {
        this.render("usersList", { to: "aside", data: getItemsFor("users") });
        this.render(""); // render nothing in main section
    },
    waitOn: function () {
        return Meteor.subscribe('userList');
    }
});

Router.route("users/new", {
    name: "user.new",
    template: "user",
    action: function () {
        this.render("usersList", { to: "aside", data: getItemsFor("users") });
        this.render();
    },
    waitOn: function () {
        return Meteor.subscribe('userList');
    }
});

Router.route("users/:_id", {
    name: "user",
    template: "user",
    action: function () {
        this.render("usersList", { to: "aside", data: getItemsFor("users") });
        this.render();
    },
    data: function () {
        return Meteor.users.findOne(this.params._id);
    },
    waitOn: function () {
        return Meteor.subscribe('userList');
    }
});