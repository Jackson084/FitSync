const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'app-fitness',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL conectado com sucesso');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error.message);
        process.exit(1);
    }
};

module.exports = { pool, connectDB };
