const express = require('express');
const router = express.Router();
const {
  getAllSpecializationToSkill,
  getSpecializationToSkillById,
  createSpecializationToSkill,
  deleteSpecializationToSkill,
} = require('../controllers/specializationToSkillController');

/**
 * @swagger
 * tags:
 *   name: SpecializationToSkill
 *   description: Управление связями специализаций и навыков
 */

/**
 * @swagger
 * /api/specialization-to-skill:
 *   get:
 *     summary: Получить все связи специализаций и навыков
 *     tags: [SpecializationToSkill]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь специализации и навыка
 *     tags: [SpecializationToSkill]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialization_id
 *               - skill_id
 *             properties:
 *               specialization_id:
 *                 type: string
 *                 format: uuid
 *               skill_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.get('/', getAllSpecializationToSkill);
router.post('/', createSpecializationToSkill);

/**
 * @swagger
 * /api/specialization-to-skill/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [SpecializationToSkill]
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
 *     tags: [SpecializationToSkill]
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
router.get('/:id', getSpecializationToSkillById);
router.delete('/:id', deleteSpecializationToSkill);

module.exports = router;

