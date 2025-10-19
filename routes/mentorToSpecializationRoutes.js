const express = require('express');
const router = express.Router();
const {
  getAllMentorToSpecialization,
  getMentorToSpecializationById,
  createMentorToSpecialization,
  deleteMentorToSpecialization,
} = require('../controllers/mentorToSpecializationController');

/**
 * @swagger
 * tags:
 *   name: MentorToSpecialization
 *   description: Управление связями менторов и специализаций
 */

/**
 * @swagger
 * /api/mentor-to-specialization:
 *   get:
 *     summary: Получить все связи менторов и специализаций
 *     tags: [MentorToSpecialization]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь ментора и специализации
 *     tags: [MentorToSpecialization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentor_id
 *               - specialization_id
 *             properties:
 *               mentor_id:
 *                 type: string
 *                 format: uuid
 *               specialization_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.get('/', getAllMentorToSpecialization);
router.post('/', createMentorToSpecialization);

/**
 * @swagger
 * /api/mentor-to-specialization/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [MentorToSpecialization]
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
 *   delete:
 *     summary: Удалить связь
 *     tags: [MentorToSpecialization]
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
router.get('/:id', getMentorToSpecializationById);
router.delete('/:id', deleteMentorToSpecialization);

module.exports = router;

