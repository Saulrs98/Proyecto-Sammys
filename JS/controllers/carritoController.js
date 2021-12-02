
const Carrito = require("../models/carrito");

exports.list = (request, response, next) => {
  const user = request.session.user;
  Carrito.fetchAll(user.id)
    .then(([data, fieldData]) => {
      response.render("modecliente/carrito", {
        data: data,
        user: user,
        filter: "",
      });
    })
    .catch((err) => {
      response.redirect("/catalogo");
    });
};


exports.add = (request, response, next) => {
  const producto_id = request.query.producto_id;
  const user = request.session.user;

  const carrito = new Carrito(0, producto_id, user.id, 1);

  carrito
    .save()
    .then(() => {
      response.redirect("/catalogo?message=agregado");
    })
    .catch((err) => {
      response.redirect("/catalogo");
    });
};


exports.delete = (request, response, next) => {
  const id = request.query.id;
  Carrito.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/carrito");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/carrito");
    });
};
