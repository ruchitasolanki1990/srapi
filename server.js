const express = require("express");
const cors = require("cors");

const mysql = require("mysql2");



const app = express();
app.use(cors());
// app.use(json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Janki123',
  database: 'srtefcoat'
});
//for server user : admin  pass: admin@123
// for local user: root pass: Janki123
/*db.connect((err) => {
  if (err) {
    
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});*/
db.connect(function(err) {
  if (err) throw err;
  //Select all customers and return the result object:
  db.query("SELECT * FROM homedata", function (err, result, fields) {
    if (err) throw err;
  });
});
app.use(express.json());
app.get("/api", (req, res) => {
  res.send("Hello from Event Management Api!");
});

//api for home data for homedata
app.get("/api/homedetails", (req, res) => {
  const sql = "SELECT * FROM homedata WHERE page='home'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(" Error fetching data:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(result);
    }
  });
});

//  Update only pagevalue by ID of homedata
app.put("/api/homedetails/:id", (req, res) => {
  const { id } = req.params;
  const { pagevalue } = req.body;

  if (!pagevalue) return res.status(400).json({ error: "Missing pagevalue" });

  const sql = "UPDATE homedata SET pagevalue = ? WHERE id = ?";
  db.query(sql, [pagevalue, id], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Updated successfully" });
  });
});


//About page data fetch
app.get("/api/aboutdetails", (req, res) => {
  const sql = "SELECT * FROM homedata WHERE page='about'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(result);
    }
  });
});

// Update only pagevalue by ID of homedata
app.put("/api/aboutdetails/:id", (req, res) => {
  const { id } = req.params;
  const { pagevalue } = req.body;

  if (!pagevalue) return res.status(400).json({ error: "Missing pagevalue" });

  const sql = "UPDATE homedata SET pagevalue = ? WHERE id = ?";
  db.query(sql, [pagevalue, id], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Updated successfully" });
  });
});

//api for contact data for contact us page and footer
app.get("/api/contactdetails", (req, res) => {
  const sql = "SELECT * FROM companyinfo";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(result);
    }
  });
});
// Update only pagevalue by ID of contactinfo
app.put("/api/contactdetails/:id", (req, res) => {
  const { id } = req.params;
  const { pagevalue } = req.body;

  if (!pagevalue) return res.status(400).json({ error: "Missing pagevalue" });

  const sql = "UPDATE companyinfo SET pagevalue = ? WHERE id = ?";
  db.query(sql, [pagevalue, id], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Updated successfully" });
  });
});


// API to store form data of contact us page
app.post("/api/form", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO formdata (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error(" Error inserting data:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      console.log("Data inserted:", result);
      res.status(201).json({ message: "Form submitted successfully!" });
    }
  });
});




const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

