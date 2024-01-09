import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onAdd({ name, number });

    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            required
            pattern="[a-zA-Zа-яА-ЯіІїЇґҐєЄ']+"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Number</p>
          <input
            type="tel"
            name="number"
            required
            pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$"
            title="Format: XXX-XXX-XX-XX"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className="submit-btn" type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
