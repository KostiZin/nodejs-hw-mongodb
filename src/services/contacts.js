import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (typeof filter.contactType !== 'undefined') {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  const [total, data] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    page,
    perPage,
    totalItems: total,
    totalPages: totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
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
