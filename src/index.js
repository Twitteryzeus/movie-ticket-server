const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Define your routes and handlers here
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}/`);
})
