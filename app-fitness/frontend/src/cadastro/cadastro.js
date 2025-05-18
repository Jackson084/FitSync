// src/cadastro/cadastro.js

document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });
  
      const dados = await resposta.json();
  
      if (resposta.ok) {
        document.getElementById('mensagem').textContent = dados.mensagem;
      } else {
        document.getElementById('mensagem').textContent = dados.erro || 'Erro ao cadastrar';
      }
    } catch (error) {
      document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
      console.error(error);
    }
  });
  