const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./src/config/constants');

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Authentication Service!');
}); 

app.listen(PORT, () => {
  console.log(`Authentication service listening on port ${PORT}`);
});