const express = require('express');
const router = express.Router();
const {
  getAllLikes,
  getLikeById,
  getLikesByPostId,
  getLikesByUserId,
  createLike,
  deleteLike,
  deleteLikeByUserAndPost,
} = require('../controllers/likeController');

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Управление лайками
 */

/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Получить список всех лайков
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: Список лайков успешно получен
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
 *                     $ref: '#/components/schemas/Like'
 */
router.get('/', getAllLikes);

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     summary: Получить лайк по ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Лайк найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Like'
 *       404:
 *         description: Лайк не найден
 */
router.get('/:id', getLikeById);

/**
 * @swagger
 * /api/likes/post/{post_id}:
 *   get:
 *     summary: Получить лайки по post_id
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Список лайков поста
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
 *                     $ref: '#/components/schemas/Like'
 */
router.get('/post/:post_id', getLikesByPostId);

/**
 * @swagger
 * /api/likes/user/{user_id}:
 *   get:
 *     summary: Получить лайки по user_id
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Список лайков пользователя
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
 *                     $ref: '#/components/schemas/Like'
 */
router.get('/user/:user_id', getLikesByUserId);

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Создать новый лайк
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikeInput'
 *     responses:
 *       201:
 *         description: Лайк успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Like'
 *       400:
 *         description: Ошибка (пользователь уже лайкнул пост)
 */
router.post('/', createLike);

/**
 * @swagger
 * /api/likes/{id}:
 *   delete:
 *     summary: Удалить лайк по ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Лайк удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Like deleted
 *       404:
 *         description: Лайк не найден
 */
router.delete('/:id', deleteLike);

/**
 * @swagger
 * /api/likes/post/{post_id}/user/{user_id}:
 *   delete:
 *     summary: Удалить лайк по post_id и user_id (анлайк)
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Лайк удален
 *       404:
 *         description: Лайк не найден
 */
router.delete('/post/:post_id/user/:user_id', deleteLikeByUserAndPost);

module.exports = router;