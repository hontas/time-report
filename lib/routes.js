Router.plugin('dataNotFound');

Router.configure({
    layoutTemplate: 'defaultLayout',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function isLoggedIn() {
    if (Meteor.userId()) {
        this.next();
    } else {
        this.redirect("login");
    }
}, {
    except: ["login"]
});

Router.route("/", {
    name: "home",
    template: "home",
    layoutTemplate: "noSidebar",
    waitOn: function () {
        return [Meteor.subscribe('projects'), Meteor.subscribe('activities')];
    }
});

Router.route("login", {
    name: "login",
    template: "login",
    layoutTemplate: "noSidebar"
});