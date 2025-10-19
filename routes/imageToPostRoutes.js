const express = require('express');
const router = express.Router();
const {
  getAllImageToPosts,
  getImageToPostById,
  createImageToPost,
  deleteImageToPost,
} = require('../controllers/imageToPostController');

/**
 * @swagger
 * tags:
 *   name: ImageToPost
 *   description: Управление связями изображений с постами
 */

/**
 * @swagger
 * /api/image-to-post:
 *   get:
 *     summary: Получить список всех связей
 *     tags: [ImageToPost]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 */
router.get('/', getAllImageToPosts);

/**
 * @swagger
 * /api/image-to-post/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [ImageToPost]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Связь найдена
 */
router.get('/:id', getImageToPostById);

/**
 * @swagger
 * /api/image-to-post:
 *   post:
 *     summary: Создать новую связь изображения с постом
 *     tags: [ImageToPost]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageToPostInput'
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.post('/', createImageToPost);

/**
 * @swagger
 * /api/image-to-post/{id}:
 *   delete:
 *     summary: Удалить связь
 *     tags: [ImageToPost]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Связь удалена
 */
router.delete('/:id', deleteImageToPost);

module.exports = router;