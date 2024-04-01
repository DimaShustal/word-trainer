import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { parseAuthorizationHeader } from './app/functions/authorization.js';
import db from './db/index.js';
import schema from './app/graphql/schema.js';
import rootValue from './app/graphql/rootValue/index.js';

const PORT = 4000;
const app = express();

mongoose
  .connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue,
    context: req => {
      const user = parseAuthorizationHeader(req);

      return { user, db };
    },
  }),
);

app.get('/healthcheck', (_, res) => {
  res.send('OK');
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
