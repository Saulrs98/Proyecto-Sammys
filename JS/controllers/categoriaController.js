const Categoria = require("../models/categoria");

exports.list = (request, response, next) => {
  Categoria.fetchAll()
    .then(([data, fieldData]) => {
      response.render("categoria/list", { data: data });
    })
    .catch((err) => console.log(err));
};

exports.add = (request, response, next) => {
  response.render("categoria/add");
};

exports.save = (request, response, next) => {
  const nombre = request.body.nombre;

  const categoria = new Categoria(0, nombre);
  categoria
    .save()
    .then(() => {
      response.redirect("/categoria/list");
    })
    .catch((err) => {
      response.render("categoria/add", { error: err.sqlMessage });
    });
};

exports.edit = (request, response, next) => {
    const id = request.query.id;
    Categoria.search(id)
    .then(([data, fieldData]) => {
        response.render("categoria/edit", {item: data[0]});
    })
    .catch((err) => console.log(err));    
  };

exports.update = (request, response, next) => {
    const id = request.body.id;
    const nombre = request.body.nombre;
  
    const categoria = new Categoria(id, nombre);
    categoria
      .update()
      .then(() => {
        response.redirect("/categoria/list");
      })
      .catch((err) => {
        response.render("categoria/edit", { error: err.sqlMessage });
      });
  };

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Categoria.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/categoria/list");
      }
    })
    .catch((err) => console.log(err));
};


