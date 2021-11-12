const Rol = require("../models/rol");

exports.list = (request, response, next) => {
  Rol.fetchAll()
    .then(([data, fieldData]) => {
      response.render("rol/list", { data: data });
    })
    .catch((err) => console.log(err));
};

exports.add = (request, response, next) => {
  response.render("rol/add");
};

exports.save = (request, response, next) => {
  const role = request.body.role;

  const rol = new Rol(0, role);
  rol
    .save()
    .then(() => {
      response.redirect("/rol/list");
    })
    .catch((err) => {
      response.render("rol/add", { error: err.sqlMessage });
    });
};

exports.edit = (request, response, next) => {
    const id = request.query.id;
    Rol.search(id)
    .then(([data, fieldData]) => {
        response.render("rol/edit", {item: data[0]});
    })
    .catch((err) => console.log(err));    
  };

exports.update = (request, response, next) => {
    const id = request.body.id;
    const role = request.body.role;
  
    const rol = new Rol(id, role);
    rol
      .update()
      .then(() => {
        response.redirect("/rol/list");
      })
      .catch((err) => {
        response.render("rol/edit", { error: err.sqlMessage });
      });
  };

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Rol.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/rol/list");
      }
    })
    .catch((err) => console.log(err));
};


