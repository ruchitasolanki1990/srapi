const db=require('../config/db');

// Get locations by single field
exports.getAllDetailsOfContact = async (req, res) => { 
     try {
    const [rows] = await db.query("SELECT * FROM companyinfo");
    res.json(rows);
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// // Update Contact
exports.updateContactDetails = async (req, res) => {
    const { id } = req.params;
    const { pagevalue } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE companyinfo SET pagevalue = ? WHERE id = ?',
            [pagevalue,id]
        );
        res.json({ message: 'Contact Details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

