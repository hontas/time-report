function getItemsFor() {
    return function () {
        return {
            items: Activities.find()
        };
    };
}

Router.route("activities", {
    action: function () {
        this.redirect("activity.new");
    },
    waitOn: function () {
        return Meteor.subscribe('activities');
    }
});

Router.route("activities/new", {
    name: "activity.new",
    template: "activity",
    action: function () {
        this.render("activitiesList", { to: "aside", data: getItemsFor("activities") });
        this.render();
    },
    waitOn: function () {
        return Meteor.subscribe('activities');
    }
});

Router.route("activities/:_id", {
    name: "activity",
    template: "activity",
    action: function () {
        this.render("activitiesList", { to: "aside", data: getItemsFor("activities") });
        this.render();
    },
    data: function () {
        return Activities.findOne(this.params._id);
    },
    waitOn: function () {
        return Meteor.subscribe('activities');
    }
});