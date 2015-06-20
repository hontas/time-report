Template.role.helpers({
    newRole: function () {
        return !this._id;
    },

    roleName: function () {
        return this._id ? this.name : "New role";
    }
});

Template.role.events({
    submit: function (event) {
        var form = event.target;
        var username = form.username.value + "@weahead.se";
        var profile = {};
        var password, roles, id;


        if (this._id) {
            profile = {
                firstName: form.firstName.value,
                lastName: form.lastName.value
            };
            roles = {
                admin: form.isAdmin.checked
            };

            Meteor.call("updateUserProfile", this._id, profile);
            Meteor.call("updateUserRoles", this._id, roles);
        } else {
            password = form.password.value;
            id = Meteor.call("createNewUser", {
                username: username,
                email: username,
                password: password,
                profile: profile
            });

            if (id) {
                Router.go("user", { _id: id });
            }
        }

        return false;
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

