Meteor.methods({
    createUpdateProject: function (id, project) {
        verifyUserAccess(this.userId, undefined, ["admin", "manager"]);

        var now = new Date();
        project.updatedAt = now;

        if (id) {
            Projects.update(id, { $set: project });
            return id;
        } else {
            project.createdAt = now;
            return Projects.insert(project);
        }
    }
});