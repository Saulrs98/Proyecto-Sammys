const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

exports.catalogo = (request, response, next) => {
  let filter = request.query.filter;
  let message = request.query.message;
  const user = request.session.user;

  if (!filter) {
    filter = "";
  }
  Producto.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("modecliente/catalogo", {
        data: data,
        filter: filter,
        user: user,
        message: message,
      });
    })
    .catch((err) => {
      console.log(err);
      response.render("modecliente/catalogo", {
        data: [],
        filter: filter,
        user: user,
        message: message,
      });
    });
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
