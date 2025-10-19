const pool = require('./db'); // путь к твоему db.js

const renameColumn = async () => {
  try {
    await pool.query(`
        UPDATE users 
        SET telegram = CONCAT('@', telegram) 
        WHERE telegram NOT LIKE '@%'
      `);
    console.log('✅ Telegram успешно добавлен!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
};

renameColumn();