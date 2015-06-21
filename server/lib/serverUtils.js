verifyLoggedIn = function verifyLoggedIn(userId) {
    if (!userId) {
        console.log("Not logged in");
        throw new Meteor.Error(403, "Access denied");
    }
};

verifyUserRights = function verifyUserRights(userId, id, roles) {
    if (id) {
        if (userId !== id && !Roles.userIsInRole(userId, roles)) {
            console.log("Don't have access");
            throw new Meteor.Error(403, "Access denied");
        }
    } else {
        if (!Roles.userIsInRole(userId, roles)) {
            console.log("Don't have access");
            throw new Meteor.Error(403, "Access denied");
        }
    }
};

verifyUserAccess = function verifyUserAccess(userId, id, roles) {
    verifyLoggedIn(userId);
    verifyUserRights(userId, id, roles);
};