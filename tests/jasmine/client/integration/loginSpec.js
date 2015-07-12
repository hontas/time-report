describe("Login", function () {
    var th = new TestHelper();

    beforeEach(function (done) {
        th.login("test", "test")
            .then(done);
    });

    beforeEach(waitForRouter);

    it("should work", function () {
        expect(true).toBe(true);
    });
});