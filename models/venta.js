const db = require("../util/database");

module.exports = class Venta {
  constructor(id, codigo, fecha, total, estado, usuario_id, direccion_id) {
    this.id = id;
    this.codigo = codigo;
    this.fecha = fecha;
    this.total = total;
    this.estado = estado;
    this.usuario_id = usuario_id;
    this.direccion_id = direccion_id
  }

  save() {
    const query = `INSERT INTO Venta (codigo, fecha, total, estado, usuario_id, direccion_id) 
    VALUES(?, ?, ?, ?, ?, ?)`;
    const params = [this.codigo, this.fecha, this.total, this.estado, this.usuario_id, this.direccion_id];
    return db.execute(query, params);
  }

  static delete(id) {
    return db.execute("DELETE FROM Venta WHERE id = ?", [id]);
  }

  static search(id) {
    const query = `SELECT v.id, v.codigo, date_format(v.fecha, '%Y-%m-%d') as fecha, v.total, v.estado, 
    v.usuario_id, u.nombres, u.apellidos, v.direccion_id, d.direccion_postal, d.ciudad, d.provincia, d.codigo_postal
    FROM Venta v
    INNER JOIN Usuario u ON u.id = v.usuario_id
    INNER JOIN Direccion d ON d.id = v.direccion_id
    WHERE v.id = ?
    ORDER BY v.fecha DESC`;
    const params = [id];
    return db.execute(query, params);
  }

  static searchByCodigo(codigo) {
    return db.execute("SELECT * FROM Venta WHERE codigo = ?", [codigo]);
  }

  static updateTotal(id, total){
    const query = `UPDATE Venta SET total = ?  WHERE id = ?`;
    const params = [total, id];
    return db.execute(query, params);
  }

  static aprobar(id){
    const query = `UPDATE Venta SET estado = 'Aprobado'  WHERE id = ?`;
    const params = [id];
    return db.execute(query, params);
  }

  static fetchAllByUsuario(usuario_id) {
    const query = `SELECT v.id, v.codigo, date_format(v.fecha, '%Y-%m-%d') as fecha, v.total, v.estado, 
    v.usuario_id, u.nombres, u.apellidos, v.direccion_id, d.direccion_postal, d.ciudad, d.provincia, d.codigo_postal
    FROM Venta v
    INNER JOIN Usuario u ON u.id = v.usuario_id
    INNER JOIN Direccion d ON d.id = v.direccion_id
    WHERE v.usuario_id = ? 
    ORDER BY v.fecha DESC`;
    const params = [usuario_id];
    return db.execute(query, params);
  }

  static fetchAll(filter) {
    const query = `SELECT v.id, v.codigo, date_format(v.fecha, '%Y-%m-%d') as fecha, v.total, v.estado, 
    v.usuario_id, u.nombres, u.apellidos, v.direccion_id, d.direccion_postal, d.ciudad, d.provincia, d.codigo_postal
    FROM Venta v
    INNER JOIN Usuario u ON u.id = v.usuario_id
    INNER JOIN Direccion d ON d.id = v.direccion_id
    WHERE v.fecha LIKE '` + filter + `%' 
    ORDER BY v.fecha DESC`;
    return db.execute(query);
  }
};
