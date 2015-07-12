beforeAll(function (done) {
    Meteor.call("test.helpers.clearDB", function () {
        Meteor.call("test.helpers.loadFixtures", done);
    });
});