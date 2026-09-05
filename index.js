import 'dotenv/config';
import pool from './db.js';
// 1. Importamos la herramienta
import express from 'express';
import rutasProductos from './routes/productos.routes.js'


// 2. Creamos la aplicación (el servidor)
const app = express();
app.use(express.json());
app.use(rutasProductos);
app.use((err, req, res, next) =>{
    console.error("Error en el servidor", err);
    res.status(500).json("Error interno: estamos trabajando para solucionarlo.");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 3000 🚀");
});