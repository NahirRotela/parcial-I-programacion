const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');
const {
    getTasks,
    getTaskById,
    postTasks,
    putTasks,
    deleteTasks
} = require('../controllers/task.controllers')

/* ----------- GET ----------- */

// Ver las tareas creadas
router.get('/tasks', [validarJWT], getTasks);

// Ver una sola tarea: Por ID
router.get('/task/:taskId', [validarJWT], getTaskById);

/* ----------- POST ----------- */

// Crear una tarea:
router.post('/tasks', [validarJWT], postTasks);

/* ----------- PUT ----------- */

// Actualizar una tarea:
router.put('/tasks/:taskId', [validarJWT], putTasks);

/* ----------- DELETE ----------- */

// Eliminar una tarea:
router.delete('/tasks/:taskId', [validarJWT], deleteTasks);

module.exports = router;