const Task = require("../models/task");

const ctrlTask = {};


ctrlTask.getTasks = async (req, res) => {
    const userId = req.user._id;
    const tasks = await Task.find({userId, isActive: true });


    if (!tasks) {
        return res.status(400).json({
            message: 'No se encontraron tareas para el usuario.'
        });
    }

    return res.json({
        message: 'Tareas encontradas.',
        tasks
    });
};


ctrlTask.getTaskById = async (req, res) => {
    const id = req.params.taskId;
    const userId = req.user._id;

    const task = await Task.find({ _id: id, userId, isActive: true });

    if (!task || task.length === 0) {
        return res.status(400).json({
            message: 'No se encontró o no se puede acceder a la tarea.'
        });
    }

    return res.json({
        message: 'Tarea encontrada.',
        task
    });
}

ctrlTask.postTasks = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;

    // Instanciar una nueva tarea
    const nuevaTarea = new Task({
        title,
        description,
        userId
    });

    
        // Guardar tarea en la base de datos
        const task = await nuevaTarea.save();
        return res.json({
            message:'Tarea guardada con éxito',
            task});
}



ctrlTask.putTasks = async (req, res) => {
    const id = req.params.taskId;
    const userId = req.user._id;
    const {title, description, ... otroDatos} = req.body;
    
    const filter = {_id: id,userId, isActive: true }
    const update = {}
 console.log(filter)
    if (title){
        update.title = title;
    }


    if (description){
        update.description = description;
    }



const taskUpdate = await Task.findOneAndUpdate(filter,update);

    if (!taskUpdate) {
        return res.status(400).json({
            msg: 'No fue posible actualizar la tarea'
        });
    };

    try{
    const tareaActualizada = await Task.findById(id)

    return res.json({
        msg: 'Tarea actualizada correctamente'
    })

} 
    catch (error){
    console.log(error.message);
    return res.status(500).json({
        msg: 'Error al actualizar la tarea',
        
    })
    };

    
};


//CONTROLADOR DE ELIMINACION (LOGICA)
ctrlTask.deleteTasks = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    const filter = {_id: id,userId}
    const update =  {isActive: false}

    const taskUpdate = await Task.findOneAndUpdate(filter,update);

    if (!taskUpdate) {
        return res.status(400).json({
            message: 'No fue posible eliminar la tarea.'
        });
    }

    return res.json({
        message: 'Tarea eliminada correctamente.'
    });
}


module.exports = ctrlTask;


