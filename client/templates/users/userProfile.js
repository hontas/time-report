Template.userProfile.helpers({
    activities: function () {
        return Activities.find();
    },

    selectedActivity: function () {
        var data = Template.instance().data;
        return (data && data.profile.defaultActivityId === this._id) ? "selected" : null;
    },

    projects: function () {
        return Projects.find({}, { _id: 1, name: 1 });
    },

    selectedProject: function () {
        var data = Template.instance().data;
        return (data && data.profile.defaultProjectId === this._id) ? "selected" : null;
    }
});

var errorLog = log("Error:");

Template.userProfile.events({
    submit: function () {
        var form = event.target;
        var profile = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            defaultProjectId: form.defaultProject.selectedOptions[0].value,
            defaultActivityId: form.defaultActivity.selectedOptions[0].value
        };

        promisedCall("updateUserProfile", this._id, profile)
            .then(function () {
                Notify("Saved", { type: "success", closeAfter: 1500 });
            })
            .catch(errorLog);

        return false;
    }
});

Template.userProfile.onCreated(function () {
    //add your statement here
});

Template.userProfile.onRendered(function () {
    //add your statement here
});

Template.userProfile.onDestroyed(function () {
    //add your statement here
});

