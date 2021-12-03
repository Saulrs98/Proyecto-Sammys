const Producto = require("../models/producto");

exports.catalogo = (request, response, next) => {
  let filter = request.query.filter;
  let message = request.query.message;
  const user = request.session.user;

  if (!filter) {
    filter = "";
  }
  Producto.fetchAllDisponible(filter)
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


