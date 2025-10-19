const express = require('express');
const router = express.Router();
const {
  getAllRoleToUserToCommunity,
  getRoleToUserToCommunityById,
  createRoleToUserToCommunity,
  deleteRoleToUserToCommunity,
} = require('../controllers/roleToUserToCommunityController');

/**
 * @swagger
 * tags:
 *   name: RoleToUserToCommunity
 *   description: Управление связями ролей, пользователей и сообществ
 */

/**
 * @swagger
 * /api/role-to-user-to-community:
 *   get:
 *     summary: Получить все связи ролей, пользователей и сообществ
 *     tags: [RoleToUserToCommunity]
 *     responses:
 *       200:
 *         description: Список связей успешно получен
 *   post:
 *     summary: Создать связь роли, пользователя и сообщества
 *     tags: [RoleToUserToCommunity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - community_id
 *               - role_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               community_id:
 *                 type: string
 *                 format: uuid
 *               role_id:
 *                 type: string
 *                 format: uuid
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.get('/', getAllRoleToUserToCommunity);
router.post('/', createRoleToUserToCommunity);

/**
 * @swagger
 * /api/role-to-user-to-community/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     tags: [RoleToUserToCommunity]
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
 *     tags: [RoleToUserToCommunity]
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
router.get('/:id', getRoleToUserToCommunityById);
router.delete('/:id', deleteRoleToUserToCommunity);

module.exports = router;

