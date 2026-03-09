require('dotenv').config()
const Person = require('./models/person')

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
app.use(express.json())
app.use(express.static('dist'))

let morganConfig = morgan(function (tokens, request, response) {
    if (tokens.method(request) == 'POST') {
        return [
            tokens.method(request, response),
            tokens.url(request, response),
            tokens.status(request, response),
            tokens.res(request, response, 'content-length'), '-',
            tokens['response-time'](request, response), 'ms',
            JSON.stringify(request.body)
        ].join(' ')
    }
})

app.use(morganConfig)

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })
    newPerson.save().then(savedNote => response.json(savedNote))
})













app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const now = new Date()
    const HTML = `The phonebook has info on ${persons.length} people <br>
                ${now.toString()}`

    response.send(HTML)
    response.status(200)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})