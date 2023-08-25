var mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path')

const app = express();
app.use(cors());
app.use(express.static('public'));



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
      // console.log(result);
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
      // console.log(result);
    } else {
      res.json({ message: 'No data available' });
    }
  });
});

// Route to add a new product to the database.........................................................................................////
// Use express.json() middleware to parse JSON data
const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});

app.use(express.json());

const upload = multer({
  storage: storage
}); // Specify the directory to temporarily store uploaded files

app.post('/api/addProduct', upload.single('image'), async (req, res) => {
  const { nomDeLArticle, description, code, cout, prixDeVente } = req.body;
  const image = req.file.filename; // Get the uploaded image details

  const sql = `
    INSERT INTO article (NomDeLArticle, Description, Code, Cout, PrixDeVente, product_image, created_at, last_modification)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  con.query(sql, [nomDeLArticle, description, code, cout, prixDeVente, image], function (err, result) {
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




// Edit Product from poducts table....................................................................................

app.use(express.json());
app.post('/api/editProduct', upload.single('image'), async (req, res) => {
  const { ArticleID, updatenomDeLArticle, updatedescription, updatecode, updatecout, updateprixDeVente } = req.body;
  let imageFileName = null;

  /* The code snippet `if (req.file) { ... }` is checking if a file was uploaded in the request. */
  if (req.file) {
    // If a file was uploaded, use its filename
    imageFileName = req.file.filename;
    const sql = `
    UPDATE article
    SET NomDeLArticle = ?, Description = ?, Code = ?, Cout = ?, PrixDeVente = ?, product_image = ?, last_modification = NOW()
    WHERE ArticleID = ?
  `;
    con.query(sql, [updatenomDeLArticle, updatedescription, updatecode, updatecout, updateprixDeVente, imageFileName, ArticleID], function (err, result) {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
    });
  } else {
    const sql = `
    UPDATE article
    SET NomDeLArticle = ?, Description = ?, Code = ?, Cout = ?, PrixDeVente = ?, last_modification = NOW()
    WHERE ArticleID = ?
  `;
    con.query(sql, [updatenomDeLArticle, updatedescription, updatecode, updatecout, updateprixDeVente, ArticleID], function (err, result) {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
    });
  }
});
// Edit Product from poducts table....................................................................................





// Delet Product from poducts table....................................................................................
app.post('/api/deleteProduct', async (req, res) => {
  const { ArticleID } = req.body;
  const sql = `
    DELETE FROM article WHERE ArticleID = ? 
  `;

  con.query(sql, [ArticleID], function (err, result) {
    if (err) {
      console.error('Error Deleting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Product deleted successfully');
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});
// Delet Product from poducts table....................................................................................



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
