function verifyLoggedIn(userId) {
    if (!userId) {
        console.log("Not logged in");
        throw new Meteor.Error(403, "Access denied");
    }
}

function verifyUserRights(userId, id) {
    if (id) {
        if (userId !== id && !Roles.userIsInRole(userId, ["admin"])) {
            console.log("Don't have access");
            throw new Meteor.Error(403, "Access denied");
        }
    } else {
        if (!Roles.userIsInRole(userId, ["admin"])) {
            console.log("Don't have access");
            throw new Meteor.Error(403, "Access denied");
        }
    }
}

function verifyUserAccess(userId, id) {
    verifyLoggedIn(userId);
    verifyUserRights(userId, id);
}

Meteor.methods({
    createNewUser: function () {
        verifyUserAccess(this.userId);

        return Accounts.createUser({
            username: username,
            email: username,
            password: password,
            profile: profile
        }, function (err) {
            if (err) {
                throw new Meteor.Error(403, err);
            }
        });
    },

    updateUserProfile: function (id, profile) {
        verifyUserAccess(this.userId, id);

        check(profile, {
            firstName: String,
            lastName: String
        });

        Meteor.users.update(id, {
            $set: { profile: profile }
        });
    },

    updateUserRoles: function (id, roles) {
        verifyUserAccess(this.userId, id);

        Roles.setUserRoles(id, roles.admin ? ["admin"] : []);
    }
});