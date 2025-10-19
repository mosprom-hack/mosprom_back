const pool = require('../db');

const getAllEducationToUser = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM education_to_user');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching education_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getEducationToUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM education_to_user WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Relation not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching education_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createEducationToUser = async (req, res) => {
  try {
    const { user_id, education_id } = req.body;
    
    if (!user_id || !education_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id and education_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO education_to_user (user_id, education_id) VALUES ($1, $2) RETURNING *',
      [user_id, education_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating education_to_user:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id or education_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteEducationToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM education_to_user WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Relation not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Relation deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting education_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllEducationToUser,
  getEducationToUserById,
  createEducationToUser,
  deleteEducationToUser,
};

