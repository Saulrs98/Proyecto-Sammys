const Venta = require("../models/venta");
const DetalleVenta = require("../models/detalleVenta");
const Comprobante = require("../models/comprobante");

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

exports.misCompras = (request, response, next) => {
  const user = request.session.user;
  let message = request.query.message;
  Venta.fetchAllByUsuario(user.id)
    .then(([data, fieldData]) => {
      response.render("modecliente/mis-compras", {
        data: data,
        message: message,
      });
    })
    .catch((err) => {
      response.redirect("/catalogo");
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

exports.view = (request, response, next) => {
  const id = request.query.id;
  Venta.search(id)
    .then(([data, fieldData]) => {
      DetalleVenta.fetchAll(data[0].id)
        .then(([detalle, fieldData]) => {
          Comprobante.fetchAll(data[0].id)
            .then(([comprobantes, fieldData]) => {
              response.render("venta/view", {
                item: data[0],
                detalle: detalle,
                comprobantes: comprobantes,
                error: null,
              });
            })
            .catch((err) => {
              response.redirect("/venta/list");
            });
        })
        .catch((err) => {
          response.redirect("/venta/list");
        });
    })
    .catch((err) => {
      response.redirect("/venta/list");
    });
};

exports.detalleCompra = (request, response, next) => {
  const id = request.query.id;
  Venta.search(id)
    .then(([data, fieldData]) => {
      DetalleVenta.fetchAll(data[0].id)
        .then(([detalle, fieldData]) => {
          Comprobante.fetchAll(data[0].id)
            .then(([comprobantes, fieldData]) => {
              response.render("modecliente/detalle-compra", {
                item: data[0],
                detalle: detalle,
                comprobantes: comprobantes,
                error: null,
              });
            })
            .catch((err) => {
              response.redirect("/venta/list");
            });
        })
        .catch((err) => {
          response.redirect("/catalogo");
        });
    })
    .catch((err) => {
      response.redirect("/catalogo");
    });
};
