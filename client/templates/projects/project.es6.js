Template.project.helpers({
    title: function () {
        return this._id ? this.name : "New project";
    },

    activities: function () {
        return Activities.find({}, { _id: 1, name: 1 });
    },

    clients: function () {
        return Clients.find({}, { _id: 1, name: 1 });
    },

    isChecked: function () {
        var data = Template.instance().data;
        var activityIds;

        if (data) {
            activityIds = data.activityIds || [];
            return _.contains(activityIds, this._id) ? "checked" : null;
        } else {
            return "checked";
        }
    },

    isActive: function () {
        return (!this._id || this.isActive) ? "checked" : "";
    },

    selectedClient: function () {
        var data = Template.instance().data;
        return (data && data.clientId === this._id) ? "selected" : null;
    }
});

Template.project.events({
    submit: function (event) {
        var form = event.target;
        var id = this._id;
        var project = {
            name: form.name.value,
            activityIds: _.toArray(form.activity)
                .filter(activity => activity.checked)
                .map(activity => activity.id),
            isActive: form.status.checked,
            clientId: form.client.selectedOptions[0].value
        };

        promisedCall("createUpdateProject", id, project)
            .then(routeTo("project"))
            .catch(logError);

        return false;
    },


    "click [rel=checkActivities]": function (event) {
        _.toArray(event.target.form.activity).forEach(activity => {
            activity.checked = true;
        });
        return false;
    },

    "click [rel=uncheckActivities]": function (event) {
        _.toArray(event.target.form.activity).forEach(activity => {
            activity.checked = false;
        });
        return false;
    }
});

Template.project.onCreated(function () {
    //add your statement here
});

Template.project.onRendered(function () {
    //add your statement here
});

Template.project.onDestroyed(function () {
    //add your statement here
});

