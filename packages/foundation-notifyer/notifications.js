var key = "foundation-notifications";

Notify = function Notify(message, options) {
    if (_.isObject(message)) {
        options = message;
    }

    if (!_.isObject(options)) {
        options = {};
    }

    if (_.isString(message)) {
        options.message = message;
    }

    var notification = _.defaults(options, {
        _id: Random.id(),
        type: "", // success, warning, info, alert
        style: "", // radius, round
        closeAfter: false
    });

    addNotification(notification);
};

function addNotification(notification) {
    var notifications = Session.get(key);
    notifications.unshift(notification);
    Session.set(key, notifications);
    
    if (notification.closeAfter && _.isNumber(notification.closeAfter)) {
        setTimeout(function () {
            willRemoveNotification(notification._id);
        }, notification.closeAfter);
    }

    Tracker.afterFlush(function () {
        setTimeout(function () {
            $(".alert-box.alert-open").removeClass("alert-open");
        }, 0);
    });
}

function willRemoveNotification(id) {
    var alertBox = $(document.getElementById(id));
    alertBox.addClass("alert-close");
    alertBox.on("transitionend webkitTransitionEnd oTransitionEnd", function () {
        removeNotification(id);
    });
}

function removeNotification(id) {
    var notifications = Session.get(key);
    var notification = _.findWhere(notifications, { _id: id });
    var index = notifications.indexOf(notification);

    notifications.splice(index, 1);
    Session.set(key, notifications);
}

Template.notifications.helpers({
    notifications: function () {
        return Session.get(key);
    }
});

Template.notifications.events({
    "click .close": function (event) {
        var alertBox = $(event.target).closest("[data-alert]");
        willRemoveNotification(alertBox.prop("id"));
    }
});

Template.notifications.onCreated(function () {
    Session.set(key, []);
});

Template.notifications.onRendered(function () {
    //add your statement here
});

Template.notifications.onDestroyed(function () {
    //add your statement here
});

