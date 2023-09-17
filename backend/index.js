const mysql = require('mysql');;
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path')

const app = express();
app.use(cors());
app.use(express.static('public'));



const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_commerciale',
});
con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + con.threadId);
  // Now you can perform database operations
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

app.get('/api/Client', (req, res) => {
  con.query("SELECT * FROM client ", function (err, result) {
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



app.use(express.json());
app.post('/api/addClient', async (req, res) => {
  const { Prenom, NomDeFamille, NumeroDeContact, Email, ConditionsDePaiement } = req.body;

  const sql = `
    INSERT INTO client (Prenom, NomDeFamille,  NumeroDeContact,  Email, ConditionsDePaiement , created_at , last_modification )
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;

  con.query(sql, [Prenom, NomDeFamille, NumeroDeContact, Email, ConditionsDePaiement], function (err, result) {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Client added successfully');
    res.status(200).json({ message: 'Client added successfully' });
  });
});
//// Route to add a new product to the database.........................................................................................////




// Edit Product from poducts table....................................................................................

app.use(express.json());
app.post('/api/editClient', async (req, res) => {
  const { ClientID, updatePrenom, updateNomDeFamille, updateNumeroDeContact, updateEmail, updateConditionsDePaiement } = req.body;

  const sql = `
    UPDATE client
    SET Prenom = ?, NomDeFamille = ?, NumeroDeContact = ?, Email = ?, ConditionsDePaiement = ? , last_modification = NOW()
    WHERE ClientID = ?
  `;
  con.query(sql, [updatePrenom, updateNomDeFamille, updateNumeroDeContact, updateEmail, updateConditionsDePaiement, ClientID], function (err, result) {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Client updated successfully');
    res.status(200).json({ message: 'Client updated successfully' });
  });
});
// Edit Client from poducts table....................................................................................





// Delet Client from poducts table....................................................................................
app.post('/api/deleteClient', async (req, res) => {
  const { ClientID } = req.body;
  const sql = `
    DELETE FROM client WHERE ClientID = ? 
  `;

  con.query(sql, [ClientID], function (err, result) {
    if (err) {
      console.error('Error Deleting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Client deleted successfully');
    res.status(200).json({ message: 'Client deleted successfully' });
  });
});
// Delet Client from poducts table....................................................................................


// Generate radom code, check if it's exist
// Define a route to check if a code exists
app.get('/api/checkCode/:code', (req, res) => {
  const codeToCheck = req.params.code;
  console.log(codeToCheck)
  con.query(`SELECT * FROM article WHERE code = ${codeToCheck} `, function (err, result) {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.length > 0) {
      res.json({ exists: true });

    } else {
      res.json({ exists: false });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
