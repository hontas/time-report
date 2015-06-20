var rolesDefaults = {
    action: function () {
        this.render();
    },
    waitOn: function () {
        return Meteor.subscribe('roles');
    },
    yieldRegions: {
        rolesList: { to: "aside", data: { items: Meteor.roles.find() } }
    }
};

Router.route("roles", _.defaults({
    template: "empty"
}, rolesDefaults));

Router.route("roles/new", _.defaults({
    name: "role.new",
    template: "role"
}, rolesDefaults));

Router.route("roles/:_id", _.defaults({
    name: "role",
    template: "role",
    data: function () {
        return Meteor.roles.find(this.params._id);
    }
}, rolesDefaults));