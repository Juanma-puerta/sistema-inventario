import { Router } from 'express';
import { obtenerProductos } from '../controllers/productos.controller.js';
import { crearProductos } from '../controllers/productos.controller.js';
import { modificarProducto } from '../controllers/productos.controller.js';
import { obtenerProductoPorID } from '../controllers/productos.controller.js';
import { eliminarProducto } from '../controllers/productos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProductoPorID);
router.post('/productos', verificarToken, crearProductos);
router.put('/productos/:id' ,verificarToken, modificarProducto);
router.delete('/productos/:id', verificarToken ,eliminarProducto);

export default router;
