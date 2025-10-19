const express = require('express');
const router = express.Router();
const {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} = require('../controllers/imageController');

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Управление изображениями
 */

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Получить список всех изображений
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Список изображений успешно получен
 */
router.get('/', getAllImages);

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Получить изображение по ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Изображение найдено
 */
router.get('/:id', getImageById);

/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Создать новое изображение
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageInput'
 *     responses:
 *       201:
 *         description: Изображение успешно создано
 */
router.post('/', createImage);

/**
 * @swagger
 * /api/images/{id}:
 *   put:
 *     summary: Обновить изображение
 *     tags: [Images]
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
 *             $ref: '#/components/schemas/ImageUpdate'
 *     responses:
 *       200:
 *         description: Изображение обновлено
 */
router.put('/:id', updateImage);

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     summary: Удалить изображение
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Изображение удалено
 */
router.delete('/:id', deleteImage);

module.exports = router;