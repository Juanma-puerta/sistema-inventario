import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const crearProductoService = async (datosProducto) => {
    datosProducto.id = uuidv4();
    const valores = [
        datosProducto.id,
        datosProducto.nombre,
        datosProducto.precio,
        datosProducto.stock
    ];
    const instruccionSQL = 'INSERT INTO productos (id, nombre,precio, stock ) VALUES ($1, $2, $3, $4) RETURNING *';
    const resultado = await pool.query(instruccionSQL, valores);
    return resultado.rows[0];

};

export const obtenerProductosService = async () =>{
    const resultado = await pool.query('SELECT * FROM productos');
    return resultado.rows;
};

export const obtenerProductoPorIDService = async (id) =>{

    const consultaSQL = 'SELECT * FROM productos WHERE id = $1';
    const resultado = await pool.query(consultaSQL, [id]);
    return resultado.rows[0];

};

export const eliminarProductoService = async (id) =>{
    const consultaSQL = 'DELETE FROM productos WHERE id= $1';
    const resultado= await pool.query(consultaSQL,[id]);
    return resultado.rows[0];
};

export const modificarProductoService = async (id, datosNuevos) =>{
    const valores = [
        datosNuevos.precio,
        datosNuevos.stock,
        id
    ];
    const consultaSQL= 'UPDATE productos SET precio= $1, stock= $2 WHERE id= $3 RETURNING *';
    const resultado = await pool.query(consultaSQL,valores);
    return resultado.rows[0];
};