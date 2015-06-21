function getItems() {
    return function () {
        return {
            items: Projects.find()
        };
    };
}

var projectDefaults = {
    template: "project",
    waitOn: function () {
        return ["clients", "projects", "activities"].map(coll => Meteor.subscribe(coll));
    },
    yieldRegions: {
        "projectsList": { to: "aside", data: getItems() }
    }
};

Router.route("projects", _.defaults({
    template: "empty",
    action: function () {
        this.redirect("project.new");
    }
}, projectDefaults));

Router.route("projects/new", _.defaults({
    name: "project.new"
}, projectDefaults));

Router.route("projects/:_id", _.defaults({
    name: "project",
    data: function () {
        return Projects.findOne(this.params._id);
    }
}, projectDefaults));