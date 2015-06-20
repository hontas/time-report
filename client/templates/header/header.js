Template.header.helpers({
    //add you helpers here
});

Template.header.events({
    "click [rel=logout]": function () {
        Meteor.logout();
    }
});

Template.header.onCreated(function () {
    //add your statement here
});

Template.header.onRendered(function () {
    //add your statement here
});

Template.header.onDestroyed(function () {
    //add your statement here
});

