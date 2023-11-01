const mysql = require('mysql2/promise');

class ModeloCarrinho{
    constructor(){
        this.pool = mysql.createPool({
            host:'127.0.0.1',
            user: 'root',
            password:'',
            database:'livraria',
            port:4306,
       });
    };

    async criarCarrinho(carrinho) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'INSERT INTO carrinho (id_cliente, id_livro, quantidade) VALUES(?,?,?)',
                [carrinho.id_cliente, carrinho.id_livro, carrinho.quantidade]
            );
            return resultado.insertId;
        } finally {
            connection.release();
        }
    }

    async obterTodosCarrinho() {
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM carrinho',
            )
            return resultado; // inserID é um membro que vai armazenar o ID do novo regsitro
        } finally {
            connection.release();
        }
    }

    async obterCarrinhoPorId(id) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'SELECT * FROM carrinho WHERE id_carrinho = ?',
                [id]
            );
            return resultado[0];
        } finally {
            connection.release();
        }
    }

    async atualizarCarrinho(id, carrinho) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'UPDATE carrinho SET id_cliente = ?, id_livro = ?, quantidade = ? WHERE id_carrinho = ?',
                [carrinho.id_cliente, carrinho.id_livro, carrinho.quantidade, id]             
            );
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirCarrinho(id) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'DELETE FROM carrinho WHERE id_carrinho = ?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
}

module.exports = new ModeloCarrinho();