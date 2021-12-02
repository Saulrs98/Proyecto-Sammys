exports.home = (request, response, next) => {
  response.render("home");
};

exports.login = (request, response, next) => {
  response.render("login", {error: ""});
};

exports.logout = (request, response, next) => {
  request.session.isLoggedIn = false;
  request.session.user = null;
  response.redirect("/");
};

exports.reset = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect("/"); 
  });
};

exports.error404 = (request, response, next) => {
  response.status(404).render("404"); 
}
