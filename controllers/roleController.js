const pool = require('../db');

const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM roles ORDER BY title'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM roles WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Role not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createRole = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO roles (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating role:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Role with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    const result = await pool.query(
      'UPDATE roles SET title = COALESCE($1, title) WHERE id = $2 RETURNING *',
      [title, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Role not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM roles WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Role not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Role deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};

