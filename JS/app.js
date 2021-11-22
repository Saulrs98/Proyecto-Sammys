const express = require('express');
const router = require('./routes/route');
const csrf = require('csurf');

const path = require('path');
const session = require('express-session');

const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        callback(null, new Date().getMilliseconds() + '-' + file.originalname);
    },
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype == 'image/png' ||
        file.mimetype == 'image/PNG' ||  
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ) {
            callback(null, true);
    } else {
            callback(null, false);
    }
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'kJSDLKJshdflMOEWCD03DIDAPI3WDPpoijp98jpjjkiojp0LKSD0knlnl', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(router); 

app.listen(3000);
