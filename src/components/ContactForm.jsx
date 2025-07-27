
import '../styles/form.css';
import { useState } from 'react';

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', address: '', email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !/^[^@]+@[^@]+\.[a-z]{2,}$/.test(form.email)) {
      alert('Por favor, completa todos los campos con un email válido.');
      return;
    }
    
    onAdd(form);
    setForm({ name: '', address: '', email: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <button type="submit">Enviar</button>
    </form>
  );
}
const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.name || !form.address || !/^[^@]+@[^@]+\.[a-z]{2,}$/.test(form.email)) {
    alert('Por favor, completa todos los campos con un email válido.');
    return;
  }
  onAdd(form); // solo le pasamos los datos, no hacemos fetch
  setForm({ name: '', address: '', email: '' });
};
