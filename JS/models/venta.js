const db = require("../util/database");

module.exports = class Venta {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  save() {
    const query = "INSERT INTO Venta (nombre) VALUES(?)";
    return db.execute(query, [this.nombre]);
  }

  update() {
    const query = "UPDATE Venta SET nombre = ?  WHERE id = ?";
    return db.execute(query, [this.nombre, this.id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM Venta WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Venta WHERE id = ?", [id]);
  }

  static fetchAll(filter) {
    const query = `SELECT * FROM Venta WHERE nombre LIKE '` + filter + `%'`;
    return db.execute(query);
  }
};
