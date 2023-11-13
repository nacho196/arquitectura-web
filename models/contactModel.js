const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  email: String,
  sector: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;



