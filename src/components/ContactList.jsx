// import React from 'react';

// function ContactList({ contacts, onDelete }) {
//   return (
//     <div>
//       <h2>Saved Contacts</h2>
//       <ul>
//         {contacts.map(contact => (
//           <li key={contact._id}>
//             <strong>{contact.name}</strong> - {contact.email} - {contact.address}
//             <button onClick={() => onDelete(contact._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ContactList;

import '../styles/list.css';

export default function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <ul className="list">
      {contacts.map(c => (
        <li key={c._id}>
          <div className="contact-item">
          <span><b>{c.name}</b> - {c.email} - {c.address}</span>
          <div className="button-group">
            <button onClick={() => onEdit(c)}>Editar</button>
            <button onClick={() => onDelete(c._id)}>Eliminar</button>
          </div>
        </div>
        </li>
      ))}
    </ul>
  );
}





