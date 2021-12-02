const Carrito = require("../models/carrito");
const Venta = require("../models/venta");
const DetalleVenta = require("../models/detalleVenta");
const date = require("date-and-time");

exports.list = (request, response, next) => {
  const user = request.session.user;
  const success = request.query.success;
  Carrito.fetchAll(user.id)
    .then(([data, fieldData]) => {
      response.render("modecliente/carrito", {
        data: data,
        user: user,
        filter: "",
        success: success,
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

exports.venta = (request, response, next) => {
  const user = request.session.user;

  Carrito.fetchAll(user.id)
    .then(([carrito, fieldData]) => {
      let fecha = new Date();
      let codigo = date.format(fecha, "YYYYMMDDHHmmssSSS");
      console.log(codigo);
      let venta = new Venta(
        0,
        codigo,
        date.format(fecha, "YYYY-MM-DD"),
        0,
        "Espera",
        user.id
      );

      venta
        .save()
        .then(() => {
          Venta.searchByCodigo(codigo)
            .then(([data, fieldData]) => {
              venta = data[0];

              let total = 0;
              let i = 0;

              carrito.forEach((element) => {
                const subtotal = element.cantidad * element.precio;
                const detalle = new DetalleVenta(
                  0,
                  element.producto_id,
                  venta.id,
                  element.cantidad,
                  element.precio,
                  subtotal
                );

                total += subtotal;
                i += 1;

                detalle
                  .save()
                  .then(() => {
                    if (carrito.length == i) {
                      Venta.updateTotal(venta.id, total)
                        .then(([result, fieldData]) => {
                          if (result) {
                            Carrito.deleteByUsuario(user.id)
                              .then(([result, fieldData]) => {
                                if (result) {
                                  response.redirect("/carrito?success=venta");
                                }
                              })
                              .catch((err) => {
                                console.log(err.sqlMessage);
                                response.redirect("/carrito");
                              });
                          }
                        })
                        .catch((err) => {
                          console.log(err.sqlMessage);
                          response.redirect("/carrito");
                        });
                    }
                  })
                  .catch((err) => {
                    response.redirect("/catalogo");
                  });
              });
            })
            .catch((err) => {
              response.redirect("/catalogo");
            });
        })
        .catch((err) => {
          response.redirect("/catalogo");
        });
    })
    .catch((err) => {
      console.log(err);
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
