const pool = require('../db');

const getAllSpecializations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title FROM specializations ORDER BY title'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching specializations:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// const getSpecializationById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const result = await pool.query(
//       'SELECT * FROM specializations WHERE id = $1',
//       [id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ 
//         success: false, 
//         error: 'Specialization not found' 
//       });
//     }
    
//     res.json({ 
//       success: true, 
//       data: result.rows[0] 
//     });
//   } catch (error) {
//     console.error('Error fetching specialization:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// };

const getSpecializationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Получаем специализацию
    const specializationResult = await pool.query(
      'SELECT * FROM specializations WHERE id = $1',
      [id]
    );
    
    if (specializationResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Specialization not found' 
      });
    }
    
    // Получаем связанные скиллы
    const skillsResult = await pool.query(
      `SELECT s.id, s.title 
       FROM skills s
       INNER JOIN specialization_to_skill sts ON s.id = sts.skill_id
       WHERE sts.specialization_id = $1`,
      [id]
    );
    
    // Формируем ответ
    const specialization = {
      ...specializationResult.rows[0],
      skills: skillsResult.rows
    };
    
    res.json({ 
      success: true, 
      data: specialization
    });
  } catch (error) {
    console.error('Error fetching specialization:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const createSpecialization = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO specializations (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating specialization:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Specialization with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const updateSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const result = await pool.query(
      `UPDATE specializations SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description)
      WHERE id = $3 RETURNING *`,
      [title, description, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Specialization not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating specialization:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

const deleteSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM specializations WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Specialization not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Specialization deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting specialization:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getAllSpecializations,
  getSpecializationById,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
};

