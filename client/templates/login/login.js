Template.login.helpers({
    //add you helpers here
});

Template.login.events({
    submit: function (event) {
        var form = event.target;
        var username = form.username.value + "@weahead.se";
        var password = form.password.value;

        promisedLogin(username, password)
            .then(routeTo("home"))
            .catch(logError);

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

