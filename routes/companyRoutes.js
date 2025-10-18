const express = require('express');
const router = express.Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Управление компаниями
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Получить список всех компаний
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Список компаний успешно получен
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Получить компанию по ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Компания найдена
 *       404:
 *         description: Компания не найдена
 */
router.get('/:id', getCompanyById);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Создать новую компанию
 *     tags: [Companies]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Компания успешно создана
 *       400:
 *         description: Неверные данные
 */
router.post('/', createCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Обновить компанию
 *     tags: [Companies]
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
 *     responses:
 *       200:
 *         description: Компания обновлена
 *       404:
 *         description: Компания не найдена
 */
router.put('/:id', updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Удалить компанию
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Компания удалена
 *       404:
 *         description: Компания не найдена
 */
router.delete('/:id', deleteCompany);

module.exports = router;

