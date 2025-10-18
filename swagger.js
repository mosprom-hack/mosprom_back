const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mikron API',
      version: '1.0.0',
      description: 'REST API для проекта Mikron',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['nickname', 'first_name', 'last_name'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID пользователя',
            },
            nickname: {
              type: 'string',
              description: 'Никнейм пользователя',
            },
            first_name: {
              type: 'string',
              description: 'Имя пользователя',
            },
            last_name: {
              type: 'string',
              description: 'Фамилия пользователя',
            },
            phone: {
              type: 'string',
              description: 'Телефон пользователя',
            },
            email: {
              type: 'string',
              description: 'Email пользователя',
            },
            photo_url: {
              type: 'string',
              description: 'URL фото пользователя',
            },
            description: {
              type: 'string',
              description: 'Описание пользователя',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['nickname', 'first_name', 'last_name'],
          properties: {
            nickname: {
              type: 'string',
              description: 'Никнейм пользователя',
            },
            first_name: {
              type: 'string',
              description: 'Имя пользователя',
            },
            last_name: {
              type: 'string',
              description: 'Фамилия пользователя',
            },
            phone: {
              type: 'string',
              description: 'Телефон пользователя',
            },
            email: {
              type: 'string',
              description: 'Email пользователя',
            },
            photo_url: {
              type: 'string',
              description: 'URL фото пользователя',
            },
            description: {
              type: 'string',
              description: 'Описание пользователя',
            },
          },
        },
        UserUpdate: {
          type: 'object',
          properties: {
            nickname: {
              type: 'string',
              description: 'Никнейм пользователя',
            },
            first_name: {
              type: 'string',
              description: 'Имя пользователя',
            },
            last_name: {
              type: 'string',
              description: 'Фамилия пользователя',
            },
            phone: {
              type: 'string',
              description: 'Телефон пользователя',
            },
            email: {
              type: 'string',
              description: 'Email пользователя',
            },
            photo_url: {
              type: 'string',
              description: 'URL фото пользователя',
            },
            description: {
              type: 'string',
              description: 'Описание пользователя',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
            },
          },
        },
        Mentor: {
          type: 'object',
          required: ['user_id', 'first_name', 'last_name'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID ментора',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID пользователя',
            },
            first_name: {
              type: 'string',
              description: 'Имя ментора',
            },
            last_name: {
              type: 'string',
              description: 'Фамилия ментора',
            },
            photo_url: {
              type: 'string',
              description: 'URL фото ментора',
            },
            position: {
              type: 'string',
              description: 'Должность ментора',
            },
            description: {
              type: 'string',
              description: 'Описание ментора',
            },
            help: {
              type: 'string',
              description: 'Чем может помочь',
            },
            experience: {
              type: 'string',
              description: 'Опыт работы',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
          },
        },
        MentorInput: {
          type: 'object',
          required: ['user_id', 'first_name', 'last_name'],
          properties: {
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID пользователя',
            },
            first_name: {
              type: 'string',
              description: 'Имя ментора',
            },
            last_name: {
              type: 'string',
              description: 'Фамилия ментора',
            },
            photo_url: {
              type: 'string',
              description: 'URL фото ментора',
            },
            position: {
              type: 'string',
              description: 'Должность ментора',
            },
            description: {
              type: 'string',
              description: 'Описание ментора',
            },
            help: {
              type: 'string',
              description: 'Чем может помочь',
            },
            experience: {
              type: 'string',
              description: 'Опыт работы',
            },
          },
        },
        MentorUpdate: {
          type: 'object',
          properties: {
            first_name: {
              type: 'string',
              description: 'Имя ментора',
            },
            last_name: {
              type: 'string',
              description: 'Фамилия ментора',
            },
            photo_url: {
              type: 'string',
              description: 'URL фото ментора',
            },
            position: {
              type: 'string',
              description: 'Должность ментора',
            },
            description: {
              type: 'string',
              description: 'Описание ментора',
            },
            help: {
              type: 'string',
              description: 'Чем может помочь',
            },
            experience: {
              type: 'string',
              description: 'Опыт работы',
            },
          },
        },
      },
    },
  },
  apis: ['./index.js', './routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;

