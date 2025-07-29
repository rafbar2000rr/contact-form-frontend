import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import "./styles/App.css";
import deleteSoundFile from '../assets/sounds/delete.mp3';
const deleteSound = new Audio(deleteSoundFile); // ruta si está en public


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

    // 🕒 Esperar 1 segundo antes de recargar la lista
    setTimeout(() => {
      loadContacts(); // 🔁 Recarga toda la lista después de 1 seg
    }, 1000);

    setSuccessMessage('¡Contacto guardado con éxito!');
    setErrorMessage('');

    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setErrorMessage('No se pudo guardar el contacto. Inténtalo de nuevo.');
    setSuccessMessage('');

    setTimeout(() => setErrorMessage(''), 3000);
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
    deleteSound.play();
    // setContacts(prev => prev.filter(contact => contact._id !== id));
    setSuccessMessage(data.message || 'Contacto eliminado con éxito');
    setErrorMessage('');
    await loadContacts(); // 🔄 Actualiza la lista
    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setErrorMessage(err.message ||'No se pudo eliminar el contacto.');
    setSuccessMessage('');
    
    setTimeout(() => setErrorMessage(''), 3000);
  }
};

  
const handleEdit = async (contact) => {
  const newName = prompt('Nuevo nombre:', contact.name);
  const newEmail = prompt('Nuevo email:', contact.email);
  const newAddress = prompt('Nueva dirección:', contact.address);

  // if (!newName || newName.trim() === '') return;
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
    // setContacts(prev => prev.map(c => c._id === contact._id ? data : c));
    const data = await res.json();
    
     if (!res.ok) {
      throw new Error(data.error || 'Error al actualizar');
    }
    
    editSound.play();
    setSuccessMessage(data.message ||'Contacto actualizado con éxito');
    setErrorMessage('');
    await loadContacts(); // 🔄 Actualiza la lista
    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setErrorMessage(err.message || 'No se pudo editar el contacto.');
    setSuccessMessage('');

    setTimeout(() => setErrorMessage(''), 3000);
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






