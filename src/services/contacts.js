import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const patchContact = async (id, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return { contact: rawResult.value };
};

export const deleteContact = async (id) => {
  const contact = await Contact.findOneAndDelete({ _id: id });

  return contact;
};
