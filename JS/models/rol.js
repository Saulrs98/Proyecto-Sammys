const db = require("../util/database");

module.exports = class Rol {
  constructor(id, role) {
    this.id = id;
    this.role = role;
  }

  save() {
    const query = "INSERT INTO Rol (role) VALUES(?)";
    return db.execute(query, [this.role]);
  }

  update() {
    const query = "UPDATE Rol SET role = ? " + "WHERE id = ?";
    return db.execute(query, [this.role, this.id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM Rol WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM Rol WHERE id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM Rol");
  }
};
