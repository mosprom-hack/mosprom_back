const express = require('express');
const router = express.Router();
const {
  getAllEducationToUser,
  getEducationToUserById,
  createEducationToUser,
  deleteEducationToUser,
} = require('../controllers/educationToUserController');

/**
 * @swagger
 * tags:
 *   name: EducationToUser
 *   description: Управление связями образования и пользователей
 */

/**
 * @swagger
 * /api/education-to-user:
 *   get:
 *     summary: Получить все связи образования и пользователей
 *     tags: [EducationToUser]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь образования и пользователя
 *     tags: [EducationToUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - education_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               education_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.get('/', getAllEducationToUser);
router.post('/', createEducationToUser);

/**
 * @swagger
 * /api/education-to-user/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [EducationToUser]
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
 *   delete:
 *     summary: Удалить связь
 *     tags: [EducationToUser]
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
router.get('/:id', getEducationToUserById);
router.delete('/:id', deleteEducationToUser);

module.exports = router;

