const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

exports.list = (request, response, next) => {
  Producto.fetchAll()
    .then(([data, fieldData]) => {
        console.log(data);
      response.render("producto/list", { data: data });
    })
    .catch((err) => console.log(err));
};

exports.add = (request, response, next) => {
  Categoria.fetchAll()
    .then(([categorias, fieldData]) => {
      response.render("producto/add", { categorias: categorias });
    })
    .catch((err) => console.log(err));
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
          response.redirect("/producto/list");
        })
        .catch((err) => {
          response.render("producto/add", { error: err.sqlMessage });
        });
    
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Producto.search(id)
    .then(([data, fieldData]) => {
      response.render("producto/edit", { item: data[0] });
    })
    .catch((err) => console.log(err));
};

exports.update = (request, response, next) => {
  /** siguiente version */
  const id = request.body.id;
  const nombre = request.body.nombre;

  const producto = new Producto(id, nombre);
  producto
    .update()
    .then(() => {
      response.redirect("/producto/list");
    })
    .catch((err) => {
      response.render("producto/edit", { error: err.sqlMessage });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Producto.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/producto/list");
      }
    })
    .catch((err) => console.log(err));
};
