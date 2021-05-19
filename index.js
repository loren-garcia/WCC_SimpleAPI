const configExpress = require('./config/configExpress');

let app = configExpress();

app.listen(3000, () => console.log('Servidor está rodando na porta 3000'));
