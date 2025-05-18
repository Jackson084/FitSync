const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/usuarios', require('./routes/usuarios'));

// Conexão com o banco de dados
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 