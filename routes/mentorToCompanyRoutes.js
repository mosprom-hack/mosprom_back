const express = require('express');
const router = express.Router();
const {
  getAllMentorToCompany,
  getMentorToCompanyById,
  createMentorToCompany,
  deleteMentorToCompany,
} = require('../controllers/mentorToCompanyController');

/**
 * @swagger
 * tags:
 *   name: MentorToCompany
 *   description: Управление связями менторов и компаний
 */

/**
 * @swagger
 * /api/mentor-to-company:
 *   get:
 *     summary: Получить все связи менторов и компаний
 *     tags: [MentorToCompany]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь ментора и компании (один ментор - одна компания)
 *     tags: [MentorToCompany]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentor_id
 *               - company_id
 *             properties:
 *               mentor_id:
 *                 type: string
 *                 format: uuid
 *               company_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 *       400:
 *         description: Ментор уже привязан к компании
 */
router.get('/', getAllMentorToCompany);
router.post('/', createMentorToCompany);

/**
 * @swagger
 * /api/mentor-to-company/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [MentorToCompany]
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
 *     tags: [MentorToCompany]
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
router.get('/:id', getMentorToCompanyById);
router.delete('/:id', deleteMentorToCompany);

module.exports = router;

