const pool = require('../db');

const getAllMentorToCompany = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mentor_to_company');
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching mentor_to_company:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const getMentorToCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM mentor_to_company WHERE id = $1', [id]);
    
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
    console.error('Error fetching mentor_to_company:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createMentorToCompany = async (req, res) => {
  try {
    const { mentor_id, company_id } = req.body;
    
    if (!mentor_id || !company_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'mentor_id and company_id are required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO mentor_to_company (mentor_id, company_id) VALUES ($1, $2) RETURNING *',
      [mentor_id, company_id]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating mentor_to_company:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({ 
        success: false, 
        error: 'mentor_id or company_id does not exist' 
      });
    }
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'mentor_id already has a company assigned' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteMentorToCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM mentor_to_company WHERE id = $1 RETURNING *', [id]);
    
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
    console.error('Error deleting mentor_to_company:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllMentorToCompany,
  getMentorToCompanyById,
  createMentorToCompany,
  deleteMentorToCompany,
};

