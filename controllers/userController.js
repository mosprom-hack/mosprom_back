const pool = require('../db');

// Получить всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    res.json({ 
      success: true, 
      count: result.rows.length,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Получить пользователя по ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Получаем основную информацию о пользователе
    const userResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    const user = userResult.rows[0];
    
    // // Получаем категории пользователя
    // const categoriesResult = await pool.query(`
    //   SELECT c.* FROM categories c
    //   INNER JOIN category_to_user ctu ON c.id = ctu.category_id
    //   WHERE ctu.user_id = $1
    // `, [id]);
    
    // // Получаем образование пользователя
    // const educationsResult = await pool.query(`
    //   SELECT e.* FROM educations e
    //   INNER JOIN education_to_user etu ON e.id = etu.education_id
    //   WHERE etu.user_id = $1
    // `, [id]);
    
    // // Получаем навыки пользователя
    // const skillsResult = await pool.query(`
    //   SELECT s.* FROM skills s
    //   INNER JOIN skill_to_user stu ON s.id = stu.skill_id
    //   WHERE stu.user_id = $1
    // `, [id]);
    
    // // Получаем проекты пользователя
    // const projectsResult = await pool.query(
    //   'SELECT * FROM user_projects WHERE user_id = $1',
    //   [id]
    // );
    
    // // Получаем сообщества и роли пользователя
    // const communitiesResult = await pool.query(`
    //   SELECT 
    //     c.*,
    //     r.title as role_title,
    //     rutc.description as role_description,
    //     rutc.created_at as joined_at
    //   FROM communities c
    //   INNER JOIN role_to_user_to_community rutc ON c.id = rutc.community_id
    //   INNER JOIN roles r ON rutc.role_id = r.id
    //   WHERE rutc.user_id = $1
    // `, [id]);
    
    // Собираем полный профиль
    const fullProfile = {
      ...user,
    //   categories: categoriesResult.rows,
    //   educations: educationsResult.rows,
    //   skills: skillsResult.rows,
    //   projects: projectsResult.rows,
    //   communities: communitiesResult.rows
    };
    
    res.json({ 
      success: true, 
      data: fullProfile 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Создать пользователя
const createUser = async (req, res) => {
  try {
    const { nickname, first_name, last_name, phone, email, photo_url, description } = req.body;
    
    if (!nickname || !first_name || !last_name) {
      return res.status(400).json({ 
        success: false, 
        error: 'Nickname, first_name and last_name are required' 
      });
    }
    
    const result = await pool.query(
      `INSERT INTO users (nickname, first_name, last_name, phone, email, photo_url, description) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nickname, first_name, last_name, phone, email, photo_url, description]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ 
        success: false, 
        error: 'Nickname, phone or email already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Обновить пользователя
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, first_name, last_name, phone, email, photo_url, description } = req.body;
    
    const result = await pool.query(
      `UPDATE users SET 
        nickname = COALESCE($1, nickname),
        first_name = COALESCE($2, first_name),
        last_name = COALESCE($3, last_name),
        phone = COALESCE($4, phone),
        email = COALESCE($5, email),
        photo_url = COALESCE($6, photo_url),
        description = COALESCE($7, description)
      WHERE id = $8 RETURNING *`,
      [nickname, first_name, last_name, phone, email, photo_url, description, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Удалить пользователя
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'User deleted',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// // Добавить категорию пользователю
// const addCategoryToUser = async (req, res) => {
//   try {
//     const { userId, categoryId } = req.body;
    
//     if (!userId || !categoryId) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'userId and categoryId are required' 
//       });
//     }
    
//     const result = await pool.query(
//       'INSERT INTO category_to_user (user_id, category_id) VALUES ($1, $2) RETURNING *',
//       [userId, categoryId]
//     );
    
//     res.status(201).json({ 
//       success: true, 
//       data: result.rows[0] 
//     });
//   } catch (error) {
//     console.error('Error adding category to user:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// };

// // Добавить навык пользователю
// const addSkillToUser = async (req, res) => {
//   try {
//     const { userId, skillId } = req.body;
    
//     if (!userId || !skillId) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'userId and skillId are required' 
//       });
//     }
    
//     const result = await pool.query(
//       'INSERT INTO skill_to_user (user_id, skill_id) VALUES ($1, $2) RETURNING *',
//       [userId, skillId]
//     );
    
//     res.status(201).json({ 
//       success: true, 
//       data: result.rows[0] 
//     });
//   } catch (error) {
//     console.error('Error adding skill to user:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// };

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  //addCategoryToUser,
  //addSkillToUser
};