const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const { getUsers,
    postUser, 
    putUser,
    deleteUser,
    } = require('../controllers/user.controllers');

/* ----------- GET ----------- */

// Conseguir datos del usuario loggeado
router.get('/user',[validarJWT], getUsers);

/* ----------- POST ----------- */

// Agregar un usuario
router.post('/user',[], postUser);

// Editar usuario, requiere ID de usuario
router.put('/putUser/:id' , putUser);

// Eliminar usuario, requiere ID de usuario
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;