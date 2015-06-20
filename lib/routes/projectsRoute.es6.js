function getItemsFor() {
    return function () {
        return {
            items: Projects.find()
        };
    };
}

var projectDefaults = {
    template: "project",
    action: function () {
        this.render("projectsList", { to: "aside", data: getItemsFor("projects") });
        this.render();
    },
    waitOn: function () {
        return ["clients", "projects", "activities"].map(coll => Meteor.subscribe(coll));
    }
};

Router.route("projects", {
    action: function () {
        this.redirect("project.new");
    }
});

Router.route("projects/new", _.defaults({
    name: "project.new"
}, projectDefaults));

Router.route("projects/:_id", _.defaults({
    name: "project",
    data: function () {
        return Projects.findOne(this.params._id);
    }
}, projectDefaults));