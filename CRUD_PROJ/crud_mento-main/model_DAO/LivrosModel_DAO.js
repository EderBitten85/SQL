const mysql = require('mysql2/promise');

class ModeloLivro{
        constructor(){
            this.pool = mysql.createPool({
                host:'127.0.0.1',
                user: 'root',
                password:'',
                database:'livraria',
                port:4306,
           });
        };

    async criarLivro(livro){
        const connection = await this.pool.getConnection();
        try {
            const [resultado] = await connection.query(
                'INSERT INTO livro (jsbn,titulo,ano,preco,id_autor,id_editora) VALUES(?,?,?,?,?,?)',
                [livro.jsbn, livro.titulo, livro.ano, livro.preco, livro.id_autor, livro.id_editora]
            )
            return resultado.insertId; /// inserID é metodo do sistema do connect query
        } finally {
            connection.release();
        }
    }

    async obterTodosLivros(){
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM livro'
            )
            return resultado; 
        } finally {
            connection.release();
        }
    }

    async obterLivroPorId(id){
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM livro WHERE id_livro=?',
                [id]
            )
            return resultado[0] //aqui apenas retorna se não existir registro
        } finally {
            connection.release();
        }
    }

    async atualizarLivro(id, livro){
        const connection = await this.pool.getConnection();
        try {
            await connection.query(
                'UPDATE livro SET jsbn=?, titulo=?, ano=?, preco=?, id_autor=?, id_editora= ?  WHERE id_livro=?',
                [livro.jsbn, livro.titulo, livro.ano, livro.preco, livro.id_autor, livro.id_editora, id]//em ordem de escrita passamos os atribudos dos campos comforma DB, "email,nome... depois passamos o id do Livro para realizar a busca"
            )
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirLivro(id) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'DELETE FROM livro WHERE id_livro=?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
    
}
    
module.exports = new ModeloLivro(); 