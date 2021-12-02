const Categoria = require("../models/categoria");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Categoria.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("categoria/list", {
        data: data,
        filter: filter,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("categoria/list", { error: err.sqlMessage });
    });
};

exports.add = (request, response, next) => {
  response.render("categoria/add", { error: null });
};

exports.save = (request, response, next) => {
  const nombre = request.body.nombre;

  const categoria = new Categoria(0, nombre);
  categoria
    .save()
    .then(() => {
      response.redirect("/categoria/list?success=agregado");
    })
    .catch((err) => {
      response.render("categoria/add", { error: err.sqlMessage });
    });
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Categoria.search(id)
    .then(([data, fieldData]) => {
      response.render("categoria/edit", { item: data[0], error: null });
    })
    .catch((err) => {
      response.redirect("categoria/list");
    });
};

exports.update = (request, response, next) => {
  const id = request.body.id;
  const nombre = request.body.nombre;

  const categoria = new Categoria(id, nombre);
  categoria
    .update()
    .then(() => {
      response.redirect("/categoria/list?success=actualizado");
    })
    .catch((err) => {
      response.render("categoria/edit", { item: categoria, error: err.sqlMessage });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Categoria.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/categoria/list?success=eliminado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/categoria/list?error=true");
    });
};
