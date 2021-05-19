const  mysql = require('mysql');
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'api',
    user: 'root',
    password:'root',
    database: 'agendawcc'
});

module.exports = conexao;