import { useState } from 'react';
import '../styles/form.css';
export default function ContactForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    await onAdd(formData);

    setFormData({ name: '', email: '', address: '' });
  };

  return (
    <form className = "form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Correo"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

