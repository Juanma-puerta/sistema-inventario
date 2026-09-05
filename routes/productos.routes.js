import { Router } from 'express';
import { obtenerProductos } from '../controllers/productos.controller.js';
import { crearProductos } from '../controllers/productos.controller.js';
import { modificarProducto } from '../controllers/productos.controller.js';
import { obtenerProductoPorID } from '../controllers/productos.controller.js';
import { eliminarProducto } from '../controllers/productos.controller.js';

const router = Router();

router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProductoPorID);
router.post('/productos', crearProductos);
router.put('/productos/:id' ,modificarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;
