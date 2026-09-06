import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    // 1. Buscamos el token en la cabecera (Header) de autorización
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: "Acceso denegado. No hay token." });
    }

    // La convención es enviar el token así: "Bearer xxxxx.yyyyy.zzzzz"
    // Usamos split para separar la palabra "Bearer" y quedarnos con el token real
    const token = authHeader.split(" ")[1];

    try {
        // 2. Intentamos verificar el token usando nuestro secreto
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Si es válido, guardamos los datos del usuario en la petición y lo dejamos pasar
        req.usuarioLogueado = payload; 
        next(); 
    } catch (error) {
        // Si la verificación matemática falla (o expiró), atrapamos el error
        res.status(403).json({ error: "El token es inválido o ha expirado." });
    }
};