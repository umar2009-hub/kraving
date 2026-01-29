const express = require('express');
console.log("🔥 index.js loaded")
const app = express();
const port = process.env.PORT || 5000;
const mongoDBconnect = require('./db');
const cors = require('cors');

mongoDBconnect();

app.use(express.json());

app.use(cors());


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.use('/api', require('./routes/CreateUser'));

app.use('/api', require('./routes/DisplayData'));

app.use('/api', require('./routes/OrderData'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 