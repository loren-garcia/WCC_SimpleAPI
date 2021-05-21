const { response } = require('express');
const moment = require('moment');
const conexao = require('../infra/conexao');

class Agendamento {

    listagem(res) {
        const sql = 'SELECT * FROM agendamentos';

        conexao.query(sql, (error, results) => {
            if(error) res.status(400).json(error);

            res.status(201).json(results);
        });
    }

    inserir(agendamento, res) {

        const sql = `INSERT INTO agendamentos SET ?`; //${agendamento} funciona, mas corre o risco de sql injection, por isso o ?
        
        const data_servico = moment(agendamento.data_servico).format('YYYY-MM-DD');
        const data_agendamento = moment().format('YYYY-MM-DD');

        const agendamentoComData = {...agendamento, data_agendamento, data_servico};
        const ehDataValida = moment(agendamento.data_servico).isSameOrAfter(data_agendamento);
        const ehNomeCliente = agendamento.nome_cliente.length > 2;

        const validacoes = [
            {
                nome: "data_servico",
                valido: ehDataValida,
                mensagem: "Data do agendamento deve ser igual ou superior a data atual"
            },
            {
                nome: "nome_cliente",
                valido: ehNomeCliente,
                mensagem: "Nome do cliente deve ter ao menos 3 dígitos"
            }
        ];

        const errors = validacoes.filter(campo => !campo.valido);

        if(errors.length > 0) return res.status(400).json(errors);

        conexao.query(sql, agendamentoComData, (error, results) => {
            if(error) throw error;
            console.log(results);
        });
    }
}

module.exports = new Agendamento;