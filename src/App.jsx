import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import "./styles/App.css";
import deleteSoundFile from '../assets/sounds/delete.mp3';
const deleteSound = new Audio(deleteSoundFile); 
import editSoundFile from '../assets/sounds/edit.mp3';
const editSound = new Audio(editSoundFile);

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadContacts = async () => {
  try {
    const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts');
    const data = await res.json();
    console.log('Contactos cargados:', data); // 👈 para confirmar
    setContacts(data);
  } catch (error) {
    console.error('Error cargando contactos:', error);
  }
};
useEffect(() => {
    loadContacts();
  }, []);

const showSuccess = (msg) => {
  setSuccessMessage(msg);
  setErrorMessage('');
  setTimeout(() => setSuccessMessage(''), 3000);
};

const showError = (msg) => {
  setErrorMessage(msg);
  setSuccessMessage('');
  setTimeout(() => setErrorMessage(''), 3000);
};


const handleAdd = async (newContact) => {
  try {
    const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    });

    if (!res.ok) {
      throw new Error('Error al guardar el contacto');
    }

    const savedContact = await res.json();
    console.log('Respuesta del backend:', savedContact);
    loadContacts();
    // // 🕒 Esperar 1 segundo antes de recargar la lista
    // setTimeout(() => {
    //   loadContacts(); // 🔁 Recarga toda la lista después de 1 seg
    // }, 1000);
    showSuccess('¡Contacto guardado con éxito!');
  
  } catch (err) {
    showError('No se pudo editar el contacto');
  }
};

const handleDelete = async (id) => {
  if (!window.confirm('¿Seguro que deseas eliminar este contacto?')) return;
  try {
    const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al eliminar');
    }
    
    // setContacts(prev => prev.filter(contact => contact._id !== id));
    showSuccess(data.message || 'Contacto eliminado con éxito');
    deleteSound.play();
    await loadContacts(); // 🔄 Actualiza la lista
    
  } catch (err) {
    showError(err.message ||'No se pudo eliminar el contacto.');
  }
};

const handleEdit = async (contact) => {
  const newName = prompt('Nuevo nombre:', contact.name);
  const newEmail = prompt('Nuevo email:', contact.email);
  const newAddress = prompt('Nueva dirección:', contact.address);

  if (!newName || !newEmail || !newAddress) return;
  const updatedData = {
    ...contact,
    name: newName.trim(),
    email: newEmail.trim(),
    address: newAddress.trim(),
  };
  try {
    const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${contact._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al actualizar');
    }
    
    editSound.play();
    showSuccess(data.message || 'Contacto actualizado con éxito');
    await loadContacts(); // 🔄 Actualiza la lista
    } catch (err) {
    showError(err.message ||'No se pudo editar el contacto.');
    }
};


  return (
    <div className="container">
      <h1 className="title">Gestión de contactos</h1>
      
      <div className={`message success-message ${successMessage ? 'show' : ''}`}>
      {successMessage}
      </div>
      <div className={`message error-message ${errorMessage ? 'show' : ''}`}>
        {errorMessage}
      </div>
      <ContactForm onAdd={handleAdd} />
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}






