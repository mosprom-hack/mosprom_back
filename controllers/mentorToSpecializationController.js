const pool = require('../db');

const getAllMentorToSpecialization = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mentor_to_specialization');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching mentor_to_specialization:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getMentorToSpecializationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM mentor_to_specialization WHERE id = $1', [id]);
    
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
    console.error('Error fetching mentor_to_specialization:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createMentorToSpecialization = async (req, res) => {
  try {
    const { mentor_id, specialization_id } = req.body;
    
    if (!mentor_id || !specialization_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'mentor_id and specialization_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO mentor_to_specialization (mentor_id, specialization_id) VALUES ($1, $2) RETURNING *',
      [mentor_id, specialization_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating mentor_to_specialization:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'mentor_id or specialization_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteMentorToSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM mentor_to_specialization WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting mentor_to_specialization:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllMentorToSpecialization,
  getMentorToSpecializationById,
  createMentorToSpecialization,
  deleteMentorToSpecialization,
};

