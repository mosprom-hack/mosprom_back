const pool = require('./db');

async function migrate() {
  try {
    console.log('🔄 Running migrations...');

    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        nickname text NOT NULL UNIQUE,
        first_name text NOT NULL,
        last_name text NOT NULL,
        phone text UNIQUE,
        email text UNIQUE,
        photo_url text,
        description text,
        created_at timestamp with time zone DEFAULT now(),
        CONSTRAINT users_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL UNIQUE,
        CONSTRAINT categories_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS educations (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL UNIQUE,
        CONSTRAINT educations_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS skills (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL UNIQUE,
        CONSTRAINT skills_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS specializations (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL UNIQUE,
        description text,
        CONSTRAINT specializations_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS companies (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL UNIQUE,
        description text,
        created_at timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT companies_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS communities (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL,
        description text,
        type text NOT NULL,
        created_at timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT communities_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS roles (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        title text NOT NULL UNIQUE,
        CONSTRAINT roles_pkey PRIMARY KEY (id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS mentors (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL UNIQUE,
        first_name text NOT NULL,
        last_name text NOT NULL,
        photo_url text,
        position text,
        description text,
        help text,
        experience text,
        created_at timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT mentors_pkey PRIMARY KEY (id),
        CONSTRAINT mentors_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
    )
    `);
    
    // Создание связующих таблиц
    await pool.query(`
    CREATE TABLE IF NOT EXISTS category_to_user (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL,
        category_id uuid NOT NULL,
        CONSTRAINT category_to_user_pkey PRIMARY KEY (id),
        CONSTRAINT category_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT category_to_user_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS education_to_user (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL,
        education_id uuid NOT NULL,
        CONSTRAINT education_to_user_pkey PRIMARY KEY (id),
        CONSTRAINT education_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT education_to_user_education_id_fkey FOREIGN KEY (education_id) REFERENCES educations(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS skill_to_user (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid,
        skill_id uuid,
        CONSTRAINT skill_to_user_pkey PRIMARY KEY (id),
        CONSTRAINT skill_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT skill_to_user_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS user_projects (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL,
        title text,
        description text,
        link text NOT NULL,
        CONSTRAINT user_projects_pkey PRIMARY KEY (id),
        CONSTRAINT user_projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS mentor_to_company (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        mentor_id uuid NOT NULL UNIQUE,
        company_id uuid NOT NULL,
        CONSTRAINT mentor_to_company_pkey PRIMARY KEY (id),
        CONSTRAINT mentor_to_company_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES mentors(id),
        CONSTRAINT mentor_to_company_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS mentor_to_specialization (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        mentor_id uuid NOT NULL,
        specialization_id uuid NOT NULL,
        CONSTRAINT mentor_to_specialization_pkey PRIMARY KEY (id),
        CONSTRAINT mentor_to_specialization_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES mentors(id),
        CONSTRAINT mentor_to_specialization_specialization_id_fkey FOREIGN KEY (specialization_id) REFERENCES specializations(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS skill_to_mentor (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        skill_id uuid NOT NULL,
        mentor_id uuid NOT NULL,
        CONSTRAINT skill_to_mentor_pkey PRIMARY KEY (id),
        CONSTRAINT skill_to_mentor_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id),
        CONSTRAINT skill_to_mentor_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES mentors(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS specialization_to_skill (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        specialization_id uuid NOT NULL,
        skill_id uuid NOT NULL,
        CONSTRAINT specialization_to_skill_pkey PRIMARY KEY (id),
        CONSTRAINT specialization_to_skill_specialization_id_fkey FOREIGN KEY (specialization_id) REFERENCES specializations(id),
        CONSTRAINT specialization_to_skill_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id)
    )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS role_to_user_to_community (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL,
        community_id uuid NOT NULL,
        role_id uuid NOT NULL,
        description text,
        created_at timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT role_to_user_to_community_pkey PRIMARY KEY (id),
        CONSTRAINT role_to_user_to_community_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT role_to_user_to_community_community_id_fkey FOREIGN KEY (community_id) REFERENCES communities(id),
        CONSTRAINT role_to_user_to_community_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id)
    )
    `);

    console.log('✅ Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrate();