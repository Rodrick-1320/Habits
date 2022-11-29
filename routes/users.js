const { usersDb }= require('../models/users');
var MD5 = require("crypto-js/md5");
const { Op } = require('sequelize');

var createUser= async (req, res) => {
    var dados = req.body;

    dados.password = MD5(dados.password).toString();

    await usersDb.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário Criado"
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro na criação de Usuário!!! Error: " + erro
        })
    })
}

const getAllUser = async (req, res) => {
    const result = await usersDb.findAll({
        attributes: ['id', 'name', 'email'],
    })
    res.json(result)    
}


const getAllUserBySearch = async (req, res) => {
    const result = await usersDb.findAll({
        where:  {
            name: {
                [Op.like]: '%rdk'
            }
        },
        attributes: ['id', 'name', 'email'],
    })
    res.json(result)    
}


module.exports = {
    createUser,
    getAllUser,
    getAllUserBySearch
};