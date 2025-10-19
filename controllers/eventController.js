const pool = require('../db');

const getAllEvents = async (req, res) => {
  try {
    const { type } = req.query; // Получаем параметр type из query
    
    let query = 'SELECT * FROM events';
    let params = [];
    
    if (type) {
      query += ' WHERE type = $1';
      params.push(type);
    }
    
    query += ' ORDER BY release DESC';
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM events WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getEventsByCommunityId = async (req, res) => {
  try {
    const { community_id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM events WHERE community_id = $1 ORDER BY release DESC',
      [community_id]
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching events by community_id:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, topic, type, location, image_url, community_id, release } = req.body;
    
    if (!title || !topic || !type || !release) {
      return res.status(400).json({
        success: false,
        error: 'Required fields: title, topic, type, release'
      });
    }
    
    const result = await pool.query(
      `INSERT INTO events 
       (title, description, topic, type, location, image_url, community_id, release) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, description, topic, type, location, image_url, community_id, release]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating event:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'Community not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, topic, type, location, image_url, community_id, release } = req.body;
    
    const result = await pool.query(
      `UPDATE events 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           topic = COALESCE($3, topic),
           type = COALESCE($4, type),
           location = COALESCE($5, location),
           image_url = COALESCE($6, image_url),
           community_id = COALESCE($7, community_id),
           release = COALESCE($8, release)
       WHERE id = $9 
       RETURNING *`,
      [title, description, topic, type, location, image_url, community_id, release, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating event:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'Community not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM events WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getEventsByCommunityId,
  createEvent,
  updateEvent,
  deleteEvent,
};