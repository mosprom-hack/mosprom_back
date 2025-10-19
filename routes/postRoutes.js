const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  getPostsByCommunityId,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Управление постами
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Получить список всех постов
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Список постов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Получить пост по ID со списком изображений
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Пост найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PostWithImages'
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /api/posts/community/{community_id}:
 *   get:
 *     summary: Получить посты по community_id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Список постов сообщества
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/community/:community_id', getPostsByCommunityId);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Создать новый пост
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Пост успешно создан
 */
router.post('/', createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Обновить пост
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Пост обновлен
 */
router.put('/:id', updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Удалить пост
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Пост удален
 */
router.delete('/:id', deletePost);

module.exports = router;