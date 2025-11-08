const db= require('../config/db');

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
    if (!name || !category || !slug || !hsncode || !disciption || !price || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO product (name, category, slug, hsncode, disciption, price, quantity)
               VALUES (?, ?, ?, ?, ?, ? ,?)`;
   try {
     const [result] = await db.query(sql,[name, category, slug , hsncode, disciption, price, quantity]);
     res.status(201).json({ id: result.insertId, message: 'Event Category created successfully' });
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