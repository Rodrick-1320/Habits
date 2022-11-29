const express = require('express');
const bp = require('body-parser')
const app = express();

app.use(express.json())

const {createHabit, readHabits, deleteHabits, updateHabits} = require('./routes/habits')
const {createUser, getAllUser, getAllUserBySearch, deleteUser, login} = require('./routes/users')

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.post('/habits/create' , createHabit)
app.get('/habits/read', readHabits)
app.delete('/habits/delete', deleteHabits)
app.put('/habits/update' , updateHabits)

app.post('/users/create' , createUser )
app.get('/users/list' , getAllUser )
app.get('/users/search' , getAllUserBySearch )
app.delete( '/users/delete', deleteUser)

app.get('/login', login)

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
})