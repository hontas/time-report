function getItemsFor() {
    return function () {
        return {
            items: Clients.find()
        };
    };
}

var clientDefaults = {
    template: "client",
    action: function () {
        this.render("clientsList", { to: "aside", data: getItemsFor("clients") });
        this.render();
    },
    waitOn: function () {
        return Meteor.subscribe('clients');
    }
};

Router.route("clients", {
    action: function () {
        this.redirect("client.new");
    }
});

Router.route("clients/new", _.defaults({
    name: "client.new"
}, clientDefaults));

Router.route("clients/:_id", _.defaults({
    name: "client",
    data: function () {
        return Clients.findOne(this.params._id);
    }
}, clientDefaults));