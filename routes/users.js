const { usersDb } = require('../models/users');
var MD5 = require("crypto-js/md5");
const { Op } = require('sequelize');

var createUser = async (req, res) => {
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
        where: {
            name: {
                [Op.like]: '%rdk'
            }
        },
        attributes: ['id', 'name', 'email'],
    })
    res.json(result)
}

const deleteUser = async (req, res) => {
    var dados = req.body;

    let usersD = await usersDb.findOne(
        {
            where: dados.id
        }
    ).catch(e => {
        console.log(e.message)
    })
    if (!usersD) {
        console.log("err")
    }
    usersD.destroy();
    res.json({
        user: dados.id,
        message: "Usuário Deletado"
    })
}

const login = async (req, res) => {
    let dados = req.body

    dados.password = MD5(dados.password).toString();

    let user = await usersDb.findOne(
        {
            where: {
                email: dados.email
            }
        }
    )

    if (!user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro no login de Usuário!!! Error: " +  dados.password
        })
    }


     if (dados.password == user.password){
        console.log("Deu bom");
        return res.json({
            erro: false,
            mensagem: "Login Efetuado"
        })
     }else{
        return res.json({
            message: "Email ou senha incorreto(s)"
        })
     }
}

module.exports = {
    createUser,
    getAllUser,
    getAllUserBySearch,
    deleteUser,
    login
};