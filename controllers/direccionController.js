const Direccion = require("../models/direccion");

exports.list = (request, response, next) => {
  let error = request.query.error;
  let success = request.query.success;
  const user = request.session.user;
  Direccion.fetchAll(user.id)
    .then(([data, fieldData]) => {
      response.render("modecliente/direccion-list", {
        data: data,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("modecliente/direccion-list", { error: err.sqlMessage });
    });
};

exports.add = (request, response, next) => {
  response.render("modecliente/direccion-add", { error: null });
};

exports.save = (request, response, next) => {
  const direccion_postal = request.body.direccion_postal;
  const ciudad = request.body.ciudad;
  const provincia = request.body.provincia;
  const codigo_postal = request.body.codigo_postal;
  const user = request.session.user;

  const direccion = new Direccion(0, direccion_postal, ciudad, provincia, codigo_postal, user.id);
  direccion
    .save()
    .then(() => {
      response.redirect("/direccion-list?success=agregado");
    })
    .catch((err) => {
      response.render("modecliente/direccion-add", { error: err.sqlMessage });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Direccion.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("modecliente/direccion-list?success=eliminado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/direccion-list?error=true");
    });
};
