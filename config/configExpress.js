const consign = require('consign');
const express = require('express');

module.exports = () => {
    const app = express();

    app.use(express.json());

    consign() //consign inclui tudo o que está na pasta controllers dentro de app
        .include('controllers')
        .into(app);
    
    return app;
};