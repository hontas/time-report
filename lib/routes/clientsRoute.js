function getItems() {
    return function () {
        return {
            items: Clients.find()
        };
    };
}

var clientDefaults = {
    template: "client",
    waitOn: function () {
        return Meteor.subscribe('clients');
    },
    yieldRegions: {
        "clientsList": { to: "aside", data: getItems() }
    }
};

Router.route("clients", _.defaults({
    template: "empty",
    action: function () {
        this.redirect("client.new");
    }
}, clientDefaults));

Router.route("clients/new", _.defaults({
    name: "client.new"
}, clientDefaults));

Router.route("clients/:_id", _.defaults({
    name: "client",
    data: function () {
        return Clients.findOne(this.params._id);
    }
}, clientDefaults));