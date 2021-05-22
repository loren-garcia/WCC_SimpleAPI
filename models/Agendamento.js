const moment = require('moment');
const conexao = require('../infra/conexao');

class Agendamento {

    deletar(id, res) {
        
        const sql = 'DELETE FROM agendamentos WHERE id=?';

        conexao.query(sql, id, (error, results) => {
            if(error) res.status(400).json(error);
            res.status(201).json({
                mensagem: `Agendamento com ${id} removido com sucesso!`
            })
        })
    }

    alterar(id, agendamento, res) {

        const sql = 'UPDATE agendamentos SET ? WHERE id=?';

        if(agendamento.data_servico) {
            agendamento.data_servico = moment(agendamento.data_servico).format('YYYY-MM-DD');
        }
        conexao.query(sql, [agendamento, id], (error, results) => {
            if(error) res.status(400).json(error);

            res.status(201).json(results);
        });
    }

    buscaPorId(id, res) {

        const sql = 'SELECT * FROM agendamentos WHERE id=?';

        conexao.query(sql, id, (error, results) => {
            if(error) res.status(400).json(error);

            res.status(201).json(results);
        })
    }

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
            if(error) res.status(400).json(error);

            res.status(201).json(results);
        });
    }
}

module.exports = new Agendamento;