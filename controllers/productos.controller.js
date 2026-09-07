import { crearProductoService, modificarProductoService } from "../services/productos.service.js";
import { obtenerProductosService } from "../services/productos.service.js";
import { obtenerProductoPorIDService } from "../services/productos.service.js";
import { eliminarProductoService } from "../services/productos.service.js";



export const obtenerProductos = async (req,res, next)=>{
    try{
        res.status(200).json(await obtenerProductosService());
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
        const productoGuardado = await crearProductoService(nuevoProducto);
        res.status(201).json(productoGuardado);
    }catch(error){
        next(error);
    };

};

export const obtenerProductoPorID = async (req, res, next)=>{
     try{
        const idBuscado = req.params.id;
        const resultado = await obtenerProductoPorIDService(idBuscado);
        if(!resultado){
            res.status(404).json("error: Producto no encontrado");

        }else{
            res.status(200).json(resultado);
        };

    }catch(error){
        next(error);

    };

};

export const eliminarProducto = async (req,res, next)=>{
     try{
        const idBuscado = req.params.id;
        const resultado = eliminarProductoService(idBuscado);
        if(!resultado){
            res.status(404).json("Error: no se ha encontrado un producto")
        }else{
            res.status(200).json("El producto ha sido eliminado correctamente")
        };
    }catch(error){
        next(error);
    };

};

export const modificarProducto = async (req,res,next)=>{
     try{
        const idBuscado = req.params.id;
        const datosNuevos = req.body;
        const resultado = await modificarProductoService(idBuscado,datosNuevos);
        if(!resultado){
            res.status(404).json("error: Producto no encontrado");
        }else{
            res.status(200).json(resultado);
        };
    }catch(error){
        next(error);
    };

};