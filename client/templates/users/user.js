Template.user.helpers({
    userRoles: function () {
        return Meteor.roles.find({}, { name: 1 });
    },

    hasRole: function () {
        var id = Template.instance().data._id;
        return Roles.userIsInRole(id, [this.name]);
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
        var roleInputs = _.toArray(form.userRole);
        var profile = {};
        var id = this._id;
        var password, roles, user;

        function getUserRoles(res, role) {
            res[role.id] = role.checked;
            return res;
        }

        function updateRoles() {
            return promisedCall("updateUserRoles", id, roles);
        }

        if (id) {
            profile = {
                firstName: form.firstName.value,
                lastName: form.lastName.value
            };
            roles = roleInputs.reduce(getUserRoles, {});

            promisedCall("updateUserProfile", id, profile)
                .then(updateRoles)
                .then(function () {
                    Notify("Saved", { type: "success", closeAfter: 1500 });
                })
                .catch(logError);

        } else {
            password = form.password.value;
            user = {
                username: username,
                email: username,
                password: password,
                profile: profile
            };

            promisedCall("createNewUser", user)
                .then(routeTo("user"))
                .catch(logError);
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

