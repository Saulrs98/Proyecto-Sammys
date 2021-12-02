const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Producto.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("producto/list", {
        data: data,
        filter: filter,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("producto/list", {
        data: [],
        filter: filter,
        success: success,
        error: err.sqlMessage,
      });
    });
};

exports.add = (request, response, next) => {
  Categoria.fetchAll("")
    .then(([categorias, fieldData]) => {
      response.render("producto/add", { categorias: categorias, error: null });
    })
    .catch((err) => {
      response.redirect("producto/list");
    });
};

exports.save = (request, response, next) => {
  const nombre = request.body.nombre;
  const descripcion = request.body.descripcion;
  const precio = request.body.precio;
  const stock = request.body.stock;
  const genero = request.body.genero;
  const url = "/" + request.file.path;
  const categoria_id = request.body.categoria_id;

  const producto = new Producto(
    0,
    nombre,
    descripcion,
    precio,
    stock,
    genero,
    url,
    categoria_id
  );

  producto
    .save()
    .then(() => {
      response.redirect("/producto/list?success=agregado");
    })
    .catch((err) => {
      Categoria.fetchAll("")
        .then(([categorias, fieldData]) => {
          response.render("producto/add", {
            categorias: categorias,
            error: err.sqlMessage,
          });
        })
        .catch((err) => {
          response.redirect("producto/list");
        });
    });
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Producto.search(id)
    .then(([data, fieldData]) => {
      Categoria.fetchAll("")
        .then(([categorias, fieldData]) => {
          response.render("producto/edit", {
            item: data[0],
            categorias: categorias,
            error: null,
          });
        })
        .catch((err) => {
          response.redirect("producto/list");
        });
    })
    .catch((err) => {
      response.redirect("producto/list");
    });
};

exports.update = (request, response, next) => {
  const id = request.body.id;
  const nombre = request.body.nombre;
  const descripcion = request.body.descripcion;
  const precio = request.body.precio;
  const stock = request.body.stock;
  const genero = request.body.genero;
  let url = "/";
  if(typeof request.file !== 'undefined'){
    url += request.file.path;
  }
  const categoria_id = request.body.categoria_id;

  const producto = new Producto(
    id,
    nombre,
    descripcion,
    precio,
    stock,
    genero,
    url,
    categoria_id
  );

  producto
    .update()
    .then(() => {
      response.redirect("/producto/list?success=actualizado");
    })
    .catch((err) => {
      Categoria.fetchAll("")
        .then(([categorias, fieldData]) => {
          response.render("producto/edit", {
            item: producto,
            categorias: categorias,
            error: err.sqlMessage,
          });
        })
        .catch((err) => {
          response.redirect("producto/list");
        });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Producto.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/producto/list?success=eliminado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/producto/list?error=true");
    });
};
