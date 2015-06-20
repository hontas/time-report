function verifyLoggedIn(userId) {
    if (!userId) {
        console.log("Not logged in");
        throw new Meteor.Error(403, "Access denied");
    }
}

Meteor.methods({
    createUpdateProject: function (id, project) {
        verifyLoggedIn(this.userId);

        var now = new Date();
        project.updatedAt = now;

        if (id) {
            Projects.update(id, { $set: project });
        } else {
            project.createdAt = now;
            return Projects.insert(project);
        }
    }
});