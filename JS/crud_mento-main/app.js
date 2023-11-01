const express = require('express');
const bodyParser = require('body-parser');
//const controladorCliente = require('./controller.js');
const app = express(); 
const porta = 3000; 

const controladorCliente = require('./controller_DTO/ClientesController_DTO.js');
const controladorAutor = require('./controller_DTO/AutorController_DTO.js');
const controladorLivro = require('./controller_DTO/LivroController_DTO.js');
const controladorDeposito = require('./controller_DTO/DepositoController_DTO.js');
const controladorCarrinho = require('./controller_DTO/CarrinhoController_DTO.js');

app.use(bodyParser.json());

// app.post('/clientes', controladorCliente.criarCliente);
// app.get('/clientes', controladorCliente.obterTodosClientes);
// app.get('/clientes/:id', controladorCliente.obterClientePorId);
// app.put('/clientes/:id', controladorCliente.atualizarCliente);
// app.delete('/clientes/:id', controladorCliente.excluirCliente);

//Referente a Coluna cliente
app.post('/cliente', controladorCliente.criarCliente);
app.get('/cliente', controladorCliente.obterTodosClientes);
app.get('/cliente/:id', controladorCliente.obterClientePorId);
app.put('/cliente/:id', controladorCliente.atualizarCliente);
app.delete('/cliente/:id', controladorCliente.excluirCliente);

//Referente a Coluna autor
app.post('/autor', controladorAutor.criarAutor);
app.get('/autor', controladorAutor.obterTodosAutor);
app.get('/autor/:id', controladorAutor.obterAutorPorId);
app.put('/autor/:id', controladorAutor.atualizarAutor);
app.delete('/autor/:id', controladorAutor.excluirAutor);

//Referente a Coluna livro
app.post('/livro', controladorLivro.criarLivro);
app.get('/livro', controladorLivro.obterTodosLivros);
app.get('/livro/:id', controladorLivro.obterLivroPorId);
app.put('/livro/:id', controladorLivro.atualizarLivro);
app.delete('/livro/:id', controladorLivro.excluirLivro);

//Referente a Coluna deposito
app.post('/deposito', controladorDeposito.criarDeposito);
app.get('/deposito', controladorDeposito.obterTodosDeposito);
app.get('/deposito/:id', controladorDeposito.obterDepositoPorId);
app.put('/deposito/:id', controladorDeposito.atualizarDeposito);
app.delete('/deposito/:id', controladorDeposito.excluirDeposito);

//Referente a Coluna carrinho
app.post('/carrinho', controladorCarrinho.criarCarrinho);
app.get('/carrinho', controladorCarrinho.obterTodosCarrinho);
app.get('/carrinho/:id', controladorCarrinho.obterCarrinhoPorId);
app.put('/carrinho/:id', controladorCarrinho.atualizarCarrinho);
app.delete('/carrinho/:id', controladorCarrinho.excluirCarrinho);

app.listen( porta, () => {
    console.log(`servidor no ar na porta ${porta}`); 
})


/*
criação da tabela 
CREATE DATABASE IF NOT EXISTS mcliente;

USE mcliente;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    endereco VARCHAR(40),
    cidade VARCHAR(30)
);
*/