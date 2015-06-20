Template.user.helpers({
    isAdmin: function () {
        return Roles.userIsInRole(this._id, ["admin"]);
    },

    newUser: function () {
        return !this._id;
    },

    domain: function () {
        return "@weahead.se";
    }
});

Template.user.events({
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

Template.user.onCreated(function () {
    //add your statement here
});

Template.user.onRendered(function () {
    //add your statement here
});

Template.user.onDestroyed(function () {
    //add your statement here
});

