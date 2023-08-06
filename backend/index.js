var mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_commerciale"
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected to the database'); // Log a message when connected
});


// Route to fetch user data from the database
// Test route to fetch and return a sample record from the database
app.get('/api/test', (req, res) => {
  con.query("SELECT * FROM user ", function (err, result) {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.length > 0) {
      res.json(result); // Return the first record
      console.log(result);
    } else {
      res.json({ message: 'No data available' });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
