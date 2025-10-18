const express = require('express');
const router = express.Router();
const {
  getAllUserProjects,
  getUserProjectById,
  createUserProject,
  updateUserProject,
  deleteUserProject,
} = require('../controllers/userProjectController');

/**
 * @swagger
 * tags:
 *   name: UserProjects
 *   description: Управление проектами пользователей
 */

/**
 * @swagger
 * /api/user-projects:
 *   get:
 *     summary: Получить список всех проектов пользователей
 *     tags: [UserProjects]
 *     responses:
 *       200:
 *         description: Список проектов успешно получен
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllUserProjects);

/**
 * @swagger
 * /api/user-projects/{id}:
 *   get:
 *     summary: Получить проект по ID
 *     tags: [UserProjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Проект найден
 *       404:
 *         description: Проект не найден
 */
router.get('/:id', getUserProjectById);

/**
 * @swagger
 * /api/user-projects:
 *   post:
 *     summary: Создать новый проект
 *     tags: [UserProjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - link
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Проект успешно создан
 *       400:
 *         description: Неверные данные
 */
router.post('/', createUserProject);

/**
 * @swagger
 * /api/user-projects/{id}:
 *   put:
 *     summary: Обновить проект
 *     tags: [UserProjects]
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
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Проект обновлен
 *       404:
 *         description: Проект не найден
 */
router.put('/:id', updateUserProject);

/**
 * @swagger
 * /api/user-projects/{id}:
 *   delete:
 *     summary: Удалить проект
 *     tags: [UserProjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Проект удален
 *       404:
 *         description: Проект не найден
 */
router.delete('/:id', deleteUserProject);

module.exports = router;

