const db = require("../util/database");

module.exports = class Cuenta {
  constructor(id, numero_cuenta, nombre_titular) {
    this.id = id;
    this.numero_cuenta = numero_cuenta;
    this.nombre_titular = nombre_titular;
  }

  save() {
    const query = "INSERT INTO Cuentas (numero_cuenta, nombre_titular) VALUES(?, ?)";
    return db.execute(query, [this.numero_cuenta, this.nombre_titular]);
  }

  update() {
    const query = "UPDATE Cuentas SET numero_cuenta = ?, nombre_titular = ? WHERE id = ?";
    return db.execute(query, [this.numero_cuenta, this.nombre_titular, this.id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM Cuentas WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Cuentas WHERE id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM Cuentas");
  }
};
