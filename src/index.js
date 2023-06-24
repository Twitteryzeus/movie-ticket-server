const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Define your routes and handlers here
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
})
