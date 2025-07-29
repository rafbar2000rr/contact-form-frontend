import { useState } from 'react';
import '../styles/form.css';

export default function ContactForm({onAdd}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!formData.name.trim() || !formData.email.trim() || !formData.address.trim()) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setSuccessMessage('');
      return;
    }

    try {
      await onAdd(formData); // ✅ Usa la función del padre
      setSuccessMessage('¡Contacto guardado con éxito!');
      setErrorMessage('');
      onAdd(formData);
      setFormData({ name: '', email: '', address: '' });
      // const res = await fetch('https://contact-form-backend-i5ma.onrender.com/api/contacts', {

        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(formData),
      // });

      // if (res.ok) {
      //   setSuccessMessage('Message sent successfully!');

      //   setErrorMessage('');
      //   setFormData({ name: '', email: '', address: '' });
      // } else {
        
      
    } catch (err) {
      setErrorMessage('Error connecting to server.');
      setSuccessMessage('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={!formData.name.trim() && errorMessage ? 'error' : ''}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={!formData.email.trim() && errorMessage ? 'error' : ''}
      />
      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className={!formData.address.trim() && errorMessage ? 'error' : ''}
      />
      <button type="submit">Agregar</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}



// import React, { useState } from 'react';

// function ContactForm({ onAdd }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: ''
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validación
//     if (!formData.name.trim() || !formData.email.trim() || !formData.address.trim()) {
//       setErrorMessage('All fields are required');
//       setSuccessMessage('');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setErrorMessage('Please enter a valid email address');
//       setSuccessMessage('');
//       return;
//     }

//     try {
//       await onAdd(formData);
//       setSuccessMessage('Contact saved successfully');
//       setErrorMessage('');
//       setFormData({ name: '', email: '', address: '' });
//     } catch (error) {
//       setErrorMessage('Failed to save contact');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="address"
//         placeholder="Address"
//         value={formData.address}
//         onChange={handleChange}
//       />

//       <button type="submit">Submit</button>

//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </form>
//   );
// }

// export default ContactForm;










