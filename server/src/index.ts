import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { rateLimit } from 'express-rate-limit';
import { parseAuthorizationHeader } from './functions/authorization.js';
import schema from './graphql/schema.js';
import rootValue from './graphql/rootValue/index.js';
import { MINUTE_IN_MILLISECONDS } from './constants/time.js';

const PORT = 4000;
const app = express();
const MONGODB_URL =
  process.env.MONGODB_URL ||
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@word-trainer.izhine7.mongodb.net/app?retryWrites=true&w=majority&appName=word-trainer`;
const limiter = rateLimit({
  windowMs: 10 * MINUTE_IN_MILLISECONDS,
  limit: 50,
  message: { error: 'Try later' },
});

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());

app.use('/graphql', limiter);

app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue,
    context: req => {
      const user = parseAuthorizationHeader(req);

      return { user };
    },
    formatError: error => {
      console.error('/graphql error:', error);

      return { message: error?.message } as Error;
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
