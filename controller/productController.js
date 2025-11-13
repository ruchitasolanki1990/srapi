const db= require('../config/db');
//image upload
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Get all products from product table
exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM product');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new Products
 exports.createProduct = async (req, res) => {
   const { name, category,slug, hsncode, disciption, price, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!name || !category || !slug || !hsncode || !disciption || !price || !quantity || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO product (name, category, slug, hsncode, disciption, price, quantity, image)
               VALUES (?, ?, ?, ?, ?, ? ,? ,?)`;
   try {
     const [result] = await db.query(sql,[name, category, slug , hsncode, disciption, price, quantity, image]);
     res.status(201).json({
         id: result.insertId,
         message: 'New product successfully',
         image,
        });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };

 // Update Product
 exports.updateProduct = async (req, res) => {
    const { id } = req.params;
  const { name, category, slug, hsncode, disciption, price, quantity } = req.body;

    if (!name || !category || !slug || !hsncode || !disciption || !price || !quantity)
    {
        return res.status(400).json({ error: "All fields are required" });
    }

   const sql = `
    UPDATE product 
    SET name=?, category=?, slug=?, hsncode=?, disciption=?, price=?, quantity=? 
    WHERE id=?`;
     try {
         const [result] = await db.query(sql,[name, category, slug, hsncode, disciption, price, quantity, id]);
         res.json({ message: 'Event Category updated successfully' });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };

 // delete Product
 exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

     try {
         const [result] = await db.query(
             'DELETE FROM product WHERE id = ?',
             [id]
         );
         res.json({ message: 'Event Category updated successfully' });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };


 //upload image
// Multer configuration
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Upload route
app.post("/uploads", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    imagePath: `http://localhost:5001/uploads/${req.file.filename}`,
  });
});
 // Multer storage config
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });
app.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = `uploads/${req.file.filename}`;

  const sql = "INSERT INTO images (name, path) VALUES (?, ?)";
  db.query(sql, [req.file.originalname, imagePath], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Image uploaded successfully!", path: imagePath });
  });
});*/

