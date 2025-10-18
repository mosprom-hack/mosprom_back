const express = require('express');
const router = express.Router();
const {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} = require('../controllers/communityController');

/**
 * @swagger
 * tags:
 *   name: Communities
 *   description: Управление сообществами
 */

/**
 * @swagger
 * /api/communities:
 *   get:
 *     summary: Получить список всех сообществ
 *     tags: [Communities]
 *     responses:
 *       200:
 *         description: Список сообществ успешно получен
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllCommunities);

/**
 * @swagger
 * /api/communities/{id}:
 *   get:
 *     summary: Получить сообщество по ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Сообщество найдено
 *       404:
 *         description: Сообщество не найдено
 */
router.get('/:id', getCommunityById);

/**
 * @swagger
 * /api/communities:
 *   post:
 *     summary: Создать новое сообщество
 *     tags: [Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Сообщество успешно создано
 *       400:
 *         description: Неверные данные
 */
router.post('/', createCommunity);

/**
 * @swagger
 * /api/communities/{id}:
 *   put:
 *     summary: Обновить сообщество
 *     tags: [Communities]
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
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Сообщество обновлено
 *       404:
 *         description: Сообщество не найдено
 */
router.put('/:id', updateCommunity);

/**
 * @swagger
 * /api/communities/{id}:
 *   delete:
 *     summary: Удалить сообщество
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Сообщество удалено
 *       404:
 *         description: Сообщество не найдено
 */
router.delete('/:id', deleteCommunity);

module.exports = router;

