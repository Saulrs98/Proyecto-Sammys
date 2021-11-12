const express = require('express');
const router = require('./routes/route');
const csrf = require('csurf');

const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public/')));

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));
/*
const csrfProtection = csrf();
app.use(csrfProtection); 

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});
*/

app.use(router); 

app.listen(3000);
