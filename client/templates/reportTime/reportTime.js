Template.reportTime.helpers({
    projects: function () {
        return Projects.find({}, { sort: { name: 1 } });
    },

    activities: function () {
        return Activities.find({}, { sort: { name: 1 } });
    },

    isSelected: function (property) {
        return this._id === Meteor.user().profile[property] ? "selected" : null;
    }
});

Template.reportTime.events({
    //add your events here
});

Template.reportTime.onCreated(function () {
    //add your statement here
});

Template.reportTime.onRendered(function () {
    //add your statement here
});

Template.reportTime.onDestroyed(function () {
    //add your statement here
});

