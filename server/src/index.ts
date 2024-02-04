import open from 'open';
import express from 'express';

const app = express();
const port = 3010;

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log('Example app listening on port 3010!!');

  open(`http://localhost:${port}`);
});
