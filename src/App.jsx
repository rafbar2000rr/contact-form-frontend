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
  try {
    const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error('Error al eliminar el contacto');
    }
    deleteSound.play();
    setContacts(prev => prev.filter(contact => contact._id !== id));
    setSuccessMessage('Contacto eliminado con éxito');
    setErrorMessage('');

    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setErrorMessage('No se pudo eliminar el contacto.');
    setSuccessMessage('');
    
    setTimeout(() => setErrorMessage(''), 3000);
  }
};

  
const handleEdit = async (contact) => {
  const newName = prompt('Nuevo nombre:', contact.name);
  if (!newName || newName.trim() === '') return;

  const updated = { ...contact, name: newName.trim() };

  try {
    const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${contact._id}`, {


      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    if (!res.ok) {
      throw new Error('Error al editar el contacto');
    }

    const data = await res.json();

    setContacts(prev => prev.map(c => c._id === contact._id ? data : c));
    setSuccessMessage('Contacto editado con éxito');
    setErrorMessage('');

    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setErrorMessage('No se pudo editar el contacto.');
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
      <ContactForm/>
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}





// import React, { useEffect, useState } from 'react';
// import ContactList from './components/ContactList';
// import ContactForm from './components/ContactForm';

// function App() {
//   const [contacts, setContacts] = useState([]);

//   const fetchContacts = async () => {
//     try {
//       const response = await fetch('https://formulario-contacto-backend.onrender.com/api/contacts');
//       const data = await response.json();
//       setContacts(data);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const handleAdd = async (contact) => {
//     try {
//       const response = await fetch('https://formulario-contacto-backend.onrender.com/api/contacts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(contact)
//       });

//       if (response.ok) {
//         fetchContacts(); // Recarga la lista
//       } else {
//         console.error('Error adding contact');
//       }
//     } catch (error) {
//       console.error('Error adding contact:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`https://formulario-contacto-backend.onrender.com/api/contacts/${id}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         fetchContacts(); // Recarga la lista
//       } else {
//         console.error('Error deleting contact');
//       }
//     } catch (error) {
//       console.error('Error deleting contact:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Contact Form</h1>
//       <ContactForm onAdd={handleAdd} />
//       <ContactList contacts={contacts} onDelete={handleDelete} />
//     </div>
//   );
// }

// export default App;




