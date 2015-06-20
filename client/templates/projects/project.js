Template.project.helpers({
    title: function () {
        return this._id ? this.name : "New project";
    },

    activities: function () {
        return Activities.find({}, { _id: 1, name: 1 });
    }
});

Template.project.events({
    submit: function (event) {
        var form = event.target;
        var project = {
            name: form.name.value
        };

        Meteor.call("createUpdateProject", this._id, project, function (err, id) {
            if (err) {
                console.error(err);
            } else {
                Router.go("project", { _id: id });
            }
        });

        return false;
    }
});

Template.project.onCreated(function () {
    //add your statement here
});

Template.project.onRendered(function () {
    //add your statement here
});

Template.project.onDestroyed(function () {
    //add your statement here
});

