const Cuenta = require("../models/cuenta");

exports.list = (request, response, next) => {
  Cuenta.fetchAll()
    .then(([data, fieldData]) => {
      response.render("cuenta/list", { data: data });
    })
    .catch((err) => console.log(err));
};

exports.add = (request, response, next) => {
  response.render("cuenta/add");
};

exports.save = (request, response, next) => {
  const numero_cuenta = request.body.numero_cuenta;
  const nombre_titular = request.body.nombre_titular;

  const cuenta = new Cuenta(0, numero_cuenta, nombre_titular);
  cuenta
    .save()
    .then(() => {
      response.redirect("/cuenta/list");
    })
    .catch((err) => {
      response.render("cuenta/add", { error: err.sqlMessage });
    });
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Cuenta.search(id)
    .then(([data, fieldData]) => {
      response.render("cuenta/edit", { item: data[0] });
    })
    .catch((err) => console.log(err));
};

exports.update = (request, response, next) => {
  const id = request.body.id;
  const numero_cuenta = request.body.numero_cuenta;
  const nombre_titular = request.body.nombre_titular;

  const cuenta = new Cuenta(id, numero_cuenta, nombre_titular);
  cuenta
    .update()
    .then(() => {
      response.redirect("/cuenta/list");
    })
    .catch((err) => {
      response.render("cuenta/edit", { error: err.sqlMessage });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Cuenta.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/cuenta/list");
      }
    })
    .catch((err) => console.log(err));
};
