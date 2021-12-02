const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

exports.catalogo = (request, response, next) => {
  response.render("catalogo");
};

exports.index = (request, response, next) => {
  let filter = request.query.filter;
  const user = request.session.user;
  if (!filter) {
    filter = "";
  }
  Producto.fetchAll(filter)
    .then(([data, fieldData]) => {
      console.log(data);
      response.render("index", {
        data: data,
        filter: filter,
        user: user,
      });
    })
    .catch((err) => {
      response.render("index", {
        data: [],
        filter: filter,
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