var mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const GetDate = () => {
  const currentDate = new Date(); // Create a new Date object representing the current date and time

  const day = currentDate.getDate(); // Get the day of the month (1-31)
  const month = currentDate.getMonth() + 1; // Get the month (0-11), so adding 1 to get the actual month (1-12)
  const year = currentDate.getFullYear(); // Get the full year (e.g., 2023)

  // Pad single-digit day and month values with leading zeros
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
}

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


// Route to fetch user data from the database......................................................................................
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
// Route to fetch user data from the database......................................................................................
// Test route to fetch and return a sample record from the database
app.get('/api/Product', (req, res) => {
  con.query("SELECT * FROM article ", function (err, result) {
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

//// Route to add a new product to the database.........................................................................................////
// Use express.json() middleware to parse JSON data
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Specify the directory to temporarily store uploaded files

app.post('/api/addProduct', upload.single('image'), async (req, res) => {
  const { nomDeLArticle, description, code, cout, prixDeVente } = req.body;
  const image = req.file; // Get the uploaded image details

  const sql = `
    INSERT INTO article (NomDeLArticle, Description, Code, Cout, PrixDeVente, product_image, created_at, last_modification)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  con.query(sql, [nomDeLArticle, description, code, cout, prixDeVente, image.path], function (err, result) {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Product added successfully');
    res.status(200).json({ message: 'Product added successfully' });
  });
});
//// Route to add a new product to the database.........................................................................................////


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
