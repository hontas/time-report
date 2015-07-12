TestHelper = function () {};

console.log("TestHelper client", TestHelper);

_.extend(TestHelper.prototype, {
    fail: function (error) {
        throw new Error(error);
    },

    select: function (selector) {
        var el = document.querySelector(selector);
        if (el) return el;
        this.fail("No element found for selector " + selector);
    },

    login: function (username, password) {
        return new Promise(function (resolve, reject) {
            console.log(username, password);
            Meteor.loginWithPassword(username, password, function (error, res) {
                error && reject(error);
                !error && res && resolve(res);
            });
        });
    },

    goTo: function (route, data) {
        return new Promise(function (resolve) {
            Router.go(route, data);
            waitForRouter(resolve);
        });
    },

    sendKeys: function (selector, keys) {
        var el = this.select(selector);
        var tagName = el.tagName.toLowerCase();

        switch (tagName) {
            case "input":
                el.value = keys;
                break;
            default:
                el.textContent = keys;
        }
        return this;
    },

    click: function (selector) {
        var el = this.select(selector);
        el.click();
        return this;
    }
});
