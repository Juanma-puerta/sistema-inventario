import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res, next) =>{
    try{
        const nuevoUsuario = req.body;
        nuevoUsuario.id = uuidv4();
        const passwordHasheada = await bcrypt.hash(nuevoUsuario.password, 10);
        const valoresUsuario = [
            nuevoUsuario.id,
            nuevoUsuario.nombre,
            nuevoUsuario.email,
            passwordHasheada
        ];
        const instruccionSQL = 'INSERT INTO usuarios (id, nombre,email, password ) VALUES ($1, $2, $3, $4) RETURNING *';
        const resultado = await pool.query(instruccionSQL, valoresUsuario);
        res.status(201).json("Subida de datos exitosa!!");
        
    }catch(error){
        next(error);
    };
}
 
export const loginUsuario = async (req, res, next) =>{
    try{
       const {email, password} = req.body;

       const instruccionSQL = 'SELECT * FROM usuarios WHERE email= $1';
       const consultaSQL= await pool.query(instruccionSQL, [email]);
       if(consultaSQL.rowCount === 0){
        res.status(400).json("Error: Credenciales incorrectas");
       }else{
        const datosUsuario = consultaSQL.rows[0];
        const compararPassword = await bcrypt.compare(password,datosUsuario.password);
        if(compararPassword){
            delete datosUsuario.password;
            const token = jwt.sign(
                {id: datosUsuario.id, rol: datosUsuario.rol}, //PAYLOAD
                process.env.JWT_SECRET, //PALABRA OCULTA JWT_SECRET
                {expiresIn: '2h'});
            res.status(200).json({mensaje:"Login exitoso!", usuario:datosUsuario, token:token});
    

        }else{
            res.status(400).json("Error: Credenciales incorrectas");
        };
       }

    }catch(error){
        next(error);
    };

}