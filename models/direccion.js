const db = require("../util/database");

module.exports = class Direccion {
  constructor(id, direccion_postal, ciudad, provincia, codigo_postal, usuario_id) {
    this.id = id;
    this.direccion_postal = direccion_postal;
    this.ciudad = ciudad;
    this.provincia = provincia;
    this.codigo_postal = codigo_postal;
    this.usuario_id = usuario_id;
  }

  save() {
    const query = "INSERT INTO Direccion (direccion_postal, ciudad, provincia, codigo_postal, usuario_id) VALUES(?, ?, ? , ?, ?)";
    const params = [this.direccion_postal, this.ciudad, this.provincia, this.codigo_postal, this.usuario_id];
    return db.execute(query, params);
  }

  static delete(id) {
    return db.execute("DELETE FROM Direccion WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Direccion WHERE id = ?", [id]);
  }

  static fetchAll(usuario_id) {
    const query = `SELECT * FROM Direccion WHERE usuario_id = ?`;
    const params = [usuario_id];
    return db.execute(query, params);
  }
};
