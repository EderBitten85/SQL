const mysql = require('mysql2/promise');

class ModeloAutor{
    constructor(){
        this.pool = mysql.createPool({
            host:'127.0.0.1',
            user: 'root',
            password:'',
            database:'livraria',
            port:4306,
       });
    };

    async criarAutor(autor) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'INSERT INTO autor (nome, endereco) values(?, ?)',
                [autor.nome, autor.endereco]
            );
            return resultado.insertId;
        } finally {
            connection.release();
        }
    }

    async obterTodosAutor() {
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM autor',
            )
            return resultado; // inserID é um membro que vai armazenar o ID do novo regsitro
        } finally {
            connection.release();
        }
    }

    async obterAutorPorId(id) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'SELECT * FROM autor WHERE id_autor = ?',
                [id]
            );
            return resultado[0];
        } finally {
            connection.release();
        }
    }

    async atualizarAutor(id, autor) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'update autor set nome = ?, endereco = ? where id_autor = ?',
                [autor.nome, autor.endereco, id]
            );
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirAutor(id) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'DELETE FROM autor WHERE id_autor = ?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
}

module.exports = new ModeloAutor();