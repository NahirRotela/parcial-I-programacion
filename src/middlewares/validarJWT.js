const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token en la petición'
        });
    };

    try {
        const { uid } = await jwt.verify(token, process.env.SECRET)
        const usuario = await User.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en BD'
            });
        }

        if (!usuario.isActive) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        req.user = usuario._doc;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validarJWT