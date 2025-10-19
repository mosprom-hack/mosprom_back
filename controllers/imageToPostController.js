const pool = require('../db');

const getAllImageToPosts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM image_to_post'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching image_to_post:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getImageToPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM image_to_post WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'ImageToPost not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching image_to_post:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createImageToPost = async (req, res) => {
  try {
    const { post_id, image_id } = req.body;
    
    if (!post_id || !image_id) {
      return res.status(400).json({
        success: false,
        error: 'post_id and image_id are required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO image_to_post (post_id, image_id) VALUES ($1, $2) RETURNING *',
      [post_id, image_id]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating image_to_post:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'Post or Image not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteImageToPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM image_to_post WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'ImageToPost not found'
      });
    }
    
    res.json({
      success: true,
      message: 'ImageToPost deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting image_to_post:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllImageToPosts,
  getImageToPostById,
  createImageToPost,
  deleteImageToPost,
};