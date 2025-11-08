const db = require('../config/db');

// Get Home by single field
exports.getHomeDetails = async (req, res) => {
   try {
    const [rows] = await db.query("SELECT * FROM homedata WHERE page='home'");
    res.json(rows);
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//  Update only pagevalue by ID of homedata
exports.updateHomeDetails = async (req, res) => {
     const { id } = req.params;
     const { pagevalue } = req.body;
     try {
        const [result] = await db.query(
            'UPDATE homedata SET pagevalue = ? WHERE id = ?',
            [pagevalue,id]
        );
        res.json({ message: 'Home Details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


