Template.client.helpers({
    title: function () {
        return this._id ? this.name : "New client";
    },

    error: function () {
        return Session.get("error") && "error";
    },

    errorText: function () {
        var error = Session.get("error");
        return error && error.message;
    }
});

Template.client.events({
    submit: function (event) {
        var form = event.target;
        var nameInput = form.name;
        var name = nameInput.value;

        Meteor.call("client.createUpdate", this._id, { name: name }, function (err) {
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
        Meteor.call("client.delete", this._id, function (err) {
            if (err) {
                console.error(err);
            } else {
                Router.go("client.new");
            }
        })
    }
});

Template.client.onCreated(function () {
    Session.set("error", undefined);
});

Template.client.onRendered(function () {
    //add your statement here
});

Template.client.onDestroyed(function () {
    //add your statement here
});

