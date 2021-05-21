const Agendamento = require('../models/Agendamento');

module.exports = app => {
    app.get('/agendamentos', (req, res) => Agendamento.listagem(res));

    app.post('/agendamentos', (req, res) => {
        const agendamento = req.body;

        Agendamento.inserir(agendamento, res);
    })
};

