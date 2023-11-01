const ModeloDeposito = require('./../model_DAO/DepositoModel_DAO');

class ControladorDeposito{
    async criarDeposito( req, res ){
        const deposito = req.body;
        try{
            const idDeposito = await ModeloDeposito.criarDeposito(deposito);
            res.status(201).json({ id_deposito: idDeposito});
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao criar um Deposito'});
        }
    }

    async obterTodosDeposito( req, res ){
        try{
            const deposito = await ModeloDeposito.obterTodosDeposito();
            res.status(200).json(deposito);
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao buscar todos os Deposito'});
        }
    }

    async obterDepositoPorId( req, res ){
        const id = req.params.id;
        try{
            const deposito = await ModeloDeposito.obterDepositoPorId(id);
            if( deposito ){
                res.status(200).json(deposito);
            } else {
                res.status(404).json({erro: 'Deposito não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({erro: 'Erro ao buscar o Deposito'});
        }
    }

    async atualizarDeposito( req, res ){
        const id = req.params.id;
        const deposito = req.body; 
        try{
            const resultado = await ModeloDeposito.atualizarDeposito(id, deposito);
            if( resultado ){
                res.status(200).json({msg: 'Deposito atualizado com sucesso'});
            } else {
                res.status(404).json({erro: 'Deposito não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao atualizar Deposito'});
        }
    }
   
    async excluirDeposito( req, res ){
        const id = req.params.id;
        try{
            const resultado = await ModeloDeposito.excluirDeposito(id);
            if( resultado ){
                res.status(200).json({msg: 'Deposito excluido com sucesso'});
            } else {
                res.status(404).json({erro: 'Deposito não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao excluir Deposito'});
        }
    }

}

module.exports = new ControladorDeposito();