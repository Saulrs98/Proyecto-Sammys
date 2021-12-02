const db = require("../util/database");

module.exports = class Carrito {
  constructor(id, producto_id, usuario_id, cantidad) {
    this.id = id;
    this.producto_id = producto_id;
    this.usuario_id = usuario_id;
    this.cantidad = cantidad;
  }

  save() {
    const query = `INSERT INTO Carrito (producto_id, usuario_id, cantidad) VALUES(?, ?, ?)`;
    const params = [this.producto_id, this.usuario_id, this.cantidad];
    return db.execute(query, params);
  }

  update() {
    const query = `UPDATE Carrito SET producto_id = ?, usuario_id = ?, cantidad = ?  WHERE id = ?`;
    const params = [this.producto_id, this.usuario_id, this.cantidad, this.id];
    return db.execute(query, params);
  }

  static delete(id) {
    return db.execute("DELETE FROM Carrito WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Carrito WHERE id = ?", [id]);
  }

  static fetchAll(usuario_id) {
    const query = `SELECT c.id, c.producto_id, c.usuario_id, c.cantidad, p.nombre, p.precio
    FROM Carrito c
    INNER JOIN producto p ON p.id = c.producto_id
    WHERE usuario_id = ?`;
    const params = [usuario_id];
    return db.execute(query, params);
  }
};