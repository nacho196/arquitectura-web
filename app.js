const express = require('express');
const mongoose = require('mongoose');
const contactController = require('./controllers/contactController');

const app = express();
const PORT = 3000;

// pruebo MongoDB
mongoose.connect('mongodb://localhost/agenda');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Middleware para generar un onjeto JSON si hay body (PUT, POST)
app.use(express.json());

// Rutas
app.get('/v1/contactos', contactController.getContacts); //obtener todos los contactos
app.get('/v1/contactos/:id', contactController.getContactById); //obtener un contacto por ID
app.post('/v1/contactos', contactController.createContact);  //crear un contacto
app.delete('/v1/contactos/:id', contactController.deleteContactById); //borrar un contacto por ID
app.put('/v1/contactos/:id', contactController.updateContactById); //actualizar un contacto de un ID particular
app.get('/v1/contactos/telefonos/:telefono', contactController.getContactByPhone); //obtener todos los contactos por el telefono
app.patch('/v1/contactos/:id', contactController.updateContactPartial); //actualizar parcialmente un contacto de un ID particular

//Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de otros errores
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
