const pool = require('../db');

const getAllMentors = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, photo_url FROM mentors ORDER BY created_at DESC'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const mentorResult = await pool.query(
      'SELECT * FROM mentors WHERE id = $1',
      [id]
    );
    
    if (mentorResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Mentor not found' 
      });
    }
    
    const mentor = mentorResult.rows[0];
    
    const fullProfile = {
      ...mentor,
    };
    
    res.json({ 
      success: true, 
      data: fullProfile 
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createMentor = async (req, res) => {
  try {
    const { user_id, first_name, last_name, photo_url, position, description, help, experience } = req.body;
    
    if (!user_id || !first_name || !last_name) {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id, first_name and last_name are required' 
      });
    }
    
    const result = await pool.query(
      `INSERT INTO mentors (user_id, first_name, last_name, photo_url, position, description, help, experience) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_id, first_name, last_name, photo_url, position, description, help, experience]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating mentor:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id already exists' 
      });
    }
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, photo_url, position, description, help, experience } = req.body;
    
    const result = await pool.query(
      `UPDATE mentors SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        photo_url = COALESCE($3, photo_url),
        position = COALESCE($4, position),
        description = COALESCE($5, description),
        help = COALESCE($6, help),
        experience = COALESCE($7, experience)
      WHERE id = $8 RETURNING *`,
      [first_name, last_name, photo_url, position, description, help, experience, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Mentor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating mentor:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM mentors WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Mentor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Mentor deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor,
};

