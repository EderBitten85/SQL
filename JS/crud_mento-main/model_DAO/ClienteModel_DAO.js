const mysql = require('mysql2/promise');

class ModeloCliente{
        constructor(){
            this.pool = mysql.createPool({
                host:'127.0.0.1',
                user: 'root',
                password:'',
                database:'livraria',
                port:4306,
           });
        };

    async criarCliente(cliente){
        const connection = await this.pool.getConnection();
        try {
            const [resultado] = await connection.query(
                'INSERT INTO cliente (email,nome,endereco,telefone) VALUES(?,?,?,?)',
                [cliente.email, cliente.nome, cliente.endereco, cliente.telefone]
            )
            return resultado.insertId; /// inserID é metodo do sistema do connect query
        } finally {
            connection.release();
        }
    }

    async obterTodosClientes(){
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM cliente'
            )
            return resultado; 
        } finally {
            connection.release();
        }
    }

    async obterClientePorId(id){
        const connection = await this.pool.getConnection();
        try {
            const[resultado] = await connection.query(
                'SELECT * FROM cliente WHERE id_cliente= ?',
                [id]
            )
            return resultado[0] //aqui apenas retorna se não existir registro
        } finally {
            connection.release();
        }
    }

    async atualizarCliente(id, cliente){
        const connection = await this.pool.getConnection();
        try {
            await connection.query(
                'UPDATE cliente SET email = ?, nome = ?, endereco = ?, telefone = ?  WHERE id_cliente = ?',
                [cliente.email, cliente.nome, cliente.endereco, cliente.telefone, id]//em ordem de escrita passamos os atribudos dos campos comforma DB, "email,nome... depois passamos o id do cliente para realizar a busca"
            )
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirCliente(id){
        const connection = await this.pool.getConnection();
        try {
            await connection.query(
                'DELETE FROM cliente WHERE id_cliente = ?',
                [id]
            )
            return true;
        } finally {
            connection.release();
        }
    }
    
}
    
module.exports = new ModeloCliente(); 