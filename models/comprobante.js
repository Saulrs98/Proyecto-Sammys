const db = require("../util/database");

module.exports = class Comprobante {
  constructor(id, url, venta_id) {
    this.id = id;
    this.url = url;
    this.venta_id = venta_id;
  }

  save() {
    const query = "INSERT INTO Comprobante (url, venta_id) VALUES(?, ?)";
    const params = [this.url, this.venta_id];
    return db.execute(query, params);
  }

  static fetchAll(venta_id) {
    const query = `SELECT * FROM Comprobante WHERE venta_id = ?`;
    const params = [venta_id];
    return db.execute(query, params);
  }
};
