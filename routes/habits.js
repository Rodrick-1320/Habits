const { habitsDb } = require('../models/habits');
const { usersDb } = require('../models/users');
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

const readHabits =  async(req, res) => {

    var arr = [1, 2, 3, 4, 5]

    var dados = await habitsDb.findAll({
        include:[
            usersDb
        ]
    })

    // let arroz = arr.map((item) => {
    //     return item * 2
    // })

    // console.log(arroz);

    let dadosJson = dados.map((item) =>{
        return {
            title: item.title,
            question: item.question,
            createdBy: item.user.name
        }
    })

    console.log(dados);

    
    res.json({
        status: 200,
        dadosJson
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