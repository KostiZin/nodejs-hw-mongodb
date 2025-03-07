import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};
