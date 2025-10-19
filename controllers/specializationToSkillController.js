const pool = require('../db');

const getAllSpecializationToSkill = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM specialization_to_skill');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching specialization_to_skill:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getSpecializationToSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM specialization_to_skill WHERE id = $1', [id]);
    
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
    console.error('Error fetching specialization_to_skill:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createSpecializationToSkill = async (req, res) => {
  try {
    const { specialization_id, skill_id } = req.body;
    
    if (!specialization_id || !skill_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'specialization_id and skill_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO specialization_to_skill (specialization_id, skill_id) VALUES ($1, $2) RETURNING *',
      [specialization_id, skill_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating specialization_to_skill:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'specialization_id or skill_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteSpecializationToSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM specialization_to_skill WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting specialization_to_skill:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllSpecializationToSkill,
  getSpecializationToSkillById,
  createSpecializationToSkill,
  deleteSpecializationToSkill,
};

