import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema, root } from './schema.js';
import { parseAuthorizationHeader } from './app/authorization.js';
import db from './db/index.js';

const PORT = 4000;
const app = express();

app.use(cors());
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: root,
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
