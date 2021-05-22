const Agendamento = require('../models/Agendamento');

module.exports = app => {
    app.get('/agendamentos', (req, res) => Agendamento.listagem(res));

    app.get('/agendamentos/:id', (req, res) => { //:id sinaliza que vai pegar o perâmetro id
        const id = parseInt(req.params.id); //pega o id que está sendo passado nos parâmetros da requisição

        Agendamento.buscaPorId(id, res);
    }); 

    app.post('/agendamentos', (req, res) => {
        const agendamento = req.body;
        
        Agendamento.inserir(agendamento, res);
    });

    app.put('/agendamentos/:id', (req, res) => {
        const agendamento = req.body;
        const id = parseInt(req.params.id);

        Agendamento.alterar(id, agendamento, res);
    });

    app.delete('/agendamentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Agendamento.deletar(id, res);
    });
};

