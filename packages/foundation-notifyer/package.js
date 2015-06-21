Package.describe({
    name: "pontahontas:foundation-notifyer",
    version: "0.0.1",
    summary: "Display notifications, foundation style",
    git: "",
    documentation: "README.md"
});

Package.onUse(function (api) {
    api.versionsFrom("1.1.0.2");
    api.use("templating");
    api.addFiles("notifications.html", "client");
    api.addFiles("notifications.css", "client");
    api.addFiles("notifications.js", "client");
    api.export("Notify");
});
