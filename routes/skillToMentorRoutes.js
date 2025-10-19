const express = require('express');
const router = express.Router();
const {
  getAllSkillToMentor,
  getSkillToMentorById,
  createSkillToMentor,
  deleteSkillToMentor,
} = require('../controllers/skillToMentorController');

/**
 * @swagger
 * tags:
 *   name: SkillToMentor
 *   description: Управление связями навыков и менторов
 */

/**
 * @swagger
 * /api/skill-to-mentor:
 *   get:
 *     summary: Получить все связи навыков и менторов
 *     tags: [SkillToMentor]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь навыка и ментора
 *     tags: [SkillToMentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skill_id
 *               - mentor_id
 *             properties:
 *               skill_id:
 *                 type: string
 *                 format: uuid
 *               mentor_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.get('/', getAllSkillToMentor);
router.post('/', createSkillToMentor);

/**
 * @swagger
 * /api/skill-to-mentor/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [SkillToMentor]
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
 *     tags: [SkillToMentor]
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
router.get('/:id', getSkillToMentorById);
router.delete('/:id', deleteSkillToMentor);

module.exports = router;

