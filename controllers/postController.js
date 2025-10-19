const pool = require('../db');

const getAllPosts = async (req, res) => {
    try {
      // Получаем все посты с информацией о сообществах
      const postsResult = await pool.query(
        `SELECT 
          p.id,
          p.description,
          p.community_id,
          p.created_at,
          c.id as community_id,
          c.title as community_title,
          c.photo_url as community_photo_url
         FROM posts p
         LEFT JOIN communities c ON p.community_id = c.id
         ORDER BY p.created_at DESC`
      );
      
      // Для каждого поста получаем изображения и лайки
      const posts = await Promise.all(
        postsResult.rows.map(async (row) => {
          // Получаем изображения
          const imagesResult = await pool.query(
            `SELECT i.id, i.image_url 
             FROM images i
             INNER JOIN image_to_post itp ON i.id = itp.image_id
             WHERE itp.post_id = $1`,
            [row.id]
          );
          
          // Получаем лайки
          const likesResult = await pool.query(
            `SELECT l.id, l.user_id, l.created_at 
             FROM likes l
             WHERE l.post_id = $1
             ORDER BY l.created_at DESC`,
            [row.id]
          );
          
          return {
            id: row.id,
            description: row.description,
            created_at: row.created_at,
            community: {
              id: row.community_id,
              title: row.community_title,
              photo_url: row.community_photo_url
            },
            images: imagesResult.rows,
            likes: likesResult.rows
          };
        })
      );
      
      res.json({
        success: true,
        count: posts.length,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  const getPostById = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Получаем пост с информацией о сообществе
      const postResult = await pool.query(
        `SELECT 
          p.id,
          p.description,
          p.community_id,
          p.created_at,
          c.id as community_id,
          c.title as community_title,
          c.photo_url as community_photo_url
         FROM posts p
         LEFT JOIN communities c ON p.community_id = c.id
         WHERE p.id = $1`,
        [id]
      );
      
      if (postResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Post not found'
        });
      }
      
      // Получаем связанные изображения
      const imagesResult = await pool.query(
        `SELECT i.id, i.image_url 
         FROM images i
         INNER JOIN image_to_post itp ON i.id = itp.image_id
         WHERE itp.post_id = $1`,
        [id]
      );
      
      // Получаем лайки
      const likesResult = await pool.query(
        `SELECT l.id, l.user_id, l.created_at 
         FROM likes l
         WHERE l.post_id = $1
         ORDER BY l.created_at DESC`,
        [id]
      );
      
      // Формируем ответ
      const row = postResult.rows[0];
      const post = {
        id: row.id,
        description: row.description,
        created_at: row.created_at,
        community: {
          id: row.community_id,
          title: row.community_title,
          photo_url: row.community_photo_url
        },
        images: imagesResult.rows,
        likes: likesResult.rows
      };
      
      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  const getPostsByCommunityId = async (req, res) => {
    try {
      const { community_id } = req.params;
      
      // Получаем посты сообщества с информацией о сообществе
      const postsResult = await pool.query(
        `SELECT 
          p.id,
          p.description,
          p.community_id,
          p.created_at,
          c.id as community_id,
          c.title as community_title,
          c.photo_url as community_photo_url
         FROM posts p
         LEFT JOIN communities c ON p.community_id = c.id
         WHERE p.community_id = $1
         ORDER BY p.created_at DESC`,
        [community_id]
      );
      
      // Для каждого поста получаем изображения и лайки
      const posts = await Promise.all(
        postsResult.rows.map(async (row) => {
          // Получаем изображения
          const imagesResult = await pool.query(
            `SELECT i.id, i.image_url 
             FROM images i
             INNER JOIN image_to_post itp ON i.id = itp.image_id
             WHERE itp.post_id = $1`,
            [row.id]
          );
          
          // Получаем лайки
          const likesResult = await pool.query(
            `SELECT l.id, l.user_id, l.created_at 
             FROM likes l
             WHERE l.post_id = $1
             ORDER BY l.created_at DESC`,
            [row.id]
          );
          
          return {
            id: row.id,
            description: row.description,
            created_at: row.created_at,
            community: {
              id: row.community_id,
              title: row.community_title,
              photo_url: row.community_photo_url
            },
            images: imagesResult.rows,
            likes: likesResult.rows
          };
        })
      );
      
      res.json({
        success: true,
        count: posts.length,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching posts by community_id:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

const createPost = async (req, res) => {
  try {
    const { description, community_id } = req.body;
    
    if (!community_id) {
      return res.status(400).json({
        success: false,
        error: 'community_id is required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO posts (description, community_id) VALUES ($1, $2) RETURNING *',
      [description, community_id]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating post:', error);
    
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

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, community_id } = req.body;
    
    const result = await pool.query(
      `UPDATE posts 
       SET description = COALESCE($1, description),
           community_id = COALESCE($2, community_id)
       WHERE id = $3 
       RETURNING *`,
      [description, community_id, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating post:', error);
    
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

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByCommunityId,
  createPost,
  updatePost,
  deletePost,
};