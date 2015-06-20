Template.activity.helpers({
    title: function () {
        return this._id ? this.name : "New activity";
    },

    error: function () {
        return Session.get("error") && "error";
    },

    errorText: function () {
        var error = Session.get("error");
        return error && error.message;
    }
});

Template.activity.events({
    submit: function (event) {
        var form = event.target;
        var nameInput = form.name;
        var name = nameInput.value;

        Meteor.call("activity.createUpdate", this._id, { name: name }, function (err) {
            if (err) {
                Session.set("error", err);
            } else {
                Session.set("error", undefined);
                nameInput.value = "";
            }
        });

        return false;
    },

    "click [rel=delete]": function () {
        Meteor.call("activity.delete", this._id, function (err) {
            if (err) {
                console.error(err);
            } else {
                Router.go("activity.new");
            }
        })
    }
});

Template.activity.onCreated(function () {
    Session.set("error", undefined);
});

Template.activity.onRendered(function () {
    //add your statement here
});

Template.activity.onDestroyed(function () {
    //add your statement here
});

