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

        promisedCall("client.createUpdate", this._id, { name: nameInput.value })
            .then(function () {
                Session.set("error", undefined);
                nameInput.value = "";
            })
            .catch(Session.set.bind(Session, "error"));

        return false;
    },

    "click [rel=delete]": function () {
        promisedCall("client.delete", this._id)
            .then(routeTo("client.new"))
            .catch(logError);
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

