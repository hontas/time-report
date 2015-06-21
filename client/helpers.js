Template.registerHelper("displayName", function displayName(user) {
    if (!user) { return; }

    var p = user.profile;
    var firstName = p.firstName;
    if (firstName) {
        return firstName + " " + p.lastName;
    }
    return user.username;
});

Template.registerHelper("saveText", function saveText() {
   return (this && this._id) ? "Save" : "Create";
});

Template.registerHelper("currentRoute", function currentRoute() {
    return Router.current().route.getName();
});

Template.registerHelper("capitalize", function capitalize(string) {
    if (_.isString(string)) {
        return string.charAt(0).toUpperCase() + string.substr(1);
    } else {
        return string;
    }
});