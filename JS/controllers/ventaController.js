const Venta = require("../models/venta");
const Carrito = require("../models/carrito");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Venta.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("venta/list", {
        data: data,
        filter: filter,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("venta/list", {
        data: [],
        filter: filter,
        success: success,
        error: err.sqlMessage,
      });
    });
};


exports.aprobar = (request, response, next) => {
  const id = request.query.id;
  Venta.aprobar(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/venta/list?success=aprobado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/venta/list?error=true");
    });
};
