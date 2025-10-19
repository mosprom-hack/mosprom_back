const pool = require('../db');

const getAllLikes = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM likes ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM likes WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Like not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching like:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getLikesByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM likes WHERE post_id = $1 ORDER BY created_at DESC',
      [post_id]
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching likes by post_id:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching likes by user_id:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createLike = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    
    if (!post_id || !user_id) {
      return res.status(400).json({
        success: false,
        error: 'post_id and user_id are required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
      [post_id, user_id]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating like:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        error: 'User already liked this post'
      });
    }
    
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'Post or User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM likes WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Like not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Like deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteLikeByUserAndPost = async (req, res) => {
  try {
    const { post_id, user_id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *',
      [post_id, user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Like not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Like deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllLikes,
  getLikeById,
  getLikesByPostId,
  getLikesByUserId,
  createLike,
  deleteLike,
  deleteLikeByUserAndPost,
};