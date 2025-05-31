const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.post('/cadastrar', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        // Verifica se o email já existe
        const [existingUsers] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ erro: 'Este email já está cadastrado.' });
        }

        // Insere o novo usuário
        const [result] = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        res.status(201).json({ 
            mensagem: 'Usuário cadastrado com sucesso!',
            id: result.insertId 
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
    }
});

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT id, nome, email FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
});

module.exports = router;
