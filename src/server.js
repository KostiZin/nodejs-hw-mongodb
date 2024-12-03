import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';
import contactsRouter from './routers/contacts.js';
import usersRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts', contactsRouter);
  app.use('/auth', usersRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
