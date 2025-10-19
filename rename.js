const pool = require('./db'); // путь к твоему db.js

const renameColumn = async () => {
  try {
    await pool.query(`
        ALTER TABLE communities ADD COLUMN photo_url text
      `);
    console.log('✅ Фотография успешно добавлена!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
};

renameColumn();