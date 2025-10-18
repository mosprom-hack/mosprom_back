const express = require('express');
const router = express.Router();
const {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/educationController');

/**
 * @swagger
 * tags:
 *   name: Educations
 *   description: Управление образованием
 */

/**
 * @swagger
 * /api/educations:
 *   get:
 *     summary: Получить список всех образований
 *     tags: [Educations]
 *     responses:
 *       200:
 *         description: Список образований успешно получен
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
 *                     $ref: '#/components/schemas/Education'
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllEducations);

/**
 * @swagger
 * /api/educations/{id}:
 *   get:
 *     summary: Получить образование по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Образование найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       404:
 *         description: Образование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getEducationById);

/**
 * @swagger
 * /api/educations:
 *   post:
 *     summary: Создать новое образование
 *     tags: [Educations]
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
 *         description: Образование успешно создано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       400:
 *         description: Неверные данные
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createEducation);

/**
 * @swagger
 * /api/educations/{id}:
 *   put:
 *     summary: Обновить образование
 *     tags: [Educations]
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
 *         description: Образование обновлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       404:
 *         description: Образование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateEducation);

/**
 * @swagger
 * /api/educations/{id}:
 *   delete:
 *     summary: Удалить образование
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Образование удалено
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
 *                   example: Education deleted
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       404:
 *         description: Образование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteEducation);

module.exports = router;
