import { Contact } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = (id) => {
  return Contact.findById(id);
};

export const createContact = (contact) => {
  return Contact.create(contact);
};

export const patchContact = (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
};

export const deleteContact = (id) => {
  return Contact.findByIdAndDelete(id);
};
