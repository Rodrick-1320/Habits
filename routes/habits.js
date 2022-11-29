const { habitsDb } = require('../models/habits');
let { habits } = require("../store")

const createHabit = async (req, res) => {
    var dados = req.body;

    console.log(dados);

    await habitsDb.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Hábito Criado"
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro na criação de hábito!!! Error: " + erro
        })
    })
}

const readHabits = (req, res) => {
    res.json({
        status: 200,
        habits: habits
    })
} 

module.exports = {
    createHabit,
    readHabits
} 