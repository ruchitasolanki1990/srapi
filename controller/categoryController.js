const db= require('../config/db');

// Get all categories from categories table
exports.getAllCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categary');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


 // Create new category for events
 exports.createEventCategory = async (req, res) => {
   const {categoryname, slug } = req.body;
    if (!categoryname || !slug) {
    return res.status(400).json({ error: "Both fields required" });
  }
   try {
     const [result] = await db.query('INSERT INTO categary (categoryname, slug) VALUES (?, ?)',
                                     [categoryname, slug]
                                    );
     res.status(201).json({ id: result.insertId, message: 'Event Category created successfully' });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };

 
 // Update event Category
 exports.updateEventCategory = async (req, res) => {
    const { id } = req.params;
   const { categoryname,slug } = req.body;

    if (!categoryname || !slug) {
    return res.status(400).json({ error: "Missing fields" });
  }
     try {
         const [result] = await db.query(
             'UPDATE categary SET categoryname = ?, slug = ? WHERE id = ?',
             [categoryname, slug,  id]
         );
         res.json({ message: 'Event Category updated successfully' });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };

  // delete event Category
 exports.deleteEventCategory = async (req, res) => {
    const { id } = req.params;

     try {
         const [result] = await db.query(
             'DELETE FROM categary WHERE id = ?',
             [id]
         );
         res.json({ message: 'Event Category updated successfully' });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };