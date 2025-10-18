const express = require('express');
const pool = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============= ROUTES =============

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Главная страница API
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Информация об API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 endpoints:
 *                   type: object
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Mikron API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      mentors: '/api/mentors',
      health: '/health',
      docs: '/api-docs'
    }
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Проверка работоспособности сервера и подключения к БД
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Сервер работает нормально
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 database:
 *                   type: string
 *                   example: Connected
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Ошибка подключения к БД
 */
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ 
      status: 'OK', 
      database: 'Connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      database: 'Disconnected',
      error: error.message 
    });
  }
});

// Подключение маршрутов
const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
//const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
//app.use('/api/categories', categoryRoutes);

// TODO: Добавить остальные маршруты по мере создания контроллеров
// app.use('/api/educations', educationRoutes);
// app.use('/api/skills', skillRoutes);
// app.use('/api/communities', communityRoutes);
// app.use('/api/roles', roleRoutes);
// app.use('/api/projects', projectRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});