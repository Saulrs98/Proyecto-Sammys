const isAuth = require('../is-auth');
const bodyParser = require('body-parser');
const { Router }= require('express');

const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController');
const rolController = require('../controllers/rolController');
const categoriaController = require('../controllers/categoriaController');
const productoController = require('../controllers/productoController');
const cuentaController = require('../controllers/cuentaController');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('', isAuth, homeController.home);

/** Auth */
router.get('/login', homeController.index);
router.get('/logout', homeController.logout);

router.get('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.saveRegister);

/* Usuario */
router.get('/usuario/add', isAuth, usuarioController.add);
router.get('/usuario/edit', isAuth, usuarioController.edit);
router.post('/usuario/save', usuarioController.save);
router.post('/usuario/update', usuarioController.update);
router.get('/usuario/list', isAuth, usuarioController.list);
router.get('/usuario/delete', isAuth, usuarioController.delete);

/* Rol */
router.get('/rol/list', isAuth, rolController.list);
router.get('/rol/add', isAuth, rolController.add);
router.get('/rol/edit', isAuth, rolController.edit);
router.get('/rol/delete', isAuth, rolController.delete);
router.post('/rol/save', isAuth, rolController.save);
router.post('/rol/update', isAuth, rolController.update);

/* Categoria */
router.get('/categoria/list', isAuth, categoriaController.list);
router.get('/categoria/add', isAuth, categoriaController.add);
router.get('/categoria/edit', isAuth, categoriaController.edit);
router.get('/categoria/delete', isAuth, categoriaController.delete);
router.post('/categoria/save', isAuth, categoriaController.save);
router.post('/categoria/update', isAuth, categoriaController.update);

/* Producto */
router.get('/producto/list', isAuth, productoController.list);
router.get('/producto/add', isAuth, productoController.add);
router.get('/producto/edit', isAuth, productoController.edit);
router.get('/producto/delete', isAuth, productoController.delete);
router.post('/producto/save', isAuth, productoController.save);
router.post('/producto/update', isAuth, productoController.update);

/* Cuenta */
router.get('/cuenta/list', isAuth, cuentaController.list);
router.get('/cuenta/add', isAuth, cuentaController.add);
router.get('/cuenta/edit', isAuth, cuentaController.edit);
router.get('/cuenta/delete', isAuth, cuentaController.delete);
router.post('/cuenta/save', isAuth, cuentaController.save);
router.post('/cuenta/update', isAuth, cuentaController.update);

router.use(homeController.error404);

module.exports = router;