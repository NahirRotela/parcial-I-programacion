require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const db = async () =>{
	await mongoose.connect(URI_MONGODB)
		.then(() => {
			console.log('Conectado a la Base de Datos');
		})
		.catch(error => {
			console.log('Error al conectar la Base de Datos');
			console.log(error);
		})

}

const PORT = process.env.PORT;
const URI_MONGODB = process.env.URI_MONGODB;
const app = express();
db()


const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes')

app.use(express.json());

// Rutas:

app.use(userRoutes);
app.use(authRoutes);
app.use(taskRoutes);



app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
