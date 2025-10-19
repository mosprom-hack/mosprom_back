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
          required: ['telegram', 'first_name', 'last_name'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID пользователя',
            },
            telegram: {
              type: 'string',
              description: 'Телеграм пользователя',
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
          required: ['telegram', 'first_name', 'last_name'],
          properties: {
            telegram: {
              type: 'string',
              description: 'Телеграм пользователя',
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
            telegram: {
              type: 'string',
              description: 'Телеграм пользователя',
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
        CompetenceToUser: {
          type: 'object',
          required: ['user_id', 'solve', 'programming', 'logic', 'technical', 'organizer', 'communication'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID компетенции',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID пользователя',
            },
            solve: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Навык решения задач (0-1)',
            },
            programming: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Навык программирования (0-1)',
            },
            logic: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Логическое мышление (0-1)',
            },
            technical: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Технические навыки (0-1)',
            },
            organizer: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Организаторские способности (0-1)',
            },
            communication: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Навыки коммуникации (0-1)',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
          },
        },
        CompetenceToUserInput: {
          type: 'object',
          required: ['user_id', 'solve', 'programming', 'logic', 'technical', 'organizer', 'communication'],
          properties: {
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID пользователя',
            },
            solve: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              example: 0.75,
            },
            programming: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              example: 0.85,
            },
            logic: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              example: 0.90,
            },
            technical: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              example: 0.70,
            },
            organizer: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              example: 0.65,
            },
            communication: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              example: 0.80,
            },
          },
        },
        CompetenceToUserUpdate: {
          type: 'object',
          properties: {
            solve: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
            },
            programming: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
            },
            logic: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
            },
            technical: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
            },
            organizer: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
            },
            communication: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
            },
          },
        },
        Event: {
          type: 'object',
          required: ['title', 'topic', 'type', 'release'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID мероприятия',
            },
            title: {
              type: 'string',
              description: 'Название мероприятия',
            },
            description: {
              type: 'string',
              description: 'Описание мероприятия',
              nullable: true,
            },
            topic: {
              type: 'string',
              description: 'Тема мероприятия',
            },
            type: {
              type: 'string',
              description: 'Тип мероприятия',
            },
            location: {
              type: 'string',
              description: 'Место проведения',
              nullable: true,
            },
            image_url: {
              type: 'string',
              description: 'URL изображения',
              nullable: true,
            },
            community_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID сообщества',
              nullable: true,
            },
            release: {
              type: 'string',
              format: 'date-time',
              description: 'Дата и время проведения',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
          },
        },
        EventInput: {
          type: 'object',
          required: ['title', 'topic', 'type', 'release'],
          properties: {
            title: {
              type: 'string',
              description: 'Название мероприятия',
              example: 'Хакатон по AI',
            },
            description: {
              type: 'string',
              description: 'Описание мероприятия',
              example: 'Соревнование по разработке AI-решений',
            },
            topic: {
              type: 'string',
              description: 'Тема мероприятия',
              example: 'Искусственный интеллект',
            },
            type: {
              type: 'string',
              description: 'Тип мероприятия',
              example: 'Оффлайн',
            },
            location: {
              type: 'string',
              description: 'Место проведения',
              example: 'Москва, ул. Тверская, д. 1',
            },
            image_url: {
              type: 'string',
              description: 'URL изображения',
              example: 'https://example.com/image.jpg',
            },
            community_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID сообщества',
            },
            release: {
              type: 'string',
              format: 'date-time',
              description: 'Дата и время проведения',
              example: '2025-12-31T18:00:00Z',
            },
          },
        },
        EventUpdate: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Название мероприятия',
            },
            description: {
              type: 'string',
              description: 'Описание мероприятия',
            },
            topic: {
              type: 'string',
              description: 'Тема мероприятия',
            },
            type: {
              type: 'string',
              description: 'Тип мероприятия',
            },
            location: {
              type: 'string',
              description: 'Место проведения',
            },
            image_url: {
              type: 'string',
              description: 'URL изображения',
            },
            community_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID сообщества',
            },
            release: {
              type: 'string',
              format: 'date-time',
              description: 'Дата и время проведения',
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
          },
        },
        SpecializationWithSkills: {
          type: 'object',
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
            skills: {
              type: 'array',
              description: 'Список навыков специализации',
              items: {
                type: 'object',
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
        CategoryToUser: {
          type: 'object',
          required: ['user_id', 'category_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
            },
            category_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        EducationToUser: {
          type: 'object',
          required: ['user_id', 'education_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
            },
            education_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        SkillToUser: {
          type: 'object',
          required: ['user_id', 'skill_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
            },
            skill_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        MentorToCompany: {
          type: 'object',
          required: ['mentor_id', 'company_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            mentor_id: {
              type: 'string',
              format: 'uuid',
            },
            company_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        MentorToSpecialization: {
          type: 'object',
          required: ['mentor_id', 'specialization_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            mentor_id: {
              type: 'string',
              format: 'uuid',
            },
            specialization_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        SkillToMentor: {
          type: 'object',
          required: ['skill_id', 'mentor_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            skill_id: {
              type: 'string',
              format: 'uuid',
            },
            mentor_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        SpecializationToSkill: {
          type: 'object',
          required: ['specialization_id', 'skill_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            specialization_id: {
              type: 'string',
              format: 'uuid',
            },
            skill_id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
        RoleToUserToCommunity: {
          type: 'object',
          required: ['user_id', 'community_id', 'role_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
            },
            community_id: {
              type: 'string',
              format: 'uuid',
            },
            role_id: {
              type: 'string',
              format: 'uuid',
            },
            description: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
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

