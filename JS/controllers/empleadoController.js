const Empleado = require('../models/empleado');



exports.list = (request, response, next) => {
    Empleado.fetchAll()
        .then(([empleados, fieldData]) => {
            response.render("empleado/list", {empleados: empleados});
        })
        .catch(err => console.log(err));
};

exports.add = (request, response, next) => {
    response.render("empleado/add");
};

exports.save = (request, response, next) => {
    const nombres = request.body.nombres;
    const apellidos = request.body.apellidos;

    const empleado = new Empleado(0, nombres, apellidos);
    empleado.save();
    
    request.session.contador = request.session.contador ? ++request.session.contador : 1
    response.redirect('/');
};

exports.edit = (request, response, next) => {
    const id = request.query.id;
    Empleado.search(id)
        .then(([empleados, fieldData]) => {
            if(empleados.length > 0){
                response.render("empleado/edit", {item: empleados[0]});
            }            
        })
        .catch(err => console.log(err));  
};

exports.update = (request, response, next) => {
    const nombres = request.body.nombres;
    const apellidos = request.body.apellidos;
    const codigo = request.body.codigo;

    const empleado = new Empleado(codigo, nombres, apellidos);
    empleado.update();
    
    response.redirect('/empleado/list'); 
};

exports.delete = (request, response, next) => {
    const id = request.query.id;
    Empleado.delete(id)
        .then(([result, fieldData]) => {
            if(result){
                response.redirect('/empleado/list');
            } 
        })
        .catch(err => console.log(err));  
};



exports.error404 = (request, response, next) => {
    response.status(404).render("404"); 
}

