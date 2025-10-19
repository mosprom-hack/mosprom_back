const express = require('express');
const router = express.Router();
const {
  getAllCategoryToUser,
  getCategoryToUserById,
  createCategoryToUser,
  deleteCategoryToUser,
} = require('../controllers/categoryToUserController');

/**
 * @swagger
 * tags:
 *   name: CategoryToUser
 *   description: Управление связями категорий и пользователей
 */

/**
 * @swagger
 * /api/category-to-user:
 *   get:
 *     summary: Получить все связи категорий и пользователей
 *     tags: [CategoryToUser]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
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
 *                     $ref: '#/components/schemas/CategoryToUser'
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllCategoryToUser);

/**
 * @swagger
 * /api/category-to-user/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [CategoryToUser]
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
 *       404:
 *         description: Связь не найдена
 */
router.get('/:id', getCategoryToUserById);

/**
 * @swagger
 * /api/category-to-user:
 *   post:
 *     summary: Создать связь категории и пользователя
 *     tags: [CategoryToUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - category_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               category_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 *       400:
 *         description: Неверные данные
 */
router.post('/', createCategoryToUser);

/**
 * @swagger
 * /api/category-to-user/{id}:
 *   delete:
 *     summary: Удалить связь
 *     tags: [CategoryToUser]
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
 *       404:
 *         description: Связь не найдена
 */
router.delete('/:id', deleteCategoryToUser);

module.exports = router;

