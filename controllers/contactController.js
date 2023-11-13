const Contact = require('../models/contactModel');
const mongoose = require('mongoose');

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function checkContactExists(id) {
  try {
    const existingContact = await Contact.findById(id);
    return !!existingContact;
  } catch (error) {
    //console.error('entrooo checkContactExists', error);
    return false;
  }
}

// Obtener todos los contactos y sumo por querystring
exports.getContacts = async (req, res) => {
  try {
    const { nombre, sector } = req.query;
    let query = {};

    if (nombre) {
      // Agrego la busqueda por nombre
      query.nombre = new RegExp(nombre, 'i');
    }

    if (sector) {
      // Agrego la busqueda por sector
      query.sector = new RegExp(sector, 'i');
    }

    const contacts = await Contact.find(query);
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    res.status(200).json({ message: 'Contactos obtenidos exitosamente', contacts });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los contactos', error: error.message });
  }
};

// Obtener contacto por ID
exports.getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Verifico si el _id tiene el formato correcto
    if (!validateId(contactId)) {
      return res.status(400).json({ message: 'Formato de _id no válido' });
    }

    // Verifico si el _id existe 
    if (!(await checkContactExists(contactId))) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    const contact = await Contact.findById(contactId);

    res.status(200).json({ message: 'Contacto encontrado', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contacto', error: error.message });
  }
};

// Obtengo un contacto por numero
exports.getContactByPhone = async (req, res) => {
  try {
    const { telefono  } = req.params;
    const regexTelefono = new RegExp(telefono, 'i');
    const contact = await Contact.findOne({telefono: regexTelefono});

    if (!contact) {
      return res.status(404).json({ message: 'telefono no encontrado' });
    }
    res.status(200).json({ message: 'telefono obtenido exitosamente', contact });
  } catch (error) {    
    res.status(500).json({ message: 'Error al obtener el telefono', error: error.message });
  }
};


//crear contacto
exports.createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({message: 'Contacto creado exitosamente',newContact});
  } catch (error) {
    //console.error(error); 
      res.status(500).json({ message: 'Error al crear el contacto' });    
  }
};

// Elimino  contacto por id
exports.deleteContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Verifico si el _id tiene el formato correcto
    if (!validateId(contactId)) {
      return res.status(400).json({ message: 'Formato de id no válido' });
    }

    // Verifico si el _id existe antes de intentar la eliminación
    if (!(await checkContactExists(contactId))) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    const deletedContact = await Contact.findOneAndDelete({ _id: contactId });

    res.status(200).json({ message: 'Contacto eliminado exitosamente', deletedContact });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el contacto', error: error.message });
  }
};

// Modifico un contacto por su id
exports.updateContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!validateId(contactId)) {
      return res.status(400).json({ message: 'Formato de id no válido' });
    }

    // Verifico si el _id existe antes de intentar la actualización
    if (!(await checkContactExists(contactId))) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true } // Devuelvo el contacto modificado
    );

    res.status(200).json({ message: 'Contacto actualizado exitosamente', updatedContact });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el contacto', error: error.message });
  }
};

// Actualizar parcialmente un contacto por su ID
exports.updateContactPartial = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!validateId(contactId)) {
      return res.status(400).json({ message: 'Formato de id no válido' });
    }

    // Verificar si el id existe 
    if (!(await checkContactExists(contactId))) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    const updateFields = req.body;

    // Valido que solo se permita telefono y sector
    const allowedFields = ['telefono', 'sector'];
    const isValidOperation = Object.keys(updateFields).every((field) =>
      allowedFields.includes(field)
    );

    if (!isValidOperation) {
      return res.status(403).json({ message: 'Operación no válida. Solo se permite actualizar los campos telefono o sector.' });
    }

    const contact = await Contact.findByIdAndUpdate(contactId, { $set: updateFields }, { new: true });

    res.status(200).json({ message: 'Contacto actualizado parcialmente', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el contacto', error: error.message });
  }
};




