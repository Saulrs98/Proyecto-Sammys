const isAuth = require('../is-auth');
const bodyParser = require('body-parser');
const { Router }= require('express');

const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController');
const rolController = require('../controllers/rolController');
const categoriaController = require('../controllers/categoriaController');
const productoController = require('../controllers/productoController');
const cuentaController = require('../controllers/cuentaController');
const clienteController = require('../controllers/clienteController');
const carritoController = require('../controllers/carritoController');
const ventaController = require('../controllers/ventaController');
const direccionController = require('../controllers/direccionController');
const comprobanteController = require('../controllers/comprobanteController');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

/* Cliente */
router.get('', clienteController.catalogo);
router.get('/catalogo', clienteController.catalogo);

/* Carrito */
router.get('/add-carrito', isAuth, carritoController.add);
router.get('/carrito', isAuth, carritoController.list);
router.get('/delete-carrito', isAuth, carritoController.delete);
router.post('/venta', isAuth, carritoController.venta);

/*Home */
router.get('/home', isAuth, homeController.home);

/** Auth */
router.get('/login', homeController.login);
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
router.get('/perfil', isAuth, usuarioController.perfil);

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
router.get('/pago', isAuth, cuentaController.listByPago);
router.get('/cuenta/list', isAuth, cuentaController.list);
router.get('/cuenta/add', isAuth, cuentaController.add);
router.get('/cuenta/edit', isAuth, cuentaController.edit);
router.get('/cuenta/delete', isAuth, cuentaController.delete);
router.post('/cuenta/save', isAuth, cuentaController.save);
router.post('/cuenta/update', isAuth, cuentaController.update);

/* Venta */
router.get('/venta/list', isAuth, ventaController.list);
router.get('/venta/aprobar', isAuth, ventaController.aprobar);
router.get('/venta/view', isAuth, ventaController.view);
router.get('/mis-compras', isAuth, ventaController.misCompras);
router.get('/detalle-compra', isAuth, ventaController.detalleCompra);

/* Direccion */
router.get('/direccion-list', isAuth, direccionController.list);
router.get('/direccion-add', isAuth, direccionController.add);
router.get('/direccion-delete', isAuth, direccionController.delete);
router.post('/direccion-save', isAuth, direccionController.save);

/* Comprobante */
router.post('/pago', isAuth, comprobanteController.pago);

router.use(homeController.error404);





module.exports = router;