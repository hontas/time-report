Template.role.helpers({
    roleName: function () {
        return this._id ? this.name : "New role";
    }
});

Template.role.events({
    submit: function (event) {
        var form = event.target;

        promisedCall("role.create", { name: form.role.value })
            .then(routeTo("roles"))
            .catch(logError);

        return false;
    },

    "click [rel=delete]": function () {
        promisedCall("role.delete", this._id)
            .then(routeTo("roles"))
            .catch(logError);
    }
});

Template.role.onCreated(function () {
    //add your statement here
});

Template.role.onRendered(function () {
    //add your statement here
});

Template.role.onDestroyed(function () {
    //add your statement here
});

