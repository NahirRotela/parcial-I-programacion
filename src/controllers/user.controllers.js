const User = require("../models/user");

const {encriptarPassword} = require ('../helpers/password');
const user = require("../models/user");

ctrlUser = {};

// Controlador para obtener todos los usuarios de la Base de Datos.
ctrlUser.getUsers = async (req, res) => {
    // Se consultan todos los documentos de la base de datos.
    const users = await User.find();

    // Se devuelve al cliente un arreglo con los datos de los usuarios.
    return res.json(users)
};

// Controlador para crear nuevo usuario en la Base de Datos.
ctrlUser.postUser = async (req, res) => {
    // Se obtienen los datos enviados por método POST
    const { username, password, email } = req.body;

    const passwordEncriptada =  encriptarPassword(password);
    // Se instancia un nuevo documento de MongoDB para luego ser guardado
    const newUser = new User({
        username,
        password: passwordEncriptada,
        email
    });

    // Se almacena en la base de datos con método asícrono .save()
    try{
        const savedUser = await newUser.save();
        console.log(savedUser)
        //const savedUse = await user.findOne({email}); 
    
        return res.json({
            message: 'Usuario creado correctamente', 
            savedUser
        });
    } catch (error) {
        return res.json({
            message: 'No fue posible cargar al usuario',
            error
        });
    }
    
};



ctrlUser.putUser = async (req, res) => {
    const id = req.params.id;
    
    const { username,password,email, ... otroDatos} = req.body;
    
    if (!id) {
        return res.status(400).json({
            msg: 'No viene Id en la peticion'
        });
    };
    const userUpdate ={}

    if (username){
        userUpdate.username = username;
    }

    if (password){
        userUpdate.password = password;
    }

    if (email){
        userUpdate.email = email
    }

    try{

        const usuario = await User.findByIdAndUpdate(id,userUpdate )
        console.log(usuario)
        return res.json({
            msg: 'Usuario actualizado correctamente'
        })
    

    } catch (error){
    console.log(error.message);
    return res.status(500).json({
        msg: 'Error al actualizar el usuario'
    })
    };

    
};


ctrlUser.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndUpdate(id, { isActive: false })
        return res.json('Usuario eliminado correctamente');
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            msg: 'Error al eliminar el usuario'
        });
    }
};



module.exports = ctrlUser;