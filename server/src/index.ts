import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema, root } from './schema.js';

const PORT = 4000;
const app = express();

app.use(cors());
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: root,
    context: req => {
      return { req };
    },
  }),
);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
