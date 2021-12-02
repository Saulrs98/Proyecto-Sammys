const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const bcrypt = require("bcryptjs");

exports.list = (request, response, next) => {
  let filter = request.query.filter;
  let error = request.query.error;
  let success = request.query.success;
  if (!filter) {
    filter = "";
  }
  Usuario.fetchAll(filter)
    .then(([data, fieldData]) => {
      response.render("usuario/list", {
        data: data,
        filter: filter,
        success: success,
        error: error,
      });
    })
    .catch((err) => {
      response.render("usuario/list", { error: err.sqlMessage });
    });
};

exports.add = (request, response, next) => {
  Rol.fetchAll("")
    .then(([roles, fieldData]) => {
      response.render("usuario/add", { roles: roles, error: null });
    })
    .catch((err) => {
      response.redirect("usuario/list");
    });
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
          response.redirect("/usuario/list?success=agregado");
        })
        .catch((err) => {
          Rol.fetchAll("")
            .then(([roles, fieldData]) => {
              response.render("usuario/add", {
                roles: roles,
                error: err.sqlMessage,
              });
            })
            .catch((err) => {
              response.redirect("usuario/list");
            });
        });
    })
    .catch((err) => {
      response.redirect("usuario/list");
    });
};

exports.edit = (request, response, next) => {
  const id = request.query.id;
  Usuario.search(id)
    .then(([data, fieldData]) => {
      Rol.fetchAll("")
        .then(([roles, fieldData]) => {
          response.render("usuario/edit", {
            item: data[0],
            roles: roles,
            error: null,
          });
        })
        .catch((err) => {
          response.redirect("usuario/list");
        });
    })
    .catch((err) => {
      response.redirect("usuario/list");
    });
};

exports.update = (request, response, next) => {
  const id = request.body.id;
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
        id,
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
        .update()
        .then(() => {
          response.redirect("/usuario/list?success=actualizado");
        })
        .catch((err) => {
          Rol.fetchAll("")
            .then(([roles, fieldData]) => {
              response.render("usuario/edit", {
                item: usuario,
                roles: roles,
                error: err.sqlMessage,
              });
            })
            .catch((err) => {
              response.redirect("usuario/list");
            });
        });
    })
    .catch((err) => {
      response.render("usuario/edit", { error: err });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Usuario.delete(id)
    .then(([result, fieldData]) => {
      if (result) {
        response.redirect("/usuario/list?success=eliminado");
      }
    })
    .catch((err) => {
      console.log(err.sqlMessage);
      response.redirect("/usuario/list?error=true");
    });
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

              console.log(user);

              if(user.role == "Administrador"){
                return response.redirect("/home");
              }else{
                response.redirect("/");
              }
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
  const rol_id = 2;

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
