const ModeloAutor = require('./../model_DAO/AutorModel_DAO.js');

class ControladorAutor{
    async criarAutor( req, res ){
        const autor = req.body;
        try{
            const idAutor = await ModeloAutor.criarAutor(autor);
            res.status(201).json({ id_autor: idAutor});
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao criar um Autor'});
        }
    }

    async obterTodosAutor( req, res ){
        try{
            const autor = await ModeloAutor.obterTodosAutor();
            res.status(200).json(autor);
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao buscar todos os Autor'});
        }
    }

    async obterAutorPorId( req, res ){
        const id = req.params.id;
        try{
            const autor = await ModeloAutor.obterAutorPorId(id);
            if( autor ){
                res.status(200).json(autor);
            } else {
                res.status(404).json({erro: 'Autor não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({erro: 'Erro ao buscar o Autor'});
        }
    }

    async atualizarAutor( req, res ){
        const id = req.params.id;
        const autor = req.body; 
        try{
            const resultado = await ModeloAutor.atualizarAutor(id, autor);
            if( resultado ){
                res.status(200).json({msg: 'Autor atualizado com sucesso'});
            } else {
                res.status(404).json({erro: 'Autor não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao atualizar Autor'});
        }
    }
   
    async excluirAutor( req, res ){
        const id = req.params.id;
        try{
            const resultado = await ModeloAutor.excluirAutor(id);
            if( resultado ){
                res.status(200).json({msg: 'Autor excluido com sucesso'});
            } else {
                res.status(404).json({erro: 'Autor não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao excluir Autor'});
        }
    }

}

module.exports = new ControladorAutor();