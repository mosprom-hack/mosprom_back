const pool = require('../db');

const getAllEducations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM educations ORDER BY title'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching educations:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM educations WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Education not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createEducation = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO educations (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating education:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Education with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    const result = await pool.query(
      'UPDATE educations SET title = COALESCE($1, title) WHERE id = $2 RETURNING *',
      [title, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Education not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM educations WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Education not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Education deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};

