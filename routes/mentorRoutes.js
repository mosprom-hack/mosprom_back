const express = require('express');
const router = express.Router();
const {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor,
} = require('../controllers/mentorController');

/**
 * @swagger
 * tags:
 *   name: Mentors
 *   description: Управление менторами
 */

/**
 * @swagger
 * /api/mentors:
 *   get:
 *     summary: Получить список всех менторов
 *     tags: [Mentors]
 *     responses:
 *       200:
 *         description: Список менторов успешно получен
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
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       photo_url:
 *                         type: string
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllMentors);

/**
 * @swagger
 * /api/mentors/{id}:
 *   get:
 *     summary: Получить ментора по ID
 *     tags: [Mentors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID ментора
 *     responses:
 *       200:
 *         description: Ментор найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Mentor'
 *       404:
 *         description: Ментор не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getMentorById);

/**
 * @swagger
 * /api/mentors:
 *   post:
 *     summary: Создать нового ментора
 *     tags: [Mentors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MentorInput'
 *     responses:
 *       201:
 *         description: Ментор успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Mentor'
 *       400:
 *         description: Неверные данные или ментор с такими данными уже существует
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createMentor);

/**
 * @swagger
 * /api/mentors/{id}:
 *   put:
 *     summary: Обновить данные ментора
 *     tags: [Mentors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID ментора
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MentorUpdate'
 *     responses:
 *       200:
 *         description: Ментор успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Mentor'
 *       404:
 *         description: Ментор не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateMentor);

/**
 * @swagger
 * /api/mentors/{id}:
 *   delete:
 *     summary: Удалить ментора
 *     tags: [Mentors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID ментора
 *     responses:
 *       200:
 *         description: Ментор успешно удален
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
 *                   example: Mentor deleted
 *                 data:
 *                   $ref: '#/components/schemas/Mentor'
 *       404:
 *         description: Ментор не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteMentor);

module.exports = router;

