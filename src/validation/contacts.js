import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20).allow(null, '').optional(),
  isFavourite: Joi.boolean().default(false).optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal'),
  photo: Joi.string().allow(null, '').optional(),
});

export const replaceContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
