(function (Meteor, Tracker, Router) {
    var isRouterReady = false;
    var callbacks = [];

    console.log("wait for router");
    window.waitForRouter = function (callback) {
        if (isRouterReady) {
            callback();
        } else {
            callbacks.push(callback);
        }
    };

    Router.onAfterAction(function () {
        if (!isRouterReady && this.ready()) {
            Tracker.afterFlush(function () {
                isRouterReady = true;
                callbacks.forEach(function (callback) {
                    callback();
                });
                callbacks = []
            })
        }
    });

    Router.onRerun(function () {
        isRouterReady = false;
        this.next();
    });

    Router.onStop(function () {
        isRouterReady = false;
        if (this.next) {
            this.next();
        }
    });
})(Meteor, Tracker, Router);