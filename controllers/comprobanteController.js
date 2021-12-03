const Comprobante = require("../models/comprobante");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Comprobante.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("comprobante/list", {
        data: data,
        filter: filter,
        success: success,
        error: error
      });
    })
    .catch((err) => {
      response.render("comprobante/list", { data: [],
        filter: filter,
        success: success,
        error: err.sqlMessage });
    });
};


exports.pago = (request, response, next) => {
  const venta_id = request.body.venta_id;
  const url = "/" + request.file.path;

  const comprobante = new Comprobante(
    0,
    url,
    venta_id
  );

  comprobante
    .save()
    .then(() => {
      response.redirect("/mis-compras?message=enviado");
    })
    .catch((err) => {
      console.log(err);
      response.redirect("/catalogo");
    });
};

