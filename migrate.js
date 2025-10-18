// const pool = require('./db');

// async function migrate() {
//   try {
//     console.log('🔄 Running migrations...');
//
    // // Создание таблицы users
    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS users (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     nickname text NOT NULL UNIQUE,
    //     first_name text NOT NULL,
    //     last_name text NOT NULL,
    //     phone text UNIQUE,
    //     email text UNIQUE,
    //     photo_url text,
    //     description text,
    //     created_at timestamp with time zone DEFAULT now(),
    //     CONSTRAINT users_pkey PRIMARY KEY (id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS categories (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     title text NOT NULL UNIQUE,
    //     CONSTRAINT categories_pkey PRIMARY KEY (id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS educations (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     title text NOT NULL UNIQUE,
    //     CONSTRAINT educations_pkey PRIMARY KEY (id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS skills (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     title text NOT NULL UNIQUE,
    //     CONSTRAINT skills_pkey PRIMARY KEY (id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS communities (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     title text NOT NULL,
    //     description text,
    //     type text NOT NULL,
    //     created_at timestamp with time zone NOT NULL DEFAULT now(),
    //     CONSTRAINT communities_pkey PRIMARY KEY (id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS roles (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     title text NOT NULL UNIQUE,
    //     CONSTRAINT roles_pkey PRIMARY KEY (id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS category_to_user (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     user_id uuid NOT NULL,
    //     category_id uuid NOT NULL,
    //     CONSTRAINT category_to_user_pkey PRIMARY KEY (id),
    //     CONSTRAINT category_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    //     CONSTRAINT category_to_user_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS category_to_user (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     user_id uuid NOT NULL,
    //     category_id uuid NOT NULL,
    //     CONSTRAINT category_to_user_pkey PRIMARY KEY (id),
    //     CONSTRAINT category_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    //     CONSTRAINT category_to_user_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS education_to_user (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     user_id uuid NOT NULL,
    //     education_id uuid NOT NULL,
    //     CONSTRAINT education_to_user_pkey PRIMARY KEY (id),
    //     CONSTRAINT education_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    //     CONSTRAINT education_to_user_education_id_fkey FOREIGN KEY (education_id) REFERENCES public.educations(id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS skill_to_user (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     user_id uuid,
    //     skill_id uuid,
    //     CONSTRAINT skill_to_user_pkey PRIMARY KEY (id),
    //     CONSTRAINT skill_to_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    //     CONSTRAINT skill_to_user_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS role_to_user_to_community (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     user_id uuid NOT NULL,
    //     community_id uuid NOT NULL,
    //     role_id uuid NOT NULL,
    //     description text,
    //     created_at timestamp with time zone NOT NULL DEFAULT now(),
    //     CONSTRAINT role_to_user_to_community_pkey PRIMARY KEY (id),
    //     CONSTRAINT role_to_user_to_community_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    //     CONSTRAINT role_to_user_to_community_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.communities(id),
    //     CONSTRAINT role_to_user_to_community_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id)
    //   )
    // `);

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS user_projects (
    //     id uuid NOT NULL DEFAULT gen_random_uuid(),
    //     user_id uuid NOT NULL,
    //     title text,
    //     description text,
    //     link text NOT NULL,
    //     CONSTRAINT user_projects_pkey PRIMARY KEY (id),
    //     CONSTRAINT user_projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    //   )
    // `);

    // await pool.query(`
    //     INSERT INTO public.users (nickname, first_name, last_name, phone, email, photo_url, description)
    //     VALUES ($1, $2, $3, $4, $5, $6, $7)
    //   `, [
    //     'john_doe',
    //     'John',
    //     'Doe',
    //     '+79001234567',
    //     'john@example.com',
    //     'https://example.com/photo.jpg',
    //     'Описание пользователя'
    //   ]);

//     console.log('✅ Migrations completed successfully');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Migration error:', error);
//     process.exit(1);
//   }
// }

// migrate();