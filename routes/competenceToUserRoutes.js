const express = require('express');
const router = express.Router();
const {
  getAllCompetences,
  getCompetenceById,
  getCompetenceByUserId,
  createCompetence,
  updateCompetence,
  deleteCompetence,
} = require('../controllers/competenceToUserController');

/**
 * @swagger
 * tags:
 *   name: CompetencesToUser
 *   description: Управление компетенциями пользователей
 */

/**
 * @swagger
 * /api/competences-to-user:
 *   get:
 *     summary: Получить список всех компетенций
 *     tags: [CompetencesToUser]
 *     responses:
 *       200:
 *         description: Список компетенций успешно получен
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
 *                     $ref: '#/components/schemas/CompetenceToUser'
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllCompetences);

/**
 * @swagger
 * /api/competences-to-user/{id}:
 *   get:
 *     summary: Получить компетенцию по ID
 *     tags: [CompetencesToUser]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Компетенция найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CompetenceToUser'
 *       404:
 *         description: Компетенция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getCompetenceById);

/**
 * @swagger
 * /api/competences-to-user/user/{user_id}:
 *   get:
 *     summary: Получить компетенцию по user_id
 *     tags: [CompetencesToUser]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Компетенция пользователя найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CompetenceToUser'
 *       404:
 *         description: Компетенция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/user/:user_id', getCompetenceByUserId);

/**
 * @swagger
 * /api/competences-to-user:
 *   post:
 *     summary: Создать новую компетенцию для пользователя
 *     tags: [CompetencesToUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompetenceToUserInput'
 *     responses:
 *       201:
 *         description: Компетенция успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CompetenceToUser'
 *       400:
 *         description: Неверные данные
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createCompetence);

/**
 * @swagger
 * /api/competences-to-user/{id}:
 *   put:
 *     summary: Обновить компетенцию
 *     tags: [CompetencesToUser]
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
 *             $ref: '#/components/schemas/CompetenceToUserUpdate'
 *     responses:
 *       200:
 *         description: Компетенция обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CompetenceToUser'
 *       404:
 *         description: Компетенция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateCompetence);

/**
 * @swagger
 * /api/competences-to-user/{id}:
 *   delete:
 *     summary: Удалить компетенцию
 *     tags: [CompetencesToUser]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Компетенция удалена
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
 *                   example: Competence deleted
 *                 data:
 *                   $ref: '#/components/schemas/CompetenceToUser'
 *       404:
 *         description: Компетенция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteCompetence);

module.exports = router;