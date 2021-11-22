const isAuth = require('../is-auth');
const bodyParser = require('body-parser');
const { Router }= require('express');

const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController');
const rolController = require('../controllers/rolController');
const categoriaController = require('../controllers/categoriaController');

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
router.post('/usuario/save', usuarioController.save);
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

router.use(homeController.error404);

module.exports = router;