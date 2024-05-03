import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { parseAuthorizationHeader } from './functions/authorization.js';
import schema from './graphql/schema.js';
import rootValue from './graphql/rootValue/index.js';

const PORT = 4000;
const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@word-trainer.izhine7.mongodb.net/app?retryWrites=true&w=majority&appName=word-trainer`,
  )
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

      return { user };
    },
  }),
);

app.get('/healthcheck', (_, res) => {
  res.send({ healthcheck: true });
});

app.get('/version', (_, res) => {
  res.send({ version: process.env.VERSION });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
