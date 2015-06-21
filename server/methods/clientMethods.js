Meteor.methods({
    "client.createUpdate": function (id, client) {
        verifyUserAccess(this.userId, undefined, ["admin", "manager"]);

        var now = new Date();
        client.updatedAt = now;

        if (id) {
            Clients.update(id, { $set: client });
        } else {
            if (Clients.findOne({ name: client.name })) {
                throw new Meteor.Error(409, "Client already exist");
            } else {
                client.createAt = now;
                return Clients.insert(client);
            }
        }
    },

    "client.delete": function (id) {
        verifyUserAccess(this.userId, undefined, ["admin", "manager"]);

        if (Clients.findOne(id)) {
            // TODO remove all references from projects
            // TODO ask if user wish to remove all projects as well
            return Clients.remove(id);
        } else {
            throw new Meteor.Error(404, "Client does not exist");
        }
    }
});