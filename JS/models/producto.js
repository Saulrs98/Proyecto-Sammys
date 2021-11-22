const db = require("../util/database");

module.exports = class Producto {
  constructor(id, nombre, descripcion, precio, stock, genero, url, categoria_id) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.genero = genero;
    this.url = url;
    this.categoria_id = categoria_id
  }

  save() {
    const query =
    `INSERT INTO Producto (nombre, descripcion, precio, stock, genero, url, categoria_id) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    return db.execute(query, [
      this.nombre,
      this.descripcion,
      this.precio,
      this.stock,
      this.genero,
      this.url,
      this.categoria_id
    ]);
  }

  update() {
    const query = `UPDATE Producto SET nombre = ? , descripcion = ?, precio = ?, stock = ?, 
    genero = ?, url = ?, categoria_id = ? WHERE id = ?`;
    return db.execute(query, [
      this.nombre,
      this.descripcion,
      this.precio,
      this.stock,
      this.genero,
      this.url,
      this.categoria_id,
      this.id
    ]);
  }

  static delete(id) {
    return db.execute("DELETE FROM Producto WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Producto WHERE id = ?", [id]);
  }

  static fetchAll() {
      const query = `SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, 
      p.genero, p.url, p.categoria_id, c.nombre as categoria_nombre 
      FROM Producto p INNER JOIN Categoria c ON c.id = p.categoria_id`;
      const params = [];
    return db.execute(query, params);
  }
};
