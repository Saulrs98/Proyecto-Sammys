const db = require("../util/database");

module.exports = class DetalleVenta {
  constructor(id, producto_id, venta_id, cantidad, precio, subtotal) {
    this.id = id;
    this.producto_id = producto_id;
    this.venta_id = venta_id;
    this.cantidad = cantidad;
    this.precio = precio;
    this.subtotal = subtotal;
  }

  save() {
    const query = `INSERT INTO Detalle_Venta (producto_id, venta_id, cantidad, precio, subtotal) VALUES(?, ?, ?, ?, ?)`;
    const params = [this.producto_id, this.venta_id, this.cantidad, this.precio, this.subtotal];
    return db.execute(query, params);
  }

  update() {
    const query = "UPDATE Detalle_Venta SET nombre = ?  WHERE id = ?";
    return db.execute(query, [this.nombre, this.id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM Detalle_Venta WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Detalle_Venta WHERE id = ?", [id]);
  }

  static fetchAll(venta_id) {
    const query = `SELECT d.id, d.producto_id, d.venta_id, d.cantidad, d.precio, d.subtotal, v.codigo, p.nombre, p.url
    FROM Detalle_Venta d
    INNER JOIN Producto p ON p.id = d.producto_id
    INNER JOIN Venta v ON v.id = d.venta_id      
    WHERE d.venta_id = ?`;
    const params = [venta_id];
    return db.execute(query, params);
  }
};
