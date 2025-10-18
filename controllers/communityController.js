const pool = require('../db');

const getAllCommunities = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM communities ORDER BY created_at DESC'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getCommunityById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM communities WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Community not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createCommunity = async (req, res) => {
  try {
    const { title, description, type } = req.body;
    
    if (!title || !type) {
      return res.status(400).json({ 
        success: false, 
        error: 'title and type are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO communities (title, description, type) VALUES ($1, $2, $3) RETURNING *',
      [title, description, type]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating community:', error);
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type } = req.body;
    
    const result = await pool.query(
      `UPDATE communities SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type)
      WHERE id = $4 RETURNING *`,
      [title, description, type, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Community not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating community:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM communities WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Community not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Community deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting community:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
};

