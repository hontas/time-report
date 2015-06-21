Meteor.methods({
    "role.create": function (role) {
        verifyUserAccess(this.userId, undefined, ["admin"]);

        role.createAt = new Date();

        return Meteor.roles.insert(role);
    },

    "role.delete": function (id) {
        verifyUserAccess(this.userId, id);

        return Meteor.roles.remove(id);
    }
});