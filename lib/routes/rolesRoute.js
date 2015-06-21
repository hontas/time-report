var rolesDefaults = {
    template: "role",
    waitOn: function () {
        return Meteor.subscribe('roles');
    },
    yieldRegions: {
        rolesList: { to: "aside", data: { items: Meteor.roles.find() } }
    }
};

Router.route("roles", _.defaults({
    template: "empty",
    action: function () {
        this.redirect("role.new");
    }
}, rolesDefaults));

Router.route("roles/new", _.defaults({
    name: "role.new"
}, rolesDefaults));

Router.route("roles/:_id", _.defaults({
    name: "role",
    data: function () {
        return Meteor.roles.findOne(this.params._id);
    }
}, rolesDefaults));