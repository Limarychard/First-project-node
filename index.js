
    // find    ELE NOS PERMITE ENCONTRAR PERMISSÃO NO ARRAY E ASSIM QUE ELE ENCONTRAR ELE RETORNA A INFORMAÇÃO 
    // findIndex  ELE NOS PERMITE ENCONTRAR PERMISSÃO NO ARRAY E ASSIM QUE ELE ENCONTRAR ELE RETORNA O LOCAL ONDE ESTÁ A INFORMAÇÃO 

    // Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição 

const { request, response } = require("express")
const express = require("express")
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updadeUser = { id, name, age }

    users[index] = updadeUser

    return response.json(updadeUser)
})

app.delete('/users/:id', checkUserId,  (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
   console.log(`🚀 Server started on port ${port}`)
})

