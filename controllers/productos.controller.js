import pool from "../db.js";
import {v4 as uuidv4} from 'uuid';

export const obtenerProductos = async (req,res)=>{
    try{
        const resultado = await pool.query('SELECT * FROM productos');
        res.status(200).json(resultado.rows);
    }catch(error){
        next(error);
    }

};

export const crearProductos = async (req,res, next)=> {
    try{
        const nuevoProducto = req.body;
        

        if (!nuevoProducto.nombre || typeof nuevoProducto.nombre !== 'string' ){
            return res.status(400).json("Debe introducir un nombre valido, realice el proceso nuevamente");
        };

        if (typeof nuevoProducto.precio === 'number' ){
            if(nuevoProducto.precio<= 0){
               return res.status(400).json("El precio del producto debe ser mayor a cero.");
            };

        }else{
            return res.status(400).json("El tipo de dato del precio es incorrecto. Por favor introduzca un número");
        };
        if (typeof nuevoProducto.stock === 'number' ){
            if(nuevoProducto.stock< 0){
               return res.status(400).json("El stock del producto debe ser igual o mayor a cero.");
            };

        }else{
            return res.status(400).json("El tipo de dato es incorrecto. Por favor introduzca un número");
        };

        nuevoProducto.id = uuidv4();

        const valores =[
            nuevoProducto.id,
            nuevoProducto.nombre,
            nuevoProducto.precio,
            nuevoProducto.stock
        ]; 
        const instruccionSQL = 'INSERT INTO productos (id, nombre,precio, stock ) VALUES ($1, $2, $3, $4) RETURNING *';
        const resultado = await pool.query(instruccionSQL, valores);
        res.status(201).json(resultado.rows[0]);
    }catch(error){
        next(error);
    };

};

export const obtenerProductoPorID = async (req, res)=>{
     try{
        const idBuscado = req.params.id;
        const valor = [idBuscado];
        const consultaSQL = 'SELECT * FROM productos WHERE id = $1';
        const resultado = await pool.query(consultaSQL, valor);
        if(resultado.rowCount === 0){
            res.status(404).json("error: Producto no encontrado");

        }else{
            res.status(200).json(resultado.rows[0]);
        };

    }catch(error){
        next(error);

    };

};

export const eliminarProducto = async (req,res)=>{
     try{
        const idBuscado = req.params.id;
        const consultaSQL = 'DELETE FROM productos WHERE id= $1';
        const valor= [idBuscado];
        const resultado= await pool.query(consultaSQL,valor);
        if(resultado.rowCount === 0){
            res.status(404).json("Error: no se ha encontrado un producto")
        }else{
            res.status(200).json("El producto ha sido eliminado correctamente")
        };
    }catch(error){
        next(error);
    };

};

export const modificarProducto = async (req,res)=>{
     try{
        const idBuscado = req.params.id;
        const datosNuevos = req.body;
        const valores= [
            datosNuevos.precio,
            datosNuevos.stock,
            idBuscado
        ];
        const consultaSQL= 'UPDATE productos SET precio= $1, stock= $2 WHERE id= $3 RETURNING *';
        const resultado = await pool.query(consultaSQL,valores);
        if(resultado.rowCount === 0){
            res.status(404).json("error: Producto no encontrado");
        }else{
            res.status(200).json(resultado.rows[0]);
        };
    }catch(error){
        next(error);
    };

};