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
      categories: '/api/categories',
      educations: '/api/educations',
      skills: '/api/skills',
      roles: '/api/roles',
      specializations: '/api/specializations',
      companies: '/api/companies',
      communities: '/api/communities',
      userProjects: '/api/user-projects',
      categoryToUser: '/api/category-to-user',
      educationToUser: '/api/education-to-user',
      skillToUser: '/api/skill-to-user',
      mentorToCompany: '/api/mentor-to-company',
      mentorToSpecialization: '/api/mentor-to-specialization',
      skillToMentor: '/api/skill-to-mentor',
      specializationToSkill: '/api/specialization-to-skill',
      roleToUserToCommunity: '/api/role-to-user-to-community',
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
const categoryRoutes = require('./routes/categoryRoutes');
const educationRoutes = require('./routes/educationRoutes');
const skillRoutes = require('./routes/skillRoutes');
const roleRoutes = require('./routes/roleRoutes');
const specializationRoutes = require('./routes/specializationRoutes');
const companyRoutes = require('./routes/companyRoutes');
const communityRoutes = require('./routes/communityRoutes');
const userProjectRoutes = require('./routes/userProjectRoutes');
const categoryToUserRoutes = require('./routes/categoryToUserRoutes');
const educationToUserRoutes = require('./routes/educationToUserRoutes');
const skillToUserRoutes = require('./routes/skillToUserRoutes');
const mentorToCompanyRoutes = require('./routes/mentorToCompanyRoutes');
const mentorToSpecializationRoutes = require('./routes/mentorToSpecializationRoutes');
const skillToMentorRoutes = require('./routes/skillToMentorRoutes');
const specializationToSkillRoutes = require('./routes/specializationToSkillRoutes');
const roleToUserToCommunityRoutes = require('./routes/roleToUserToCommunityRoutes');
const competenceToUserRoutes = require('./routes/competenceToUserRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/competences-to-user', competenceToUserRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/specializations', specializationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/user-projects', userProjectRoutes);
app.use('/api/category-to-user', categoryToUserRoutes);
app.use('/api/education-to-user', educationToUserRoutes);
app.use('/api/skill-to-user', skillToUserRoutes);
app.use('/api/mentor-to-company', mentorToCompanyRoutes);
app.use('/api/mentor-to-specialization', mentorToSpecializationRoutes);
app.use('/api/skill-to-mentor', skillToMentorRoutes);
app.use('/api/specialization-to-skill', specializationToSkillRoutes);
app.use('/api/role-to-user-to-community', roleToUserToCommunityRoutes);

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