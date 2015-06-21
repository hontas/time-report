promisedCall = function promisedCall(...args) {
    return new Promise(function (resolve, reject) {
        function callback(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }

        args.push(callback);

        Meteor.call.apply(Meteor, args);
    });
};

promisedLogin = function promisedLogin(username, password) {
    return new Promise(function (resolve, reject) {
        Meteor.loginWithPassword(username, password, function (err, res) {
            if (err) {
                reject(error);
            } else {
                resolve(res);
            }
        });
    });
};

routeTo = function routeTo(route) {
    return function (id) {
        if (id && _.isString(id)) {
            Router.go(route, { _id: id });
        } else {
            Router.go(route);
        }
    }
};

logError = function logError(error) {
    console.error(error);
};

log = function log(message) {
    return function (res) {
        console.log(message, res ? res : "");
        return res;
    }
};