const pool = require('../db');

const getAllRoleToUserToCommunity = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM role_to_user_to_community ORDER BY created_at DESC');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching role_to_user_to_community:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getRoleToUserToCommunityById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM role_to_user_to_community WHERE id = $1', [id]);
    
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
    console.error('Error fetching role_to_user_to_community:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createRoleToUserToCommunity = async (req, res) => {
  try {
    const { user_id, community_id, role_id, description } = req.body;
    
    if (!user_id || !community_id || !role_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id, community_id and role_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO role_to_user_to_community (user_id, community_id, role_id, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, community_id, role_id, description]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating role_to_user_to_community:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id, community_id or role_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteRoleToUserToCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM role_to_user_to_community WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting role_to_user_to_community:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllRoleToUserToCommunity,
  getRoleToUserToCommunityById,
  createRoleToUserToCommunity,
  deleteRoleToUserToCommunity,
};

