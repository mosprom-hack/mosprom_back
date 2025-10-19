const pool = require('../db');

const getAllCompetences = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM competence_to_user ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching competences:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getCompetenceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM competence_to_user WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Competence not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching competence:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getCompetenceByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM competence_to_user WHERE user_id = $1',
      [user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Competence not found for this user'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching competence by user_id:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createCompetence = async (req, res) => {
  try {
    const { user_id, solve, programming, logic, technical, organizer, communication } = req.body;
    
    if (!user_id || solve === undefined || programming === undefined || 
        logic === undefined || technical === undefined || 
        organizer === undefined || communication === undefined) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: user_id, solve, programming, logic, technical, organizer, communication'
      });
    }
    
    const result = await pool.query(
      `INSERT INTO competence_to_user 
       (user_id, solve, programming, logic, technical, organizer, communication) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [user_id, solve, programming, logic, technical, organizer, communication]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating competence:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        error: 'Competence for this user already exists'
      });
    }
    
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        error: 'All competence values must be between 0 and 1'
      });
    }
    
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateCompetence = async (req, res) => {
  try {
    const { id } = req.params;
    const { solve, programming, logic, technical, organizer, communication } = req.body;
    
    const result = await pool.query(
      `UPDATE competence_to_user 
       SET solve = COALESCE($1, solve),
           programming = COALESCE($2, programming),
           logic = COALESCE($3, logic),
           technical = COALESCE($4, technical),
           organizer = COALESCE($5, organizer),
           communication = COALESCE($6, communication)
       WHERE id = $7 
       RETURNING *`,
      [solve, programming, logic, technical, organizer, communication, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Competence not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating competence:', error);
    
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        error: 'All competence values must be between 0 and 1'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteCompetence = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM competence_to_user WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Competence not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Competence deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting competence:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllCompetences,
  getCompetenceById,
  getCompetenceByUserId,
  createCompetence,
  updateCompetence,
  deleteCompetence,
};