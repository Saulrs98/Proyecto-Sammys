const Rol = require("../models/rol");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Rol.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("rol/list", {
        data: data,
        filter: filter,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("rol/list", { error: err.sqlMessage });
    });
};

exports.add = (request, response, next) => {
  response.render("rol/add", { error: null });
};

exports.save = (request, response, next) => {
  const role = request.body.role;

  const rol = new Rol(0, role);
  rol
    .save()
    .then(() => {
      response.redirect("/rol/list?success=agregado");
    })
    .catch((err) => {
      response.render("rol/add", { error: err.sqlMessage });
    });
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Rol.search(id)
    .then(([data, fieldData]) => {
      response.render("rol/edit", { item: data[0], error: null });
    })
    .catch((err) => {
      response.redirect("rol/list");
    });
};

exports.update = (request, response, next) => {
  const id = request.body.id;
  const role = request.body.role;

  const rol = new Rol(id, role);
  rol
    .update()
    .then(() => {
      response.redirect("/rol/list?success=actualizado");
    })
    .catch((err) => {
      response.render("rol/edit", { item: rol, error: err.sqlMessage });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Rol.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/rol/list?success=eliminado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/rol/list?error=true");
    });
};
