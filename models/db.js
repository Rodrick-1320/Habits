const Sequelize = require('sequelize')

const sequelize = new Sequelize('loop_habit', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() =>{
    console.log('Conexão Realizada com sucesso');
}).catch((erro) => {
    console.log('erro: Conexão não estabelecida! Erro: ' + erro);
})

module.exports = sequelize;