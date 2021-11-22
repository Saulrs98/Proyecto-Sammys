const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const bcrypt = require("bcryptjs");

exports.list = (request, response, next) => {
  Usuario.fetchAll()
    .then(([data, fieldData]) => {
      response.render("usuario/list", { data: data });
    })
    .catch((err) => console.log(err));
};

exports.add = (request, response, next) => {
  Rol.fetchAll()
    .then(([roles, fieldData]) => {
      response.render("usuario/add", { roles: roles });
    })
    .catch((err) => console.log(err));
};

exports.save = (request, response, next) => {
  const nombres = request.body.nombres;
  const apellidos = request.body.apellidos;
  const email = request.body.email;
  const direccion = request.body.direccion;
  const telefono = request.body.telefono;
  const username = request.body.username;
  const password = request.body.password;
  const rol_id = request.body.rol_id;

  Usuario.encriptarPassword(password)
    .then((hash) => {
      const usuario = new Usuario(
        0,
        nombres,
        apellidos,
        email,
        direccion,
        telefono,
        username,
        hash,
        rol_id
      );

      usuario
        .save()
        .then(() => {
          response.redirect("/usuario/list");
        })
        .catch((err) => {
          response.render("usuario/add", { error: err.sqlMessage });
        });
    })
    .catch((err) => {
      response.render("usuario/add", { error: err });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Usuario.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/usuario/list");
      }
    })
    .catch((err) => console.log(err));
};

exports.login = (request, response, next) => {
  const username = request.body.username;
  const password = request.body.password;

  Usuario.searchByUsuarioname(username)
    .then(([data, fieldData]) => {
      if (data.length > 0) {
        user = data[0];
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              request.session.isLoggedIn = true;
              request.session.user = user;
              return request.session.save((err) => {
                response.redirect("/");
              });
            }
            response.render("index", { error: "Credenciales incorrectas" });
          })
          .catch((err) => {
            response.render("index", { error: err });
          });
      } else {
        response.render("index", { error: "Credenciales incorrectas" });
      }
    })
    .catch((err) => {
      response.render("index", { error: err.sqlMessage });
    });
};

exports.register = (request, response, next) => {
  response.render("register", { error: "" });
};

exports.saveRegister = (request, response, next) => {
  const nombres = request.body.nombres;
  const apellidos = request.body.apellidos;
  const email = request.body.email;
  const direccion = request.body.direccion;
  const telefono = request.body.telefono;
  const username = request.body.username;
  const password = request.body.password;
  const rol_id = 1;

  Usuario.encriptarPassword(password)
    .then((hash) => {
      const usuario = new Usuario(
        0,
        nombres,
        apellidos,
        email,
        direccion,
        telefono,
        username,
        hash,
        rol_id
      );

      usuario
        .save()
        .then(() => {
          response.redirect("/login");
        })
        .catch((err) => {
          response.render("register", { error: err.sqlMessage });
        });
    })
    .catch((err) => {
      response.render("register", { error: err });
    });
};
