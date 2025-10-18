const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Управление навыками
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Получить список всех навыков
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Список навыков успешно получен
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllSkills);

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Получить навык по ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Навык найден
 *       404:
 *         description: Навык не найден
 */
router.get('/:id', getSkillById);

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Создать новый навык
 *     tags: [Skills]
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
 *         description: Навык успешно создан
 *       400:
 *         description: Неверные данные
 */
router.post('/', createSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Обновить навык
 *     tags: [Skills]
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
 *         description: Навык обновлен
 *       404:
 *         description: Навык не найден
 */
router.put('/:id', updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Удалить навык
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Навык удален
 *       404:
 *         description: Навык не найден
 */
router.delete('/:id', deleteSkill);

module.exports = router;

