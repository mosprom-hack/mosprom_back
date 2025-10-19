const express = require('express');
const router = express.Router();
const {
  getAllSkillToUser,
  getSkillToUserById,
  createSkillToUser,
  deleteSkillToUser,
} = require('../controllers/skillToUserController');

/**
 * @swagger
 * tags:
 *   name: SkillToUser
 *   description: Управление связями навыков и пользователей
 */

/**
 * @swagger
 * /api/skill-to-user:
 *   get:
 *     summary: Получить все связи навыков и пользователей
 *     tags: [SkillToUser]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь навыка и пользователя
 *     tags: [SkillToUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - skill_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               skill_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.get('/', getAllSkillToUser);
router.post('/', createSkillToUser);

/**
 * @swagger
 * /api/skill-to-user/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [SkillToUser]
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
 *     tags: [SkillToUser]
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
router.get('/:id', getSkillToUserById);
router.delete('/:id', deleteSkillToUser);

module.exports = router;

