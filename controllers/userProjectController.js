const pool = require('../db');

const getAllUserProjects = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM user_projects ORDER BY title'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getUserProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM user_projects WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User project not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching user project:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createUserProject = async (req, res) => {
  try {
    const { user_id, title, description, link } = req.body;
    
    if (!user_id || !link) {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id and link are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO user_projects (user_id, title, description, link) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, title, description, link]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating user project:', error);
    
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

const updateUserProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;
    
    const result = await pool.query(
      `UPDATE user_projects SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        link = COALESCE($3, link)
      WHERE id = $4 RETURNING *`,
      [title, description, link, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User project not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating user project:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteUserProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM user_projects WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User project not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'User project deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting user project:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllUserProjects,
  getUserProjectById,
  createUserProject,
  updateUserProject,
  deleteUserProject,
};

