import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (contact === null) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    res.send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({
      status: 500,
      message: 'Something went wrong',
    });
  });

  const PORT = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
