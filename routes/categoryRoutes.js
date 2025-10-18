const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Управление категориями
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Получить список всех категорий
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Список категорий успешно получен
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Получить категорию по ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Категория найдена
 *       404:
 *         description: Категория не найдена
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Создать новую категорию
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категория успешно создана
 *       400:
 *         description: Неверные данные
 */
router.post('/', createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Обновить категорию
 *     tags: [Categories]
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Категория обновлена
 *       404:
 *         description: Категория не найдена
 */
router.put('/:id', updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Удалить категорию
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Категория удалена
 *       404:
 *         description: Категория не найдена
 */
router.delete('/:id', deleteCategory);

module.exports = router;

