const db = require("../util/database");

module.exports = class Categoria {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  save() {
    const query = "INSERT INTO Categoria (nombre) VALUES(?)";
    return db.execute(query, [this.nombre]);
  }

  update() {
    const query = "UPDATE Categoria SET nombre = ?  WHERE id = ?";
    return db.execute(query, [this.nombre, this.id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM Categoria WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Categoria WHERE id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM Categoria");
  }
};
