const db = require("../util/database");

module.exports = class Empleado {
  constructor(codigo, nombres, apellidos) {
    this.codigo = codigo;
    this.nombres = nombres;
    this.apellidos = apellidos;
  }

  save() {
    db.execute('INSERT INTO Empleado (nombres, apellidos) VALUES(?, ?)', [
      this.nombres,
      this.apellidos,
    ]);
  }

  update() {
    db.execute(
      'UPDATE Empleado SET nombres = ?, apellidos = ? WHERE codigo = ?',
      [this.nombres, this.apellidos, this.codigo]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM Empleado WHERE codigo = ?', [id]);
  }

  static search(id) {
    return db.execute('SELECT * FROM empleado WHERE codigo = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM empleado');
  }
};
