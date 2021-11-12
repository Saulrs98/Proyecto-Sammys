exports.home = (request, response, next) => {
  if (!request.session.contador) {
    request.session.contador = 0;
  }
  response.render("home", {
    titulo: "LAB 20: Autenticación",
    contador: request.session.contador,
  });
};

exports.index = (request, response, next) => {
  response.render("index", {error: ""});
};

exports.logout = (request, response, next) => {
  request.session.isLoggedIn = false;
  request.session.user = null;
  response.redirect("/");
};

exports.reset = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect("/"); //Este código se ejecuta cuando la sesión se elimina.
  });
};
