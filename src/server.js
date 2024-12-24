import * as fs from 'node:fs';
import express from 'express';
import path from 'node:path';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import contactsRouter from './routers/contacts.js';
import usersRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { authenticate } from './middlewares/authenticate.js';

const swaggerDoc = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json'), 'utf-8'),
);

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use('/photos', express.static(path.resolve('src/public/photos')));

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts', authenticate, contactsRouter);
  app.use('/auth', usersRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
