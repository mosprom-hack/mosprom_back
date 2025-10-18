const express = require('express');
const router = express.Router();
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Управление ролями
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Получить список всех ролей
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Список ролей успешно получен
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Получить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Роль найдена
 *       404:
 *         description: Роль не найдена
 */
router.get('/:id', getRoleById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Создать новую роль
 *     tags: [Roles]
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
 *         description: Роль успешно создана
 *       400:
 *         description: Неверные данные
 */
router.post('/', createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Обновить роль
 *     tags: [Roles]
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
 *         description: Роль обновлена
 *       404:
 *         description: Роль не найдена
 */
router.put('/:id', updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Удалить роль
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Роль удалена
 *       404:
 *         description: Роль не найдена
 */
router.delete('/:id', deleteRole);

module.exports = router;

