function verifyLoggedIn(userId) {
    if (!userId) {
        console.log("Not logged in");
        throw new Meteor.Error(403, "Access denied");
    }
}

Meteor.methods({
    "client.createUpdate": function (id, client) {
        verifyLoggedIn(this.userId);

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
        verifyLoggedIn(this.userId);

        if (Clients.findOne(id)) {
            // TODO remove all references from projects
            // TODO ask if user wish to remove all projects as well
            return Clients.remove(id);
        } else {
            throw new Meteor.Error(404, "Client does not exist");
        }
    }
});