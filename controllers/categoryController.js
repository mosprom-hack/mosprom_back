const pool = require('../db');

const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY title'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO categories (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Category with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    const result = await pool.query(
      'UPDATE categories SET title = COALESCE($1, title) WHERE id = $2 RETURNING *',
      [title, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Category deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

