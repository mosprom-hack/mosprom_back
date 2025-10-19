const pool = require('../db');

const getAllCategoryToUser = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category_to_user');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching category_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getCategoryToUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM category_to_user WHERE id = $1', [id]);
    
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
    console.error('Error fetching category_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createCategoryToUser = async (req, res) => {
  try {
    const { user_id, category_id } = req.body;
    
    if (!user_id || !category_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id and category_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO category_to_user (user_id, category_id) VALUES ($1, $2) RETURNING *',
      [user_id, category_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating category_to_user:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'user_id or category_id does not exist' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteCategoryToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM category_to_user WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting category_to_user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllCategoryToUser,
  getCategoryToUserById,
  createCategoryToUser,
  deleteCategoryToUser,
};

