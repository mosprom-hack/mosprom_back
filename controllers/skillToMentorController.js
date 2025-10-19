const pool = require('../db');

const getAllSkillToMentor = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skill_to_mentor');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching skill_to_mentor:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getSkillToMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM skill_to_mentor WHERE id = $1', [id]);
    
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
    console.error('Error fetching skill_to_mentor:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createSkillToMentor = async (req, res) => {
  try {
    const { skill_id, mentor_id } = req.body;
    
    if (!skill_id || !mentor_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'skill_id and mentor_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO skill_to_mentor (skill_id, mentor_id) VALUES ($1, $2) RETURNING *',
      [skill_id, mentor_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating skill_to_mentor:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'skill_id or mentor_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteSkillToMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM skill_to_mentor WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting skill_to_mentor:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllSkillToMentor,
  getSkillToMentorById,
  createSkillToMentor,
  deleteSkillToMentor,
};

