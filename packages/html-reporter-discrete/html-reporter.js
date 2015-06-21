/*jshint jquery:true */
(function () {
  "use strict";

  Template.velocity.events({
    "click .velocity-stack-trace": function (event) {
      $(event.target).toggleClass("open");
    }
  });
})();
