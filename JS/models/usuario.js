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
    rol_id
  ) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.direccion = direccion;
    this.telefono = telefono;
    this.username = username;
    this.password = password;
    this.rol_id = rol_id;
  }

  save() {
    const query =
      "INSERT INTO Usuario (nombres, apellidos, email, direccion, telefono, " +
      "username, password, rol_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
      this.nombres,
      this.apellidos,
      this.email,
      this.direccion,
      this.telefono,
      this.username,
      this.password,
      this.rol_id,
    ];
    return db.execute(query, params);
  }

  update() {
    if(this.password != null){
      return this.updateWithPassword();
    }
    const query =
      "UPDATE Usuario SET " +
      "nombres = ?, apellidos = ?, email = ?, direccion = ?, telefono = ?, username = ?, rol_id = ? " +
      "WHERE id = ?";

    const params = [
      this.nombres,
      this.apellidos,
      this.email,
      this.direccion,
      this.telefono,
      this.username,
      this.rol_id,
      this.id,
    ];

    return db.execute(query, params);
  }

  updateWithPassword() {
    const query =
      "UPDATE Usuario SET " +
      "nombres = ?, apellidos = ?, email = ?, direccion = ?, telefono = ?, " +
      "username = ?, password = ?, rol_id = ? " +
      "WHERE id = ?";

    const params = [
      this.nombres,
      this.apellidos,
      this.email,
      this.direccion,
      this.telefono,
      this.username,
      this.password,
      this.rol_id,
      this.id,
    ];

    return db.execute(query, params);
  }

  static searchByUsuarioname(username) {
    const query = `SELECT u.id, u.nombres, u.apellidos, u.email, u.direccion, u.telefono, u.username,
    u.password, u.rol_id, r.role 
    FROM Usuario u INNER JOIN Rol r ON r.id = u.rol_id 
    WHERE username = ?`;
    const params = [username];
    return db.execute(query, params);
  }

  static encriptarPassword(password) {
    return bcrypt.hash(password, 12);
  }

  static delete(id) {
    return db.execute("DELETE FROM Usuario WHERE id = ?", [id]);
  }

  static search(id) {
    const query = `SELECT u.id, u.nombres, u.apellidos, u.email, u.direccion, u.telefono, u.username,
    u.password, u.rol_id, r.role  
    FROM Usuario u INNER JOIN Rol r ON r.id = u.rol_id WHERE u.id = ?`;
    const params = [id];
    return db.execute(query, params);
  }

  static fetchAll(filter) {
    const query = `SELECT u.id, u.nombres, u.apellidos, u.email, u.direccion, u.telefono, u.username,
    u.password, u.rol_id, r.role 
    FROM Usuario u INNER JOIN Rol r ON r.id = u.rol_id 
    WHERE u.username LIKE '` + filter + `%'`;
    return db.execute(query);
  }
};
