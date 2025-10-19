const pool = require('../db');

const getAllCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title FROM companies ORDER BY created_at DESC'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM companies WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Company not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO companies (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating company:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Company with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const result = await pool.query(
      `UPDATE companies SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description)
      WHERE id = $3 RETURNING *`,
      [title, description, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Company not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM companies WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Company not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Company deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};

