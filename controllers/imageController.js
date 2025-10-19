const pool = require('../db');

const getAllImages = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM images'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM images WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createImage = async (req, res) => {
  try {
    const { image_url } = req.body;
    
    if (!image_url) {
      return res.status(400).json({
        success: false,
        error: 'image_url is required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO images (image_url) VALUES ($1) RETURNING *',
      [image_url]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating image:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        error: 'Image with this URL already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;
    
    const result = await pool.query(
      'UPDATE images SET image_url = COALESCE($1, image_url) WHERE id = $2 RETURNING *',
      [image_url, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating image:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        error: 'Image with this URL already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM images WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Image deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};