Package.describe({
    name: "pontahontas:test-helpers",
    version: "0.0.1",
    summary: "",
    git: "",
    documentation: "README.md"
});

Package.onUse(function (api) {
    api.versionsFrom("1.1.0.2");
    api.use("accounts-password");
    api.use("tracker", "client");
    api.use("iron:router", "client");
    api.use("underscore", "client");
    api.addFiles("test-helpers-methods.js", "server");
    api.addFiles("test-helpers-client.js", "client");
    api.addFiles("waitForRouterHelper.js", "client");
    api.export("TestHelper");
});
