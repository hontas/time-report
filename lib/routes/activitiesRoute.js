function getItems() {
    return function () {
        return {
            items: Activities.find()
        };
    };
}

var activityDefaults = {
    template: "activity",
    waitOn: function () {
        return Meteor.subscribe('activities');
    },
    yieldRegions: {
        "activitiesList": { to: "aside", data: getItems() }
    }
};

Router.route("activities", _.defaults({
    template: "empty",
    action: function () {
        this.redirect("activity.new");
    }
}, activityDefaults));

Router.route("activities/new", _.defaults({
    name: "activity.new"
}, activityDefaults));

Router.route("activities/:_id", _.defaults({
    name: "activity",
    data: function () {
        return Activities.findOne(this.params._id);
    }
}, activityDefaults));