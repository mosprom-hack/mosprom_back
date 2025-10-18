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
        Category: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID категории',
            },
            title: {
              type: 'string',
              description: 'Название категории',
            },
          },
        },
        Education: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID образования',
            },
            title: {
              type: 'string',
              description: 'Название образования',
            },
          },
        },
        Skill: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID навыка',
            },
            title: {
              type: 'string',
              description: 'Название навыка',
            },
          },
        },
        Role: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID роли',
            },
            title: {
              type: 'string',
              description: 'Название роли',
            },
          },
        },
        Specialization: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID специализации',
            },
            title: {
              type: 'string',
              description: 'Название специализации',
            },
            description: {
              type: 'string',
              description: 'Описание специализации',
            },
          },
        },
        Company: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID компании',
            },
            title: {
              type: 'string',
              description: 'Название компании',
            },
            description: {
              type: 'string',
              description: 'Описание компании',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
          },
        },
        Community: {
          type: 'object',
          required: ['title', 'type'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID сообщества',
            },
            title: {
              type: 'string',
              description: 'Название сообщества',
            },
            description: {
              type: 'string',
              description: 'Описание сообщества',
            },
            type: {
              type: 'string',
              description: 'Тип сообщества',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
          },
        },
        UserProject: {
          type: 'object',
          required: ['user_id', 'link'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID проекта',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID пользователя',
            },
            title: {
              type: 'string',
              description: 'Название проекта',
            },
            description: {
              type: 'string',
              description: 'Описание проекта',
            },
            link: {
              type: 'string',
              description: 'Ссылка на проект',
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

