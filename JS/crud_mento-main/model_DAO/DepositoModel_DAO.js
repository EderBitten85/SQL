const mysql = require('mysql2/promise');

class ModeloDeposito{
    constructor(){
        this.pool = mysql.createPool({
            host:'127.0.0.1',
            user: 'root',
            password:'',
            database:'livraria',
            port:4306,
       });
    };

    async criarDeposito(deposito) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'INSERT INTO deposito (id_livro,quantidade) VALUES(?,?)',
                [deposito.id_livro, deposito.quantidade]
            );
            return resultado.insertId;
        } finally {
            connection.release();
        }
    }

    async obterTodosDeposito() {
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM deposito',
            )
            return resultado; // inserID é um membro que vai armazenar o ID do novo regsitro
        } finally {
            connection.release();
        }
    }

    async obterDepositoPorId(id) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'SELECT * FROM deposito WHERE id_deposito = ?',
                [id]
            );
            return resultado[0];
        } finally {
            connection.release();
        }
    }

    async atualizarDeposito(id, deposito) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'UPDATE deposito SET id_livro = ?, quantidade = ? WHERE id_deposito = ?',
                [deposito.id_livro, deposito.quantidade, id]                
            );
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirDeposito(id) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'DELETE FROM deposito WHERE id_deposito = ?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
}

module.exports = new ModeloDeposito();