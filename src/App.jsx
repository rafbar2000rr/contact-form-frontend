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


  // useEffect(() => {
  //   fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts')
  //     .then(res => res.json())
  //     .then(data => setContacts(data));
  // }, []);

  // const handleAdd = (newContact) => {
  //   setContacts(prev => [...prev, newContact]);
  // };

// const handleAdd = async (newContact) => {
//   try {
//     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newContact)
//     });

//     if (!res.ok) {
//       throw new Error('Error al guardar el contacto');
//     }

//     const savedContact = await res.json();
//     setContacts(prev => [...prev, savedContact]);
//     setSuccessMessage('¡Contacto guardado con éxito!');
//     setErrorMessage('');

//     setTimeout(() => setSuccessMessage(''), 3000);
//   } catch (err) {
//     setErrorMessage('No se pudo guardar el contacto. Inténtalo de nuevo.');
//     setSuccessMessage('');

//     setTimeout(() => setErrorMessage(''), 3000);
//   }
// };


// const handleAdd = async (e) => {
//   e.preventDefault();

//   if (!formData.name || !formData.email) return;

//   try {
//     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const savedContact = await res.json();
//     console.log('Respuesta del backend:', savedContact); // 👈 para depurar
//     loadContacts();
//     setFormData({ name: '', email: '' });
    
    // Espera medio segundo y recarga la lista
    // setTimeout(() => {
    //   loadContacts();
    // }, 500);

//   } catch (error) {
//     console.error('Error al guardar contacto:', error);
//   }
// };
// const handleAdd = async (formData) => {
//     await fetch('http://localhost:5000/contactos', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     // 👇 Volvemos a cargar los contactos después de agregar uno nuevo
//     await fetchContacts();
//   };
  
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
    const res = await fetch(`https://contact-form-backend-i5ma.onrender.comcdddd/api/contacts/${contact._id}`, {
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
    <div>
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

// import { useEffect, useState } from 'react';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';

// export default function App() {
//   const [contacts, setContacts] = useState([]);

//   // Cargar contactos desde el backend
//   const loadContacts = async () => {
//     const res = await fetch('https://contact-form-backend-.../contacts');
//     const data = await res.json();
//     setContacts(data);
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   // Agregar nuevo contacto y recargar la lista
//   const addContact = async (contact) => {
//     await fetch('https://contact-form-backend-.../contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(contact),
//     });
//     loadContacts(); // recargar contactos
//   };

//   const deleteContact = async (id) => {
//     await fetch(`https://contact-form-backend-.../contacts/${id}`, {
//       method: 'DELETE',
//     });
//     await loadContacts();
//   };

//   return (
//     <div>
//       <h1>Contactos</h1>
//       <ContactForm onAdd={addContact} />
//       <ContactList contacts={contacts} onDelete={deleteContact} />
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';
// import "./styles/App.css";
// import deleteSoundFile from '../assets/sounds/delete.mp3';
// const deleteSound = new Audio(deleteSoundFile); // ruta si está en public


// export default function App() {
//   const [contacts, setContacts] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const loadContacts = async () => {
//     const res = await fetch('https://contact-form-backend.onrender.com/contacts');
//     const data = await res.json();
//     setContacts(data);
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   // useEffect(() => {
//   //   fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts')
//   //     .then(res => res.json())
//   //     .then(data => setContacts(data));
//   // }, []);

//   // const handleAdd = (newContact) => {
//   //   setContacts(prev => [...prev, newContact]);
//   // };

// const handleAdd = async (newContact) => {
//   try {
//     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newContact)
//     });

//     if (!res.ok) {
//       throw new Error('Error al guardar el contacto');
//     }

//     const savedContact = await res.json();
//     setContacts(prev => [...prev, savedContact]);
//     setSuccessMessage('¡Contacto guardado con éxito!');
//     setErrorMessage('');

//     setTimeout(() => setSuccessMessage(''), 3000);
//   } catch (err) {
//     setErrorMessage('No se pudo guardar el contacto. Inténtalo de nuevo.');
//     setSuccessMessage('');

//     setTimeout(() => setErrorMessage(''), 3000);
//   }
// };


  
// const handleDelete = async (id) => {
//   try {
//     const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${id}`, {
//       method: 'DELETE'
//     });

//     if (!res.ok) {
//       throw new Error('Error al eliminar el contacto');
//     }
//     deleteSound.play();
//     setContacts(prev => prev.filter(contact => contact._id !== id));
//     setSuccessMessage('Contacto eliminado con éxito');
//     setErrorMessage('');

//     setTimeout(() => setSuccessMessage(''), 3000);
//   } catch (err) {
//     setErrorMessage('No se pudo eliminar el contacto.');
//     setSuccessMessage('');

//     setTimeout(() => setErrorMessage(''), 3000);
//   }
// };




  
// const handleEdit = async (contact) => {
//   const newName = prompt('Nuevo nombre:', contact.name);
//   if (!newName || newName.trim() === '') return;

//   const updated = { ...contact, name: newName.trim() };

//   try {
//     const res = await fetch(`https://contact-form-backend-i5ma.onrender.comcdddd/api/contacts/${contact._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updated)
//     });

//     if (!res.ok) {
//       throw new Error('Error al editar el contacto');
//     }

//     const data = await res.json();

//     setContacts(prev => prev.map(c => c._id === contact._id ? data : c));
//     setSuccessMessage('Contacto editado con éxito');
//     setErrorMessage('');

//     setTimeout(() => setSuccessMessage(''), 3000);
//   } catch (err) {
//     setErrorMessage('No se pudo editar el contacto.');
//     setSuccessMessage('');

//     setTimeout(() => setErrorMessage(''), 3000);
//   }
// };

//   return (
//     <div>
//       <h1 className="title">Gestión de contactos</h1>
      
//       <div className={`message success-message ${successMessage ? 'show' : ''}`}>
//       {successMessage}
//       </div>
//       <div className={`message error-message ${errorMessage ? 'show' : ''}`}>
//         {errorMessage}
//       </div>

//       <ContactForm onAdd={handleAdd} />
//       <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';

// export default function App() {
//   const [contacts, setContacts] = useState([]);

//   // Cargar contactos desde el backend
//   const loadContacts = async () => {
//     const res = await fetch('https://contact-form-backend-.../contacts');
//     const data = await res.json();
//     setContacts(data);
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   // Agregar nuevo contacto y recargar la lista
//   const addContact = async (contact) => {
//     await fetch('https://contact-form-backend-.../contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(contact),
//     });
//     loadContacts(); // recargar contactos
//   };

//   const deleteContact = async (id) => {
//     await fetch(`https://contact-form-backend-.../contacts/${id}`, {
//       method: 'DELETE',
//     });
//     loadContacts();
//   };

//   return (
//     <div>
//       <h1>Contactos</h1>
//       <ContactForm onAdd={addContact} />
//       <ContactList contacts={contacts} onDelete={deleteContact} />
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';
// import "./styles/App.css";
// import deleteSoundFile from '../assets/sounds/delete.mp3';
// const deleteSound = new Audio(deleteSoundFile); // ruta si está en public


// export default function App() {
//   const [contacts, setContacts] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     loadContacts();
//   }, []);

  

//   const loadContacts = async () => {
//   try {
//     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts');
//     const data = await res.json();
//     console.log('Contactos cargados:', data); // 👈 para confirmar
//     setContacts(data);
//   } catch (error) {
//     console.error('Error cargando contactos:', error);
//   }
// };



//   // useEffect(() => {
//   //   fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts')
//   //     .then(res => res.json())
//   //     .then(data => setContacts(data));
//   // }, []);

//   // const handleAdd = (newContact) => {
//   //   setContacts(prev => [...prev, newContact]);
//   // };

// // const handleAdd = async (newContact) => {
// //   try {
// //     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(newContact)
// //     });

// //     if (!res.ok) {
// //       throw new Error('Error al guardar el contacto');
// //     }

// //     const savedContact = await res.json();
// //     setContacts(prev => [...prev, savedContact]);
// //     setSuccessMessage('¡Contacto guardado con éxito!');
// //     setErrorMessage('');

// //     setTimeout(() => setSuccessMessage(''), 3000);
// //   } catch (err) {
// //     setErrorMessage('No se pudo guardar el contacto. Inténtalo de nuevo.');
// //     setSuccessMessage('');

// //     setTimeout(() => setErrorMessage(''), 3000);
// //   }
// // };

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
    //await res.json();



    await loadContacts(); // 🔁 recarga toda la lista

    setSuccessMessage('¡Contacto guardado con éxito!');
    setErrorMessage('');

    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setErrorMessage('No se pudo guardar el contacto. Inténtalo de nuevo.');
    setSuccessMessage('');

    setTimeout(() => setErrorMessage(''), 3000);
  }
};

// const handleAdd = async (e) => {
//   e.preventDefault();

//   if (!formData.name || !formData.email) return;

//   try {
//     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const savedContact = await res.json();
//     console.log('Respuesta del backend:', savedContact); // 👈 para depurar

//     setFormData({ name: '', email: '' });

//     // Espera medio segundo y recarga la lista
//     setTimeout(() => {
//       loadContacts();
//     }, 500);

//   } catch (error) {
//     console.error('Error al guardar contacto:', error);
//   }
// };

  
// const handleDelete = async (id) => {
//   try {
//     const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${id}`, {
//       method: 'DELETE'
//     });

//     if (!res.ok) {
//       throw new Error('Error al eliminar el contacto');
//     }
//     deleteSound.play();
//     setContacts(prev => prev.filter(contact => contact._id !== id));
//     setSuccessMessage('Contacto eliminado con éxito');
//     setErrorMessage('');

//     setTimeout(() => setSuccessMessage(''), 3000);
//   } catch (err) {
//     setErrorMessage('No se pudo eliminar el contacto.');
//     setSuccessMessage('');

//     setTimeout(() => setErrorMessage(''), 3000);
//   }
// };




  
// const handleEdit = async (contact) => {
//   const newName = prompt('Nuevo nombre:', contact.name);
//   if (!newName || newName.trim() === '') return;

//   const updated = { ...contact, name: newName.trim() };

//   try {
//     const res = await fetch(`https://contact-form-backend-i5ma.onrender.comcdddd/api/contacts/${contact._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updated)
//     });

//     if (!res.ok) {
//       throw new Error('Error al editar el contacto');
//     }

//     const data = await res.json();

//     setContacts(prev => prev.map(c => c._id === contact._id ? data : c));
//     setSuccessMessage('Contacto editado con éxito');
//     setErrorMessage('');

//     setTimeout(() => setSuccessMessage(''), 3000);
//   } catch (err) {
//     setErrorMessage('No se pudo editar el contacto.');
//     setSuccessMessage('');

//     setTimeout(() => setErrorMessage(''), 3000);
//   }
// };

//   return (
//     <div>
//       <h1 className="title">Gestión de contactos</h1>
      
//       <div className={`message success-message ${successMessage ? 'show' : ''}`}>
//       {successMessage}
//       </div>
//       <div className={`message error-message ${errorMessage ? 'show' : ''}`}>
//         {errorMessage}
//       </div>

//       <ContactForm onAdd={handleAdd} />
//       <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';

// export default function App() {
//   const [contacts, setContacts] = useState([]);

//   // Cargar contactos desde el backend
//   const loadContacts = async () => {
//     const res = await fetch('https://contact-form-backend-.../contacts');
//     const data = await res.json();
//     setContacts(data);
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   // Agregar nuevo contacto y recargar la lista
//   const addContact = async (contact) => {
//     await fetch('https://contact-form-backend-.../contacts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(contact),
//     });
//     loadContacts(); // recargar contactos
//   };

//   const deleteContact = async (id) => {
//     await fetch(`https://contact-form-backend-.../contacts/${id}`, {
//       method: 'DELETE',
//     });
//     loadContacts();
//   };

//   return (
//     <div>
//       <h1>Contactos</h1>
//       <ContactForm onAdd={addContact} />
//       <ContactList contacts={contacts} onDelete={deleteContact} />
//     </div>
//   );
// }




// // import { useState, useEffect } from 'react';
// // import ContactForm from './components/ContactForm';
// // import ContactList from './components/ContactList';
// // import "./styles/App.css";
// // import deleteSoundFile from '../assets/sounds/delete.mp3';
// // const deleteSound = new Audio(deleteSoundFile); // ruta si está en public


// // export default function App() {
// //   const [contacts, setContacts] = useState([]);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const loadContacts = async () => {
// //     const res = await fetch('https://contact-form-backend.onrender.com/contacts');
// //     const data = await res.json();
// //     setContacts(data);
// //   };

// //   useEffect(() => {
// //     loadContacts();
// //   }, []);

// //   // useEffect(() => {
// //   //   fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts')
// //   //     .then(res => res.json())
// //   //     .then(data => setContacts(data));
// //   // }, []);

// //   // const handleAdd = (newContact) => {
// //   //   setContacts(prev => [...prev, newContact]);
// //   // };

// // const handleAdd = async (newContact) => {
// //   try {
// //     const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(newContact)
// //     });

// //     if (!res.ok) {
// //       throw new Error('Error al guardar el contacto');
// //     }

// //     const savedContact = await res.json();
// //     setContacts(prev => [...prev, savedContact]);
// //     setSuccessMessage('¡Contacto guardado con éxito!');
// //     setErrorMessage('');

// //     setTimeout(() => setSuccessMessage(''), 3000);
// //   } catch (err) {
// //     setErrorMessage('No se pudo guardar el contacto. Inténtalo de nuevo.');
// //     setSuccessMessage('');

// //     setTimeout(() => setErrorMessage(''), 3000);
// //   }
// // };


  
// // const handleDelete = async (id) => {
// //   try {
// //     const res = await fetch(`https://contact-form-backend-i5ma.onrender.com/api/contacts/${id}`, {
// //       method: 'DELETE'
// //     });

// //     if (!res.ok) {
// //       throw new Error('Error al eliminar el contacto');
// //     }
// //     deleteSound.play();
// //     setContacts(prev => prev.filter(contact => contact._id !== id));
// //     setSuccessMessage('Contacto eliminado con éxito');
// //     setErrorMessage('');

// //     setTimeout(() => setSuccessMessage(''), 3000);
// //   } catch (err) {
// //     setErrorMessage('No se pudo eliminar el contacto.');
// //     setSuccessMessage('');

// //     setTimeout(() => setErrorMessage(''), 3000);
// //   }
// // };




  
// // const handleEdit = async (contact) => {
// //   const newName = prompt('Nuevo nombre:', contact.name);
// //   if (!newName || newName.trim() === '') return;

// //   const updated = { ...contact, name: newName.trim() };

// //   try {
// //     const res = await fetch(`https://contact-form-backend-i5ma.onrender.comcdddd/api/contacts/${contact._id}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(updated)
// //     });

// //     if (!res.ok) {
// //       throw new Error('Error al editar el contacto');
// //     }

// //     const data = await res.json();

// //     setContacts(prev => prev.map(c => c._id === contact._id ? data : c));
// //     setSuccessMessage('Contacto editado con éxito');
// //     setErrorMessage('');

// //     setTimeout(() => setSuccessMessage(''), 3000);
// //   } catch (err) {
// //     setErrorMessage('No se pudo editar el contacto.');
// //     setSuccessMessage('');

// //     setTimeout(() => setErrorMessage(''), 3000);
// //   }
// // };

// //   return (
// //     <div>
// //       <h1 className="title">Gestión de contactos</h1>
      
// //       <div className={`message success-message ${successMessage ? 'show' : ''}`}>
// //       {successMessage}
// //       </div>
// //       <div className={`message error-message ${errorMessage ? 'show' : ''}`}>
// //         {errorMessage}
// //       </div>

// //       <ContactForm onAdd={handleAdd} />
// //       <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
// //     </div>
// //   );
// // }

// // import { useEffect, useState } from 'react';
// // import ContactForm from './components/ContactForm';
// // import ContactList from './components/ContactList';

// // export default function App() {
// //   const [contacts, setContacts] = useState([]);

// //   // Cargar contactos desde el backend
// //   const loadContacts = async () => {
// //     const res = await fetch('https://contact-form-backend-.../contacts');
// //     const data = await res.json();
// //     setContacts(data);
// //   };

// //   useEffect(() => {
// //     loadContacts();
// //   }, []);

// //   // Agregar nuevo contacto y recargar la lista
// //   const addContact = async (contact) => {
// //     await fetch('https://contact-form-backend-.../contacts', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(contact),
// //     });
// //     loadContacts(); // recargar contactos
// //   };

// //   const deleteContact = async (id) => {
// //     await fetch(`https://contact-form-backend-.../contacts/${id}`, {
// //       method: 'DELETE',
// //     });
// //     loadContacts();
// //   };

// //   return (
// //     <div>
// //       <h1>Contactos</h1>
// //       <ContactForm onAdd={addContact} />
// //       <ContactList contacts={contacts} onDelete={deleteContact} />
// //     </div>
// //   );
// // }
