const bcrypt = require("bcryptjs");
const db = require("../util/database");
const Rol = require("./rol");

module.exports = class Usuario {
  constructor(
    id,
    nombres,
    apellidos,
    email,
    direccion,
    telefono,
    username,
    password,
    rol
  ) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.direccion = direccion;
    this.telefono = telefono;
    this.username = username;
    this.password = password;
    this.rol = rol;
  }

  save() {
    const query =
      "INSERT INTO Usuario (nombres, apellidos, email, direccion, telefono, " +
      "username, password, rol_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    return db.execute(query, [
      this.nombres,
      this.apellidos,
      this.email,
      this.direccion,
      this.telefono,
      this.username,
      this.password,
      this.rol.id
    ]);
  }

  update() {
    const query =
      "UPDATE Usuario SET " +
      "nombres = ?, apellidos = ?, email = ?, direccion = ?, telefono = ?, " +
      "username = ?, password = ?, rol_id = ? " +
      "WHERE id = ?";
    db.execute(query, [
      this.nombres,
      this.apellidos,
      this.email,
      this.direccion,
      this.telefono,
      this.username,
      this.password,
      this.rol.id,
      this.id,
    ]);
  }

  static searchByUsuarioname(username) {
    return db.execute("SELECT * FROM Usuario WHERE username = ?", [username]);
  }

  static encriptarPassword(password) {
    return bcrypt.hash(password, 12);
  }

  static delete(id) {
    return db.execute("DELETE FROM Usuario WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Usuario WHERE id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM Usuario");
  }
};
