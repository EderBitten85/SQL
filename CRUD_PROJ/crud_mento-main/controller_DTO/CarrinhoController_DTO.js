const ModeloCarrinho = require('./../model_DAO/CarrinhoModel_DAO.js');

class ControladorCarrinho{
    async criarCarrinho( req, res ){
        const carrinho = req.body;
        try{
            const idCarrinho = await ModeloCarrinho.criarCarrinho(carrinho);
            res.status(201).json({ id_carrinho: idCarrinho});
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao criar um Carrinho'});
        }
    }

    async obterTodosCarrinho( req, res ){
        try{
            const carrinho = await ModeloCarrinho.obterTodosCarrinho();
            res.status(200).json(carrinho);
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao buscar todos os Carrinho'});
        }
    }

    async obterCarrinhoPorId( req, res ){
        const id = req.params.id;
        try{
            const carrinho = await ModeloCarrinho.obterCarrinhoPorId(id);
            if( carrinho ){
                res.status(200).json(carrinho);
            } else {
                res.status(404).json({erro: 'Carrinho não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({erro: 'Erro ao buscar o Carrinho'});
        }
    }

    async atualizarCarrinho( req, res ){
        const id = req.params.id;
        const carrinho = req.body; 
        try{
            const resultado = await ModeloCarrinho.atualizarCarrinho(id, carrinho);
            if( resultado ){
                res.status(200).json({msg: 'Carrinho atualizado com sucesso'});
            } else {
                res.status(404).json({erro: 'Carrinho não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao atualizar Carrinho'});
        }
    }
   
    async excluirCarrinho( req, res ){
        const id = req.params.id;
        try{
            const resultado = await ModeloCarrinho.excluirCarrinho(id);
            if( resultado ){
                res.status(200).json({msg: 'Carrinho excluido com sucesso'});
            } else {
                res.status(404).json({erro: 'Carrinho não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao excluir Carrinho'});
        }
    }

}

module.exports = new ControladorCarrinho();