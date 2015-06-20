Template.registerHelper("displayName", function displayName(user) {
    if (!user) { return; }

    var p = user.profile;
    var firstName = p.firstName;
    if (firstName) {
        return firstName + " " + p.lastName;
    }
    return user.username;
});

Template.registerHelper("saveText", function saveText(item) {
   return (item && item._id) ? "Save" : "Create";
});

Template.registerHelper("currentRoute", function currentRoute() {
    return Router.current().route.getName();
});