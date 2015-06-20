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
    template: "home"
});

Router.route("login");