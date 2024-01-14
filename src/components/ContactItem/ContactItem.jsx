import React from 'react';
import css from './ContactItem.module.css';

export const ContactItem = ({ contact, handleDeleteContact }) => {
    const { name, number, id } = contact;

    return (
      <li className={css.contactItem}>
        <span>{name}:</span>
        <span> {number}</span>

        <button
          className={css.deleteBtn}
          type="button"
          onClick={() => {
            handleDeleteContact(id);
          }}
        >
          Delete
        </button>
      </li>
    );
};