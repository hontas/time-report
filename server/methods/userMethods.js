Meteor.methods({
    createNewUser: function () {
        verifyUserAccess(this.userId, undefined, ["admin"]);

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
        verifyUserAccess(this.userId, id, ["admin"]);

        var user = Meteor.users.findOne(id);

        check(profile, {
            firstName: String,
            lastName: String,
            defaultActivityId: Match.Optional(String),
            defaultProjectId: Match.Optional(String),
            projectIds: Match.Optional([String])
        });

        if (_.isUndefined(profile.defaultActivityId)) {
            profile.defaultActivityId = user.profile.defaultActivityId;
        }
        if (_.isUndefined(profile.defaultProjectId)) {
            profile.defaultProjectId = user.profile.defaultProjectId;
        }
        if (_.isUndefined(profile.projectIds)) {
            profile.projectIds = user.profile.projectIds;
        }

        profile.updatedAt = new Date();

        Meteor.users.update(id, {
            $set: { profile: profile }
        });
    },

    updateUserRoles: function (id, rolesObject) {
        verifyUserAccess(this.userId, id, ["admin"]);

        var roles = Object.keys(rolesObject).filter(function (key) {
            return rolesObject[key];
        });

        Roles.setUserRoles(id, roles);
    }
});