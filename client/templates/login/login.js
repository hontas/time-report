Template.login.helpers({
    //add you helpers here
});

Template.login.events({
    submit: function (event) {
        var form = event.target;
        var username = form.username.value + "@weahead.se";
        var password = form.password.value;

        Meteor.loginWithPassword(username, password, function (err) {
            if (err) {
                console.error(err);
            } else {
                Router.go("user", { _id: Meteor.userId() });
            }
        });
        return false;
    }
});

Template.login.onCreated(function () {
    //add your statement here
});

Template.login.onRendered(function () {
    //add your statement here
});

Template.login.onDestroyed(function () {
    //add your statement here
});

