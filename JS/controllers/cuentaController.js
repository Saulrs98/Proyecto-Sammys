const Cuenta = require("../models/cuenta");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Cuenta.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("cuenta/list", {
        data: data,
        filter: filter,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("cuenta/list", { error: err.sqlMessage });
    });
};

exports.add = (request, response, next) => {
  response.render("cuenta/add", { error: null });
};

exports.save = (request, response, next) => {
  const numero_cuenta = request.body.numero_cuenta;
  const nombre_titular = request.body.nombre_titular;

  const cuenta = new Cuenta(0, numero_cuenta, nombre_titular);
  cuenta
    .save()
    .then(() => {
      response.redirect("/cuenta/list?success=agregado");
    })
    .catch((err) => {
      response.render("cuenta/add", { error: err.sqlMessage });
    });
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Cuenta.search(id)
    .then(([data, fieldData]) => {
      response.render("cuenta/edit", { item: data[0], error: null });
    })
    .catch((err) => {
      response.redirect("cuenta/list");
    });
};

exports.update = (request, response, next) => {
  const id = request.body.id;
  const numero_cuenta = request.body.numero_cuenta;
  const nombre_titular = request.body.nombre_titular;

  const cuenta = new Cuenta(id, numero_cuenta, nombre_titular);
  cuenta
    .update()
    .then(() => {
      response.redirect("/cuenta/list?success=actualizado");
    })
    .catch((err) => {
      response.render("cuenta/edit", { item: cuenta, error: err.sqlMessage });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Cuenta.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/cuenta/list?success=eliminado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/cuenta/list?error=true");
    });
};
