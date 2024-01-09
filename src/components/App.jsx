import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contact-list');
    if (stringifiedContacts) {
      const parsedContacts = JSON.parse(stringifiedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contact-list', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contactData => {
    const { name, number } = contactData;
    const hasDuplicates = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number.toLowerCase() === number.toLowerCase()
    );

    if (hasDuplicates) {
      alert('This contact already exists!');
      return;
    }

    const newContact = {
      ...contactData,
      id: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleContactSearch = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleContactSearch={handleContactSearch} />
      <ContactsList
        contacts={filterContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

