(function () {
  "use strict";

  Package.describe({
    name: "pontahontas:html-reporter-discrete",
    version: "0.0.1",
    summary: "Styles that make the html-reporter less obtrusive",
    git: "",
    documentation: "README.md",
    debugOnly: true
  });

  Package.onUse(function (api) {
    api.versionsFrom("1.1.0.2");
    api.use(["templating", "less"]);
    api.use("velocity:html-reporter", "client", { weak: true });
    api.addFiles("html-reporter.js", "client");
    api.addFiles("html-reporter.less", "client");
  });
})();
