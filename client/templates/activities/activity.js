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

        promisedCall("activity.createUpdate", this._id, { name: nameInput.value })
            .then(function () {
                Session.set("error", undefined);
                nameInput.value = "";
            })
            .catch(Session.set.bind(Session, "error"));

        return false;
    },

    "click [rel=delete]": function () {
        promisedCall("activity.delete", this._id)
            .then(routeTo("activity.new"))
            .catch(logError);
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

