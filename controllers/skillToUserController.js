const pool = require('../db');

const getAllSkillToUser = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skill_to_user');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching skill_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getSkillToUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM skill_to_user WHERE id = $1', [id]);
    
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
    console.error('Error fetching skill_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createSkillToUser = async (req, res) => {
  try {
    const { user_id, skill_id } = req.body;
    
    if (!user_id || !skill_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id and skill_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO skill_to_user (user_id, skill_id) VALUES ($1, $2) RETURNING *',
      [user_id, skill_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating skill_to_user:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id or skill_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteSkillToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM skill_to_user WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting skill_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllSkillToUser,
  getSkillToUserById,
  createSkillToUser,
  deleteSkillToUser,
};

