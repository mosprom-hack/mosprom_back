const pool = require('../db');

const getAllSkills = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM skills ORDER BY title'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM skills WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Skill not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO skills (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Skill with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    const result = await pool.query(
      'UPDATE skills SET title = COALESCE($1, title) WHERE id = $2 RETURNING *',
      [title, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Skill not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM skills WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Skill not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Skill deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};

