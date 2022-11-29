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

const deleteHabits = async (req, res) => {
    var dados = req.body;

    let habitsD = await habitsDb.findOne(
        {
            where: dados.id
        }
    ).catch(e => {
        console.log(e.message)
    })
    if (!habitsD){
        console.log("err")
    }
    habitsD.destroy();
    res.json({
        user: dados.id,
        message: "Hábito Deletado"
    })  
}

const updateHabits = async (req, res) => {
    const {id, ...dados} = req.body
    habitsDb.upsert({
        id,
        ...dados
    })
    res.json({
        message: "Dado Alterado"
    })
}

module.exports = {
    createHabit,
    readHabits,
    deleteHabits,
    updateHabits
} 